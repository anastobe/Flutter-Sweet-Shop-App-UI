// SetLimitsView.js
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { MainContainer, Modal } from '../../../components';
import { Picker } from '@react-native-picker/picker';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';
import InputField from '../../../components/textInput';
import CustomButton from '../../../components/customButton';
import { scale } from 'react-native-size-matters';
import { THEME, FONT_SIZES, FONTFAMILY } from '../../../styles';
import useSetLimitsViewModel from '../../../viewModels/homeViewModel/card/useSetLimitsViewModel';
import { CommonUtils } from '../../../utils';
import FreezeCardModal from '../../../components/Modal/FreezeCardModal ';
import { Images } from '../../../config';

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
    isPendingsetSpendLimit,
    modalVisible, 
    setModalVisible,
    SaveLimit
  } = useSetLimitsViewModel(props);

    const{ getCardsData, cardDetail } = props?.route?.params

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
                  { borderColor: limitType === type ? THEME.primary : THEME.white },
                ]}
              >
                {limitType === type && (
                  <Icon name="checkmark-outline" size={16} color={THEME.primary} />
                )}
              </View>
              <Text
                style={[
                  styles.radioLabel,
                  {
                    fontFamily:
                      limitType === type
                        ? FONTFAMILY.Regular
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
        margTp={10}
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

<View style={{ flexDirection: "row", flexWrap: "wrap", }}>
  <Text style={styles.limitDetail}>
    You’ve set a limit of {" "}
  </Text>

  <View style={{
    backgroundColor: THEME.primary,
    borderRadius: 6,
    paddingHorizontal: 6,
    paddingVertical: 2,
    alignSelf: "center"
  }}>
    <Text style={styles.boldText}>€{spendingLimit || '0'}/{limitType.toLowerCase()}</Text>
  </View>

  <Text style={styles.limitDetail}>
    {" "}for this card.
  </Text>
</View>

        {/* <Text style={styles.limitDetail}>
          You've set a limit of{' '}
          <View style={{ backgroundColor: THEME.primary, borderRadius: 6, paddingHorizontal: 3 }} >
            <Text style={styles.boldText}>
              €{spendingLimit || '0'}/{limitType.toLowerCase()}
            </Text>
          </View>
          
          {' '}
          for this card.
        </Text> */}
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
        loading={false}
        btnContSty={styles.forgetTxt}
        title="Save Limit"
        onPress={handleSaveLimit}
      />
    );
  }

         
  function renderPOPUP() {
    return(
        <FreezeCardModal
          style={{ flex: 1, paddingHorizontal: 20 }}
          backImg={Images.addCardGradient}
          visible={modalVisible}
          btnLoader={isPendingsetSpendLimit}
          onClose={() => setModalVisible(false)}
          onConfirm={SaveLimit}
          title="Set Spending Limit"
          body={`Sure, You want to set ${spendingLimit} spending limit of your ${cardDetail?.format} card number ${cardDetail?.pan}`}
          showSubBody={false}
          confirmText="Continue"
          downConfirmText={"Cancel"}
        />
    )
  }
    


  function renderModal() {
      return (
        <Modal
          isVisible={modalVisible}
          isKeyboardAvoidingView={true}
          children={renderPOPUP()}
          onClose={() => {
            console.log('close');
          }}
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
        <Text style={styles.title}>Set Spending Limit</Text>
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
          card_name: `${CommonUtils.capitalizeFirstLetter(item?.format)} (.... .... .... ${item?.pan})`,
          pan: item?.pan
        })} 
      />


        {renderLimitType()}
        {renderSpendingLimitInput()}
        {renderLimitInfo()}
        {renderSaveButton()}
      </View>
      {renderModal()}
    </MainContainer>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: THEME.white },
  title: {
    fontSize: FONT_SIZES.onesix,
    fontFamily: FONTFAMILY.SemiBold,
    color: THEME.white,
    marginBottom: 15,
    marginTop: 10,
  },
  subtitle: {
    fontSize: FONT_SIZES.onesix,
    fontFamily: FONTFAMILY.Regular,
    color: THEME.white,
    marginBottom: 21,
    lineHeight: 20
  },
  forgetTxt: { marginTop: 10, marginBottom: 20, backgroundColor: THEME.primary },
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
    height: 20,
    width: 20,
    borderRadius: 100,
    borderWidth: 1.5,
    marginRight: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  radioLabel: {
    fontSize: FONT_SIZES.onefour,
    color: THEME.white,
  },
  limitInfo: {
    marginTop: 0,
    paddingHorizontal: 12,
    borderRadius: 10,
    marginBottom: 20,
  },
  limitTitle: {
    fontSize: FONT_SIZES.onesix,
    fontFamily: FONTFAMILY.Medium,
    color: THEME.white,
  },
  limitDetail: {
    fontSize: FONT_SIZES.onefour,
    fontFamily: FONTFAMILY.Light,
    color: THEME.white,
    marginTop: 3,
  },
  boldText: {
    fontSize: FONT_SIZES.onefour,
    fontFamily: FONTFAMILY.Medium,
    color: THEME.textPrimary,
  },
  limitNote: {
    fontSize: FONT_SIZES.onetwo,
    fontFamily: FONTFAMILY.Regular,
    color: THEME.white,
    marginTop: 4,
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
