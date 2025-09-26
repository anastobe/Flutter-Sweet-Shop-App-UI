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

    
      const {mutate: createCardFunc, isPending} = createCard({
        callback: (response: any) => {
          navigation.navigate(HOME_ROUTES.ConfirmCardRequest)      
        },
      });


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
          <Picker.Item label="Currency" value="" color={THEME.white} />
          <Picker.Item label="PKR" value="main" color={THEME.white} />
          <Picker.Item label="EURO" value="savings" color={THEME.white} />
        </Picker>
      </View>
    
      <View style={styles.pickerWrapper}>
        <Picker
                    dropdownIconColor={THEME.white}
          selectedValue={linkedAccount}
          onValueChange={itemValue => setLinkedAccount(itemValue)}
          style={styles.inputInnerPicker}
        >
          <Picker.Item label="Linked Account" value="" color={THEME.white} />
          <Picker.Item label="Visa" value="visa" color={THEME.white} />
          <Picker.Item label="Savings" value="savings" color={THEME.white} />
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
            <View style={[styles.radio,{ borderColor: limitType === type ? THEME.prinkishBlue : THEME.gray }]} >
               {limitType === type && <Icon name="checkmark-outline" size={18} color={THEME.prinkishBlue} />}
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
        loading={isPending}
        title="Create Virtual Card"
        onPress={() => {
          onPressBtn()
        }}
      />
        </View>
      )
    }

    function onPressBtn() {
              //  navigation.navigate(HOME_ROUTES.ConfirmCardRequest)     
              //  return

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
        createCardFunc(payload)   
      }
    }


    return(
    <MainContainer showBackArrow={true} pressBackArrow={pressBackArrow} isFlatList={true} barStyle="dark-content"  mainContainerStyle={styles.container}>
    <View style={{ marginHorizontal: 20 }} >

    <Text style={styles.title}>Create Virtual Card</Text>

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
    fontSize: FONT_SIZES.threetwo,
    fontFamily: FONTFAMILY.Light,
    color: THEME.primary,
    marginBottom: 20,
    marginTop:10
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
    borderWidth: 2,
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
    backgroundColor: THEME.textPrimary,
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
    fontFamily: FONTFAMILY.SemiBold,
    color: THEME.white,
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
    borderColor: THEME.gray,
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
