import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { MainContainer, BottomSheet } from '../../../components';
import { FONT_SIZES, FONTFAMILY, METRICS, THEME } from '../../../styles';
import { Picker } from '@react-native-picker/picker';
import InputField from '../../../components/textInput';
import CustomButton from '../../../components/customButton';
import ContactAdressSheet from '../../../components/bottomSheet/contactAdressSheet';
import { scale } from 'react-native-size-matters';
import useContactAddressViewModel from '../../../viewModels/homeViewModel/more/useContactAddressViewModel';

const ContactAddress = () => {
  const vm = useContactAddressViewModel();

  function renderInputField() {
    return (
      <View>
        <View style={styles.pickerWrapper}>
          <Picker
            dropdownIconColor={THEME.white}
            selectedValue={vm.country}
            onValueChange={itemValue => vm.setCountry(itemValue)}
            style={styles.inputInnerPicker}
          >
            <Picker.Item label="Country" value="" color={THEME.textPrimary} />
            <Picker.Item label="Pakistan" value="Pakistan" color={THEME.textPrimary} />
            <Picker.Item label="Canada" value="Canada" color={THEME.textPrimary} />
            <Picker.Item label="Italy" value="Italy" color={THEME.textPrimary} />
            <Picker.Item label="Ireland" value="Ireland" color={THEME.textPrimary} />
          </Picker>
        </View>

        <View style={styles.pickerWrapper}>
          <Picker
            dropdownIconColor={THEME.white}
            selectedValue={vm.city}
            onValueChange={itemValue => vm.setCity(itemValue)}
            style={styles.inputInnerPicker}
          >
            <Picker.Item label="City" value="" color={THEME.textPrimary} />
            <Picker.Item label="Lahore" value="Lahore" color={THEME.textPrimary} />
            <Picker.Item label="Karachi" value="Karachi" color={THEME.textPrimary} />
            <Picker.Item label="Islamabad" value="Islamabad" color={THEME.textPrimary} />
          </Picker>
        </View>
      </View>
    );
  }

  function renderLimitType() {
    return (
      <View>
        <InputField
          customInpStyle={{ backgroundColor: THEME.whitergba }}
          marginTp={20}
          placeholder="Address"
          value={vm.address}
          onChangeText={vm.setAddress}
          margBtm={20}
        />
        <InputField
          customInpStyle={{ backgroundColor: THEME.whitergba }}
          marginTp={20}
          placeholder="Postal Code"
          value={vm.postalCode}
          onChangeText={vm.setPostalCode}
          keyboardType="numeric"
          margBtm={20}
        />
      </View>
    );
  }

  function renderBtn() {
    return (
      <CustomButton
        btnContSty={styles.forgetTxt}
        title="Update Contact"
        onPress={vm.onPressBtn}
      />
    );
  }

  return (
    <MainContainer
      showBackArrow
      pressBackArrow={vm.pressBackArrow}
      barStyle="dark-content"
      mainContainerStyle={styles.container}
    >
      <View style={{ marginHorizontal: 20 }}>
        <Text style={styles.title}>Contact & Address</Text>
        {renderInputField()}
        {renderLimitType()}
        {renderBtn()}

        <BottomSheet
          height={METRICS.halfScreen - 40}
          draggable={false}
          bottomSheetRef={vm.cardDetailRef}
          children={
            <ContactAdressSheet
              onPress={() => vm.cardDetailRef?.current?.close()}
              style={{ flex: 1, paddingHorizontal: 20 }}
              confirmPassword={vm.confirmPassword}
              setconfirmPassword={vm.setConfirmPassword}
              secure={vm.secure}
              setSecure={vm.setSecure}
              title="Confirm Your Password"
              subtitle="For your security, please enter your login password to proceed with updating your address."
            />
          }
        />
      </View>
    </MainContainer>
  );
};

export default ContactAddress;

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: THEME.white },
  title: {
    fontSize: FONT_SIZES.threetwo,
    fontFamily: FONTFAMILY.Light,
    color: THEME.primary,
    marginBottom: 20,
    marginTop: 10,
  },
  forgetTxt: { marginTop: 20, marginBottom: 50 },
  pickerWrapper: {
    borderWidth: 1,
    borderColor: THEME.white,
    borderRadius: 10,
    marginBottom: 15,
    backgroundColor: THEME.whitergba,
    height: scale(55),
  },
  inputInnerPicker: {
    fontFamily: FONTFAMILY.Medium,
    fontSize: FONT_SIZES.onefour,
    borderColor: THEME.white,
    borderWidth: 1,
    borderRadius: 16,
    color: THEME.white,
    height: scale(55),
    marginLeft: 10,
  },
});
