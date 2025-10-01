import React, { useRef, useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { BottomSheet, MainContainer } from '../../../components';
import { Images } from '../../../config';
import Icon from 'react-native-vector-icons/Ionicons';
import { FONT_SIZES, FONTFAMILY, METRICS, THEME } from '../../../styles';
import { useNavigation } from '@react-navigation/native';
import InputField from '../../../components/textInput';
import CustomButton from '../../../components/customButton';
import { scale } from 'react-native-size-matters';
import { Picker } from '@react-native-picker/picker';
import { HOME_ROUTES } from '../../../constants';
import { createCard } from '../../../queries/auth.query';
import { Toast } from '../../../utils';
import VerifyAddress from '../../../components/bottomSheet/verifyAddress';

const UpdateAddress = () => {

  const navigation = useNavigation()
  const cardDetailRef = useRef(null)

  const [Open, setOpen] = useState(false);
  const [streetAddress, setstreetAddress] = useState('');
  const [apartment, setApartment] = useState('');
  const [city, setcity] = useState('');
  const [postalAddress, setpostalAddress] = useState('');
  const [country, setCountry] = useState('');




  function pressBackArrow() {
    navigation.goBack()
  }

  function openLinkAccunt() {
    console.log("ASDasd");
  }

  function renderInputField() {
    return (
      <View>
        <InputField
          marginTp={20}
          autoCapital={'none'}
          blurOnSubmit={false}
          placeholder="Street Address"
          value={streetAddress}
          onChangeText={setstreetAddress}
          margBtm={20}
        />

        <InputField
          marginTp={20}
          autoCapital={'none'}
          blurOnSubmit={false}
          placeholder="Apartment/Suite (Optional)"
          value={apartment}
          onChangeText={setApartment}
          margBtm={20}
        />


        <View style={styles.pickerWrapper}>
          <Picker
            dropdownIconColor={THEME.white}
            selectedValue={city}
            onValueChange={itemValue => setcity(itemValue)}
            style={styles.inputInnerPicker}
          >
            <Picker.Item label="city" value="" color={THEME.textPrimary} />
            <Picker.Item label="city 2" value="city2" color={THEME.textPrimary} />
            <Picker.Item label="city 3" value="city3" color={THEME.textPrimary} />
          </Picker>
        </View>

      </View>
    )
  }

  function renderlimitType() {
    return (
      <InputField
        marginTp={20}
        autoCapital={'none'}
        blurOnSubmit={false}
        placeholder="Postal Code"
        value={postalAddress}
        onChangeText={setpostalAddress}
        keyboardType={'numeric'}
        margBtm={20}
      />
    )
  }


  function onPressBtn() {

    if (streetAddress?.length == '') {
      Toast.showToast("Please Enter Street Address", '', 'error');
    }
    else if (apartment?.length == '') {
      Toast.showToast("Please Enter Apartment Details", '', 'error');
    }
    else if (city?.length == '') {
      Toast.showToast("Please Select City", '', 'error');
    }
    else if (postalAddress?.length == '') {
      Toast.showToast("Please Enter Postal Address", '', 'error');
    }
    else if (country?.length == '') {
      Toast.showToast("Please Select Country", '', 'error');
    }
    else {

      cardDetailRef?.current?.open()
      navigation.goBack()
    }
  }



  function renderlimitandBTN() {
    return (
      <View>

        <View style={styles.pickerWrapper}>
          <Picker
            dropdownIconColor={THEME.white}
            selectedValue={country}
            onValueChange={itemValue => setCountry(itemValue)}
            style={styles.inputInnerPicker}
          >
            <Picker.Item label="Country" value="" color={THEME.textPrimary} />
            <Picker.Item label="country 2" value="country 2" color={THEME.textPrimary} />
            <Picker.Item label="country 3" value="option 3" color={THEME.textPrimary} />
          </Picker>
        </View>


        <CustomButton
          btnContSty={styles.forgetTxt}
          title="Update" 
          loading={false}
          onPress={() => {
            onPressBtn()
          }}
        />
      </View>
    )
  }

  function yesConfirm() {
    cardDetailRef?.current?.close()
    setTimeout(() => {
      let payload = {
        format: "physical",
        card_name: cardName,
        spending_limits: spendingLimit,
        limit_type: limitType, //type options available for virtual only, by-default physical monthly.
        currency_type: currency,
        linked_account: linkedAccount,
        card_desgin: "steel" // requirment not clear 
      }
      navigation.navigate(HOME_ROUTES.ConfirmCardRequest, { data: payload })
    }, 1000);
  }

  return (
    <MainContainer showBackArrow={true} pressBackArrow={pressBackArrow} isFlatList={true} barStyle="dark-content" mainContainerStyle={styles.container}>
      <View style={{ marginHorizontal: 20 }} >

        <Text style={styles.title}>Update Delivery Address</Text>

        {renderInputField()}
        {renderlimitType()}
        {renderlimitandBTN()}
 

       
      </View>
    </MainContainer>
  )
}

export default UpdateAddress;

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: THEME.white },
  arrowCont:
    { width: 40, height: 40, justifyContent: "center", alignItems: "center", marginTop: 20 },
  text: { fontSize: 20 },
  title:
  {
    fontSize: FONT_SIZES.onesix,
    fontFamily: FONTFAMILY.SemiBold,
    color: THEME.primary,
    marginBottom: 30,
    marginTop: 10
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
