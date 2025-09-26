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

const InternationalTransfer = () => {

  const navigation = useNavigation()
  const [toAccount, settoAccount] = useState('')
  const [RecipientGets, setRecipientGets] = useState('')
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
      <Text style={styles.balanceTxt}>{label}</Text>
      <View style={styles.amountBox}>
        <Text style={styles.balanceAmountTxt}>{amount}</Text>
      </View>
    </View>
  );
};

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

        <View style={styles.pickerWrapper}>
          <Picker
                      dropdownIconColor={THEME.white}
            selectedValue={toAccount}
            onValueChange={itemValue => settoAccount(itemValue)}
            style={styles.inputInnerPicker}
          >
            <Picker.Item label="To Account" value="" color={THEME.white} />
            <Picker.Item label="account" value="account" color={THEME.white} />
            <Picker.Item label="cash" value="cash" color={THEME.white} />
          </Picker>
        </View>

        
        <InputField
            autoCapital={'none'}
            blurOnSubmit={false} 
            placeholder="Recipient Gets"
            value={RecipientGets}
            onChangeText={setRecipientGets}
            keyboardType={'numeric'}
            margBtm={20}
        />

        </View>
        )
    } 

  const handlePress = () => {

  };
    
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

   return(
    <MainContainer showBackArrow={true} pressBackArrow={pressBackArrow} isFlatList={true} barStyle="dark-content"  mainContainerStyle={styles.container}>
    <ScrollView contentContainerStyle={{paddingBottom: 100 }} >
      <View style={{ marginHorizontal: 20 }} >
        <Text style={styles.title}>International Transfer</Text>
        <Text  style={styles.subtitle}>Move funds between your own accounts instantly.</Text>


        {renderInput()}
        {renderBTN()}
      </View>
    </ScrollView>
    </MainContainer>
  )
}

export default InternationalTransfer;

const styles = StyleSheet.create({
            forgetTxt:
  { marginTop: 20, marginBottom: 20 },
  title:
  {
    fontSize: FONT_SIZES.threetwo,
    fontFamily: FONTFAMILY.Light,
    color: THEME.primary,
    marginBottom: 20,
    marginTop:10
  },
    subtitle:
  {
    fontSize: FONT_SIZES.onesix,
    fontFamily: FONTFAMILY.Light,
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
    borderColor: THEME.gray,
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
    fontFamily: FONTFAMILY.Light,
    fontSize: FONT_SIZES.onesix,
    color: THEME.white,
  },
    balanceAmountTxt: {
    fontFamily: FONTFAMILY.Medium,
    fontSize: FONT_SIZES.onefour,
    color: THEME.white,
    backgroundColor: THEME.primary,
    padding: 1,
  },
 amountBox: {
    backgroundColor: THEME.primary,
    paddingHorizontal: scale(10),
    paddingVertical: scale(4),
    borderRadius: scale(6),
    marginTop: 5
  },
  containerAMOUNT: {
    backgroundColor: THEME.textPrimary,
    padding: scale(8),
    width: 150,
    alignSelf: "center",
    marginVertical: 15,
    borderRadius: scale(12),
    alignItems: 'center',
    justifyContent: 'center'
  },
});
