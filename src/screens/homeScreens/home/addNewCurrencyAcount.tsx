import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { MainContainer, Modal } from "../../../components";
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
    currency,
    setCurrency,
    pressBackArrow,
    handleAddCurrency,
    freezeModalProps,
    toggleDropdown,
    openDropdown
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
        <Text style={styles.title}>Add New Currency Account</Text>
        <Text style={styles.subtitle}>
          Select a Currency to create a new account in your wallet
        </Text>

        <InputField
          marginTp={handleSize.h(20)}
          autoCapital={"none"}
          blurOnSubmit={false}
          placeholder="Account Name"
          value={accountName}
          onChangeText={setAccountName}
          keyboardType={"default"}
          margBtm={handleSize.h(15)}
        />

        <InputField
          disabled={false}
          placeholder="Select Currency"
          value={currency}
          enableDropdown={true}
          dropdownData={[
            { name: "USD" },
            { name: "PKR" },
            { name: "EUR" },
            { name: "CNY" },
            { name: "JPY" },
            { name: "GBP" },
          ]}
          margBtm={handleSize.h(15)}
          isOpen={openDropdown === "currency"}
          onToggleDropdown={() => toggleDropdown("currency")}
          onDropdownSelect={(item: any) => setCurrency(item.name)}
        />

        <CustomButton
          btnContSty={styles.forgetTxt}
          title="Add Currency"
          onPress={handleAddCurrency}
        />

        <Modal
          isVisible={freezeModalProps.addCurrency.visible}
          isKeyboardAvoidingView={true}
          children={<BluryModal {...freezeModalProps.addCurrency} />}
          onClose={freezeModalProps.addCurrency.onClose}
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
