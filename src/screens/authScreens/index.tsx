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

type LoginProps = {};

export const Login: React.FC = () => {

  const navigation = useNavigation();
  const vm = useLoginViewModel(navigation);
    const [Open, setOpen] = useState(false);
  function renderError() {
    return(
    <View style={styles.errorCont} >

      <View style={styles.iconCont} >
        <Icon name={'warning-outline'} size={25} color={THEME.white} />
      </View>

      <View>
        <Text style={styles.credTxt}>Invalid Credentials</Text>
        <Text numberOfLines={2} style={styles.credTxtsub}>Invalid email or password. Please check your credentials and try again.</Text>
      </View>

    </View>
    )
  }

const config = {
  issuer: 'https://cognito-idp.eu-west-2.amazonaws.com/eu-west2_re5IyfwY6', // OIDC Issuer
  clientId: '2stuncfaluj9s4nikr8hj56h2l', // App client ID
  redirectUrl: 'https://d84l1y8p4kdic.cloudfront.net', // Redirect URI
  scopes: ['openid', 'profile'], // You can add 'email' if needed
  additionalParameters: {}
};

  // const config = {
  //   issuer: 'https://cognito-idp.eu-west-2.amazonaws.com/eu-west-2_re5IyfwY6',
  //   clientId: '2stuncfaluj9s4nikr8hj56h2l',
  //   redirectUrl: 'https://d84l1y8p4kdic.cloudfront.net', // App scheme set karna hoga
  //   scopes: ['openid', 'profile'],
  // };

  const handleLogin = async () => {
    try {
      const result = await authorize(config);
      console.log('Login Success:', result);
    } catch (error) {
      console.error('Login Error:', error);
    }
  }

      function renderPOPUP() {
    return(
          <ImageBackground resizeMode="cover" source={Images.bottogSheetGradient} imageStyle={{ borderRadius: 16,}} style={styles.modal}>

          <TouchableOpacity style={styles.closeBtn} onPress={()=>{ setOpen(false) }} >
            <Text style={styles.closeText}>×</Text>
          </TouchableOpacity>

      
            <View style={styles.iconCircle}>
                <Icon name="alert-outline" size={36} color={THEME.textPrimary} /> 
            </View>
        

           <Text style={styles.description}>
          Looks like you have not set your Touch ID.
Please login and set your Touch ID from Profile.
          </Text>

         <CustomButton
            btnContSty={styles.forgetTxtpop}
            title="OK"
            onPress={() => {
            Alert.alert("NEED",SHOW_CLIENT)
            setOpen(false)
            }}
          />

          </ImageBackground>
   
    )
  }

      function renderModal() {
        return (
          <Modal

            isVisible={Open}
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
    refreshing={false} isFlatList={true} barStyle="dark-content" customeStyle={{ paddingHorizontal: 20 }} mainContainerStyle={styles.container}
    >
      <Image source={Images.logo} style={styles.logo} />
      <Text style={styles.title}>Let’s Sign you In.</Text>

      
         {/* {renderError()} */}

      <InputField
             marginTp={20}
             autoCapital={'none'}
             blurOnSubmit={false}
             placeholder="Email address"
             value={vm.email}
             onChangeText={vm.setEmail}
             keyboardType={'email-address'}
             margBtm={20}
      />
           <InputField
             marginTp={20}
             secureEntry={vm.secure}
             image={vm.secure ? "eye-off-outline" : "eye-outline" }
             autoCapital={'none'}
             blurOnSubmit={false}
             placeholder="Password"
             imagetintColor={THEME.primary}
             value={vm.password}
             onPress={()=>{ vm.setSecure(!vm.secure) }}
             onChangeText={vm.setPassword}
           />
           <TouchableOpacity onPress={()=>{ navigation.navigate(Auth_ROUTES.FORGETPASSWORD) }} >
             <Text style={styles.forgetTxtAbove}>Forgot Password</Text>
           </TouchableOpacity>


       <CustomButton
         btnContSty={styles.forgetTxt}
         loading={vm.isPending}
         title="Login"
         onPress={vm.handleLogin}
       />

      {/* <CustomButton
        txtColor={styles.btnTxt}
        title="Login with Biometrics"
        image={Images.finger}
        tintColor={THEME.white}
        showmyStyleOnly={true}
        btnContSty={styles.btnContStyle}
        onPress={() => vm.biometryRef?.current?.open()}
      /> */}

    <View style={styles.containerline}>
      <View style={styles.line1} />
      <Text style={styles.textOR}>or</Text>
      <View style={styles.line1} />
    </View>

      <CustomButton
        txtColor={styles.btnTxt}
        title="Login with Biometrics / Face ID"
        // image={Images.faceID}
        tintColor={THEME.white}
        showmyStyleOnly={true} 
        btnContSty={styles.btnContStyle}
        onPress={() => vm.biometryRef?.current?.open()}
      />

      <View style={styles.contText}>
        <Text style={styles.dontAcc}>Don’t have an account? </Text>
        <Pressable onPress={() => Alert.alert("NEED",SHOW_CLIENT) }>
          <Text style={styles.creatAC}>Create Account</Text>
        </Pressable>
      </View>

      

       {/* <BottomSheet
         height={METRICS.halfScreen + 40}
         draggable={false}
         openTime={500}
         closeDuration={500}
         bottomSheetRef={vm.biometryRef}
         children={<FingerPrintContent onPress={vm.handleBiometricAuth}
            style={{ flex: 1, paddingHorizontal: 20 }}
         title="Login with Fingerprint" img={Images.finger} subtitle="Tap your fingerprint sensor to continue" />}
        /> */}

        
       <BottomSheet
         height={METRICS.halfScreen - 40}
         draggable={false}
         openTime={500}
         closeDuration={500}
         bottomSheetRef={vm.biometryRef}
         children={<FingerPrintContent onPress={()=>{ setOpen(true) }}
            style={{ flex: 1, paddingHorizontal: 20 }}
         title="Login with Biometric and Face ID"  subtitle="" />}
        />

        {renderModal()}

    </MainContainer>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: THEME.white
  },
  btnTxt:
  { color: THEME.primary, fontFamily: FONTFAMILY.Medium, fontSize: FONT_SIZES.onesix, marginLeft: 10 },
  btnContStyle:
  { backgroundColor: "transparent", borderColor: THEME.primary, borderWidth: 1, flexDirection: "row", height: scale(54), borderRadius: 10, justifyContent: "center", alignItems: 'center' },
  logo: {
   width: METRICS.width,
    height: scale(55),
    resizeMode: 'contain',
    alignSelf: "center",
    marginTop: 60
  },
  forgetTxtAbove: {
    color: THEME.primary,
    fontFamily: FONTFAMILY.Regular,
    fontSize: FONT_SIZES.onefour,
    textAlign:"right",
    marginTop: 10
  },
  forgetTxt:
  { marginTop: 20, marginBottom: 10 },
  title: {
    color: THEME.primary,
    fontFamily: FONTFAMILY.Medium,
    fontSize: FONT_SIZES.twotwo,
    marginBottom: scale(30),
    marginTop: METRICS.height / 9,
    textAlign: "center"
  },
  errorCont:
  { 
    flexDirection: "row", 
    height: scale(83), 
    alignItems: "center", 
    borderRadius: 10, 
    marginBottom: 20, 
    borderColor: THEME.white,
    borderWidth: 1,
  },
  iconCont:
  { backgroundColor: THEME.medRed, width: scale(48), height: scale(48), borderRadius: 100, justifyContent: "center", alignItems: "center", marginHorizontal: 10 },
  credTxt:{
    color: THEME.medRed,
    fontFamily: FONTFAMILY.Medium,
    fontSize: FONT_SIZES.onesix,
  },
  credTxtsub:{
    color: THEME.primary,
    fontFamily: FONTFAMILY.Light,
    fontSize: FONT_SIZES.onefour,
    marginRight: 80,
  },
  forgotText: {
    color: THEME.primary,
    fontFamily: FONTFAMILY.Medium,
    fontSize: FONT_SIZES.onesix,
    textAlign: 'center',
    marginTop: 20,
    paddingBottom: 40
  },
  contText:
  { flexDirection: "row", justifyContent: "center", paddingBottom: 50, marginTop: 30 },
  dontAcc: {
    color: THEME.primary,
    fontFamily: FONTFAMILY.Regular,
    fontSize: FONT_SIZES.onefour,
  },
  creatAC:{
    color: THEME.primary,
    fontFamily: FONTFAMILY.SemiBold,
    fontSize: FONT_SIZES.onefour,
    textDecorationLine: "underline"
  },
  containerline: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 10,
  },
  line1: {
    flex: 1,
    height: 1,
    backgroundColor: THEME.white, // line color
  },
  textOR: {
    marginHorizontal: 10,
    fontFamily: FONTFAMILY.Regular,
    fontSize: FONT_SIZES.onesix,
    color: THEME.white,
  },

  
  
     modal: {
    backgroundColor: 'rgba(64, 64, 65, 0.92)',
    borderRadius: 16,
    padding: 24,
    alignItems: 'center',
  },
  closeBtn: {
    position: 'absolute',
    top: 10,
    right: 15,
  },
  closeText: {
    fontSize: FONT_SIZES.foureight,
    color: THEME.white,
  },
  iconCircle: {
    backgroundColor:THEME.primary,
    borderRadius: 100,
    width: scale(55),
    height: scale(55),
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10
  },
  forgetTxtpop:{
width: '100%',
marginTop: 30, marginBottom: 20 
  },
    titles: {
    fontFamily: FONTFAMILY.SemiBold,
    fontSize: FONT_SIZES.twosix,
    color: THEME.white,
    textAlign: 'center',
    marginTop: 10,
  },
  description: {
    marginTop: 10,
    fontFamily: FONTFAMILY.Medium,
    fontSize: FONT_SIZES.onefour,
    color: THEME.white,
    textAlign: 'center',

  },


});

export default Login;
