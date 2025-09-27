import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, Image, ScrollView } from 'react-native';
import { InputDropDownStyle, MainContainer } from '../../../components';
import { useNavigation } from '@react-navigation/native';
import { FONT_SIZES, FONTFAMILY, THEME } from '../../../styles';
import { BENEFICIARY_MANAGEMENT_DATA, PAYMENT_OPTION } from '../../../utils/data';
import { TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { HOME_ROUTES } from '../../../constants';
import { Picker } from '@react-native-picker/picker';
import { scale } from 'react-native-size-matters';
import { Images } from '../../../config';
import InputField from '../../../components/textInput';
import CustomButton from '../../../components/customButton';

const  InfoRow = ({ icon, label, value }:{ icon:any, label:any, value:any }) => (
  <View style={styles.infoRow}>
    <View style={{flexDirection: "row" }} >
        <Icon name={icon} size={18} color={THEME.white} style={{ marginRight: 8 }} />
        <Text style={styles.label}>{label}</Text>
    </View>
    <View style={styles.valueBox}>
      <Text style={styles.value}>{value}</Text>
    </View>
  </View>
);

const BankTansfer = () => {

  const navigation = useNavigation()
  const [RecipientGets, setRecipientGets] = useState('')
  const [BeneficiaryBankCountry, setBeneficiaryBankCountry] = useState()
  const [RecipientType, setRecipientType] = useState()
  const [fronacc, setfronacc] = useState({
    label: 'Clearbank Account',
    currency: 'GBP',
    flag: Images.account // Add your flag image here
  });

    function pressBackArrow() {
        navigation.goBack()
    }


    const BalanceCard = ({ label = "Available Balance", amount = "£1,250.00" }) => {
  return (
    <View style={styles.containerAMOUNT}>
      <View style={styles.amountBox}>
        <Text style={styles.balanceAmountTxt}>{amount}</Text>
      </View>
      <Text style={styles.balanceTxt}>{label}</Text>
    </View>
  );
};

        function renderRightInput() {
          return(
            <View
              style={styles.renderRightInputContainer}
            >
                <Text style={styles.inputNumber}>0.00</Text>
                <View style={styles.inputNumbergbpcont} >
                  <Text style={styles.inputNumbergbp}>GBP</Text>
                </View>
            </View>
          )
        }
    function renderInput() {
        return(
         <View>
            
      <InputDropDownStyle
        title={"From Account"}
        label={fronacc.label}
        currency={fronacc.currency}
        flag={fronacc.flag}
        onPress={handlePress}
      />

      {BalanceCard("Available Balance","£1,250.00")}

        <InputField
          renderRightInput={renderRightInput}
          autoCapital={'none'}
          blurOnSubmit={false} 
          placeholder="Recipient Gets"
          value={RecipientGets}
          onChangeText={setRecipientGets}
          keyboardType={'numeric'}
          margBtm={20}
      />

        <View style={styles.pickerWrapper}>
          <Picker
                      dropdownIconColor={THEME.white}
            selectedValue={BeneficiaryBankCountry}
            onValueChange={itemValue => setBeneficiaryBankCountry(itemValue)}
            style={styles.inputInnerPicker}
          >
            <Picker.Item label="To Account" value="" color={THEME.textPrimary} />
            <Picker.Item label="account" value="account" color={THEME.textPrimary} />
            <Picker.Item label="cash" value="cash" color={THEME.textPrimary} />
          </Picker>
        </View>

        <View style={styles.pickerWrapper}>
            <Picker
                        dropdownIconColor={THEME.white}
            selectedValue={RecipientType}
            onValueChange={itemValue => setRecipientType(itemValue)}
            style={styles.inputInnerPicker}
            >
            <Picker.Item label="To Account" value="" color={THEME.textPrimary} />
            <Picker.Item label="account" value="account" color={THEME.textPrimary} />
            <Picker.Item label="cash" value="cash" color={THEME.textPrimary} />
            </Picker>
        </View>

        </View>
        )
    } 

    function renderBTN() {
      return(
            <CustomButton
                btnContSty={styles.forgetTxt}
                loading={false}
                title="Transfer Payment"
                onPress={() => {
                console.log("renderBTN");
                }}
            />
      )
    }

  const handlePress = () => {

  };

   return(
    <MainContainer showBackArrow={true} pressBackArrow={pressBackArrow} isFlatList={true} barStyle="dark-content"  mainContainerStyle={styles.container}>
    <ScrollView contentContainerStyle={{paddingBottom: 100 }} >
      <View style={{ marginHorizontal: 20 }} >
        <Text style={styles.title}>Bank Transfer</Text>
        <Text  style={styles.subtitle}>Make local or international bank transfers.</Text>


        {renderInput()}
        {renderBTN()}

      </View>
    </ScrollView>
    </MainContainer>
  )
}

export default BankTansfer;

const styles = StyleSheet.create({
  title:
  {
    fontSize: FONT_SIZES.onesix,
    fontFamily: FONTFAMILY.SemiBold,
    color: THEME.white,
    marginBottom: 10,
    marginTop:10
  },
    subtitle:
  {
    fontSize: FONT_SIZES.onesix,
    fontFamily: FONTFAMILY.Regular,
    color: THEME.white,
    marginBottom: 20,
  },
  container: { flex: 1, backgroundColor: THEME.white  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: "space-between",
    alignItems: 'center',
    marginBottom: 10,
  },
  label: {
    fontFamily: FONTFAMILY.Light,
    fontSize: FONT_SIZES.onefour,
    color: THEME.white,
  },
  valueBox: {
    backgroundColor: THEME.lightGrey,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 8,
  },
  value: {
    fontFamily: FONTFAMILY.Medium,
    fontSize: FONT_SIZES.onefour,
    color: THEME.primary,
  },
  summaryBox: {
    backgroundColor: THEME.textPrimary,
    borderRadius: 10,
    padding: 10,
    marginBottom: 10,
    
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
      // width: METRICS.width - 45,
      color: THEME.white,
      height: scale(60),
      marginLeft: 10,
    },

 containerbelw: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: "space-between",
    borderWidth: 1,
    borderColor: THEME.gray,
    borderRadius: 16,
    paddingHorizontal: 10,
    height: scale(60),
    backgroundColor: THEME.white,
  },
  flag: {
    width: scale(28),
    height: scale(28),
    borderRadius: 14,
    marginRight: 10,
  },
  labeltxt: {
    fontSize: FONT_SIZES.onetwo,
    fontFamily: FONTFAMILY.Medium,
    color: THEME.white,
  },
  accountName: {
    fontSize: FONT_SIZES.twozero,
    fontFamily: FONTFAMILY.Light,
    color: THEME.primary,
  },
  currencyTag: {
    backgroundColor: '#B8E6EA',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
    marginLeft: 8
  },
  currencyText: {
    fontSize: FONT_SIZES.onetwo,
    fontFamily: FONTFAMILY.Medium,
    color: THEME.primary,
  },


   balanceTxt: {
    fontFamily: FONTFAMILY.Medium,
    fontSize: FONT_SIZES.onefour,
    color: THEME.white,
  },
    balanceAmountTxt: {
    fontFamily: FONTFAMILY.Medium,
    fontSize: FONT_SIZES.threetwo,
    color: THEME.white,
    // backgroundColor: THEME.primary,
    padding: 1,
  },
 amountBox: {
    // backgroundColor: THEME.primary,
    paddingHorizontal: scale(10),
    paddingVertical: scale(4),
    borderRadius: scale(6),
    marginTop: 5
  },

  containerAMOUNT: {
    backgroundColor: THEME.whitergba,
    padding: scale(8),
    width: '100%',
    alignSelf: "center",
    marginVertical: 15,
    borderRadius: scale(12),
    alignItems: 'center',
    justifyContent: 'center'
  },
  
  renderRightInputContainer :{
    height: scale(50),
    position: 'absolute',
    right: 8,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center"
  },
  inputNumber:{
    fontSize: FONT_SIZES.onesix,
    fontFamily: FONTFAMILY.Medium,
    color: THEME.primary,
  },
  inputNumbergbpcont:{
    backgroundColor: THEME.primary,
    marginLeft: 6,
    borderRadius: 6,
    padding: 3
  },
  inputNumbergbp:{
    fontSize: FONT_SIZES.onetwo,
    fontFamily: FONTFAMILY.Medium,
    color: THEME.textPrimary,
  },


          forgetTxt:
  { marginTop: 20, marginBottom: 20 },
});