import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { MainContainer, InputDropDownStyle, Modal } from '../../../../components';
import { FONT_SIZES, FONTFAMILY, THEME } from '../../../../styles';
import Icon from 'react-native-vector-icons/Ionicons';
import { scale } from 'react-native-size-matters';
import InputField from '../../../../components/textInput';
import CustomButton from '../../../../components/customButton';
import { useAdminPaymentStatusViewModel } from '../../../../viewModels/homeViewModel/more/Admin/adminPaymentStatusViewModel';
import Metrics from '../../../../styles/metrics';
import { TouchableOpacity } from 'react-native';

// ✅ Reusable Components
const InfoRow = ({ icon, label, value }: { icon: string; label: string; value: string }) => (
  <View style={styles.infoRow}>
    <View style={styles.infoLeft}>
      <Icon name={icon} size={18} color={THEME.white} style={styles.infoIcon} />
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

  
      function renderPopup(icon: any,title: any,btnTxt: any, whichModal: Boolean) {
    return (
      <View style={styles.modal}>
        <TouchableOpacity style={styles.closeBtn} onPress={()=>{
          if (!whichModal) {
            setOpen(!open)
          }else{
            setOpen2(!open2)
          }
        }}>
          <Text style={styles.closeText}>×</Text>
        </TouchableOpacity>

        {/* <View style={styles.iconCircle}>
          <Icon name={icon} size={25} color={THEME.textPrimary} />
        </View> */}

        <Text style={styles.titles}>{title}</Text>
        {/* <Text style={styles.description}>Virtual card created and ready to use.</Text> */}

        <CustomButton
          btnContSty={[styles.button,{ backgroundColor: !whichModal ? THEME.medRed : THEME.primary }]}
          title={btnTxt}
          showmyStyleOnly={true}
          txtColor={[styles.buttonText,{ color: !whichModal ?  THEME.white : THEME.textPrimary }]}
           onPress={()=>{
          if (!whichModal) {
            setOpen(!open)
          }else{
            setOpen2(!open2)
          }
        }}
        />
      </View>
    );
  }

  function renderAccept() {
    return (
      <Modal
        isVisible={open}
        isKeyboardAvoidingView={true}
        children={renderPopup("alert-outline","Are you sure you want to reject","Yes",false)} 
        onClose={setOpen}
      />
    );
  }
  
  function renderReject() {
  return (
    <Modal
      isVisible={open2}
      isKeyboardAvoidingView={true}
      children={renderPopup("checkmark-outline","Are you sure you want to accept","Yes",true)} 
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
            <InfoRow icon="add-outline" label="Conversion Fee" value="£2.00" />
            <InfoRow icon="add-outline" label="Total After Fee" value="£1002.00" />
            <InfoRow
              icon="wallet-outline"
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
    marginBottom: 10,
    marginTop: 10,
  },
  subtitle: {
    fontSize: FONT_SIZES.onesix,
    fontFamily: FONTFAMILY.Regular,
    color: THEME.white,
    marginBottom: 30,
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  infoLeft: { flexDirection: 'row', alignItems: 'center' },
  infoIcon: { marginRight: 8 },
  label: {
    fontFamily: FONTFAMILY.Light,
    fontSize: FONT_SIZES.onefour,
    color: THEME.white,
  },
  value: {
    fontFamily: FONTFAMILY.Medium,
    fontSize: FONT_SIZES.onefour,
    color: THEME.primary,
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
    color: THEME.primary,
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
    fontFamily: FONTFAMILY.Regular,
    color: THEME.white,
  },
  btnStyle2:{
    fontSize: FONT_SIZES.twozero,
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
    fontFamily: FONTFAMILY.SemiBold,
    fontSize: FONT_SIZES.twosix,
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
