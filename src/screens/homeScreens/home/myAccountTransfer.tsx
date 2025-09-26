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

const MyAccountTransfer = () => {

  const navigation = useNavigation()
  const [amountSpend, setamountSpend] = useState()
  const [fronacc, setfronacc] = useState({
    label: 'Clearbank Account',
    currency: 'GBP',
    flag: Images.account // Add your flag image here
  });

  const [toAcc, settoAcc] = useState({
    label: 'Bank of Spain',
    currency: 'EUR',
    flag: Images.account // Add your flag image here
  });

    function pressBackArrow() {
        navigation.goBack()
    }

    function renderCardDetails() {
        return(
        <View style={styles.summaryBox}>
        <InfoRow icon="add-outline" label="Conversion Fee" value="£2.00" />
        <InfoRow icon="add-outline" label="Total After Fee" value="£1002.00" />
        <InfoRow icon="wallet-outline" label="Exchange Rate (Live)" value="1 GBP = 1.1425 EUR" />
        </View>
        )
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

      <InputDropDownStyle
        title={"To Account"}
        label={toAcc.label}
        currency={toAcc.currency}
        flag={toAcc.flag}
        onPress={handlePress}
      />

       <InputField
          margTp={20}
          autoCapital={'none'}
          blurOnSubmit={false} 
          placeholder="Amount to Send"
          value={amountSpend}
          onChangeText={setamountSpend}
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
        <Text style={styles.title}>Send Money to Your Account</Text>
        <Text  style={styles.subtitle}>Convert and transfer funds between your currency wallets instantly</Text>


        {renderInput()}
        {renderCardDetails()}
        {renderBTN()}

      </View>
    </ScrollView>
    </MainContainer>
  )
}

export default MyAccountTransfer;

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
