import React from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import { Picker } from "@react-native-picker/picker";
import Icon from "react-native-vector-icons/Ionicons";
import { MainContainer, InputDropDownStyle } from "../../../components";
import InputField from "../../../components/textInput";
import CustomButton from "../../../components/customButton";
import { FONT_SIZES, FONTFAMILY, THEME } from "../../../styles";
import { useBankTransferViewModel } from "../../../viewModels/homeViewModel/home/useBankTransferViewModel";
import BalanceBox from "../../../components/balanceBox";
import StatusBarManager from "../../../components/statusBarManager";
import { handleSize } from "../../../config/responsiveTheme";

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

      <ScrollView contentContainerStyle={{ paddingBottom: handleSize.h(50) }}>
        <View style={{ marginHorizontal: handleSize.w(20) }}>
          
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

          {/* Balance */}
          <BalanceBox amount="£1,250.00" label="Available Balance" containerHeight={78} />

          {/* Recipient Gets */}
          <InputField
            renderRightInput={renderRightInput}
            placeholder="0.00"
            removeTitle={true}
            value={recipientGets}
            onChangeText={setRecipientGets}
            keyboardType={"numeric"}
            maxlen={10}
            margBtm={handleSize.h(15)}
          />

          {/* Bank Country Dropdown */}
          <InputField
            disabled={false}
            placeholder="Beneficiary Bank Country"
            value={beneficiaryBankCountry}
            enableDropdown={true}
            dropdownData={[
              { name: "Pak" },
              { name: "China" }
            ]}
            margBtm={handleSize.h(15)}
            isOpen={openDropdown === "country"}
            onToggleDropdown={() => toggleDropdown("country")}
            onDropdownSelect={(item: any) => setBeneficiaryBankCountry(item.name)}
          />

          {/* Recipient Type */}
          <InputField
            disabled={false}
            placeholder="Recipient Type"
            value={recipientType}
            enableDropdown={true}
            dropdownData={[
              { name: "Cash" }
            ]}
            margBtm={handleSize.h(15)}
            isOpen={openDropdown === "recepitantType"}
            onToggleDropdown={() => toggleDropdown("recepitantType")}
            onDropdownSelect={(item: any) => setRecipientType(item.name)}
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
