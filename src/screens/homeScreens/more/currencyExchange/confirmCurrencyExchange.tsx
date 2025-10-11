// ConfirmCurrencyExchangeView.js
import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { MainContainer } from '../../../../components';
import Icon from 'react-native-vector-icons/Ionicons';
import { FONT_SIZES, FONTFAMILY, THEME } from '../../../../styles';
import { scale } from 'react-native-size-matters';
import { Picker } from '@react-native-picker/picker';
import InputField from '../../../../components/textInput';
import CustomButton from '../../../../components/customButton';
import useConfirmCurrencyExchangeViewModel from '../../../../viewModels/homeViewModel/more/useConfirmCurrencyExchangeViewModel';

const InfoRow = ({ icon, label, value }) => (
  <View style={styles.infoRow}>
    <View style={{ flexDirection: 'row' }}>
      <Icon name={icon} size={18} color={THEME.white} style={{ marginRight: 8 }} />
      <Text style={styles.label}>{label}</Text>
    </View>
    <View style={styles.valueBox}>
      <Text style={styles.value}>{value}</Text>
    </View>
  </View>
);

const ConfirmCurrencyExchange = () => {
  const {
    sendFrom,
    setSendFrom,
    toCurrency,
    setToCurrency,
    youWillReceive,
    setYouWillReceive,
    purpose,
    setPurpose,
    pressBackArrow,
    onPressBtn,
  } = useConfirmCurrencyExchangeViewModel();

  const renderCardDetails = () => (
    <View style={styles.summaryBox}>
      <InfoRow icon="card-outline" label="Exchange Rate" value="1 GBP = 1.14 PKR" />
      <InfoRow icon="add-outline" label="Fee" value="£2.00" />
      <InfoRow icon="time-outline" label="Rate Valid For" value="2:00 min countdown" />
    </View>
  );

  const renderRightInput = () => (
    <View style={styles.renderRightInputContainer}>
      <Text style={styles.inputNumber}>(Send From)</Text>
      <View style={styles.inputNumbergbpcont}>
        <Text style={styles.inputNumbergbp}>GBP</Text>
      </View>
    </View>
  );

  const renderRightInputTextOnly = () => (
    <View style={styles.renderRightInputContainer}>
      <Text style={styles.inputNumber}>696,906.41</Text>
    </View>
  );

  const renderInput = () => (
    <View>
      <InputField
        renderRightInput={renderRightInput}
        margTp={20}
        autoCapital={'none'}
        blurOnSubmit={false}
        placeholder="0.00"
        value={sendFrom}
        onChangeText={setSendFrom}
        keyboardType={'default'}
        margBtm={10}
      />

      <View style={styles.pickerWrapper}>
        <Picker
          dropdownIconColor={THEME.white}
          selectedValue={toCurrency}
          onValueChange={(itemValue) => setToCurrency(itemValue)}
          style={styles.inputInnerPicker}
        >
          <Picker.Item label="To Currency (PKR)" value="" color={THEME.textPrimary} />
          <Picker.Item label="Account" value="account" color={THEME.textPrimary} />
          <Picker.Item label="Cash" value="cash" color={THEME.textPrimary} />
        </Picker>
      </View>

      {renderCardDetails()}

      <InputField
        marginTp={20}
        renderRightInput={renderRightInputTextOnly}
        autoCapital={'none'}
        blurOnSubmit={false}
        placeholder="You will Receive"
        value={youWillReceive}
        onChangeText={setYouWillReceive}
        keyboardType={'default'}
        margBtm={10}
      />

      <View style={styles.pickerWrapper}>
        <Picker
          dropdownIconColor={THEME.white}
          selectedValue={purpose}
          onValueChange={(itemValue) => setPurpose(itemValue)}
          style={styles.inputInnerPicker}
        >
          <Picker.Item label="Purpose" value="" color={THEME.textPrimary} />
          <Picker.Item label="Family Support" value="Family Support" color={THEME.textPrimary} />
          <Picker.Item label="Others" value="others" color={THEME.textPrimary} />
        </Picker>
      </View>
    </View>
  );

  const renderBtn = () => (
    <CustomButton
      btnContSty={styles.forgetTxt}
      title="Create Order"
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
      <ScrollView contentContainerStyle={{ paddingBottom: 100 }}>
        <View style={{ marginHorizontal: 20 }}>
          <Text style={styles.title}>Confirm and Create Payment Order</Text>
          <Text style={styles.subtitle}>
            Lock in your rate and enter payment details before proceeding.
          </Text>
          {renderInput()}
          {renderBtn()}
        </View>
      </ScrollView>
    </MainContainer>
  );
};

export default ConfirmCurrencyExchange;

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
  summaryBox: {
    borderRadius: 1,
    padding: 10,
    marginBottom: 10,
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  label: {
    fontFamily: FONTFAMILY.Light,
    fontSize: FONT_SIZES.onefour,
    color: THEME.white,
  },
  valueBox: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 10,
  },
  value: {
    fontFamily: FONTFAMILY.Medium,
    fontSize: FONT_SIZES.onefour,
    color: THEME.primary,
  },
  container: { flex: 1, backgroundColor: THEME.white },
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
  forgetTxt: { marginTop: 20, marginBottom: 50 },
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
});
