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
import BluryModal from '../../../components/Modal/bluryModal';
import StatusBarManager from '../../../components/statusBarManager';
import { handleSize } from '../../../config/responsiveTheme';

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
                  <Icon name="checkmark-outline" size={14} color={THEME.primary} />
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
        autoFocused={true}
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
        // <FreezeCardModal
        //   style={{ flex: 1, paddingHorizontal: 20 }}
        //   backImg={Images.addCardGradient}
        //   visible={modalVisible}
        //   btnLoader={isPendingsetSpendLimit}
        //   onClose={() => setModalVisible(false)}
        //   onConfirm={SaveLimit}
        //   title="Set Spending Limit"
        //   body={`Sure, You want to set ${spendingLimit} spending limit of your ${cardDetail?.format} card number ${cardDetail?.pan}`}
        //   showSubBody={false}
        //   confirmText="Continue"
        //   downConfirmText={"Cancel"}
        // />

         <BluryModal
            style={{ flex: 1, paddingHorizontal: handleSize.w(20) }}
            onClose={() => setModalVisible(false)}
            btnLoader={isPendingsetSpendLimit}
            marginTopTitle={50}
            onConfirm={SaveLimit}
            title={"Set Spending Limit"}
            body={`Sure, You want to set ${spendingLimit} spending limit of your ${cardDetail?.format} card number ${cardDetail?.pan}`}
            iconName={""}
            confirmText={'Continue'}
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
      
      <StatusBarManager
        backgroundColor={THEME.darkSecondary} 
        barStyle="light-content" 
      />

      <View style={{ marginHorizontal: handleSize.w(20) }}>
        <Text style={styles.title}>Set Spending Limit</Text>
        <Text style={styles.subtitle}>
          Control how much can be spent from this card per day.
        </Text>

      <InputField
        autoFocused={true}
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

export const styles = StyleSheet.create({
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
    marginBottom: handleSize.h(21),
    lineHeight: handleSize.h(20),
  },

  forgetTxt: { 
    marginTop: handleSize.h(10), 
    marginBottom: handleSize.h(20), 
    backgroundColor: THEME.primary,
  },

  label: {
    fontSize: handleSize.f(FONT_SIZES.onesix),
    fontFamily: FONTFAMILY.Medium,
    color: THEME.white,
  },

  radioRow: {
    flexDirection: 'row',
    marginVertical: handleSize.h(15),
    alignItems: 'center',
  },

  radioOption: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: handleSize.w(20),
  },

  radio: {
    height: handleSize.w(20),
    width: handleSize.w(20),
    borderRadius: handleSize.w(10),
    borderWidth: 1.5,
    marginRight: handleSize.w(5),
    justifyContent: 'center',
    alignItems: 'center',
  },

  radioLabel: {
    fontSize: handleSize.f(FONT_SIZES.onefour),
    color: THEME.white,
  },

  limitInfo: {
    marginTop: 0,
    paddingHorizontal: handleSize.w(12),
    borderRadius: handleSize.w(10),
    marginBottom: handleSize.h(20),
  },

  limitTitle: {
    fontSize: handleSize.f(FONT_SIZES.onesix),
    fontFamily: FONTFAMILY.Medium,
    color: THEME.white,
  },

  limitDetail: {
    fontSize: handleSize.f(FONT_SIZES.onefour),
    fontFamily: FONTFAMILY.Light,
    color: THEME.white,
    marginTop: handleSize.h(3),
  },

  boldText: {
    fontSize: handleSize.f(FONT_SIZES.onefour),
    fontFamily: FONTFAMILY.Medium,
    color: THEME.textPrimary,
  },

  limitNote: {
    fontSize: handleSize.f(FONT_SIZES.onetwo),
    lineHeight: handleSize.h(18),
    fontFamily: FONTFAMILY.Regular,
    color: THEME.white,
    marginTop: handleSize.h(4),
  },

  pickerWrapper: {
    borderWidth: 1,
    borderColor: THEME.white,
    borderRadius: handleSize.w(16),
    marginBottom: handleSize.h(15),
  },

  inputInnerPicker: {
    fontFamily: FONTFAMILY.Medium,
    fontSize: handleSize.f(FONT_SIZES.onefour),
    borderColor: THEME.gray,
    borderWidth: 1,
    borderRadius: handleSize.w(16),
    color: THEME.white,
    height: handleSize.h(56),
    marginLeft: handleSize.w(10),
  },
});