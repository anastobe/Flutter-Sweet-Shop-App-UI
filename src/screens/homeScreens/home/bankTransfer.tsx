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
  } = useBankTransferViewModel();

  const BalanceCard = ({ label = "Available Balance", amount = "£1,250.00" }) => (
    <View style={styles.containerAMOUNT}>
      <View style={styles.amountBox}>
        <Text style={styles.balanceAmountTxt}>{amount}</Text>
      </View>
      <Text style={styles.balanceTxt}>{label}</Text>
    </View>
  );

  const renderRightInput = () => (
    <View style={styles.renderRightInputContainer}>
      <Text style={styles.inputNumber}>0.00</Text>
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
      <ScrollView contentContainerStyle={{ paddingBottom: 100 }}>
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

          {BalanceCard({ label: "Available Balance", amount: "£1,250.00" })}

          {/* Input Field */}
          <InputField
            renderRightInput={renderRightInput}
            placeholder="Recipient Gets"
            value={recipientGets}
            onChangeText={setRecipientGets}
            keyboardType={"numeric"}
            margBtm={20}
          />

          {/* Pickers */}
          <View style={styles.pickerWrapper}>
            <Picker
              dropdownIconColor={THEME.white}
              selectedValue={beneficiaryBankCountry}
              onValueChange={(itemValue) => setBeneficiaryBankCountry(itemValue)}
              style={styles.inputInnerPicker}
            >
              <Picker.Item label="To Account" value="" color={THEME.textPrimary} />
              <Picker.Item label="account" value="account" color={THEME.textPrimary} />
              <Picker.Item label="cash" value="cash" color={THEME.textPrimary} />
            </Picker>
          </View>

          <View style={styles.pickerWrapper}>
            <Picker
              dropdownIconColor={THEME.white}
              selectedValue={recipientType}
              onValueChange={(itemValue) => setRecipientType(itemValue)}
              style={styles.inputInnerPicker}
            >
              <Picker.Item label="To Account" value="" color={THEME.textPrimary} />
              <Picker.Item label="account" value="account" color={THEME.textPrimary} />
              <Picker.Item label="cash" value="cash" color={THEME.textPrimary} />
            </Picker>
          </View>

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
    marginBottom: 10,
    marginTop: 10,
  },
  subtitle: {
    fontSize: FONT_SIZES.onesix,
    fontFamily: FONTFAMILY.Regular,
    color: THEME.white,
    marginBottom: 20,
  },
  pickerWrapper: {
    borderWidth: 1,
    borderColor: THEME.white,
    borderRadius: 16,
    marginBottom: 15,
  },
  inputInnerPicker: {
    fontFamily: FONTFAMILY.Medium,
    fontSize: FONT_SIZES.onefour,
    borderColor: THEME.gray,
    borderWidth: 1,
    borderRadius: 16,
    color: THEME.white,
    height: scale(60),
    marginLeft: 10,
  },
  containerAMOUNT: {
    backgroundColor: THEME.whitergba,
    padding: scale(8),
    width: "100%",
    alignSelf: "center",
    marginVertical: 15,
    borderRadius: scale(12),
    alignItems: "center",
    justifyContent: "center",
  },
  amountBox: {
    paddingHorizontal: scale(10),
    paddingVertical: scale(4),
    borderRadius: scale(6),
    marginTop: 5,
  },
  balanceTxt: {
    fontFamily: FONTFAMILY.Medium,
    fontSize: FONT_SIZES.onefour,
    color: THEME.white,
  },
  balanceAmountTxt: {
    fontFamily: FONTFAMILY.Medium,
    fontSize: FONT_SIZES.threetwo,
    color: THEME.white,
    padding: 1,
  },
  renderRightInputContainer: {
    height: scale(50),
    position: "absolute",
    right: 8,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  inputNumber: {
    fontSize: FONT_SIZES.onesix,
    fontFamily: FONTFAMILY.Medium,
    color: THEME.primary,
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
