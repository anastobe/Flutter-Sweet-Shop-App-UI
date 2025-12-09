import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { MainContainer } from '../../../components';
import InputField from '../../../components/textInput';
import CustomButton from '../../../components/customButton';
import { Picker } from '@react-native-picker/picker';
import { scale } from 'react-native-size-matters';
import { FONT_SIZES, FONTFAMILY, THEME } from '../../../styles';
import useUpdateAddressViewModel from '../../../viewModels/homeViewModel/card/useUpdateAddressViewModel';
import StatusBarManager from '../../../components/statusBarManager';
import { handleSize } from '../../../config/responsiveTheme';

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
    openDropdown,
    toggleDropdown
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

      <InputField
        disabled={false} 
        placeholder="Select City"
        value={city} 
        enableDropdown={true}
        dropdownData={[
        { name: "City 1" },
        { name: "City 2" },
        ]}
        margBtm={15}
        isOpen={openDropdown === 'city'} 
        onToggleDropdown={() => toggleDropdown('city')}
        onDropdownSelect={(item:any )=> setCity(item.name)}
      />
       

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

      <InputField
        disabled={false} 
        placeholder="Select Country"
        value={country} 
        enableDropdown={true}
        dropdownData={[
        { name: "country 1" },
        { name: "country 2" },
        ]}
        margBtm={15}
        isOpen={openDropdown === 'country'} 
        onToggleDropdown={() => toggleDropdown('country')}
        onDropdownSelect={(item:any )=> setCountry(item.name)}
      />

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
      
      <StatusBarManager
        backgroundColor={THEME.darkSecondary} 
        barStyle="light-content" 
      />

      <View style={{ marginHorizontal:  handleSize.w(20), }}>
        <Text style={styles.title}>Update Delivery Address</Text>
        {renderInputFields()}
      </View>
    </MainContainer>
  );
}

export const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: THEME.white },

  title: {
    fontSize: handleSize.f(FONT_SIZES.onesix),
    fontFamily: FONTFAMILY.SemiBold,
    color: THEME.primary,
    marginBottom: handleSize.h(30),
    marginTop: handleSize.h(10),
  },

  forgetTxt: { 
    marginTop: handleSize.h(20), 
    marginBottom: handleSize.h(50),
  },

  pickerWrapper: {
    borderWidth: 1,
    borderColor: THEME.white,
    borderRadius: handleSize.w(16),
    marginBottom: handleSize.h(15),
  },

  inputInnerPicker: {
    fontFamily: FONTFAMILY.Medium,
    fontSize: handleSize.f(FONT_SIZES.onefour),
    borderColor: THEME.gray,
    borderWidth: 1,
    borderRadius: handleSize.w(16),
    color: THEME.white,
    height: handleSize.h(56),
    marginLeft: handleSize.w(10),
  },
});