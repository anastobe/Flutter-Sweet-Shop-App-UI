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
import StatusBarManager from '../../../../components/statusBarManager';

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
    toggleDropdown,
    openDropdown
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
      <Text style={styles.inputNumberNum}>696,906.41</Text>
    </View>
  );

  const renderInput = () => (
    <View>
      <InputField
        renderRightInput={renderRightInput}
        margTp={30}
        autoCapital={'none'}
        blurOnSubmit={false}
        placeholder="0.00"
        removeTitle={true}
        value={sendFrom}
        onChangeText={setSendFrom}
            keyboardType="numeric"
                    maxlen={10}
        margBtm={10}
      />

       <InputField
        disabled={false} 
        placeholder="To Currency"
        value={toCurrency} 
        enableDropdown={true}
        dropdownData={[
            { name: "USD" },
            { name: "PKR" },
            { name: "EUR" },
            { name: "CNY" },
            { name: "JPY" },
            { name: "GBP" },
          ]} 
        margBtm={10}
        isOpen={openDropdown === 'currency'} 
        onToggleDropdown={() => toggleDropdown('currency')}
        onDropdownSelect={(item:any )=> setToCurrency(item.name)}
      />

      {renderCardDetails()}

      <InputField
        marginTp={20}
        renderRightInput={renderRightInputTextOnly}
        autoCapital={'none'}
        blurOnSubmit={false}
        placeholder="You will Receive"
        value={youWillReceive}
        onChangeText={setYouWillReceive}
        keyboardType={'numeric'}
        margBtm={10}
      />

      <InputField
        disabled={false} 
        placeholder="Purpose"
        value={purpose} 
        enableDropdown={true}
        dropdownData={[
            { name: "Family Support" },
            { name: "Others" },
            { name: "Enjoy" },
          ]} 
        margBtm={10}
        isOpen={openDropdown === 'purpose'} 
        onToggleDropdown={() => toggleDropdown('purpose')}
        onDropdownSelect={(item:any )=> setPurpose(item.name)}
      />
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
      <StatusBarManager
        backgroundColor={THEME.darkSecondary} 
        barStyle="light-content" 
      />

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
    color: THEME.white,
    marginBottom: 15,
    marginTop: 10,
  },
  subtitle: {
    fontSize: FONT_SIZES.onesix,
    fontFamily: FONTFAMILY.Regular,
    color: THEME.white,
    lineHeight: 20
  },
  summaryBox: {
    borderRadius: 1,
    marginTop: 10,
    // padding: 10,
    // marginBottom: 6,
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    // backgroundColor: 'red',
    marginBottom: 9,
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
    color: THEME.white,
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
    height: 56,
    marginLeft: 10,
  },
  forgetTxt: { marginTop: 20, marginBottom: 50 },
  renderRightInputContainer: {
    height: 56,
    position: 'absolute',
    right: 20,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  inputNumber: {
    fontSize: FONT_SIZES.onefour,
    fontFamily: FONTFAMILY.Medium,
    color: THEME.white,
  },
  inputNumberNum:{
    fontSize: FONT_SIZES.oneeight,
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
});
