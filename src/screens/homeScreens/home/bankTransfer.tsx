import React, { useState } from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import { Picker } from "@react-native-picker/picker";
import Icon from "react-native-vector-icons/Ionicons";
import { MainContainer, InputDropDownStyle, Modal, BottomSheet } from "../../../components";
import InputField from "../../../components/textInput";
import CustomButton from "../../../components/customButton";
import { FONT_SIZES, FONTFAMILY, THEME } from "../../../styles";
import BalanceBox from "../../../components/balanceBox";
import StatusBarManager from "../../../components/statusBarManager";
import { handleSize } from "../../../config/responsiveTheme";
import { useSelector } from "react-redux";
import BluryModal from "../../../components/Modal/bluryModal";
import { HOME_ROUTES } from "../../../constants";
import { useBankTransferViewModel } from "../../../viewModels/homeViewModel/home/useBankTransferViewModel";
import Metrics from "../../../styles/metrics";
import BeneficiariesManagement from "../more/benefeciaryModule/BeneficiariesManagement";
import GlobalInputsearch from "../../../components/globalInputsearch";
import { CommonUtils } from "../../../utils";

const BankTransfer = () => {
  const {
    navigation,
    beneficiaryRef,
    note, 
    setnote,
    enterAmount,
    setenterAmount,
    beneficiary,
    loginUserData,
    setBeneficiary,
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
    refetchgetAssetBalance,
    getAssetBalancePending,
    getAssetBalance_Data,
    getCurrencyAccArray, 
    beneficiaryArray,
    isPending,
    open, 
    setopen,
    modalMsg,
    onClose,
    // getBeneficiaryDetailFunc,
    autoFocused, 
    setautoFocused,
    payment_method_id, 
    setpayment_method_id,
    autoFocusedpaymentTypes, 
    setautoFocusedpaymentTypes,
    openSureModal, 
    setopenSureModal,
    pressSure

  } = useBankTransferViewModel();
 
  function renderSuccess() {
    return (
      <Modal
        isVisible={open}
        isKeyboardAvoidingView={true}
        children={<BluryModal
            style={{ flex: 1, paddingHorizontal: handleSize.w(20) }}
            onClose={()=>onClose(true)}
            btnLoader={false}
            marginTopTitle={20}
            onConfirm={()=>onClose(true)}
            iconNameBottom={10}
            title={"Success"}
            body={modalMsg}
            iconName={"checkmark-outline"}
            confirmText={'Continue'}
          />}
          onClose={()=>onClose(true)}
      />
    );
  }

  function renderSure() {
    return(
      <Modal isVisible={openSureModal} onClose={() => setopenSureModal(false)}>
        <BluryModal
          iconName={"checkmark-outline"}
          onClose={() =>{
            if (isPending) {
              return              
            }
            else{
            setopenSureModal(false)
            }
          }}
          btnLoader={isPending}
          onConfirm={pressSure}
          body="Are you sure you want to proceed this payment?"
          confirmText="Proceed"
        />
      </Modal>
    )
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
          
          <Text style={styles.title}>Bank tansfer</Text>
          <Text style={styles.subtitle}>
            Make local or international bank transfers.
          </Text>
          
          <InputDropDownStyle
            title="From account"
            value={fromAccount}  // null = show input box
            // data={getCurrencyAccArray}
            data={getCurrencyAccArray}
            isOpen={openDropdownsty}
            onToggle={() =>{ setOpenDropdownSty(!openDropdownsty), setOpenDropdown(null) }}
            onSelect={(item) =>{ 
              refetchgetAssetBalance(item?.id)
              setFromAccount({     
              id: item?.id,    
              available_balance: item?.available_balance,       
              currency_id: item?.currency_id,
              name: item?.account?.name,
              iso_code: item?.currency?.iso_code
              })
            }}
          />

          {/* Balance */}
            <BalanceBox 
              amount={
                getAssetBalancePending
                  ? "..."
                  : getAssetBalance_Data
                  ? `${CommonUtils.getCurrencySymbol(getAssetBalance_Data?.currency_code || "")} ${Number(getAssetBalance_Data?.available_balance ?? 0)?.toFixed(2)}`
                  : "0.00"
              }
            // amount={getAssetBalancePending ? "..." : `${CommonUtils.getCurrencySymbol(getAssetBalance_Data?.currency_code)} ${(getAssetBalance_Data?.available_balance)?.toFixed(2)}`}
            label="Available Balance"  containerHeight={78} />
            


          {/* Recipient Gets */}
          <InputField
            // renderRightInput={renderRightInput}
            placeholder="Amount"
            removeTitle={false}
            value={enterAmount}
            onChangeText={setenterAmount}
            keyboardType={"numeric"}
            maxlen={9}
            margTp={5}
            margBtm={handleSize.h(12)}
          />


          {/* Recipient Type */}
          <InputField
            disabled={false}
            autoFocused={autoFocused}
            placeholder="Select beneficiary"
            removeTitle={false}
            value={ beneficiary?.beneficiary_id ? beneficiary?.first_name + " " + beneficiary.last_name : ""}
            enableDropdown={true}
            dropdownData={beneficiaryArray}
            margBtm={handleSize.h(12)}
            // isOpen={openDropdown === "toaccount"}
            onToggleDropdown={() =>{
              // toggleDropdown("toaccount"),
              // getBeneficiaryDetail(),
              beneficiaryRef?.current?.open()
            }}
            // onDropdownSelect={(item: any) => 
            //   setBeneficiary({
            //     beneficiary_id: item.id,
            //     first_name: item.first_name,
            //     last_name: item.last_name
            //   })
            // }
          />

          <InputField
            disabled={false}
            autoFocused={autoFocusedpaymentTypes}
            placeholder="Select payment method"
            removeTitle={false}
            value={ payment_method_id?.method ? payment_method_id?.method  : ""}
            enableDropdown={true}
            dropdownData={loginUserData?.banking_partner?.valid_payment_types}
            margBtm={handleSize.h(12)}
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
            placeholder="Enter note / refrence"
            removeTitle={false}
            value={note}
            onChangeText={setnote}
            keyboardType={"default"}
            maxlen={50}
            margBtm={handleSize.h(12)}
          />

          {/* Button */}
          <CustomButton
            btnContSty={styles.forgetTxt}
            loading={false}
            title="Transfer payment"
            onPress={handleTransfer}
          />

        </View>
      </ScrollView>
      {renderSuccess()}
      {renderSure()}
      
        <BottomSheet 
          height={Metrics.height } // minimum height
          maxHeightPercent={0.9} // optional, override for screen
          draggable={false}
          bottomSheetRef={beneficiaryRef}
        >
      <GlobalInputsearch
        pressClose={()=>{ beneficiaryRef?.current?.close() }}
        placeholder={"Select Beneficiary"}
        onSelectBeneficiary={(item: any) => {
          console.log('SELECTED FROM BOTTOM SHEET ===>', item);

          setBeneficiary({
            beneficiary_id: item.id,
            first_name: item.first_name,
            last_name: item.last_name,
          });
              setautoFocused(true);
          beneficiaryRef?.current?.close();
        }}
        filterKey={"iban"}
        />
        </BottomSheet>

    </MainContainer>
  );
};

export default BankTransfer;

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
    marginTop: handleSize.h(20), 
    marginBottom: handleSize.h(20) 
  },
});