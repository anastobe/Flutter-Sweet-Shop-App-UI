import React, { useState } from 'react';
import { View, StyleSheet, Image, Text, TouchableOpacity } from 'react-native';
import CustomButton from '../../components/customButton';
import CustomTextField from '../../components/customTextField';
import Images from '../../config/images';
import { Auth_ROUTES } from '../../constants';
import { useNavigation } from '@react-navigation/native';
import { FONTFAMILY, FONT_SIZES, METRICS, THEME } from '../../styles'; // Assuming you have this structure
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { MainContainer, Modal } from '../../components';
import InputField from '../../components/textInput';
import { scale } from 'react-native-size-matters';
import { ImageBackground } from 'react-native';

type ForgetPasswordProps = {};

export const ForgetPassword: React.FC<ForgetPasswordProps> = ({...props}) => {

  const navigation = useNavigation();

    const [email, setemail] = useState('');
    const [Open, setOpen] = useState(false);
    const [secure, setSecure] = useState(true);
    
  function renderPOPUP() {
    return(
       <ImageBackground imageStyle={{   borderRadius: 16,}} source={Images.bottogSheetGradient} style={styles.modal}>

          <TouchableOpacity style={styles.closeBtn} onPress={()=>{ setOpen(false) }} >
            <Text style={styles.closeText}>×</Text>
          </TouchableOpacity>

      
            <View style={styles.iconCircle}>
              <Image
                source={Images.mail}
                style={styles.icon}
              />
            </View>
        

          <Text style={styles.titles}>Check Your Email</Text>
          <Text style={styles.description}>
            If an account exists for <Text style={{ fontWeight: '600' }}>{email}</Text>, an email with password reset instructions has been sent. The link will be valid for <Text style={{ fontWeight: '600' }}>60 minutes</Text>.
          </Text>

         <CustomButton
            btnContSty={styles.forgetTxt}
            title="Okay"
            onPress={() => {

              setOpen(false)
              setTimeout(() => {
               navigation.navigate(Auth_ROUTES.SETPASSWORD)                
              }, 1000);


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
    <MainContainer isFlatList={true} barStyle="dark-content" customeStyle={{ paddingHorizontal: 20 }} mainContainerStyle={styles.container}>
      <Image source={Images.logo} style={styles.logo} />

      <Text style={styles.title}>Forgot Your{`\n`}Password?</Text>
      <Text style={styles.titlesub}>No problem. Enter the email address associated with your Frontier Pay account, and we'll send you a link to reset your password.</Text>

        <InputField
            marginTp={20}
            autoCapital={'none'}
            blurOnSubmit={false}
            placeholder="Email address"
            value={email}
            onChangeText={setemail}
            keyboardType={'email-address'}
            margBtm={0}
          />


      <CustomButton
        btnContSty={styles.forgetTxt}
        title="Send Reset Link"
        onPress={() => {
          //  navigation.navigate(Auth_ROUTES.SETPASSWORD)
          setOpen(true)
        }}
      />

      <TouchableOpacity onPress={() => navigation.goBack()}>
        <Text style={styles.forgotText}>Back to Login</Text>
      </TouchableOpacity>

      {renderModal()}

    </MainContainer >
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: THEME.white
  },
  logo: {
   width: METRICS.width,
    height: scale(60),
    resizeMode: 'contain',
    alignSelf: "center",
    marginTop: 45
  },
  forgetTxt:
  { marginTop: 20, marginBottom: 20, width: '100%' },
  title: {
    color: THEME.primary,
    fontFamily: FONTFAMILY.Light,
    fontSize: FONT_SIZES.threesix,
    marginBottom: scale(10),
    marginTop: METRICS.height / 5,
    textAlign: "center",
    lineHeight: 35
  },
  titlesub:{
    color: THEME.primary,
    fontFamily: FONTFAMILY.Light,
    fontSize: FONT_SIZES.onesix,
    marginBottom: scale(40),
    textAlign: "center"
  },
  forgotText: {
    color: THEME.primary,
    fontFamily: FONTFAMILY.Medium,
    fontSize: FONT_SIZES.onesix,
    textAlign: 'center',
    marginTop: 10,
    paddingBottom: 40
  },
  contText:
  { flexDirection: "row", justifyContent: "center", paddingBottom: 50 },
  dontAcc: {
    color: THEME.primary,
    fontFamily: FONTFAMILY.Medium,
    fontSize: FONT_SIZES.onesix,
  },
  creatAC:{
    color: THEME.prinkishBlue,
    fontFamily: FONTFAMILY.Medium,
    fontSize: FONT_SIZES.onesix,
  },



  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
   modal: {
    // backgroundColor: '#fff',
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
    fontSize: 24,
    color: '#888',
  },
  iconCircle: {
    backgroundColor: '#a1f0ff',
    borderRadius: 50,
    width: scale(48),
    height: scale(48),
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10
  },
  icon: {
    width: scale(30),
    height: scale(30),
    resizeMode: "contain"
  },
  titles: {
    fontFamily: FONTFAMILY.Light,
    fontSize: FONT_SIZES.threetwo,
    color: THEME.primary,
    textAlign: 'center',
  },
  description: {
    marginTop: 10,
    fontFamily: FONTFAMILY.Light,
    fontSize: FONT_SIZES.onefour,
    color: THEME.primary,
    textAlign: 'center',
    marginHorizontal: 20
  },
  okButton: {
    backgroundColor: '#e184ff',
    borderRadius: 25,
    width: '100%',
    paddingVertical: 12,
  },
  okText: {
    color: '#fff',
    textAlign: 'center',
    fontSize: 16,
  },

});

export default ForgetPassword;
