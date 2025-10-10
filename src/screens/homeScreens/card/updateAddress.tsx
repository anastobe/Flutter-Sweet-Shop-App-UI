import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { MainContainer } from '../../../components';
import InputField from '../../../components/textInput';
import CustomButton from '../../../components/customButton';
import { Picker } from '@react-native-picker/picker';
import { scale } from 'react-native-size-matters';
import { FONT_SIZES, FONTFAMILY, THEME } from '../../../styles';
import useUpdateAddressViewModel from '../../../viewModels/homeViewModel/card/useUpdateAddressViewModel';

export default function UpdateAddressView() {
  const {
    pressBackArrow,
    validateAndProceed,
    streetAddress,
    setStreetAddress,
    apartment,
    setApartment,
    city,
    setCity,
    postalAddress,
    setPostalAddress,
    country,
    setCountry,
  } = useUpdateAddressViewModel();

  function renderInputFields() {
    return (
      <View>
        <InputField
          marginTp={20}
          autoCapital={'none'}
          blurOnSubmit={false}
          placeholder="Street Address"
          value={streetAddress}
          onChangeText={setStreetAddress}
          margBtm={20}
        />

        <InputField
          marginTp={20}
          autoCapital={'none'}
          blurOnSubmit={false}
          placeholder="Apartment/Suite (Optional)"
          value={apartment}
          onChangeText={setApartment}
          margBtm={20}
        />

        <View style={styles.pickerWrapper}>
          <Picker
            dropdownIconColor={THEME.white}
            selectedValue={city}
            onValueChange={setCity}
            style={styles.inputInnerPicker}
          >
            <Picker.Item label="Select City" value="" color={THEME.textPrimary} />
            <Picker.Item label="City 2" value="city2" color={THEME.textPrimary} />
            <Picker.Item label="City 3" value="city3" color={THEME.textPrimary} />
          </Picker>
        </View>

        <InputField
          marginTp={20}
          autoCapital={'none'}
          blurOnSubmit={false}
          placeholder="Postal Code"
          value={postalAddress}
          onChangeText={setPostalAddress}
          keyboardType={'numeric'}
          margBtm={20}
        />

        <View style={styles.pickerWrapper}>
          <Picker
            dropdownIconColor={THEME.white}
            selectedValue={country}
            onValueChange={setCountry}
            style={styles.inputInnerPicker}
          >
            <Picker.Item label="Select Country" value="" color={THEME.textPrimary} />
            <Picker.Item label="Country 2" value="country2" color={THEME.textPrimary} />
            <Picker.Item label="Country 3" value="country3" color={THEME.textPrimary} />
          </Picker>
        </View>

        <CustomButton
          btnContSty={styles.forgetTxt}
          title="Update"
          onPress={validateAndProceed}
        />
      </View>
    );
  }

  return (
    <MainContainer
      showBackArrow={true}
      pressBackArrow={pressBackArrow}
      isFlatList={true}
      barStyle="dark-content"
      mainContainerStyle={styles.container}
    >
      <View style={{ marginHorizontal: 20 }}>
        <Text style={styles.title}>Update Delivery Address</Text>
        {renderInputFields()}
      </View>
    </MainContainer>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: THEME.white },
  title: {
    fontSize: FONT_SIZES.onesix,
    fontFamily: FONTFAMILY.SemiBold,
    color: THEME.primary,
    marginBottom: 30,
    marginTop: 10,
  },
  forgetTxt: { marginTop: 20, marginBottom: 50 },
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
