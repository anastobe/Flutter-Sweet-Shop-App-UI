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
import BluryModal from '../../components/Modal/bluryModal';
import StatusBarManager from '../../components/statusBarManager';
import { handleSize } from '../../config/responsiveTheme';
import Metrics from '../../styles/metrics';

type LoginProps = {};
  
export const Login: React.FC = () => {

  const navigation = useNavigation();
  const vm = useLoginViewModel(navigation);
  function renderError() {
    return(
    <View style={styles.errorCont} >

      <View style={styles.iconCont} >
        <Icon name={'warning-outline'} size={handleSize.f(25)} color={THEME.white} />
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
      <BluryModal
        style={{ flex: 1, paddingHorizontal: 20 }}
        onClose={()=>{vm.setOpen({
            open: false,
            text: ""
          }) 
        }}
        btnLoader={false}
        // marginTopTitle={20}
        onConfirm={()=>{
          Alert.alert("token",vm.token)
          vm.setOpen({
            open: false,
            text: ""
          }) 
        }}
        body={vm.Open.text}
        iconName={""}
        confirmText={'ok'}
      />
    )
  }

      function renderModal() {
        return (
          <Modal
            isVisible={vm.Open.open}
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
      <StatusBarManager
        backgroundColor={THEME.darkSecondary} 
        barStyle="light-content" 
      />

      <Image source={Images.logo} style={styles.logo} />
      <Text style={styles.title}>Sign in</Text>

      
         {/* {renderError()} */}

      <InputField
             marginTp={20}
             autoCapital={'none'}
             blurOnSubmit={false}
            //  placeholder="Email username"
             placeholder="Email or username"
             value={vm.email}
             onChangeText={vm.setEmail}
            //  keyboardType={'email-address'}
             margBtm={20}
      />
           <InputField
             marginTp={20}
             secureEntry={vm.secure}
             image={vm.secure ? "eye-off-outline" : "eye-outline" }
             autoCapital={'none'}
             blurOnSubmit={false}
             placeholder="Password"
             imagetintColor={THEME.white}
             value={vm.password}
             textInputStyle={styles.innerinput}
             onPress={()=>{ vm.setSecure(!vm.secure) }}
             onChangeText={vm.setPassword}
           />
           <TouchableOpacity onPress={()=>{ navigation.navigate(Auth_ROUTES.FORGETPASSWORD) }} >
             <Text style={styles.forgetTxtAbove}>Forgot Password</Text>
           </TouchableOpacity>


       <CustomButton
         btnContSty={styles.forgetTxt}
         loading={vm.isPending}
         title="Log in"
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
        title="Log in with Biometrics / Face ID"
        // image={Images.faceID}
        tintColor={THEME.white}
        showmyStyleOnly={true} 
        btnContSty={styles.btnContStyle}
        onPress={() => vm.biometryRef?.current?.open()}
      />

      {/* <View style={styles.contText}>
        <Text style={styles.dontAcc}>Don’t have an account? </Text>
        <Pressable onPress={() => navigation.navigate(Auth_ROUTES.CREATEACCOUNT) }>
          <Text style={styles.creatAC}>Create Account</Text>
        </Pressable>
      </View> */}

      

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
         children={<FingerPrintContent refrence={vm.biometryRef} 
         onPress2={vm.handleBiometricAuth}
         onPress={()=>{ vm.setOpen({ open: true, text: "Looks like you have not set your Touch ID. Please login and set your Touch ID from Profile." }) }}
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
    backgroundColor: THEME.white,
  },

  // ---------- Logo ----------
  logo: {
    width: METRICS.width,   // previously METRICS.width
    height: handleSize.h(56),
    resizeMode: 'contain',
    alignSelf: 'center',
    marginTop: handleSize.h(60),
  },

  // ---------- Heading Title ----------
  title: {
    color: THEME.white,
    fontFamily: FONTFAMILY.Medium,
    fontSize: handleSize.f(FONT_SIZES.twotwo),
    marginBottom: handleSize.h(30),
    marginTop: handleSize.h(50), // METRICS.height/9 → responsive
    textAlign: 'center',
  },

    innerinput: {
    height: handleSize.h(56),
    width:  Metrics.width - handleSize.w(90),
    paddingLeft: handleSize.w(20),
    fontFamily: FONTFAMILY.Regular,
    fontSize: handleSize.f(FONT_SIZES.onefour),
    color: THEME.white,
    justifyContent: "center",
  },


  // ---------- Error Box ----------
  errorCont: {
    flexDirection: 'row',
    height: handleSize.h(83),
    alignItems: 'center',
    borderRadius: handleSize.f(10),
    marginBottom: handleSize.h(20),
    borderColor: THEME.white,
    borderWidth: handleSize.f(1),
  },

  iconCont: {
    backgroundColor: THEME.medRed,
    width: handleSize.w(48),
    height: handleSize.h(48),
    borderRadius: handleSize.f(100),
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: handleSize.w(10),
  },

  credTxt: {
    color: THEME.medRed,
    fontFamily: FONTFAMILY.Medium,
    fontSize: handleSize.f(FONT_SIZES.onesix),
  },

  credTxtsub: {
    color: THEME.primary,
    fontFamily: FONTFAMILY.Light,
    fontSize: handleSize.f(FONT_SIZES.onefour),
    marginRight: handleSize.w(80),
  },

  // ---------- Forgot Password ----------
  forgetTxtAbove: {
    color: THEME.primary,
    fontFamily: FONTFAMILY.Regular,
    fontSize: handleSize.f(FONT_SIZES.onefour),
    textAlign: 'right',
    marginTop: handleSize.h(10),
  },

  forgetTxt: {
    marginTop: handleSize.h(20),
    marginBottom: handleSize.h(10),
  },

  // ---------- Login Button ----------
  btnContStyle: {
    backgroundColor: 'transparent',
    borderColor: THEME.white,
    borderWidth: handleSize.f(1),
    flexDirection: 'row',
    height: handleSize.h(56),
    borderRadius: handleSize.f(10),
    justifyContent: 'center',
    alignItems: 'center',
  },

  btnTxt: {
    color: THEME.white,
    fontFamily: FONTFAMILY.Regular,
    fontSize: handleSize.f(FONT_SIZES.onesix),
    marginLeft: handleSize.w(10),
  },

  // ---------- OR Divider ----------
  containerline: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: handleSize.h(10),
  },

  line1: {
    flex: 1,
    height: handleSize.h(1),
    backgroundColor: THEME.white,
  },

  textOR: {
    marginHorizontal: handleSize.w(10),
    fontFamily: FONTFAMILY.Regular,
    fontSize: handleSize.f(FONT_SIZES.onesix),
    color: THEME.white,
  },

  // ---------- Bottom text (Don't have account) ----------
  contText: {
    flexDirection: 'row',
    justifyContent: 'center',
    paddingBottom: handleSize.h(50),
    marginTop: handleSize.h(30),
  },

  dontAcc: {
    color: THEME.white,
    fontFamily: FONTFAMILY.Regular,
    fontSize: handleSize.f(FONT_SIZES.onefour),
  },

  creatAC: {
    color: THEME.primary,
    fontFamily: FONTFAMILY.SemiBold,
    fontSize: handleSize.f(FONT_SIZES.onefour),
    textDecorationLine: 'underline',
  },

  // ---------- Popup Modal ----------
  modal: {
    backgroundColor: 'rgba(64,64,65,0.92)',
    borderRadius: handleSize.f(16),
    padding: handleSize.f(24),
    alignItems: 'center',
  },

  closeBtn: {
    position: 'absolute',
    top: handleSize.h(10),
    right: handleSize.w(15),
  },

  closeText: {
    fontSize: handleSize.f(FONT_SIZES.foureight),
    color: THEME.white,
  },

  iconCircle: {
    backgroundColor: THEME.primary,
    borderRadius: handleSize.f(100),
    width: handleSize.w(56),
    height: handleSize.h(56),
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: handleSize.h(23),
  },

  forgetTxtpop: {
    width: '100%',
    marginTop: handleSize.h(30),
    marginBottom: handleSize.h(20),
  },

  titles: {
    fontFamily: FONTFAMILY.SemiBold,
    fontSize: handleSize.f(FONT_SIZES.twosix),
    color: THEME.white,
    textAlign: 'center',
    marginTop: handleSize.h(10),
  },

  description: {
    marginTop: handleSize.h(10),
    fontFamily: FONTFAMILY.Medium,
    fontSize: handleSize.f(FONT_SIZES.onesix),
    color: THEME.white,
    textAlign: 'center',
    lineHeight: handleSize.h(20),
  },
});

export default styles;
