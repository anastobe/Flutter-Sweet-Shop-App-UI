import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { MainContainer } from '../../../components';
import { Images } from '../../../config';
import Icon from 'react-native-vector-icons/Ionicons';
import { FONT_SIZES, FONTFAMILY, THEME } from '../../../styles';
import { useNavigation } from '@react-navigation/native';
import InputField from '../../../components/textInput';
import CustomButton from '../../../components/customButton';
import { scale } from 'react-native-size-matters';
import { Picker } from '@react-native-picker/picker';
import { createCard, useLogin } from '../../../queries/auth.query';
import { Toast } from '../../../utils';
import { HOME_ROUTES } from '../../../constants';

const CreateVirtualCard = () => {

    const navigation = useNavigation()

    const [cardName, setcardName] = useState('');
    const [currency, setcurrency] = useState('');
    const [linkedAccount, setLinkedAccount] = useState('');
    const [limitType, setLimitType] = useState('Weekly');
    const [spendingLimit, setSpendingLimit] = useState('');

    function pressBackArrow() {
        navigation.goBack()
    }

    function renderInputField() {
      return(
        <View>
                <InputField
          marginTp={20}
          autoCapital={'none'}
          blurOnSubmit={false} 
          placeholder="Card Name"
          value={cardName}
          onChangeText={setcardName}
          keyboardType={'email-address'}
          margBtm={20}
        />

    
      <View style={styles.pickerWrapper}>
        <Picker
                    dropdownIconColor={THEME.white}
          selectedValue={currency}
          onValueChange={itemValue => setcurrency(itemValue)}
          style={styles.inputInnerPicker}
        >
          <Picker.Item label="Currency" value="" color={THEME.textPrimary} />
          <Picker.Item label="PKR" value="main" color={THEME.textPrimary} />
          <Picker.Item label="EURO" value="savings" color={THEME.textPrimary} />
        </Picker>
      </View>
    
      <View style={styles.pickerWrapper}>
        <Picker
                    dropdownIconColor={THEME.white}
          selectedValue={linkedAccount}
          onValueChange={itemValue => setLinkedAccount(itemValue)}
          style={styles.inputInnerPicker}
        >
          <Picker.Item label="Linked Account" value="" color={THEME.textPrimary} />
          <Picker.Item label="Visa" value="visa" color={THEME.textPrimary} />
          <Picker.Item label="Savings" value="savings" color={THEME.textPrimary} />
        </Picker>
      </View>

        </View>
      )
    }

    function renderLimitType() {
      return(
        <View>
        <Text style={styles.label}>Limit Type</Text>
      <View style={styles.radioRow}>
        {['Daily', 'Weekly', 'Monthly'].map(type => (
          <TouchableOpacity
            key={type}
            onPress={() => setLimitType(type)}
            style={styles.radioOption}
          >
            <View style={[styles.radio,{ borderColor: limitType === type ? THEME.white : THEME.white }]} >
               {limitType === type && <Icon name="checkmark-outline" size={18} color={THEME.white} />}
            </View>
            <Text style={[styles.radioLabel,{ fontFamily: limitType === type ? FONTFAMILY.Medium : FONTFAMILY.Light  }]}>{type}</Text>
          </TouchableOpacity>
        ))}
      </View>
      </View>
      )
    }

    function renderlimitType() {
      return(
      <InputField
          marginTp={20}
          autoCapital={'none'}
          blurOnSubmit={false} 
          placeholder="Spending Limit"
          value={spendingLimit}
          onChangeText={setSpendingLimit}
          keyboardType={'numeric'}
          margBtm={20}
        />
      )}

    function renderlimitandBTN() {
      return(
        <View>
                 <View style={styles.limitInfo}>
        <Text style={styles.limitTitle}>{limitType} Limit</Text>
        <Text style={styles.limitDetail}>
          You've set a limit of <Text style={styles.boldText}> €{spendingLimit || '0'}/{limitType.toLowerCase()} </Text> for this card.
        </Text>
        <Text style={styles.limitNote}>
          This means your card won’t allow spending above this amount within a calendar month.
        </Text>
      </View>


      <CustomButton
        btnContSty={styles.forgetTxt}
        loading={false}
        title="Create Virtual Card"
        onPress={() => {
          onPressBtn()
        }}
      />
        </View>
      )
    }

    function onPressBtn() {


      if (cardName?.length == '') {
          Toast.showToast("Please Enter Name", '', 'error');
      }
      else if (currency?.length == ''){
          Toast.showToast("Please Select Currency", '', 'error');
      }
      else if (linkedAccount?.length == ''){
            Toast.showToast("Please Select Linked Account Type", '', 'error');
      }
      else if (limitType?.length == ''){
          Toast.showToast("Please Select Limit Type", '', 'error');
      }
      else if (spendingLimit?.length == ''){
            Toast.showToast("Please Enter Spending Limit", '', 'error');
      }
      else{

        let payload = {
          format: "virtual",
          card_name: cardName,
          spending_limits: spendingLimit,
          limit_type: limitType, //type options available for virtual only, by-default physical monthly.
          currency_type: currency,
          linked_account: linkedAccount,
          card_desgin: "steel" // requirment not clear 
        }    
      navigation.navigate(HOME_ROUTES.ConfirmCardRequest, { data: payload })
      }
    }


    return(
    <MainContainer showBackArrow={true} pressBackArrow={pressBackArrow} isFlatList={true} barStyle="dark-content"  mainContainerStyle={styles.container}>
    <View style={{ marginHorizontal: 20 }} >

    <Text style={styles.title}>Create Virtual Card</Text>
   <Text style={styles.subtitle}>Enter Details of your virtual card</Text>
    {renderInputField()}
    {renderLimitType()}
    {renderlimitType()}
    {renderlimitandBTN()}
     
   
    </View>
    </MainContainer>
  )
}

export default CreateVirtualCard;

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: THEME.white  },
  arrowCont:
  { width: 40, height: 40, justifyContent: "center", alignItems: "center", marginTop: 20 },
  text: { fontSize: 20 },
  title:
  {
    fontSize: FONT_SIZES.onesix,
    fontFamily: FONTFAMILY.SemiBold,
    color: THEME.primary,
    marginBottom: 10,
    marginTop:10
  },
  subtitle:
  {
    fontSize: FONT_SIZES.onesix,
    fontFamily: FONTFAMILY.Regular,
    color: THEME.white,
    marginBottom: 30
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
    justifyContent: "center",
    alignItems: "center"
  },
  radioSelected: {
    backgroundColor: '#d08dfc',
    borderColor: '#d08dfc',
  },
  radioLabel: {
    fontSize: FONT_SIZES.onefour,
    color: THEME.primary,
  },
    limitInfo: {
    // backgroundColor: THEME.textPrimary,
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
    marginTop: 3
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
        marginTop: 5
  },
  forgetTxt:
  { marginTop: 20, marginBottom: 50 },
  pickerWrapper: {
    borderWidth: 1,
    borderColor: THEME.white,
    borderRadius: 16,
    marginBottom: 15,
  },
  picker: {
    height: 50,
    width: '100%',
  },

    inputInnerPicker: {
    fontFamily: FONTFAMILY.Medium,
    fontSize: FONT_SIZES.onefour,
    borderColor: THEME.gray,
    borderWidth: 1,
    borderRadius: 16,
    // width: METRICS.width - 45,
    color: THEME.white,
    height: scale(60),
    marginLeft: 10,
  },

});
