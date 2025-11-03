import React, { useState } from 'react';
import { View, StyleSheet, Image, Text, TouchableOpacity, Pressable } from 'react-native';
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

type CreateAccountProps = {};

export const CreateAccount: React.FC<CreateAccountProps> = ({ ...props }) => {

  const navigation = useNavigation();

    const [firstName, setfirstName] = useState('');
    const [lastName, setlastName] = useState('');
    const [businessEmail, setbusinessEmail] = useState('');
    const [password, setpassword] = useState('');
    const [confirmPassword, setconfirmPassword] = useState('');

    const [secure, setSecure] = useState(true);
    const [secure2, setSecure2] = useState(true);
    
  return (
    <MainContainer isFlatList={true} barStyle="dark-content" customeStyle={{ paddingHorizontal: 20 }} mainContainerStyle={styles.container}>
      <Image source={Images.logo} style={styles.logo} />

      <Text style={styles.title}>Create Account</Text>
      
        <View style={{ flexDirection: "row", justifyContent: "space-between" }} >
          <InputField
            customInpStyle={{ width: METRICS.width /2 - 25 }}
            marginTp={20}
            autoCapital={'none'}
            blurOnSubmit={false}
            placeholder="First Name"
            value={firstName}
            onChangeText={setfirstName}
          />
          <InputField
            customInpStyle={{ width: METRICS.width /2 - 25 }}
            marginTp={20}
            autoCapital={'none'}
            blurOnSubmit={false}
            placeholder="Last Name"
            value={lastName}
            onChangeText={setlastName}
          />
        </View>

        <InputField
            margTp={20}
            marginTp={20}
            autoCapital={'none'}
            blurOnSubmit={false}
            placeholder="Business / Personal Email Address"
            value={firstName}
            onChangeText={setfirstName}
        />


          <InputField
            margTp={20}
            image={secure ? "eye-off-outline" : "eye-outline" }
            autoCapital={'none'}
            blurOnSubmit={false}
            secureEntry={secure}
            placeholder="Password"
            value={password}
            onPress={()=>{ setSecure(!secure) }}
            onChangeText={setpassword}
            imagetintColor={THEME.gray}
            maxlen={30}
          />

        <InputField
            margTp={20}
            image={secure ? "eye-outline" : "eye-outline" }
            // imagetintColor={THEME.primary}
            autoCapital={'none'}
            secureEntry={secure2}
            blurOnSubmit={false}
            placeholder="Confirm New Password"
            value={confirmPassword}
            onPress={()=>{ setSecure2(!secure2) }}
            onChangeText={setconfirmPassword}
            imagetintColor={THEME.gray}
            maxlen={30}
        />

      <CustomButton
        btnContSty={styles.forgetTxt}
        title="Create Account"
        onPress={() => {
          console.log("Login pressed");
        }}
      />


      <View style={styles.contText} >
          <Text style={styles.dontAcc}>Already have an account?</Text>
          <Pressable onPress={()=>{ navigation.goBack() }} >
            <Text style={styles.creatAC}> Sign in</Text>
          </Pressable>
      </View>

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
    height: scale(55),
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
    marginBottom: scale(30),
    marginTop: METRICS.height / 5 - 20,
    textAlign: "center"
  },
  errorCont:
  {backgroundColor: THEME.lightPink, flexDirection: "row", height: scale(83), alignItems: "center", borderRadius: 10, marginBottom: 20 },
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

export default CreateAccount;
