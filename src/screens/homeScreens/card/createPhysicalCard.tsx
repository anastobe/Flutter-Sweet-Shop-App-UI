import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { BottomSheet, MainContainer } from '../../../components';
import { Images } from '../../../config';
import { FONT_SIZES, FONTFAMILY, METRICS, THEME } from '../../../styles';
import { scale } from 'react-native-size-matters';
import { Picker } from '@react-native-picker/picker';
import InputField from '../../../components/textInput';
import CustomButton from '../../../components/customButton';
import VerifyAddress from '../../../components/bottomSheet/verifyAddress';
import { useCreatePhysicalCardViewModel } from '../../../viewModels/homeViewModel/card/useCreatePhysicalCardViewModel';

const CreatePhysicalCard = () => {
  const {
    cardDetailRef,
    cardName,
    setcardName,
    currency,
    setCurrency,
    linkedAccount,
    setLinkedAccount,
    spendingLimit,
    setSpendingLimit,
    pressBackArrow,
    onPressBtn,
    yesConfirm,
    updateLocation,
    countryList,
    currencyList,
    accountTypeList,
    design, 
    setdesign,
    openDropdown, 
    toggleDropdown
  } = useCreatePhysicalCardViewModel();

  return (
    <MainContainer
      showBackArrow={true}
      pressBackArrow={pressBackArrow}
      isFlatList={true}
      barStyle="dark-content"
      mainContainerStyle={styles.container}
    >
      <View style={{ marginHorizontal: 20 }}>
        <Text style={styles.title}>Request a Physical Card</Text>

        <InputField
          marginTp={20}
          autoCapital={'none'}
          blurOnSubmit={false}
          placeholder="Card Name"
          value={cardName}
          onChangeText={setcardName}
          keyboardType={'email-address'}
          margBtm={20}
        />

        <InputField
          disabled={false} 
          placeholder="Currency"
          value={currency.iso_code} 
          enableDropdown={true}
          dropdownData={currencyList}
          margBtm={20}
          isOpen={openDropdown === 'currency'}
          onToggleDropdown={() => toggleDropdown('currency')}
          onDropdownSelect={(item) => setCurrency(item)}
          />
      
        <InputField
          disabled={false} 
          placeholder="Linked Account"
          value={linkedAccount.name} 
          enableDropdown={true}
          dropdownData={accountTypeList}
          margBtm={20}
          isOpen={openDropdown === 'linked'}
          onToggleDropdown={() => toggleDropdown('linked')}
          onDropdownSelect={(item) => setLinkedAccount(item)}
        />

        <InputField
          marginTp={20}
          autoCapital={'none'}
          blurOnSubmit={false}
          placeholder="Spending Limit / Month"
          value={spendingLimit}
          onChangeText={setSpendingLimit}
          keyboardType={'numeric'}
          margBtm={20}
             maxlen={10}
        />
 
          <InputField
            disabled={false} 
            placeholder="Card Design (Optional)"
            value={design.name} 
            enableDropdown={true}
            dropdownData={[
              { id: 1, name: "Option 1" },
              { id: 2,  name: "Option 2" },
              { id: 3, name: "Option 3" },
              { id: 4,  name: "Option 4" },
              { id: 5, name: "Option 5" },
              { id: 6,  name: "Option 6" }
            ]}
            margBtm={20}
            isOpen={openDropdown === 'design'}
            onToggleDropdown={() => toggleDropdown('design')}
            onDropdownSelect={(item:any )=> setdesign(item)}
          />

        <CustomButton
          btnContSty={styles.forgetTxt}
          title="Next"
          loading={false}
          onPress={onPressBtn}
        />

        <BottomSheet
          height={METRICS.height / 1.35}
          draggable={false}
          openTime={500}
          closeDuration={500}
          bottomSheetRef={cardDetailRef}
          children={
            <VerifyAddress
              style={{ flex: 1, paddingHorizontal: 20 }}
              backImg={Images.addCardGradient}
              onPress1={yesConfirm}
              onPress2={updateLocation}
            />
          }
        />
      </View>
    </MainContainer>
  );
}

export default CreatePhysicalCard

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
    height: scale(55),
    marginLeft: 10,
  },
});
