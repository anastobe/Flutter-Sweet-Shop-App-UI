import React, { useState } from 'react';
import { View, StyleSheet, Image, Text, TouchableOpacity } from 'react-native';
import CustomButton from '../../../components/customButton';
import CustomTextField from '../../../components/customTextField';
import Images from '../../../config/images';
import { Auth_ROUTES } from '../../../constants';
import { useNavigation } from '@react-navigation/native';
import { FONTFAMILY, FONT_SIZES, METRICS, THEME } from '../../../styles'; // Assuming you have this structure
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { MainContainer } from '../../../components';
import InputField from '../../../components/textInput';
import { scale } from 'react-native-size-matters';
import Icon from 'react-native-vector-icons/Ionicons';


type UpdatePasswordProps = {};

export const UpdatePassword: React.FC<UpdatePasswordProps> = ({...props}) => {

  const navigation = useNavigation();

    const [password, setpassword] = useState('');
    const [newpassword, setnewpassword] = useState('');
    const [confrmnewpassword, setconfrmnewpassword] = useState('');
    const [secure, setSecure] = useState(true);
    const [secure2, setSecure2] = useState(true);
    const [secure3, setSecure3] = useState(true);
    
    const rules = {
        minLength: (text: any) => text.length >= 8,
        lowerCase: (text: any) => /[a-z]/.test(text),
        upperCase: (text: any) => /[A-Z]/.test(text),
        number: (text: any) => /\d/.test(text),
        specialChar: (text: any) => /[!@#$%^&*]/.test(text),
    };

    function pressBackArrow() {
        navigation.goBack()
    }

    function renderRule(iconCondition:any,txt:any) {
        return(
          <View style={{ flexDirection: "row", paddingVertical: 5 }} >
            <Icon name={iconCondition ?  "checkmark-circle-outline" : "close-circle-outline"} size={25} color={iconCondition ? THEME.lightred :  THEME.green  } />
            <Text style={{ marginLeft: 5, fontSize: FONT_SIZES.onetwo, color: THEME.white, fontFamily: FONTFAMILY.Regular }}>{txt}</Text>
          </View>
        )
    }

  return (
    <MainContainer  showBackArrow={true} pressBackArrow={pressBackArrow} isFlatList={true} barStyle="dark-content" customeStyle={{ paddingHorizontal: 20 }} mainContainerStyle={styles.container}>
    
      <Text style={styles.title}>Update Password</Text> 
        
           <InputField
            margTp={20}
            margBtm={20}
            image={secure ? "eye-off-outline" : "eye-outline" }
            autoCapital={'none'}
            imagetintColor={THEME.primary}
            blurOnSubmit={false}
            secureEntry={secure}
            placeholder="Current Password"
            value={password}
            onPress={()=>{ setSecure(!secure) }}
            onChangeText={setpassword}
          />
        
         <InputField
            margBtm={20}
            image={secure2 ? "eye-outline" : "eye-outline" }
            // imagetintColor={THEME.primary}
            autoCapital={'none'}
            imagetintColor={THEME.primary}
            secureEntry={secure2}
            blurOnSubmit={false}
            placeholder="New Password"
            value={newpassword}
            onPress={()=>{ setSecure2(!secure2) }}
            onChangeText={setnewpassword}
          />

            {renderRule(rules.minLength(newpassword), 'Minimum 8 characters')}
            {renderRule(rules.lowerCase(newpassword), 'At least one lower case letter')}
            {renderRule(rules.upperCase(newpassword), 'At least one upper case letter')}
            {renderRule(rules.number(newpassword), 'At least one number')}
            {renderRule(rules.specialChar(newpassword), 'At least 1 special character (e.g., !@#$%^&*)')}
         

        <InputField
            margTp={10}
            margBtm={10}
            image={secure3 ? "eye-outline" : "eye-outline" }
            // imagetintColor={THEME.primary}
            autoCapital={'none'}
            secureEntry={secure3}
            blurOnSubmit={false}
            placeholder="Confirm New Password"
            value={confrmnewpassword}
            onPress={()=>{ setSecure3(!secure3) }}
            onChangeText={setconfrmnewpassword}
           imagetintColor={THEME.primary}
          />


       
      <CustomButton
        btnContSty={styles.forgetTxt}
        title="Update Password"
        onPress={() => {
          navigation.navigate(Auth_ROUTES.LOGIN)
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
    height: scale(60),
    resizeMode: 'contain',
    alignSelf: "center",
    marginTop: 45
  },
  forgetTxt:
  { marginTop: 20, marginBottom: 20 },
  title:
  {
    fontSize: FONT_SIZES.onesix,
    fontFamily: FONTFAMILY.SemiBold,
    color: THEME.primary,
    marginBottom: 10,
    marginTop:10
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

export default UpdatePassword;