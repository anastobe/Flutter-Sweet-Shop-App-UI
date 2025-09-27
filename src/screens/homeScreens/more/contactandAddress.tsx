import React, { useRef, useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ImageBackground } from 'react-native';
import { BottomSheet, MainContainer, Modal } from '../../../components';
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
import LinearGradient from 'react-native-linear-gradient';
import ContactAdressSheet from '../../../components/bottomSheet/contactAdressSheet';

const ContactAddress = () => {

    const navigation = useNavigation()
    const cardDetailRef = useRef(null)

    const [Open, setOpen] = useState(false);
    const [country, setcountry] = useState('');
    const [city, setcity] = useState('');
    const [address, setaddress] = useState('');
    const [postalCode, setpostalCode] = useState('');
    const [confirmPassword, setconfirmPassword] = useState('');
    const [secure, setSecure] = useState(true);

    function pressBackArrow() {
        navigation.goBack()
    }

    function renderInputField() {
      return(
        <View>
      <View style={styles.pickerWrapper}>
        <Picker
                    dropdownIconColor={THEME.white}
          selectedValue={country}
          onValueChange={itemValue => setcountry(itemValue)}
          style={styles.inputInnerPicker}
        >
          <Picker.Item label="Country" value="" color={THEME.textPrimary} />
          <Picker.Item label="Pak" value="Pak" color={THEME.textPrimary} />
          <Picker.Item label="Canada" value="CANADA" color={THEME.textPrimary} />
        <Picker.Item label="Italy" value="Italy" color={THEME.textPrimary} />
          <Picker.Item label="IreLand" value="IreLand" color={THEME.textPrimary} />
        </Picker>
      </View>
    
      <View style={styles.pickerWrapper}>
        <Picker
                    dropdownIconColor={THEME.white}
          selectedValue={city}
          onValueChange={itemValue => setcity(itemValue)}
          style={styles.inputInnerPicker}
        >
          <Picker.Item label="City" value="" color={THEME.textPrimary} />
          <Picker.Item label="opt1" value="opt1" color={THEME.textPrimary} />
          <Picker.Item label="opt2" value="opt2" color={THEME.textPrimary} />
        </Picker>
      </View>

        </View>
      )
    }

    function renderlimitType() {
      return(
        <View>
      <InputField
          customInpStyle={{ backgroundColor: THEME.whitergba }}
          marginTp={20}
          autoCapital={'none'}
          blurOnSubmit={false} 
          placeholder="Address"
          value={address}
          onChangeText={setaddress}
          keyboardType={'numeric'}
          margBtm={20}
        />

      <InputField
          customInpStyle={{ backgroundColor: THEME.whitergba }}
          marginTp={20}
          autoCapital={'none'}
          blurOnSubmit={false} 
          placeholder="Postal Code"
          value={postalCode}
          onChangeText={setpostalCode}
          keyboardType={'numeric'}
          margBtm={20}
        />


        </View>
      )}

      
      function onPressBtn() {
 cardDetailRef?.current?.open()
        if (country?.length == ''){
            Toast.showToast("Please Select country", '', 'error');
        }
        else if (city?.length == ''){
             Toast.showToast("Please Select Linked Account Type", '', 'error');
        }
        else if (address?.length == ''){
            Toast.showToast("Please Select Limit Type", '', 'error');
        }
        else if (postalCode?.length == ''){
             Toast.showToast("Please Enter Spending Limit", '', 'error');
        }
        else{
          
         
        }
      }



    function renderlimitandBTN() {
      return(
        <View>
      <CustomButton
        btnContSty={styles.forgetTxt}
        title="Update Contact"
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
  
          navigation.navigate(HOME_ROUTES.ConfirmCardRequest,{data: {}})  
      }, 1000);
    }

    return(
    <MainContainer showBackArrow={true} pressBackArrow={pressBackArrow} isFlatList={true} barStyle="dark-content"  mainContainerStyle={styles.container}>
    <View style={{ marginHorizontal: 20 }} >

    <Text style={styles.title}>Contact & Address</Text>

    {renderInputField()}
    {renderlimitType()}
    {renderlimitandBTN()}

    <BottomSheet
      height={METRICS.halfScreen - 40}
      draggable={false}
      openTime={500}
      closeDuration={500}
      bottomSheetRef={cardDetailRef}
      children={<ContactAdressSheet
        onPress={()=>{cardDetailRef?.current?.close()}}
        style={{ flex: 1, paddingHorizontal: 20 }}
        confirmPassword={confirmPassword}
        setconfirmPassword={setconfirmPassword}
        secure={secure}
        setSecure={setSecure}
        title="Confirm Your Password" 
        subtitle="For your security, please enter your login password to proceed with updating your address."
        />}
    />

   

    </View>
    </MainContainer>
  )
}

export default ContactAddress;

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
  btnTxt:
  { color: THEME.primary, fontFamily: FONTFAMILY.Medium, fontSize: FONT_SIZES.onesix, marginLeft: 10 },
 btnContStyle:
  { backgroundColor: "transparent", borderColor: THEME.primary, borderWidth: 1, flexDirection: "row", height: scale(54), borderRadius: 10, justifyContent: "center", alignItems: 'center' },
 
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
    backgroundColor: THEME.whitergba
  },
  picker: {
    height: 50,
    width: '100%',
  },

    inputInnerPicker: {
    fontFamily: FONTFAMILY.Medium,
    fontSize: FONT_SIZES.onefour,
    borderColor: THEME.white,
    borderWidth: 1,
    borderRadius: 16,
    // width: METRICS.width - 45,
    color: THEME.white,
    height: scale(60),
    marginLeft: 10,
  },

});