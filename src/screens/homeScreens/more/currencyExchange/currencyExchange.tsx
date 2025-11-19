// CurrencyExchangeView.js
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { MainContainer } from '../../../../components';
import { FONT_SIZES, FONTFAMILY, THEME } from '../../../../styles';
import { scale } from 'react-native-size-matters';
import { Picker } from '@react-native-picker/picker';
import InputField from '../../../../components/textInput';
import CustomButton from '../../../../components/customButton';
import useCurrencyExchangeViewModel from '../../../../viewModels/homeViewModel/more/useCurrencyExchangeViewModel';

const CurrencyExchange = () => {
  const {
    sendFrom,
    setSendFrom,
    receiveIn,
    setReceiveIn,
    pressBackArrow,
    onPressBtn,
    toggleDropdown,
    openDropdown
  } = useCurrencyExchangeViewModel();

  const renderRightInput = () => (
    <View style={styles.renderRightInputContainer}>
      <Text style={styles.inputNumber}>(Send From)</Text>
      <View style={styles.inputNumbergbpcont}>
        <Text style={styles.inputNumbergbp}>GBP</Text>
      </View>
    </View>
  );

  const renderInput = () => (
    <View>
      <InputField
        // customInpStyle={{ paddingRight: 100, backgroundColor: "red" }}
        renderRightInput={renderRightInput}
        margTp={64}
        autoCapital={'none'}
        blurOnSubmit={false}
        placeholder="0.00"
        removeTitle={true}
        value={sendFrom}
        onChangeText={setSendFrom}
        keyboardType={"numeric"}
        margBtm={20}
        maxlen={10}
      />

      <InputField
      disabled={false} 
      placeholder="Receive In"
      value={receiveIn} 
      enableDropdown={true}
      dropdownData={[
        { name: "USD" },
        { name: "PKR" },
        { name: "GBP" },
        { name: "USD" },
        { name: "PKR" },
        { name: "GBP" },
        { name: "USD" },
        { name: "PKR" },
        { name: "GBP" },
      ]}
      isOpen={openDropdown === 'currency'} 
      onToggleDropdown={() => toggleDropdown('currency')}
      onDropdownSelect={(item:any )=> setReceiveIn(item.name)}
    />

    </View>
  );

  const renderBtn = () => (
    <CustomButton
      btnContSty={styles.forgetTxt}
      title="Get Rate"
      loading={false}
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
      <View style={{ marginHorizontal: 20 }}>
        <Text style={styles.title}>Quick Currency Exchange</Text>
        <Text style={styles.subtitle}>
          Convert currency instantly and view real-time rates before confirming your payment.
        </Text>
        {renderInput()}
        {renderBtn()}
      </View>
    </MainContainer>
  );
};

export default CurrencyExchange;

const styles = StyleSheet.create({
  title: {
    fontSize: FONT_SIZES.onefour,
    fontFamily: FONTFAMILY.SemiBold,
    color: THEME.white,
    marginBottom: 10,
    marginTop: 10,
  },
  subtitle: {
    fontSize: FONT_SIZES.onesix,
    fontFamily: FONTFAMILY.Regular,
    color: THEME.white,
  },
  renderRightInputContainer: {
    height: scale(55),
    position: 'absolute',
    right: 20,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  inputNumber: {
    fontSize: FONT_SIZES.onesix,
    fontFamily: FONTFAMILY.Medium,
    color: THEME.white,
  },
  
  inputNumberNum:{
    fontSize: FONT_SIZES.twozero,
    fontFamily: FONTFAMILY.Medium,
    color: THEME.white,
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
  container: { flex: 1, backgroundColor: THEME.white },
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
  forgetTxt: { marginTop: 20, marginBottom: 50 },
});
