import React, { useEffect, useRef, useState } from 'react';
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
import { launchImageLibrary } from "react-native-image-picker";
import VerifyAddress from '../../../components/bottomSheet/verifyAddress';
import { useSelector } from 'react-redux';

const Profile = () => {

    const userData = useSelector((state: any) => state?.AuthReducer?.userData);
    const navigation = useNavigation()
    const cardDetailRef = useRef(null)

    const [profile, setprofile] = useState(null);
    const [name, setname] = useState('William');
    const [username, setusername] = useState('@william.harp');
    const [email, setemail] = useState('');
    const [phone, setphone] = useState('');

    function pressBackArrow() {
        navigation.goBack()
    }

    function goToUserProfile() {
      
    }

    function renderlimitType() {
      return(
        <View>

                    <View style={styles.leftCard}>
            <TouchableOpacity onPress={openImagePicker}>
              <Image
                resizeMode="cover"
                defaultSource={Images.account}
                // source={userData?.profilePictures?.length ? { uri: userData?.profilePictures[0]?.path } : Images.UserImg}
                source={profile ?  {uri: profile} : {uri: "https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcTiahjx-m6ySbhuyQ7wbTQupWSjr0KW5DY38Cge23U_7bdxC8UC_gO9pWvIUHkZpQVNx2H-Q2fa4A1JVzJiLAGbQpdbNZ_Cf9sdMjhrRdZJOg" }}
                style={[
                  styles.backButton
                ]}
              />
              <View style={{ position: "absolute", justifyContent: 'center', alignItems: "center", width: 140, height: 140 }} >
               <Icon name="camera-outline" size={22} color={THEME.white}  />
              </View>
            </TouchableOpacity>
            <Text style={styles.selectimgTxt} >For best results, upload a square image (400x400px, JPG or PNG, max 2MB).</Text>
          </View>


      <InputField
          marginTp={20}
          autoCapital={'none'}
          blurOnSubmit={false} 
          disabled={true}
          placeholder="Full Name"
          value={name}
          onChangeText={setname}
          keyboardType={'default'}
          margBtm={20}
          customInpStyle={{ backgroundColor: THEME.whitergba }}
        />
        <InputField
          marginTp={20}
          autoCapital={'none'}
          blurOnSubmit={false} 
          disabled={true}
          placeholder="Username"
          value={username}
          onChangeText={setusername}
          keyboardType={'default'}
          margBtm={20}
          customInpStyle={{ backgroundColor: THEME.whitergba }}
        />

      <InputField
          marginTp={20}
          autoCapital={'none'}
          blurOnSubmit={false} 
          placeholder="Email"
          value={email}
          onChangeText={setemail}
          keyboardType={'email-address'}
          margBtm={20}
          customInpStyle={{ backgroundColor: THEME.whitergba }}
        />
        <InputField
          marginTp={20}
          autoCapital={'none'}
          blurOnSubmit={false} 
          placeholder="Mobile Number"
          value={phone}
          onChangeText={setphone}
          keyboardType={'numeric'}
          margBtm={20}
          customInpStyle={{ backgroundColor: THEME.whitergba }}
        />

        </View>
      )}

      
  const openImagePicker = () => {

    const options = {
      mediaType: 'all',
      includeBase64: false,
      maxHeight: 1000,
      maxWidth: 1000,
      selectionLimit: 1
    };
    launchImageLibrary(options, async(response) => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('Image picker error: ', response.error);
      } else {
      
        setprofile(response?.assets[0]?.uri)


      }}
    );    
  };

      
      function onPressBtn() {

        if (currency?.length == ''){
            Toast.showToast("Please Select Currency", '', 'error');
        }
        else if (linkedAccount?.length == ''){
             Toast.showToast("Please Select Linked Account Type", '', 'error');
        }
        else if (limitType?.length == ''){
            Toast.showToast("Please Select Limit Type", '', 'error');
        }
        else if (postalCode?.length == ''){
             Toast.showToast("Please Enter Spending Limit", '', 'error');
        }
        else{
          
          cardDetailRef?.current?.open()
        }
      }



    function renderlimitandBTN() {
      return(
        <View>
      <CustomButton
        btnContSty={styles.forgetTxt}
        title="Update Basic Information"
        loading={false}
        onPress={() => {
          onPressBtn()
        }}
      />
        </View>
      )
    }

    return(
    <MainContainer showBackArrow={true} pressBackArrow={pressBackArrow} isFlatList={true} barStyle="dark-content"  mainContainerStyle={styles.container}>
    <View style={{ marginHorizontal: 20, paddingBottom: 60 }} >

    <Text style={styles.title}>Profile</Text>

    {renderlimitType()}
    {renderlimitandBTN()}
     
   
 
    </View>
    </MainContainer>
  )
}

export default Profile;

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


   leftCard: {  alignItems: "center", marginVertical: 14 },

    backButton: {
    width: 140,
    height: 140,
    borderRadius: 40,
    justifyContent: "center",
    alignItems: "center",

    //buttonPosition
    // position: "absolute",
    // bottom: 24,
    // left: 16,

    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.07,
    shadowRadius: 4.0,
    elevation: 1,
  },
    selectimgTxt: {    
      fontSize: FONT_SIZES.onetwo,
      fontFamily: FONTFAMILY.Regular,
      color: THEME.primary,
      width: '80%',
      textAlign: "center",
      marginTop: 10,
      marginBottom: 10
    },
  fullCover: { width: "100%", height: "100%" },

});
