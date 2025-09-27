import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { scale } from 'react-native-size-matters'; // if you're using scale
import { THEME, FONTFAMILY, FONT_SIZES } from '../../styles'; // adjust path as needed
import { Images } from '../../config';
import CustomButton from '../customButton';
import { ImageBackground } from 'react-native';

const FingerPrintContent = ({ title, subtitle, style, onPress, img }:{ title:any, subtitle:any, style:any, onPress: any, img: any }) => {
  return (
    <ImageBackground resizeMode="cover" source={Images.bottogSheetGradient} style={style}>


        <View style={{ width: 70, height: 8, backgroundColor: THEME.lightGrey, alignSelf: "center", borderRadius: 20, marginTop: 8 }} />

      <Text style={styles.title}>{title}</Text>
      <Text style={styles.titlesub}>{subtitle}</Text>

      <View style={{ alignItems: "center", marginTop: 35 }} >
       <Image tintColor={THEME.white} source={img} style={{ width: scale(60), height: scale(60) }} resizeMode='contain' />
      </View> 

       <Text style={styles.titlesubbelow}>Having trouble?</Text>

       <CustomButton
        btnContSty={styles.forgetTxt}
        title="Use Password"
        onPress={onPress}
      />


    </ImageBackground>
  );
};

export default FingerPrintContent;

const styles = StyleSheet.create({
  title: {
    color: THEME.primary,
    fontFamily: FONTFAMILY.Light,
    fontSize: FONT_SIZES.threetwo,
    textAlign: "center",
    lineHeight: 35,
    marginTop: 30
  },
  titlesub: {
    color: THEME.white,
    fontFamily: FONTFAMILY.Light,
    fontSize: FONT_SIZES.onesix,
    textAlign: "center",
    marginTop: 5
  },
  titlesubbelow:{
    color: THEME.white,
    fontFamily: FONTFAMILY.Light,
    fontSize: FONT_SIZES.onesix,
    textAlign: "center",
    marginTop: 20
  },
    forgetTxt:
  { marginTop: 20, marginBottom: 20 },


});
