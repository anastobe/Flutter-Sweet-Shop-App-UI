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
import BalanceBox from '../../../../components/balanceBox';
import StatusBarManager from '../../../../components/statusBarManager';
import { handleSize } from '../../../../config/responsiveTheme';

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
      <StatusBarManager
        backgroundColor={THEME.darkSecondary} 
        barStyle="light-content" 
      />

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

          {/* <BalanceCard label="Available Balance" amount="£1,250.00" /> */}
          <BalanceBox amount="£1,250.00" label="Available Balance" containerHeight={78} />

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
  scrollContainer: { paddingBottom: handleSize.h(100) },
  innerContainer: { marginHorizontal: handleSize.w(20) },
  title: {
    fontSize: handleSize.f(FONT_SIZES.onesix),
    fontFamily: FONTFAMILY.SemiBold,
    color: THEME.white,
    marginBottom: handleSize.h(10),
    marginTop: handleSize.h(10),
  },
  subtitle: {
    fontSize: handleSize.f(FONT_SIZES.onesix),
    fontFamily: FONTFAMILY.Regular,
    color: THEME.white,
    marginBottom: handleSize.h(30),
    lineHeight: handleSize.h(20),
  },
  infoIcon: { marginRight: handleSize.w(8), width: handleSize.w(15), height: handleSize.h(15) },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: handleSize.h(10),
  },
  infoLeft: { flexDirection: 'row', alignItems: 'center' },
  label: {
    fontFamily: FONTFAMILY.Light,
    fontSize: handleSize.f(FONT_SIZES.onefour),
    color: THEME.white,
  },
  value: {
    fontFamily: FONTFAMILY.Medium,
    fontSize: handleSize.f(FONT_SIZES.onefour),
    color: THEME.white,
  },
  summaryBox: { borderRadius: handleSize.f(10), padding: handleSize.f(10), marginBottom: handleSize.h(10) },
  balanceContainer: {
    backgroundColor: THEME.whitergba,
    padding: handleSize.f(10),
    borderRadius: handleSize.f(12),
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: handleSize.h(15),
  },
  balanceLabel: {
    fontFamily: FONTFAMILY.Medium,
    fontSize: handleSize.f(FONT_SIZES.onefour),
    color: THEME.white,
  },
  balanceAmount: {
    fontFamily: FONTFAMILY.Medium,
    fontSize: handleSize.f(FONT_SIZES.threezero),
    color: THEME.white,
  },
  rightInputContainer: {
    height: handleSize.h(56),
    position: 'absolute',
    right: handleSize.w(20),
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  rightInputValue: {
    fontSize: handleSize.f(FONT_SIZES.onefour),
    fontFamily: FONTFAMILY.Medium,
    color: THEME.white,
  },
  currencyBox: {
    backgroundColor: THEME.primary,
    marginLeft: handleSize.w(6),
    borderRadius: handleSize.f(6),
    padding: handleSize.f(3),
  },
  currencyText: {
    fontSize: handleSize.f(FONT_SIZES.onetwo),
    fontFamily: FONTFAMILY.Medium,
    color: THEME.textPrimary,
  },
  btnStyle: {
    fontSize: handleSize.f(FONT_SIZES.twozero),
    lineHeight: handleSize.h(20),
    fontFamily: FONTFAMILY.Regular,
    color: THEME.white,
  },
  btnStyle2: {
    fontSize: handleSize.f(FONT_SIZES.twozero),
    lineHeight: handleSize.h(20),
    fontFamily: FONTFAMILY.Regular,
    color: THEME.textPrimary,
  },
  transferBtnReject: {
    backgroundColor: THEME.SlateBlue,
    borderRadius: handleSize.f(10),
    justifyContent: "center",
    alignItems: 'center',
    height: handleSize.h(50),
    width: Metrics.width / 2 - handleSize.w(30),
    borderColor: THEME.white,
    borderWidth: handleSize.f(1.5)
  },
  transferBtnAccept: {
    backgroundColor: THEME.primary,
    borderRadius: handleSize.f(10),
    justifyContent: "center",
    alignItems: 'center',
    height: handleSize.h(50),
    width: Metrics.width / 2 - handleSize.w(30)
  },
  modal: {
    backgroundColor: 'rgba(64, 64, 65, 0.92)',
    borderRadius: handleSize.f(16),
    padding: handleSize.f(24),
    alignItems: 'center',
  },
  closeBtn: { position: 'absolute', top: handleSize.h(10), right: handleSize.w(15) },
  closeText: { fontSize: handleSize.f(FONT_SIZES.foureight), color: THEME.white },
  iconCircle: {
    backgroundColor: THEME.primary,
    borderRadius: handleSize.f(100),
    width: handleSize.w(56),
    height: handleSize.h(56),
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: handleSize.h(10),
  },
  forgetTxtpop: { width: '100%', marginTop: handleSize.h(30), marginBottom: handleSize.h(20) },
  titles: {
    fontFamily: FONTFAMILY.Medium,
    fontSize: handleSize.f(FONT_SIZES.twotwo),
    color: THEME.white,
    textAlign: 'center',
    marginTop: handleSize.h(50),
  },
  description: {
    marginTop: handleSize.h(10),
    fontFamily: FONTFAMILY.Medium,
    fontSize: handleSize.f(FONT_SIZES.onefour),
    color: THEME.white,
    textAlign: 'center',
  },
  button: {
    borderRadius: handleSize.f(10),
    justifyContent: "center",
    alignItems: 'center',
    height: handleSize.h(56),
    width: '100%',
    marginTop: handleSize.h(20),
  },
  buttonText: {
    fontFamily: FONTFAMILY.Regular,
   fontSize: handleSize.f(FONT_SIZES.oneeight),
  },
});