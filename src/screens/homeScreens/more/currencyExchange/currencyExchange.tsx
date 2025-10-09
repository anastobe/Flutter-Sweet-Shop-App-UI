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
  } = useCurrencyExchangeViewModel();

  const renderRightInput = () => (
    <View style={styles.renderRightInputContainer}>
      <Text style={styles.inputNumber}>1000.00</Text>
      <View style={styles.inputNumbergbpcont}>
        <Text style={styles.inputNumbergbp}>GBP</Text>
      </View>
    </View>
  );

  const renderInput = () => (
    <View>
      <InputField
        renderRightInput={renderRightInput}
        margTp={50}
        autoCapital={'none'}
        blurOnSubmit={false}
        placeholder="Send From"
        value={sendFrom}
        onChangeText={setSendFrom}
        keyboardType={'default'}
        margBtm={20}
      />

      <View style={styles.pickerWrapper}>
        <Picker
          dropdownIconColor={THEME.white}
          selectedValue={receiveIn}
          onValueChange={(itemValue) => setReceiveIn(itemValue)}
          style={styles.inputInnerPicker}
        >
          <Picker.Item label="Receive In" value="" color={THEME.textPrimary} />
          <Picker.Item label="Account" value="account" color={THEME.textPrimary} />
          <Picker.Item label="Cash" value="cash" color={THEME.textPrimary} />
        </Picker>
      </View>
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
    color: THEME.primary,
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
    right: 8,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  inputNumber: {
    fontSize: FONT_SIZES.onesix,
    fontFamily: FONTFAMILY.Medium,
    color: THEME.primary,
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
    height: scale(60),
    marginLeft: 10,
  },
  forgetTxt: { marginTop: 20, marginBottom: 50 },
});
