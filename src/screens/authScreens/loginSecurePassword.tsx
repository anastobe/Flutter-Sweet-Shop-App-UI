import React, { useState } from 'react';
import { View, StyleSheet, Image, Text, TouchableOpacity } from 'react-native';
import CustomButton from '../../components/customButton';
import CustomTextField from '../../components/customTextField';
import Images from '../../config/images';
import { Auth_ROUTES } from '../../constants';
import { useNavigation } from '@react-navigation/native';
import { FONTFAMILY, FONT_SIZES, METRICS, THEME } from '../../styles'; // Assuming you have this structure
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { MainContainer } from '../../components';
import InputField from '../../components/textInput';
import { scale } from 'react-native-size-matters';
import Icon from 'react-native-vector-icons/Ionicons';
import StatusBarManager from '../../components/statusBarManager';


type LoginSecurePasswordProps = {};

export const LoginSecurePassword: React.FC<LoginSecurePasswordProps> = ({...props}) => {

  const navigation = useNavigation();

    const [password, setpassword] = useState('');
    const [newpassword, setnewpassword] = useState('');
    const [secure, setSecure] = useState(true);
    const [secure2, setSecure2] = useState(true);
    
    const rules = {
        minLength: (text: any) => text.length >= 8,
        lowerCase: (text: any) => /[a-z]/.test(text),
        upperCase: (text: any) => /[A-Z]/.test(text),
        number: (text: any) => /\d/.test(text),
        specialChar: (text: any) => /[!@#$%^&*]/.test(text),
    };


    function renderRule(iconCondition:any,txt:any) {
        return(
          <View style={{ flexDirection: "row", paddingVertical: 5 }} >
            <Icon name={iconCondition ?  "checkmark-circle-outline" : "close-circle-outline"} size={25} color={iconCondition ? THEME.lightred :  THEME.green  } />
            <Text style={{ marginLeft: 5 }}>{txt}</Text>
          </View>
        )
    }

  return (
    <MainContainer isFlatList={true} barStyle="dark-content" customeStyle={{ paddingHorizontal: 20 }} mainContainerStyle={styles.container}>
      <StatusBarManager
        backgroundColor={THEME.darkSecondary} 
        barStyle="light-content" 
      />

      <Image source={Images.logo} style={styles.logo} />

      <Text style={styles.title}>Create Your Secure Password</Text>
      <Text style={styles.titlesub}>For your security, please create a new password for your Frontier Pay account.</Text>

 
          <InputField
            marginTp={20}
            image={secure ? "eye-off-outline" : "eye-outline" }
            autoCapital={'none'}
            blurOnSubmit={false}
            secureEntry={secure}
            placeholder="Password"
            value={password}
            onPress={()=>{ setSecure(!secure) }}
            onChangeText={setpassword}
            margBtm={20}
            imagetintColor={THEME.white}
            maxlen={30}
          />

            {renderRule(rules.minLength(password), 'Minimum 8 characters')}
            {renderRule(rules.lowerCase(password), 'At least one lower case letter')}
            {renderRule(rules.upperCase(password), 'At least one upper case letter')}
            {renderRule(rules.number(password), 'At least one number')}
            {renderRule(rules.specialChar(password), 'At least 1 special character (e.g., !@#$%^&*)')}
         
          <InputField
            margTp={20}
            image={secure ? "eye-outline" : "eye-outline" }
            // imagetintColor={THEME.primary}
            autoCapital={'none'}
            secureEntry={secure2}
            blurOnSubmit={false}
            placeholder="Confirm New Password"
            value={newpassword}
            onPress={()=>{ setSecure2(!secure2) }}
            onChangeText={setnewpassword}
            imagetintColor={THEME.white}
            maxlen={30}
          />

      <CustomButton
        btnContSty={styles.forgetTxt}
        title="Set New Password"
        onPress={() => {
          console.log("Login pressed");
        }}
      />

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
    height: 56,
    resizeMode: 'contain',
    alignSelf: "center",
    marginTop: 45
  },
  forgetTxt:
  { marginTop: 20, marginBottom: 20 },
  title: {
    color: THEME.primary,
    fontFamily: FONTFAMILY.Light,
    fontSize: FONT_SIZES.threesix,
    marginBottom: scale(10),
    marginTop: scale(80),
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
  }
});

export default LoginSecurePassword;