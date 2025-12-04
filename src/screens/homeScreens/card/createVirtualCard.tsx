// src/screens/Home/view/CreateVirtualCardView.js

import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Pressable,
} from 'react-native';
import { MainContainer } from '../../../components';
import Icon from 'react-native-vector-icons/Ionicons';
import { FONT_SIZES, FONTFAMILY, THEME } from '../../../styles';
import { scale } from 'react-native-size-matters';
import { Picker } from '@react-native-picker/picker';
import InputField from '../../../components/textInput';
import CustomButton from '../../../components/customButton';
import useCreateVirtualCardViewModel from '../../../viewModels/homeViewModel/card/useCreateVirtualCardViewModel';
import StatusBarManager from '../../../components/statusBarManager';

export default function CreateVirtualCardView() {
  const {
    cardName,
    setCardName,
    currency,
    setCurrency,
    linkedAccount,
    setLinkedAccount,
    limitType,
    setLimitType,
    spendingLimit,
    setSpendingLimit,
    pressBackArrow,
    onPressBtn,
    currencyList,
    accountTypeList,
    openDropdown, 
    toggleDropdown,
    getCurrencyAccArray,
    pin,
    setPin
  } = useCreateVirtualCardViewModel();

  function renderInputField() {
    return (
      <View>
        <InputField
          marginTp={20}
          placeholder="Card Name"
          value={cardName}
          onChangeText={setCardName}
          keyboardType="email-address"
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
            dropdownData={getCurrencyAccArray}
            margBtm={20}
            isOpen={openDropdown === 'linked'}  
            onToggleDropdown={() => toggleDropdown('linked')}
            onDropdownSelect={(item: any) => setLinkedAccount({
                id: JSON.stringify(item?.currency_id),
                name: item?.currency?.name,
                iso_code: item?.currency?.iso_code,
                num_code:  item?.currency?.num_code,
              })
            }
          />

      </View>
    );
  }

  function renderLimitType() {
    return (
      <View>
        <Text style={styles.label}>Limit Type</Text>
        <View style={styles.radioRow}>
          {['Daily', 'Weekly', 'Monthly'].map(type => (
            <TouchableOpacity
              key={type}
              onPress={() => setLimitType(type)}
              style={styles.radioOption}>
              <View style={[styles.radio,{ borderColor: limitType === type ? THEME.primary : THEME.white}]}>
                {limitType === type && (
                  <Icon name="checkmark-outline" size={18} color={THEME.primary} />
                )}
              </View>
              <Text
                style={[
                  styles.radioLabel,
                  {
                    fontFamily:
                      limitType === type ? FONTFAMILY.Medium : FONTFAMILY.Light,
                  },
                ]}>
                {type}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>
    );
  }

  function renderLimitInputAndButton() {
    return (
      <View>
        <InputField
          marginTp={20}
          placeholder="Spending Limit"
          value={spendingLimit}
          onChangeText={setSpendingLimit}
          keyboardType="numeric"
          maxlen={10}
        />

        <View style={styles.limitInfo}>
          <Text style={styles.limitTitle}>{limitType} Limit</Text>
          <Text style={styles.limitDetail}>
            You’ve set a limit of{' '}
            <Text style={styles.boldText}>
              €{spendingLimit || '0'}/{limitType.toLowerCase()}
            </Text>{' '}
            for this card.
          </Text>
          <Text style={styles.limitNote}>
            This means your card won’t allow spending above this amount within a
            calendar month.
          </Text>
        </View>

        <InputField
          marginTp={20}
          margBtm={20}
          placeholder="PIN"
          value={pin}
          onChangeText={setPin}
          keyboardType="numeric"
          maxlen={10}
        />


        <CustomButton
          title="Create Virtual Card"
          onPress={onPressBtn}
          btnContSty={styles.forgetTxt}
        />
      </View>
    );
  }

  return (
    <MainContainer
      showBackArrow
      pressBackArrow={pressBackArrow}
      isFlatList
      barStyle="dark-content"
      mainContainerStyle={styles.container}>
        
      <StatusBarManager
        backgroundColor={THEME.darkSecondary} 
        barStyle="light-content" 
      />

      <View style={{ marginHorizontal: 20 }}>
        <Text style={styles.title}>Create Virtual Card</Text>
        <Text style={styles.subtitle}>Enter Details of your virtual card</Text>
        {renderInputField()}
        {renderLimitType()}
        {renderLimitInputAndButton()}
      </View>
    </MainContainer>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: THEME.white },
  title: {
    fontSize: FONT_SIZES.onesix,
    fontFamily: FONTFAMILY.SemiBold,
    color: THEME.white,
    marginBottom: 10,
    marginTop: 10,
  },
  subtitle: {
    fontSize: FONT_SIZES.onesix,
    fontFamily: FONTFAMILY.Regular,
    color: THEME.white,
    lineHeight: 18,
    marginBottom: 30,
  },
  label: {
    fontSize: FONT_SIZES.onesix,
    fontFamily: FONTFAMILY.Medium,
    color: THEME.white,
  },
  radioRow: {
    flexDirection: 'row',
    marginVertical: 15,
    alignItems: 'center',
  },
  radioOption: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 20,
  },
  radio: {
    height: 24,
    width: 24,
    borderRadius: 100,
    borderWidth: 1,
    marginRight: 6,
    justifyContent: 'center',
    alignItems: 'center',

  },
  radioLabel: {
    fontSize: FONT_SIZES.onefour,
    color: THEME.white,
  },
  limitInfo: {
    padding: 15,
    borderRadius: 10,
    marginBottom: 0,
  },
  limitTitle: {
    fontSize: FONT_SIZES.onesix,
    fontFamily: FONTFAMILY.Medium,
    color: THEME.white,
  },
  limitDetail: {
    fontSize: FONT_SIZES.onesix,
    fontFamily: FONTFAMILY.Light,
    color: THEME.white,
    marginTop: 3,
  },
  boldText: {
    fontSize: FONT_SIZES.onesix,
    fontFamily: FONTFAMILY.Regular,
    color: THEME.textPrimary,
    backgroundColor: THEME.white,
  },
  limitNote: {
    fontSize: FONT_SIZES.onetwo,
    fontFamily: FONTFAMILY.Medium,
    color: THEME.white,
    marginTop: 5,
  },
  forgetTxt: { marginBottom: 50 },
  pickerWrapper: {
    borderWidth: 1,
    borderColor: THEME.white,
    borderRadius: 10,
    marginBottom: 10,
  },
  inputInnerPicker: {
    fontFamily: FONTFAMILY.Medium,
    fontSize: FONT_SIZES.onefour,
    color: THEME.white,
    height: 56,
    marginLeft: 10,
  },
});
