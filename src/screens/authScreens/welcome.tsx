import React, { useEffect, useRef, useState } from 'react';
import { View, StyleSheet, Image, Text, TouchableOpacity, Pressable, Alert } from 'react-native';
import CustomButton from '../../components/customButton';
import CustomTextField from '../../components/customTextField';
import Images from '../../config/images';
import { Auth_ROUTES, HOME_ROUTES } from '../../constants';
import { useNavigation } from '@react-navigation/native';
import { FONTFAMILY, FONT_SIZES, METRICS, THEME } from '../../styles'; // Assuming you have this structure
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { BottomSheet, MainContainer, Modal } from '../../components';
import InputField from '../../components/textInput';
import { scale } from 'react-native-size-matters';
import Icon from 'react-native-vector-icons/Ionicons';
import FingerPrintContent from '../../components/bottomSheet/fingerPrintContent';
import ReactNativeBiometrics from 'react-native-biometrics';
import { useLogin } from '../../queries/auth.query';
import { useLoginViewModel } from '../../viewModels/authViewModel/useLoginViewModel';
import {authorize} from 'react-native-app-auth';
import LinearGradient from 'react-native-linear-gradient';
import { ImageBackground } from 'react-native';
import { SHOW_CLIENT } from '../../APICall/constants';
import { useWelcomeViewModel } from '../../viewModels/authViewModel/useWelcomeViewModel';

type WelcomeProps = {};

export const Welcome: React.FC = () => {

  const vm = useWelcomeViewModel();


  return (
    <MainContainer 
    refreshing={false} isFlatList={true} barStyle="dark-content" customeStyle={{ paddingHorizontal: 30 }} mainContainerStyle={styles.container}
    >
      <Image source={Images.logo} style={styles.logo} />
      <Text style={styles.btnTxt} >{`Your\nFinancial\nFrontier,\nAwaits...`}</Text>
      <Text style={styles.btnTxtdown} >{`Securely managing your global finances, simplified.`}</Text>
      <Image source={Images.curveLine} style={styles.logodown} resizeMode='contain' />

       <CustomButton
         btnContSty={styles.forgetTxt}
         loading={false}
         title="Login"
         onPress={vm.onPressLogin}
       />

       <CustomButton
        txtColor={styles.btnTxtBtn}
        title="Login with Biometrics / Face ID"
        // image={Images.faceID}
        tintColor={THEME.white}
        showmyStyleOnly={true} 
        btnContSty={styles.btnContStyle}
        onPress={vm.onPressLogin}
      />

      <Text style={styles.creatAC}>Create Account</Text>


    </MainContainer>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: THEME.white
  },
  logo: {
   width: METRICS.width,
    height: 56,
    resizeMode: 'contain',
    alignSelf: "center",
    marginTop: 60
  },
  logodown: {
    width: '50%',
    height: scale(20),
    alignSelf: "center",
    marginTop: 20
  },
  btnTxt:
  { 
    color: THEME.white, 
    fontFamily: FONTFAMILY.SemiBold, 
    fontSize: FONT_SIZES.foureight, 
    marginLeft: 0,
    marginTop: 24,
    lineHeight: 60
  },
  btnTxtdown:{
    color: THEME.white, 
    fontFamily: FONTFAMILY.Regular, 
    fontSize: FONT_SIZES.twozero, 
    marginTop: 5,
    lineHeight: 24
  },
   forgetTxt:
  { marginTop: 20, marginBottom: 18 },
  btnContStyle:
  { backgroundColor: "transparent", borderColor: THEME.white, borderWidth: 1, flexDirection: "row", height: scale(54), borderRadius: 10, justifyContent: "center", alignItems: 'center' },
  btnTxtBtn:
  { color: THEME.white, fontFamily: FONTFAMILY.Regular, fontSize: FONT_SIZES.onesix, marginLeft: 0 },
  creatAC:{
    color: THEME.white,
    fontFamily: FONTFAMILY.Medium,
    fontSize: FONT_SIZES.oneeight,
    marginTop: 18,
    textAlign: "center"
  },

});

export default Welcome;




// import React, { useState } from 'react';
// import { View, StyleSheet, Image, Text, TouchableOpacity, ImageBackground } from 'react-native';
// import CustomButton from '../../components/customButton';
// import CustomTextField from '../../components/customTextField';
// import Images from '../../config/images';
// import { Auth_ROUTES } from '../../constants';
// import { useNavigation } from '@react-navigation/native';
// import { FONTFAMILY, FONT_SIZES, METRICS, THEME } from '../../styles'; // Assuming you have this structure
// import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
// import { MainContainer, Modal } from '../../components';
// import InputField from '../../components/textInput';
// import { scale } from 'react-native-size-matters';

// type WelcomeProps = {};

// export const Welcome: React.FC<WelcomeProps> = ({...props}) => {

//   const navigation = useNavigation();
//   return (
//     <ImageBackground source={Images.welcome} style={{ width: METRICS.width, height: METRICS.height }} resizeMode='stretch' >

//         <Image source={Images.logo} style={styles.logo} />

//     </ImageBackground>
    
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: THEME.white
//   },
//   logo: {
//    width: METRICS.width,
//     height: 56,
//     resizeMode: 'contain',
//     alignSelf: "center",
//     marginTop: 45
//   },
//   forgetTxt:
//   { marginTop: 20, marginBottom: 20, width: '100%' },
//   title: {
//     color: THEME.primary,
//     fontFamily: FONTFAMILY.Light,
//     fontSize: FONT_SIZES.threesix,
//     marginBottom: scale(10),
//     marginTop: METRICS.height / 5,
//     textAlign: "center",
//     lineHeight: 35
//   },
//   titlesub:{
//     color: THEME.primary,
//     fontFamily: FONTFAMILY.Light,
//     fontSize: FONT_SIZES.onesix,
//     marginBottom: scale(40),
//     textAlign: "center"
//   },
//   forgotText: {
//     color: THEME.primary,
//     fontFamily: FONTFAMILY.Medium,
//     fontSize: FONT_SIZES.onesix,
//     textAlign: 'center',
//     marginTop: 10,
//     paddingBottom: 40
//   },
//   contText:
//   { flexDirection: "row", justifyContent: "center", paddingBottom: 50 },
//   dontAcc: {
//     color: THEME.primary,
//     fontFamily: FONTFAMILY.Medium,
//     fontSize: FONT_SIZES.onesix,
//   },
//   creatAC:{
//     color: THEME.prinkishBlue,
//     fontFamily: FONTFAMILY.Medium,
//     fontSize: FONT_SIZES.onesix,
//   },



//   overlay: {
//     flex: 1,
//     backgroundColor: 'rgba(0,0,0,0.5)',
//   },
//    modal: {
//     backgroundColor: '#fff',
//     borderRadius: 16,
//     padding: 24,
//     alignItems: 'center',
//   },
//   closeBtn: {
//     position: 'absolute',
//     top: 10,
//     right: 15,
//   },
//   closeText: {
//     fontSize: 24,
//     color: '#888',
//   },
//   iconCircle: {
//     backgroundColor: '#a1f0ff',
//     borderRadius: 50,
//     width: scale(48),
//     height: scale(48),
//     justifyContent: 'center',
//     alignItems: 'center',
//     marginBottom: 10
//   },
//   icon: {
//     width: scale(30),
//     height: scale(30),
//     resizeMode: "contain"
//   },
//   titles: {
//     fontFamily: FONTFAMILY.Light,
//     fontSize: FONT_SIZES.threetwo,
//     color: THEME.primary,
//     textAlign: 'center',
//   },
//   description: {
//     marginTop: 10,
//     fontFamily: FONTFAMILY.Light,
//     fontSize: FONT_SIZES.onefour,
//     color: THEME.primary,
//     textAlign: 'center',
//     marginHorizontal: 20
//   },
//   okButton: {
//     backgroundColor: '#e184ff',
//     borderRadius: 25,
//     width: '100%',
//     paddingVertical: 12,
//   },
//   okText: {
//     color: '#fff',
//     textAlign: 'center',
//     fontSize: 16,
//   },

// });

// export default Welcome;
