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
import StatusBarManager from '../../../../components/statusBarManager';
import { handleSize } from '../../../../config/responsiveTheme';

const CurrencyExchange = ({...props}) => {
  const {
    sendFrom,
    setSendFrom,
    receiveIn,
    setReceiveIn,
    pressBackArrow,
    onPressBtn,
    toggleDropdown,
    openDropdown,
  } = useCurrencyExchangeViewModel(props);
  

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
        margTp={10}
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
      <StatusBarManager
        backgroundColor={THEME.darkSecondary} 
        barStyle="light-content" 
      />

      <View style={{ marginHorizontal: handleSize.w(20) }}>
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