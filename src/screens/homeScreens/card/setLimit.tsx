// SetLimitsView.js
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { MainContainer } from '../../../components';
import { Picker } from '@react-native-picker/picker';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';
import InputField from '../../../components/textInput';
import CustomButton from '../../../components/customButton';
import { scale } from 'react-native-size-matters';
import { THEME, FONT_SIZES, FONTFAMILY } from '../../../styles';
import useSetLimitsViewModel from '../../../viewModels/homeViewModel/card/useSetLimitsViewModel';
import { CommonUtils } from '../../../utils';

export default function SetLimits({...props}) {
  const navigation = useNavigation();
  const {
    limitType,
    setLimitType,
    selectedCards,
    setselectedCards,
    spendingLimit,
    setSpendingLimit,
    pressBackArrow,
    handleSaveLimit,
    toggleDropdown,
    openDropdown, 
    setOpenDropdown,
    isPendingsetSpendLimit
  } = useSetLimitsViewModel(props);

    const{ getCardsData } = props?.route?.params

  function renderLimitType() {
    return (
      <View>
        <Text style={styles.label}>Limit Type</Text>
        <View style={styles.radioRow}>
          {['Daily', 'Weekly', 'Monthly'].map((type) => (
            <TouchableOpacity
              key={type}
              onPress={() => setLimitType(type)}
              style={styles.radioOption}
            >
              <View
                style={[
                  styles.radio,
                  { borderColor: limitType === type ? THEME.white : THEME.white },
                ]}
              >
                {limitType === type && (
                  <Icon name="checkmark-outline" size={18} color={THEME.white} />
                )}
              </View>
              <Text
                style={[
                  styles.radioLabel,
                  {
                    fontFamily:
                      limitType === type
                        ? FONTFAMILY.Medium
                        : FONTFAMILY.Light,
                  },
                ]}
              >
                {type}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>
    );
  }

  function renderSpendingLimitInput() {
    return (
      <InputField
        marginTp={20}
        autoCapital={'none'}
        blurOnSubmit={false}
        placeholder="Spending Limit"
        value={spendingLimit}
        onChangeText={setSpendingLimit}
        keyboardType={'numeric'}
        margBtm={20}
        maxlen={10}
      />
    );
  }

  function renderLimitInfo() {
    return (
      <View style={styles.limitInfo}>
        <Text style={styles.limitTitle}>{limitType} Limit</Text>
        <Text style={styles.limitDetail}>
          You've set a limit of{' '}
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
    );
  }

  function renderSaveButton() {
    return (
      <CustomButton
        loading={isPendingsetSpendLimit}
        btnContSty={styles.forgetTxt}
        title="Save Limit"
        onPress={handleSaveLimit}
      />
    );
  }

  return (
    <MainContainer
      showBackArrow={true}
      pressBackArrow={pressBackArrow}
      isFlatList={true}
      barStyle="dark-content"
      mainContainerStyle={styles.container}
    >
      <View style={{ marginHorizontal: 20 }}>
        <Text style={styles.title}>Set Daily Spending Limit</Text>
        <Text style={styles.subtitle}>
          Control how much can be spent from this card per day.
        </Text>

      <InputField
        disabled={false} 
        placeholder="Select Card (DUMMY)"
        value={selectedCards?.card_name} 
        enableDropdown={true}
        // dropdownData={[
        // { name: "Business Visa (•••• 1234)--DUMMY" },
        // { name: "Visa Card (•••• 4232)--DUMMY" },
        // ]}
        dropdownData={getCardsData?.results?.values} 
        margBtm={15}
        isOpen={openDropdown === 'select_card'}
        onToggleDropdown={() => toggleDropdown('select_card')}
        onDropdownSelect={(item) => setselectedCards({
          card_id: item.card_id,
          card_name: `${CommonUtils.capitalizeFirstLetter(item?.format)} (...${item?.pan})`,
          pan: item?.pan
        })} 
      />


        {renderLimitType()}
        {renderSpendingLimitInput()}
        {renderLimitInfo()}
        {renderSaveButton()}
      </View>
    </MainContainer>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: THEME.white },
  title: {
    fontSize: FONT_SIZES.onesix,
    fontFamily: FONTFAMILY.SemiBold,
    color: THEME.primary,
    marginBottom: 10,
    marginTop: 10,
  },
  subtitle: {
    fontSize: FONT_SIZES.onesix,
    fontFamily: FONTFAMILY.Regular,
    color: THEME.white,
    marginBottom: 30,
  },
  forgetTxt: { marginTop: 20, marginBottom: 20, backgroundColor: THEME.primary },
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
    color: THEME.primary,
  },
  limitInfo: {
    padding: 15,
    borderRadius: 10,
    marginBottom: 20,
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
});
