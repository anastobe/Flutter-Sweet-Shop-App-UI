import React from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import { Picker } from "@react-native-picker/picker";
import { scale } from "react-native-size-matters";
import Icon from "react-native-vector-icons/Ionicons";
import { MainContainer, InputDropDownStyle } from "../../../components";
import InputField from "../../../components/textInput";
import CustomButton from "../../../components/customButton";
import { FONT_SIZES, FONTFAMILY, THEME } from "../../../styles";
import { useBankTransferViewModel } from "../../../viewModels/homeViewModel/home/useBankTransferViewModel";
import BalanceBox from "../../../components/balanceBox";
import StatusBarManager from "../../../components/statusBarManager";

const BankTransfer = () => {
  const {
    recipientGets,
    setRecipientGets,
    beneficiaryBankCountry,
    setBeneficiaryBankCountry,
    recipientType,
    setRecipientType,
    fromAcc,
    pressBackArrow,
    handlePress,
    handleTransfer,
    openDropdown,
    toggleDropdown
  } = useBankTransferViewModel();


  const renderRightInput = () => (
    <View style={styles.renderRightInputContainer}>
      <Text style={styles.inputNumber}>(Recipient Gets)</Text>
      <View style={styles.inputNumbergbpcont}>
        <Text style={styles.inputNumbergbp}>GBP</Text>
      </View>
    </View>
  );

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

      <ScrollView contentContainerStyle={{ paddingBottom: 50 }}>
        <View style={{ marginHorizontal: 20 }}>
          <Text style={styles.title}>Bank Transfer</Text>
          <Text style={styles.subtitle}>
            Make local or international bank transfers.
          </Text>

          {/* Account Dropdown */}
          <InputDropDownStyle
            title={"From Account"}
            label={fromAcc.label}
            currency={fromAcc.currency}
            flag={fromAcc.flag}
            onPress={handlePress}
          />

          {/* {BalanceCard({ label: "Available Balance", amount: "£1,250.00" })} */}
              <BalanceBox amount="£1,250.00" label="Available Balance" containerHeight={78} />

          {/* Input Field */}
          <InputField
            renderRightInput={renderRightInput}
            placeholder="0.00"
            removeTitle={true}
            value={recipientGets}
            onChangeText={setRecipientGets}
            keyboardType={"numeric"}
            maxlen={10}
            margBtm={15}
          />

        
          <InputField
            disabled={false} 
            placeholder="Beneficiary Bank Country"
            value={beneficiaryBankCountry} 
            enableDropdown={true}
            dropdownData={[
              { name: "Pak" },
              { name: "China" }
            ]} 
            margBtm={15}
            isOpen={openDropdown === 'country'} 
            onToggleDropdown={() => toggleDropdown('country')}
            onDropdownSelect={(item:any )=> setBeneficiaryBankCountry(item.name)}
          />

          <InputField
            disabled={false} 
            placeholder="Recipient Type"
            value={recipientType} 
            enableDropdown={true}
            dropdownData={[
              // { name: "account" },
              { name: "Cash" }
            ]} 
            margBtm={15}
            isOpen={openDropdown === 'recepitantType'} 
            onToggleDropdown={() => toggleDropdown('recepitantType')}
            onDropdownSelect={(item:any )=> setRecipientType(item.name)}
          />

          {/* Button */}
          <CustomButton
            btnContSty={styles.forgetTxt}
            loading={false}
            title="Transfer Payment"
            onPress={handleTransfer}
          />
        </View>
      </ScrollView>
    </MainContainer>
  );
};

export default BankTransfer;

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: THEME.white },
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
    marginBottom: 20,
    lineHeight: 20
  },
  pickerWrapper: {
    borderWidth: 1,
    borderColor: THEME.white,
    borderRadius: 10,
    marginBottom: 15,
  },
  inputInnerPicker: {
    fontFamily: FONTFAMILY.Medium,
    fontSize: FONT_SIZES.onefour,
    borderColor: THEME.gray,
    borderWidth: 1,
    borderRadius: 10,
    color: THEME.white,
    height: 56,
    marginLeft: 10,
  },
  containerAMOUNT: {
    backgroundColor: THEME.whitergba,
    // padding: scale(8),
    width: "100%",
    height: 80,
    // alignSelf: "center",
    marginVertical: 15,
    borderRadius: scale(12),
    alignItems: "center",
    justifyContent: "center",
  },
  amountBox: {
    // paddingHorizontal: scale(10),
    // paddingVertical: scale(4),
    // borderRadius: scale(6),
    // marginTop: 5,
  },
  balanceTxt: {
    fontFamily: FONTFAMILY.Medium,
    fontSize: FONT_SIZES.onefour,
    color: THEME.white,
    // marginTop: 5,
  },
  balanceAmountTxt: {
    fontFamily: FONTFAMILY.Medium,
    fontSize: FONT_SIZES.threezero,
    color: THEME.white,
    // backgroundColor :'red',
    // paddingBottom: 5,
    // marginTop: 5,
    // paddingBottom: 1,
  },
  renderRightInputContainer: {
    height: 56,
    position: "absolute",
    right: 20,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  inputNumber: {
    fontSize: FONT_SIZES.onesix,
    fontFamily: FONTFAMILY.Medium,
    color: THEME.white,
  },
    inputNumberNum:{
    fontSize: FONT_SIZES.twozero,
    fontFamily: FONTFAMILY.Medium,
    color: THEME.white,
  },
  inputNumbergbpcont: {
    backgroundColor: THEME.primary,
    marginLeft: 6,
    borderRadius: 6,
    padding: 3,
  },
  inputNumbergbp: {
    fontSize: FONT_SIZES.onetwo,
    fontFamily: FONTFAMILY.Medium,
    color: THEME.textPrimary,
  },
  forgetTxt: { marginTop: 20, marginBottom: 20 },
});
