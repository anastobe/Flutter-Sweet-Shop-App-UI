import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { InputDropDownStyle, MainContainer, Modal } from "../../../components";
import InputField from "../../../components/textInput";
import CustomButton from "../../../components/customButton";
import { FONT_SIZES, FONTFAMILY, THEME } from "../../../styles";
import { useAddNewCurrencyAccountViewModel } from "../../../viewModels/homeViewModel/home/useAddNewCurrencyAccountViewModel";
import BluryModal from "../../../components/Modal/bluryModal";
import StatusBarManager from "../../../components/statusBarManager";
import { handleSize } from "../../../config/responsiveTheme";

const AddNewCurrencyAcount = () => {
  const {
    accountName,
    setAccountName,
    assetType, 
    setassetType,
    currency,
    setCurrency,
    pressBackArrow,
    handleAddCurrency,
    freezeModalProps,
    toggleDropdown,
    openDropdown,
    currencyList,
    accountTypeList,
    
    setOpenDropdown,
    openDropdownsty, 
    setOpenDropdownSty,
    fromAccount, 
    setFromAccount,
    openDropdownstyToAcc, 
    getCurrencyAccArray,
    setOpenDropdownStyToAcc,
    isPending

  } = useAddNewCurrencyAccountViewModel();

  return (
    <MainContainer
      showBackArrow={true}
      pressBackArrow={pressBackArrow}
      isFlatList={true}
      barStyle="dark-content"
      mainContainerStyle={styles.container}
    >
      <StatusBarManager
        backgroundColor={THEME.darkSecondary}
        barStyle="light-content"
      />

      <View style={{ marginHorizontal: handleSize.w(20) }}>
        <Text style={styles.title}>Add new currency account</Text>
        <Text style={styles.subtitle}>
          Select a currency to create a new account in your wallet
        </Text>

      <InputDropDownStyle
          title="Send from"
          value={fromAccount} // null = show input box
          // data={getCurrencyAccArray}
          data={getCurrencyAccArray}
          isOpen={openDropdownsty}
          onToggle={() =>{ setOpenDropdownSty(!openDropdownsty), setOpenDropdownStyToAcc(false), setOpenDropdown(null) }}
          onSelect={(item: any) => {
            setFromAccount({
              id: item?.account?.id,
              available_balance: item?.available_balance,  //anas comment useless work 
              currency_id: item?.currency_id,  //anas comment useless work
              name: item?.account?.name,  //anas comment useless work
              iso_code: item?.currency?.iso_code,
            });
          }}
        />

       <InputField
        disabled={false} 
        placeholder='Select currency'
        value={currency.name} 
        enableDropdown={true}
        dropdownData={currencyList} 
        margBtm={23}
        isOpen={openDropdown === 'currency'} 
        onToggleDropdown={() =>{ toggleDropdown('currency') 
          // setadjustScrollHeight(!adjustScrollHeight)
        }}
        onDropdownSelect={(item:any )=> {
          setCurrency({
            id: item?.id,
            name: item?.iso_code
          })
        }}
      />
      
       <InputField
        disabled={false} 
        placeholder='Select asset type'
        value={assetType.name} 
        enableDropdown={true}
        dropdownData={accountTypeList} 
        margBtm={23}
        isOpen={openDropdown === 'assetType'} 
        onToggleDropdown={() =>{ toggleDropdown('assetType') 
          // setadjustScrollHeight(!adjustScrollHeight)
        }}
        onDropdownSelect={(item:any )=> {
          setassetType({
            id: item?.id,
            name: item?.name
          })
        }}
      />


{/* accountTypeList */}
        <CustomButton
          btnContSty={styles.forgetTxt}
          title="Add Currency"
          onPress={handleAddCurrency}
        />

        <Modal
          isVisible={freezeModalProps.addCurrency.visible}
          isKeyboardAvoidingView={true}
          children={<BluryModal {...freezeModalProps.addCurrency} />}
          onClose={isPending ? console.log("no action") : freezeModalProps.addCurrency.onClose}
        />

        <Modal
          isVisible={freezeModalProps.requestSubmitted.visible}
          isKeyboardAvoidingView={true}
          children={<BluryModal {...freezeModalProps.requestSubmitted} />}
          onClose={freezeModalProps.requestSubmitted.onClose}
        />
      </View>
    </MainContainer>
  );
};

export default AddNewCurrencyAcount;

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: THEME.white },

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

  forgetTxt: {
    marginTop: handleSize.h(20),
    marginBottom: handleSize.h(20),
  },

  pickerWrapper: {
    borderWidth: 1,
    borderColor: THEME.white,
    borderRadius: handleSize.f(16),
    marginBottom: handleSize.h(15),
  },

  inputInnerPicker: {
    fontFamily: FONTFAMILY.Medium,
    fontSize: handleSize.f(FONT_SIZES.onefour),
    borderColor: THEME.gray,
    borderWidth: 1,
    borderRadius: handleSize.f(16),
    color: THEME.white,
    height: handleSize.h(56),
    marginLeft: handleSize.w(10),
  },
});
