import React from 'react';
import { View, Text, StyleSheet, Alert } from 'react-native';
import { MainContainer, BottomSheet } from '../../../components';
import { FONT_SIZES, FONTFAMILY, THEME } from '../../../styles';
import InputField from '../../../components/textInput';
import CustomButton from '../../../components/customButton';
import ContactAdressSheet from '../../../components/bottomSheet/contactAdressSheet';
import useContactAddressViewModel from '../../../viewModels/homeViewModel/more/useContactAddressViewModel';
import { SHOW_CLIENT } from '../../../APICall/constants';
import StatusBarManager from '../../../components/statusBarManager';
import { handleSize } from '../../../config/responsiveTheme'; // responsive helper

const ContactAddress = () => {
  const vm = useContactAddressViewModel();

  

// currencyList
  const renderInputField = () => (
    <View>
      <InputField
        disabled={false} 
        autoFocused={vm?.country?.name ? true : false}
        placeholder="Select country"
        value={vm?.country?.name} 
        enableDropdown={true}
        dropdownData={vm.countryList} 
        margBtm={23}
        isOpen={vm.openDropdown === 'country'} 
        onToggleDropdown={() =>{ vm.toggleDropdown('country') }}
        onDropdownSelect={(item:any )=>{
          vm.setCountry({
            id: item?.id,
            name: item?.name
          })
          }}
      />

      <InputField
        autoFocused={vm.town ? true : false}
        marginTp={handleSize.h(20)}
        placeholder="Town"
        value={vm.town}
        onChangeText={vm.setown}
        margBtm={handleSize.h(20)}
      />

    </View>
  );

  const renderLimitType = () => (
    <View>
      <InputField
        autoFocused={vm.address ? true : false}
        marginTp={handleSize.h(20)}
        placeholder="Address"
        value={vm.address}
        onChangeText={vm.setAddress}
        margBtm={handleSize.h(20)}
      />
      <InputField
        autoFocused={vm.postalCode ? true : false}
        marginTp={handleSize.h(20)}
        placeholder="Postal code"
        value={vm.postalCode}
        onChangeText={vm.setPostalCode}
        keyboardType="numeric"
        margBtm={handleSize.h(20)}
      />
    </View>
  );

  const renderBtn = () => (
    <CustomButton
      btnContSty={styles.forgetTxt}
      title="Update contact"
      loading={vm?.isPending_UpdateContactAddress}
      onPress={vm.onPressBtn}
    />
  );

  return (
    <MainContainer
      showBackArrow
      pressBackArrow={vm.pressBackArrow}
      barStyle="dark-content"
      mainContainerStyle={styles.container}
    >
      <StatusBarManager
        backgroundColor={THEME.darkSecondary} 
        barStyle="light-content" 
      />

      <View style={{ marginHorizontal: handleSize.w(20) }}>
        <Text style={styles.title}>Contact & address</Text>
        {renderInputField()}
        {renderLimitType()}
        {renderBtn()}

        <BottomSheet
          height={handleSize.h(320)}              // responsive minimum height
          maxHeightPercent={0.5}                  // optional, override for screen
          draggable={false}
          bottomSheetRef={vm.cardDetailRef}
          children={
            <ContactAdressSheet
              onPress={() => vm.ApiCall()}
              style={{ flex: 1, paddingHorizontal: handleSize.w(20) }}
              confirmPassword={vm.confirmPassword}
              loading={vm.isPending_UpdateContactAddress}
              setconfirmPassword={vm.setConfirmPassword}
              secure={vm.secure}
              setSecure={vm.setSecure}
              title="Confirm your password"
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
    fontSize: handleSize.f(FONT_SIZES.onesix),
    fontFamily: FONTFAMILY.SemiBold,
    color: THEME.white,
    marginBottom: handleSize.h(30),
    marginTop: handleSize.h(10),
  },
  forgetTxt: { 
    marginTop: handleSize.h(20), 
    marginBottom: handleSize.h(50) 
  },
  pickerWrapper: {
    borderWidth: 1,
    borderColor: THEME.white,
    borderRadius: handleSize.f(10),
    marginBottom: handleSize.h(15),
    backgroundColor: THEME.whitergba,
    height: handleSize.h(56),
  },
  inputInnerPicker: {
    fontFamily: FONTFAMILY.Medium,
    fontSize: handleSize.f(FONT_SIZES.onefour),
    borderColor: THEME.white,
    borderWidth: 1,
    borderRadius: handleSize.f(16),
    color: THEME.white,
    height: handleSize.h(56),
    marginLeft: handleSize.w(10),
  },
});
