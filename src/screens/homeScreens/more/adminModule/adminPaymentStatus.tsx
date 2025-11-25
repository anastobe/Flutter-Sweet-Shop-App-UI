import React from 'react';
import { View, Text, StyleSheet, ScrollView, Alert } from 'react-native';
import { MainContainer, InputDropDownStyle, Modal } from '../../../../components';
import { FONT_SIZES, FONTFAMILY, THEME } from '../../../../styles';
import Icon from 'react-native-vector-icons/Ionicons';
import { scale } from 'react-native-size-matters';
import InputField from '../../../../components/textInput';
import CustomButton from '../../../../components/customButton';
import { useAdminPaymentStatusViewModel } from '../../../../viewModels/homeViewModel/more/Admin/adminPaymentStatusViewModel';
import Metrics from '../../../../styles/metrics';
import { TouchableOpacity } from 'react-native';
import { SHOW_CLIENT } from '../../../../APICall/constants';
import { Image } from 'react-native';
import { Images } from '../../../../config';
import BluryModal from '../../../../components/Modal/bluryModal';

// ✅ Reusable Components
const InfoRow = ({ icon, label, value }: { icon: string; label: string; value: string }) => (
  <View style={styles.infoRow}>
    <View style={styles.infoLeft}>
      <Image source={icon} style={styles.infoIcon} resizeMode="contain" />
      <Text style={styles.label}>{label}</Text>
    </View>
    <Text style={styles.value}>{value}</Text>
  </View>
);

const BalanceCard = ({ label, amount }: { label: string; amount: string }) => (
  <View style={styles.balanceContainer}>
    <Text style={styles.balanceAmount}>{amount}</Text>
    <Text style={styles.balanceLabel}>{label}</Text>
  </View>
);

const AdminPaymentStatus = () => {
  const {
    amountSpend,
    setAmountSpend,
    fromAcc,
    toAcc,
    pressBackArrow,
    handlePress,
    onTransfer,
    open,
    setOpen,
    open2,
    setOpen2,
  } = useAdminPaymentStatusViewModel();

  const renderRightInput = () => (
    <View style={styles.rightInputContainer}>
      <Text style={styles.rightInputValue}>(Amount to Send)</Text>
      <View style={styles.currencyBox}>
        <Text style={styles.currencyText}>GBP</Text>
      </View>
    </View>
  );

  
  function renderAccept() {
    return ( 
      <Modal
        isVisible={open}
        isKeyboardAvoidingView={true}
        // children={renderPopup("alert-outline","Are you sure you want to reject","Yes",false)} 
        children={
          <BluryModal
          style={{ flex: 1, paddingHorizontal: 20 }}
            backImg={Images.addCardGradient}
            visible={open}
            onClose={() => setOpen(false)}
            btnLoader={false}
            marginTopTitle={40}
            onConfirm={() =>{
               Alert.alert("NEED",SHOW_CLIENT)
              setOpen(!open)
            }}
            showSubBody={false} 
            showCancelBtn={false}
            downConfirmText={'Cancel'}
            title={'Are you sure you want to reject'}
            body={''}
            subBody={
              'The card can be unfrozen at any time. Existing subscriptions may still attempt charges.'
            }
            iconName={"alert-outline"}
            confirmText={'Yes'}
          />
        }
        onClose={setOpen}
      />
    );
  }
  
  function renderReject() {
  return (
    <Modal
      isVisible={open2}
      isKeyboardAvoidingView={true}
      // children={renderPopup("checkmark-outline","Are you sure you want to accept","Yes",true)} 
      children={
        <BluryModal
        style={{ flex: 1, paddingHorizontal: 20 }}
          backImg={Images.addCardGradient}
          visible={open2}
          onClose={() => setOpen2(false)}
          btnLoader={false}
          marginTopTitle={40}
          onConfirm={() =>{
              Alert.alert("NEED",SHOW_CLIENT)
            setOpen2(!open2)
          }}
          showSubBody={false} 
          showCancelBtn={false}
          downConfirmText={'Cancel'}
          title={'Are you sure you want to accept'}
          body={''}
          subBody={
            'The card can be unfrozen at any time. Existing subscriptions may still attempt charges.'
          }
          iconName={"checkmark-outline"}
          confirmText={'Yes'}
        />
      }
      onClose={setOpen2}
    />
  );
}


  return (
    <MainContainer
      showBackArrow
      pressBackArrow={pressBackArrow}
      isFlatList
      barStyle="dark-content"
      mainContainerStyle={styles.container}
    >
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.innerContainer}>
          <Text style={styles.title}>Send Money to Your Account</Text>
          <Text style={styles.subtitle}>
            Convert and transfer funds between your currency wallets instantly.
          </Text>

          {/* Input Section */}
          <InputDropDownStyle
            title="From Account"
            label={fromAcc.label}
            currency={fromAcc.currency}
            flag="business-outline"
            // onPress={handlePress}
          />

          <BalanceCard label="Available Balance" amount="£1,250.00" />

          <InputDropDownStyle
            title="To Account"
            label={toAcc.label}
            currency={toAcc.currency}
            flag="business-outline"
            // onPress={handlePress}
          />

          <InputField
            margTp={20}
            renderRightInput={renderRightInput}
            autoCapital="none"
            blurOnSubmit={false}
            placeholder="0.00"
            removeTitle={true}
            value={amountSpend}
            onChangeText={setAmountSpend}
            keyboardType="numeric"
                    maxlen={10}
            margBtm={20}
          />

          {/* Summary Section */}
          <View style={styles.summaryBox}>
            <InfoRow icon={Images.add} label="Conversion Fee" value="£2.00" />
            <InfoRow icon={Images.add} label="Total After Fee" value="£1002.00" />
            <InfoRow
              icon={Images.exchangeRate}
              label="Exchange Rate (Live)"
              value="1 GBP = 1.1425 EUR"
            />
          </View>

          <View style={{ flexDirection: "row", justifyContent: "space-between" }} >
          <CustomButton
            btnContSty={styles.transferBtnReject}
            loading={false}
            txtColor={styles.btnStyle}
            showmyStyleOnly={true}
            title="Reject"
            onPress={onTransfer}
          />

          <CustomButton
            btnContSty={styles.transferBtnAccept}
            loading={false}
            txtColor={styles.btnStyle2}
            showmyStyleOnly={true}
            title="Accept"
            onPress={handlePress}
          />
            </View>
        </View>
            {renderAccept()}
            {renderReject()}

      </ScrollView>
    </MainContainer>
  );
};

export default AdminPaymentStatus;

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: THEME.white },
  scrollContainer: { paddingBottom: 100 },
  innerContainer: { marginHorizontal: 20 },
  title: {
    fontSize: FONT_SIZES.onesix,
    fontFamily: FONTFAMILY.SemiBold,
    color: THEME.white,
    marginBottom: 15,
    marginTop: 10,
  },
  subtitle: {
    fontSize: FONT_SIZES.onesix,
    fontFamily: FONTFAMILY.Regular,
    color: THEME.white,
    marginBottom: 30,
    lineHeight: 20
  },
    infoIcon: { marginRight: 8, width: 15, height: 15 },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  infoLeft: { flexDirection: 'row', alignItems: 'center' },
  label: {
    fontFamily: FONTFAMILY.Light,
    fontSize: FONT_SIZES.onefour,
    color: THEME.white,
  },
  value: {
    fontFamily: FONTFAMILY.Medium,
    fontSize: FONT_SIZES.onefour,
    color: THEME.white,
  },
  summaryBox: { borderRadius: 10, padding: 10, marginBottom: 10 },
  balanceContainer: {
    backgroundColor: THEME.whitergba,
    padding: scale(10),
    borderRadius: scale(12),
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 15,
  },
  balanceLabel: {
    fontFamily: FONTFAMILY.Medium,
    fontSize: FONT_SIZES.onefour,
    color: THEME.white,
  },
  balanceAmount: {
    fontFamily: FONTFAMILY.Medium,
    fontSize: FONT_SIZES.threetwo,
    color: THEME.white,
  },
  rightInputContainer: {
    height: scale(55),
    position: 'absolute',
    right: 20,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  rightInputValue: {
    fontSize: FONT_SIZES.onefour,
    fontFamily: FONTFAMILY.Medium,
    color: THEME.white,
  },
  currencyBox: {
    backgroundColor: THEME.primary,
    marginLeft: 6,
    borderRadius: 6,
    padding: 3,
  },
  currencyText: {
    fontSize: FONT_SIZES.onetwo,
    fontFamily: FONTFAMILY.Medium,
    color: THEME.textPrimary,
  },
  btnStyle:{
    fontSize: FONT_SIZES.twozero,
    lineHeight: 20,
    fontFamily: FONTFAMILY.Regular,
    color: THEME.white,
  },
  btnStyle2:{
    fontSize: FONT_SIZES.twozero,
    lineHeight: 20,
    fontFamily: FONTFAMILY.Regular,
    color: THEME.textPrimary,
  },
  transferBtnReject: {
    backgroundColor: THEME.SlateBlue,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: 'center',
  height: scale(50),
    width: Metrics.width/2-30,
    borderColor: THEME.white,
    borderWidth: 1.5
   },
   transferBtnAccept: {
    backgroundColor: THEME.primary,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: 'center',
  height: scale(50),
    width: Metrics.width/2-30
   },
   
  modal: {
    backgroundColor: 'rgba(64, 64, 65, 0.92)',
    borderRadius: 16,
    padding: 24,
    alignItems: 'center',
  },
  closeBtn: { position: 'absolute', top: 10, right: 15 },
  closeText: { fontSize: FONT_SIZES.foureight, color: THEME.white },
  iconCircle: {
    backgroundColor: THEME.primary,
    borderRadius: 100,
    width: scale(55),
    height: scale(55),
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
  forgetTxtpop: { width: '100%', marginTop: 30, marginBottom: 20 },
  titles: {
    fontFamily: FONTFAMILY.Medium,
    fontSize: FONT_SIZES.twotwo,
    color: THEME.white,
    textAlign: 'center',
    marginTop: 50,
  },
  description: {
    marginTop: 10,
    fontFamily: FONTFAMILY.Medium,
    fontSize: FONT_SIZES.onefour,
    color: THEME.white,
    textAlign: 'center',
  },
      button: {
    borderRadius: 10,
    justifyContent: "center",
    alignItems: 'center',
    height: scale(55),
    width: '100%',
    marginTop: 20

  },
  buttonText: {
    fontFamily: FONTFAMILY.Regular,
    fontSize: FONT_SIZES.oneeight
  },
});
