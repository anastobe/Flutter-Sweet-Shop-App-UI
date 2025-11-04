import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { MainContainer, Modal } from "../../../components";
import InputField from "../../../components/textInput";
import CustomButton from "../../../components/customButton";
import { Picker } from "@react-native-picker/picker";
import { FONT_SIZES, FONTFAMILY, THEME } from "../../../styles";
import { scale } from "react-native-size-matters";
import { useAddNewCurrencyAccountViewModel } from "../../../viewModels/homeViewModel/home/useAddNewCurrencyAccountViewModel";
import FreezeCardModal from "../../../components/Modal/FreezeCardModal ";

const AddNewCurrencyAcount = () => {
  const {
    accountName,
    setAccountName,
    currency,
    setCurrency,
    pressBackArrow,
    handleAddCurrency,
    freezeModalProps,
  } = useAddNewCurrencyAccountViewModel();

  return (
    <MainContainer
      showBackArrow={true}
      pressBackArrow={pressBackArrow}
      isFlatList={true}
      barStyle="dark-content"
      mainContainerStyle={styles.container}
    >
      <View style={{ marginHorizontal: 20 }}>
        <Text style={styles.title}>Add New Currency Account</Text>
        <Text style={styles.subtitle}>
          Select a Currency to create a new account in your wallet
        </Text>

        <InputField
          marginTp={20}
          autoCapital={"none"}
          blurOnSubmit={false}
          placeholder="Account Name"
          value={accountName}
          onChangeText={setAccountName}
          keyboardType={"numeric"}
          margBtm={15}
        />

        <InputField
          disabled={false} 
          placeholder="Select Currency"
          value={currency} 
          enableDropdown={true}
          dropdownData={[
            { label: "USD" },
            { label: "PKR" },
            { label: "EUR" },
            { label: "CNY" },
            { label: "JPY" },
            { label: "GBP" },
          ]} 
          margBtm={15}
          onDropdownSelect={(item:any )=> setCurrency(item.label)}
        />

        <CustomButton
          btnContSty={styles.forgetTxt}
          title="Add Currency"
          onPress={handleAddCurrency}
        />

        {/* Add Currency Confirmation Modal */}
        <Modal isVisible={freezeModalProps.addCurrency.visible}>
          <FreezeCardModal {...freezeModalProps.addCurrency} />
        </Modal>

        {/* Request Submitted Modal */}
        <Modal isVisible={freezeModalProps.requestSubmitted.visible}>
          <FreezeCardModal {...freezeModalProps.requestSubmitted} />
        </Modal>
      </View>
    </MainContainer>
  );
};

export default AddNewCurrencyAcount;

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
    marginBottom: 30,
  },
  forgetTxt: { marginTop: 20, marginBottom: 20 },
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
    height: scale(55),
    marginLeft: 10,
  },
});
