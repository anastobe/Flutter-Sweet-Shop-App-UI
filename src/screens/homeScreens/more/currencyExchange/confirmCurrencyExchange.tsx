// ConfirmCurrencyExchangeView.js
import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { InputDropDownStyle, MainContainer } from '../../../../components';
import Icon from 'react-native-vector-icons/Ionicons';
import { FONT_SIZES, FONTFAMILY, THEME } from '../../../../styles';
import { scale } from 'react-native-size-matters';
import { Picker } from '@react-native-picker/picker';
import InputField from '../../../../components/textInput';
import CustomButton from '../../../../components/customButton';
import useConfirmCurrencyExchangeViewModel from '../../../../viewModels/homeViewModel/more/useConfirmCurrencyExchangeViewModel';
import StatusBarManager from '../../../../components/statusBarManager';
import { handleSize } from '../../../../config/responsiveTheme';

const InfoRow = ({ icon, label, value }) => (
  <View style={styles.infoRow}>
    <View style={{ flexDirection: 'row' }}>
      <Icon name={icon} size={handleSize.f(20)} color={THEME.white} style={{ marginRight: handleSize.w(8) }} />
      <Text style={styles.label}>{label}</Text>
    </View>
    <View style={styles.valueBox}>
      <Text style={styles.value}>{value}</Text>
    </View>
  </View>
);

const ConfirmCurrencyExchange = ({...props}) => {
  const {
    youWillReceive,
    setYouWillReceive,
    purpose,
    setPurpose,
    pressBackArrow,
    onPressBtn,
    toggleDropdown,

    setOpenDropdown,
    openDropdown,

    openDropdownsty, 
    setOpenDropdownSty,
    fromAccount, 
    setFromAccount,
    toAccount, 
    settoAccount,
    getCurrencyAccArray, 
    openDropdownstyToAcc, 
    setOpenDropdownStyToAcc,
    amount,
    setamount,
    autoFocused,
    fxInfo,
    isPendinguseFXConversion

  } = useConfirmCurrencyExchangeViewModel(props);

  const renderCardDetails = () => (
    <View style={styles.summaryBox}>

    <InfoRow icon="card-outline" label="Exchange Rate" value={isPendinguseFXConversion ? "...loading" : fxInfo.rateText} />
    <InfoRow icon="add-outline" label="Fee" value={isPendinguseFXConversion ? "...loading" : fxInfo.fee} />
    <InfoRow icon="time-outline" label="Rate Valid For" value={isPendinguseFXConversion ? "...loading" :fxInfo.validFor} />

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
      <Text style={styles.inputNumberNum}>{isPendinguseFXConversion ? "...loading" : youWillReceive}</Text>
    </View>
  );

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
       placeholder="Enter amount"
       autoFocused={autoFocused}
       removeTitle={false}
       value={amount}
       onChangeText={setamount}
       keyboardType={"numeric"}
       maxlen={10}
       margBtm={handleSize.h(15)}
     />

      {renderCardDetails()}

      <InputField
        marginTp={20}
        editable={false}
        disabled={false}
        renderRightInput={renderRightInputTextOnly}
        autoCapital={'none'}
        blurOnSubmit={false}
        placeholder="You will receive"
        // value={youWillReceive}
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

      <ScrollView contentContainerStyle={{ paddingBottom: handleSize.h(10) }}>
        <View style={{ marginHorizontal: handleSize.w(20) }}>
          <Text style={styles.title}>Confirm and create payment order</Text>
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
  container: { flex: 1, backgroundColor: THEME.white },

  title: {
    fontSize: handleSize.f(FONT_SIZES.onefour),
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
    marginBottom: handleSize.h(15),
  },

  summaryBox: {
    borderRadius: handleSize.f(1),
    marginTop: handleSize.h(10),
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: handleSize.h(9),
  },
  label: {
    fontFamily: FONTFAMILY.Light,
    fontSize: handleSize.f(FONT_SIZES.onefour),
    color: THEME.white,
  },
  valueBox: {
    paddingHorizontal: handleSize.w(10),
    paddingVertical: handleSize.h(4),
    borderRadius: handleSize.f(10),
  },
  value: {
    fontFamily: FONTFAMILY.Medium,
    fontSize: handleSize.f(FONT_SIZES.onefour),
    color: THEME.white,
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
  },

  forgetTxt: {
    marginTop: handleSize.h(20),
    marginBottom: handleSize.h(50),
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
   fontSize: handleSize.f(FONT_SIZES.oneeight),
    fontFamily: FONTFAMILY.Medium,
    color: THEME.white,
  },

  inputNumbergbpcont: {
    backgroundColor: THEME.primary,
    marginLeft: handleSize.w(6),
    borderRadius: handleSize.f(6),
    padding: handleSize.f(3),
  },
  inputNumbergbp: {
    fontSize: handleSize.f(FONT_SIZES.onetwo),
    fontFamily: FONTFAMILY.Medium,
    color: THEME.textPrimary,
  },
});