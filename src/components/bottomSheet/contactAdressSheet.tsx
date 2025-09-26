import React from 'react';
import { View, Text, StyleSheet, Image, ImageBackground } from 'react-native';
import { scale } from 'react-native-size-matters'; // if you're using scale
import { THEME, FONTFAMILY, FONT_SIZES } from '../../styles'; // adjust path as needed
import { Images } from '../../config';
import CustomButton from '../customButton';
import InputField from '../textInput';

const ContactAdressSheet = ({ 
    title, 
    subtitle, 
    style, 
    onPress,
    confirmPassword,
    setconfirmPassword,
    secure,
    setSecure,
    } : { 
      title: any, 
      subtitle: any, 
      style: any, 
      onPress: any,
      confirmPassword: any,
      setconfirmPassword: any,
      secure: any,
      setSecure: any,
    }) => {
    return (
        <ImageBackground resizeMode="cover" source={Images.bottogSheetGradient} style={style}>

            <Text style={styles.title}>{title}</Text>
            <Text style={styles.titlesub}>{subtitle}</Text>

            <InputField
                margTp={20}
                image={secure ? "eye-off-outline" : "eye-outline"}
                autoCapital={'none'}
                secureEntry={secure}
                blurOnSubmit={false}
                placeholder="Confirm New Password"
                value={confirmPassword}
                onPress={() => { setSecure(!secure) }}
                onChangeText={setconfirmPassword}
                imagetintColor={THEME.white}
            />

            <CustomButton
                btnContSty={styles.forgetTxt}
                title="Use Password"
                onPress={onPress}
            />


        </ImageBackground>
    );
};

export default ContactAdressSheet;

const styles = StyleSheet.create({
    title: {
        color: THEME.white,
        fontFamily: FONTFAMILY.SemiBold,
        fontSize: FONT_SIZES.twosix,
        textAlign: "center",
        lineHeight: 35,
        marginTop: 30
    },
    titlesub: {
        color: THEME.white,
        fontFamily: FONTFAMILY.Regular,
        fontSize: FONT_SIZES.onesix,
        textAlign: "center",
        marginTop: 5
    },
forgetTxt:{
    marginTop: 20
}

});
