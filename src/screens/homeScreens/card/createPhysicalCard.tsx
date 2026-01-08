import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { BottomSheet, InputDropDownStyle, MainContainer } from '../../../components';
import { Images } from '../../../config';
import { FONT_SIZES, FONTFAMILY, METRICS, THEME } from '../../../styles';
import { scale } from 'react-native-size-matters';
import { Picker } from '@react-native-picker/picker';
import InputField from '../../../components/textInput';
import CustomButton from '../../../components/customButton';
import VerifyAddress from '../../../components/bottomSheet/verifyAddress';
import { useCreatePhysicalCardViewModel } from '../../../viewModels/homeViewModel/card/useCreatePhysicalCardViewModel';
import StatusBarManager from '../../../components/statusBarManager';
import { handleSize } from '../../../config/responsiveTheme';

const CreatePhysicalCard = () => {
  const {
    cardDetailRef,
    cardName,
    setcardName,
    fromAccount, 
    setFromAccount,
    // currency,
    // setCurrency,
    // linkedAccount,
    // setLinkedAccount,
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
    toggleDropdown,
    getCurrencyAccArray,
    loginUserData,
    user,
    pin, 
    setPin,
    allAccounts,
    openDropdownsty, 
    setOpenDropdownSty

  } = useCreatePhysicalCardViewModel();

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
        <Text style={styles.title}>Request a physical card</Text>

        <InputField
          marginTp={20}
          autoCapital={'none'}
          blurOnSubmit={false}
          placeholder="Card name"
          value={cardName}
          onChangeText={setcardName}
          keyboardType={'email-address'}
          margBtm={20}
        />

        {/* <InputField
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
          placeholder="Linked account"
          value={linkedAccount.name} 
          enableDropdown={true}
          dropdownData={allAccounts}
          margBtm={20}
          isOpen={openDropdown === 'linked'}
          onToggleDropdown={() => toggleDropdown('linked')}
          onDropdownSelect={(item) => setLinkedAccount({
              id: item?.id,
              name: item?.name,
              iso_code: item?.currency?.iso_code,
              num_code: "",
            })
          }
        /> */}

        
        <InputDropDownStyle
          title="Linked account"
          value={fromAccount}  // null = show input box
          // data={getCurrencyAccArray}
          data={getCurrencyAccArray}
          isOpen={openDropdownsty}
          onToggle={() =>{ setOpenDropdownSty(!openDropdownsty) }}
          onSelect={(item: any) =>{ 
            setFromAccount({     
              id: item?.account?.id,    
              available_balance: item?.available_balance,       
              currency_id: item?.currency?.id,
              name: item?.account?.name,
              iso_code: item?.currency?.iso_code
            })
          }}
        />
        

        <InputField
          margTp={0}
          autoCapital={'none'}
          blurOnSubmit={false}
          placeholder="Spending limit"
          value={spendingLimit}
          onChangeText={setSpendingLimit}
          keyboardType={'numeric'}
          margBtm={20}
             maxlen={10}
        />
 
          <InputField
            disabled={false} 
            placeholder="Card design (optional)"
            value={design.name} 
            enableDropdown={true}
            dropdownData={[
              { id: 1, name: "Metalic" },
              { id: 2,  name: "Plastic" }
            ]}
            margBtm={20}
            isOpen={openDropdown === 'design'}
            onToggleDropdown={() => toggleDropdown('design')}
            onDropdownSelect={(item:any )=> setdesign(item)}
          />

           <InputField
              margTp={0}
              margBtm={20}
              placeholder="PIN"
              value={pin}
              onChangeText={setPin}
              keyboardType="numeric"
              maxlen={10}
            />
          

        <CustomButton
          btnContSty={styles.forgetTxt}
          title="Next"
          loading={false}
          onPress={onPressBtn}
        />

        <BottomSheet
          height={500}
          maxHeightPercent={0.7}   // optional, override for screen
          draggable={false}
          openTime={500}
          closeDuration={500}
          bottomSheetRef={cardDetailRef}
          children={
            <VerifyAddress
              style={{ flex: 1, paddingHorizontal: handleSize.w(20) }}
              backImg={Images.addCardGradient}
              user={user}
              // value={loginUserData.address_line1 + " " + loginUserData.address_line2 + " " + loginUserData.address_line3}
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

export const styles = StyleSheet.create({
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
  },
  inputInnerPicker: {
    fontFamily: FONTFAMILY.Medium,
    fontSize: handleSize.f(FONT_SIZES.onefour),
    borderColor: THEME.gray,
    borderWidth: 1,
    borderRadius: handleSize.f(10),
    color: THEME.white,
    height: handleSize.h(56),
    marginLeft: handleSize.w(10),
    paddingHorizontal: handleSize.w(10),
    justifyContent: 'center',
  },
  inputFieldContainer: {
    marginBottom: handleSize.h(20),
  },
  bottomSheetStyle: {
    flex: 1,
    paddingHorizontal: handleSize.w(20),
  },
});