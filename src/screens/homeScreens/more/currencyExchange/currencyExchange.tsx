// CurrencyExchangeView.js
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { InputDropDownStyle, MainContainer } from '../../../../components';
import { FONT_SIZES, FONTFAMILY, THEME } from '../../../../styles';
import { scale } from 'react-native-size-matters';
import { Picker } from '@react-native-picker/picker';
import InputField from '../../../../components/textInput';
import CustomButton from '../../../../components/customButton';
import useCurrencyExchangeViewModel from '../../../../viewModels/homeViewModel/more/useCurrencyExchangeViewModel';
import StatusBarManager from '../../../../components/statusBarManager';
import { handleSize } from '../../../../config/responsiveTheme';

const CurrencyExchange = ({ ...props }) => {
  const {
    isPending,
    pressBackArrow,
    setOpenDropdown,

    openDropdownsty, 
    setOpenDropdownSty,
    fromAccount, 
    setFromAccount,
    toAccount, 
    settoAccount,
    getCurrencyAccArray, 
    openDropdownstyToAcc, 
    setOpenDropdownStyToAcc,
    onPressBtn,
    amount,
    setamount

  } = useCurrencyExchangeViewModel(props);

  const renderInput = () => (
    <View>
      <InputDropDownStyle
        title="Send from"
        value={fromAccount} // null = show input box
        // data={getCurrencyAccArray}
        data={getCurrencyAccArray}
        isOpen={openDropdownsty}
        onToggle={() =>{ setOpenDropdownSty(!openDropdownsty), setOpenDropdownStyToAcc(false), setOpenDropdown(null) }}
        onSelect={item => {
          setFromAccount({
            id: item?.id,
            available_balance: item?.available_balance,
            currency_id: item?.currency_id,
            name: item?.account?.name,
            iso_code: item?.currency?.iso_code,
          });
        }}
      />

      {/* Recipient Type */}
      <InputDropDownStyle
        title="Receive in" 
        value={toAccount}  // null = show input box
        // data={getCurrencyAccArray}
        data={getCurrencyAccArray}
        isOpen={openDropdownstyToAcc}
        onToggle={() =>{ setOpenDropdownStyToAcc(!openDropdownstyToAcc), setOpenDropdownSty(false), setOpenDropdown(null) }}
        onSelect={(item) =>{ 
          settoAccount({     
          id: item?.id,    
          available_balance: item?.available_balance,       
          currency_id: item?.currency_id,
          name: item?.account?.name,
          iso_code: item?.currency?.iso_code
          })
        }}
      />

    <InputField
      // renderRightInput={renderRightInput}
      placeholder="Enter Amount"
      removeTitle={false}
      value={amount}
      onChangeText={setamount}
      keyboardType={"numeric"}
      maxlen={10}
      margBtm={handleSize.h(15)}
    />

    </View>
  );

  const renderBtn = () => (
    <CustomButton
      btnContSty={styles.forgetTxt}
      title="Get Rate"
      loading={isPending}
      onPress={onPressBtn}
    />
  );

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
        <Text style={styles.title}>Quick currency exchange</Text>
        <Text style={styles.subtitle}>
          Convert currency instantly and view real-time rates before confirming
          your payment.
        </Text>
        {renderInput()}
        {renderBtn()}
      </View>
    </MainContainer>
  );
};

export default CurrencyExchange;

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
    lineHeight: handleSize.h(20),
    marginBottom: handleSize.h(20),
  },
  renderRightInputContainer: {
    height: handleSize.h(56),
    position: 'absolute',
    right: handleSize.w(20),
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  inputNumber: {
    fontSize: handleSize.f(FONT_SIZES.onefour),
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
    padding: handleSize.h(3),
  },
  inputNumbergbp: {
    fontSize: handleSize.f(FONT_SIZES.onetwo),
    fontFamily: FONTFAMILY.Medium,
    color: THEME.textPrimary,
  },
  pickerWrapper: {
    borderWidth: handleSize.f(1),
    borderColor: THEME.white,
    borderRadius: handleSize.f(16),
    marginBottom: handleSize.h(15),
  },
  inputInnerPicker: {
    fontFamily: FONTFAMILY.Medium,
    fontSize: handleSize.f(FONT_SIZES.onefour),
    borderColor: THEME.gray,
    borderWidth: handleSize.f(1),
    borderRadius: handleSize.f(16),
    color: THEME.white,
    height: handleSize.h(56),
    marginLeft: handleSize.w(10),
  },
  forgetTxt: {
    marginTop: handleSize.h(20),
    marginBottom: handleSize.h(50),
  },
});
