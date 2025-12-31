import React, { useState } from "react";
import { View, Text, StyleSheet, ScrollView, Image } from "react-native";
import { Picker } from "@react-native-picker/picker";
import Icon from "react-native-vector-icons/Ionicons";
import { MainContainer, InputDropDownStyle, Modal, BottomSheet } from "../../../components";
import InputField from "../../../components/textInput";
import CustomButton from "../../../components/customButton";
import { FONT_SIZES, FONTFAMILY, METRICS, THEME } from "../../../styles";
import BalanceBox from "../../../components/balanceBox";
import StatusBarManager from "../../../components/statusBarManager";
import { handleSize } from "../../../config/responsiveTheme";
import { useSelector } from "react-redux";
import BluryModal from "../../../components/Modal/bluryModal";
import { HOME_ROUTES } from "../../../constants";
import { useMyAccountTransferViewModel } from "../../../viewModels/homeViewModel/home/useMyAccountTransferViewModel";
import { Images } from "../../../config";
import FingerPrintContent from "../../../components/bottomSheet/fingerPrintContent";
import ConfrmPayment from "../../../components/bottomSheet/confrmPayment";

// ---------- Reusable ----------
const InfoRow = ({ icon, label, value }) => (
  <View style={styles.infoRow}>
    <View style={styles.infoLeft}>
      {icon == "time-outline" ?
        <Icon name={icon} size={handleSize.f(20)} color={THEME.white} style={{ marginRight: handleSize.w(8) }} />
      :
        <Image source={icon} style={styles.infoIcon} resizeMode="contain" />
      }
      <Text style={styles.label}>{label}</Text>
    </View>
    <Text style={styles.value}>{value}</Text>
  </View>
);


const MyAccountTransfer = ({...props}) => {
  const {
    navigation,
    note, 
    setnote,
    enterAmount,
    setenterAmount,
    // beneficiary,
    // setBeneficiary,
    pressBackArrow,
    handlePress,
    handleTransfer,
    openDropdown,
    toggleDropdown,
    setOpenDropdown,

    openDropdownsty, 
    setOpenDropdownSty,
    fromAccount, 
    setFromAccount,
    toAccount, 
    settoAccount,
    getCurrencyAccArray, 
    beneficiaryArray,
    isPending,
    isPendinguseFXConversion,
    open, 
    setopen,
    modalMsg,
    onClose,
    openDropdownstyToAcc, 
    setOpenDropdownStyToAcc,
    convertrate,
    paymentconfrm,
    ApiCall,
    autofocusAmount, 
    setautofocusAmount,
    autofocusnote, 
    setautofocusnote,

    loginUserData,
    payment_method_id, 
    setpayment_method_id,
    autoFocusedpaymentTypes, 
    setautoFocusedpaymentTypes,
    countdown

  } = useMyAccountTransferViewModel(props);
 
  function renderSuccess() {
    return (
      <Modal
        isVisible={open}
        isKeyboardAvoidingView={true}
        children={<BluryModal
            style={{ flex: 1, paddingHorizontal: handleSize.w(20) }}
            onClose={()=>onClose(modalMsg.status)}
            btnLoader={false}
            marginTopTitle={20}
            onConfirm={()=>onClose(modalMsg.status)}
            iconNameBottom={10}
            title={modalMsg.status ? "Success" : "Error"}
            body={modalMsg.msg}
            iconName={modalMsg.status ? "checkmark-outline" : "close-outline"}
            confirmText={'Ok'}
          />}
        onClose={()=>onClose(modalMsg.status)}
      />
    );
  }
  

  return (
    <MainContainer
      showBackArrow
      pressBackArrow={pressBackArrow}
      isFlatList={false}
      barStyle="dark-content"
      mainContainerStyle={styles.container}
    >
      <StatusBarManager
        backgroundColor={THEME.darkSecondary}
        barStyle="light-content"
      />

      <ScrollView contentContainerStyle={{ paddingBottom: handleSize.h(50) }}>
        <View style={{ marginHorizontal: handleSize.w(20) }}>
          
          
          <Text style={styles.title}>Send Money to Your Account</Text>

          <Text style={styles.subtitle}>
            Convert and transfer funds between your currency wallets instantly.
          </Text> 

          <InputDropDownStyle
            title="From Account"
            value={fromAccount}  // null = show input box
            // data={getCurrencyAccArray}
            data={getCurrencyAccArray}
            isOpen={openDropdownsty}
            onToggle={() =>{ setOpenDropdownSty(!openDropdownsty), setOpenDropdownStyToAcc(false), setOpenDropdown(null) }}
            onSelect={(item) =>{  
              setFromAccount({     
              id: item?.id,    
              available_balance: item?.available_balance,       
              currency_id: item?.currency_id,
              name: item?.account?.name,
                            // name: item?.currency?.name,
              iso_code: item?.currency?.iso_code
              })
            }}
          />

          {/* Balance */}
          {fromAccount?.name &&
            <BalanceBox amount={fromAccount?.iso_code +" "+ enterAmount && fromAccount?.available_balance - enterAmount }  label="Available Balance"  containerHeight={78} />}


          {/* Recipient Gets */}
          <InputField
            autoFocused={autofocusAmount}
            // renderRightInput={renderRightInput}
            placeholder="Enter amount"
            removeTitle={false}
            value={enterAmount}
            onChangeText={setenterAmount}
            keyboardType={"numeric"}
            maxlen={10}
            margBtm={handleSize.h(15)}
          />


          {/* Recipient Type */}
          <InputDropDownStyle
            title="To Account" 
            value={toAccount}  // null = show input box
            // data={getCurrencyAccArray}
            data={getCurrencyAccArray}
            isOpen={openDropdownstyToAcc}
            onToggle={() =>{ setOpenDropdownStyToAcc(!openDropdownstyToAcc), setOpenDropdownSty(false), setOpenDropdown(null) }}
            onSelect={(item) =>{ 
              settoAccount({     
              id: item?.id,    
              available_balance: item?.available_balance,       
              currency_id: item?.currency_id,
              name: item?.account?.name,
                            // name: item?.currency?.name,
              iso_code: item?.currency?.iso_code
              })
            }}
          />


          <InputField
            disabled={false}
            autoFocused={autoFocusedpaymentTypes}
            placeholder="Select payment method"
            removeTitle={false}
            value={ payment_method_id?.method ? payment_method_id?.method  : ""}
            enableDropdown={true}
            dropdownData={loginUserData?.banking_partner?.valid_payment_types}
            margBtm={handleSize.h(15)}
            isOpen={openDropdown === "paymentTypes"}
            onToggleDropdown={() =>{
              toggleDropdown("paymentTypes")
            }}
            onDropdownSelect={(item: any) => {
              setautoFocusedpaymentTypes(true)
                setpayment_method_id({
                  method: item?.method,
                  id: item?.id,
                })
            }}
          />

          <InputField
            // renderRightInput={renderRightInput}
            autoFocused={autofocusnote}
            placeholder="Enter note / refrence"
            removeTitle={false}
            value={note}
            onChangeText={setnote}
            keyboardType={"default"}
            maxlen={50}
            margBtm={handleSize.h(25)}
          />

          {/* Summary */}
            <View style={styles.summaryBox}>
            <InfoRow icon={Images.add} label="Conversion Fee" value={isPendinguseFXConversion ? "...loading" :convertrate.conversion_Fee} />
            <InfoRow icon={Images.add} label="Total After Fee" value={isPendinguseFXConversion ? "...loading" :convertrate.total_After_Fee} />
            <InfoRow icon={Images.exchangeRate} label="Exchange Rate (Live)" value={isPendinguseFXConversion ? "...loading" :convertrate.Exchange_Rate_Live} />

            {convertrate?.quoteId && <InfoRow
              icon="time-outline"
              label="Rate Valid For"
              value={isPendinguseFXConversion ? "...loading" : `${countdown} sec` || 0}
              // value={countdown > 0 ? `${countdown} sec` : 'Refreshing...'}
            />}

           </View>

          {/* Button */}
          <CustomButton
            btnContSty={styles.forgetTxt}
            loading={false}
            title="Transfer payment"
            onPress={handleTransfer}
          />

        </View>
      </ScrollView>


       <BottomSheet
         height={400}
         maxHeightPercent={0.65}   // optional, override for screen
         draggable={false}
         openTime={500}
         closeDuration={500}
         bottomSheetRef={paymentconfrm}
         children={<ConfrmPayment
              countdown={countdown}
              type={"myaccount"}
              fromAccount={fromAccount}
              toAccount={toAccount}
              Amount={enterAmount}
              refrence={paymentconfrm} 
              onPress={ApiCall}
              style={{ flex: 1, paddingHorizontal: 20 }}
              title="Confirm payment"  
              subtitle="Confirm payment" 
              convertrate={convertrate}
              loading={isPendinguseFXConversion}
              loadingBtn={isPending}
            />}
        />
      

      {renderSuccess()}
    </MainContainer>
  );
};

export default MyAccountTransfer;

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    backgroundColor: THEME.white 
  },

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
    marginBottom: handleSize.h(20),
    lineHeight: handleSize.h(20),
  },

  pickerWrapper: {
    borderWidth: handleSize.w(1),
    borderColor: THEME.white,
    borderRadius: handleSize.f(10),
    marginBottom: handleSize.h(15),
  },

  inputInnerPicker: {
    fontFamily: FONTFAMILY.Medium,
    fontSize: handleSize.f(FONT_SIZES.onefour),
    borderColor: THEME.gray,
    borderWidth: handleSize.w(1),
    borderRadius: handleSize.f(10),
    color: THEME.white,
    height: handleSize.h(56),
    marginLeft: handleSize.w(10),
  },

  containerAMOUNT: {
    backgroundColor: THEME.whitergba,
    width: "100%",
    height: handleSize.h(80),
    marginVertical: handleSize.h(15),
    borderRadius: handleSize.f(12),
    alignItems: "center",
    justifyContent: "center",
  },

  balanceTxt: {
    fontFamily: FONTFAMILY.Medium,
    fontSize: handleSize.f(FONT_SIZES.onefour),
    color: THEME.white,
  },

  balanceAmountTxt: {
    fontFamily: FONTFAMILY.Medium,
    fontSize: handleSize.f(FONT_SIZES.threezero),
    color: THEME.white,
  },

  renderRightInputContainer: {
    height: handleSize.h(56),
    position: "absolute",
    right: handleSize.w(20),
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },

  inputNumber: {
    fontSize: handleSize.f(FONT_SIZES.onesix),
    fontFamily: FONTFAMILY.Medium,
    color: THEME.white,
  },

  inputNumberNum: {
    fontSize: handleSize.f(FONT_SIZES.twozero),
    fontFamily: FONTFAMILY.Medium,
    color: THEME.white,
  },

  inputNumbergbpcont: {
    backgroundColor: THEME.primary,
    marginLeft: handleSize.w(6),
    borderRadius: handleSize.f(6),
    padding: handleSize.f(3),
  },

  inputNumbergbp: {
    fontSize: handleSize.f(FONT_SIZES.onetwo),
    fontFamily: FONTFAMILY.Medium,
    color: THEME.textPrimary,
  },

  forgetTxt: { 
    marginTop: handleSize.h(10), 
    marginBottom: handleSize.h(20) 
  },
  
  
//   // INFO ROW
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: handleSize.h(9),
  },

  infoLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  infoIcon: {
    marginRight: handleSize.w(8),
    width: handleSize.w(15),
    height: handleSize.h(15),
  },

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

  
  summaryBox: {
    borderRadius: handleSize.f(10),
    marginBottom: handleSize.h(10),
  },

});