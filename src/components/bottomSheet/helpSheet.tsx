import React from 'react';
import { View, Text, StyleSheet, Image, ImageBackground } from 'react-native';
import { scale } from 'react-native-size-matters'; // if you're using scale
import { THEME, FONTFAMILY, FONT_SIZES } from '../../styles'; // adjust path as needed
import { Images } from '../../config';
import CustomButton from '../customButton';
import InputField from '../textInput';
import CardBox from '../cardBox';

const HelpSheet = ({ 
    title, 
    subtitle, 
    style, 
    onPress1,
    onPress2
    } : { 
      title: any, 
      subtitle: any, 
      style: any, 
      onPress1: any,
      onPress2: any,
    }) => {
    return (
        <ImageBackground resizeMode="cover" source={Images.manageCardGradient} style={style}>

            <Text style={styles.title}>{title}</Text>
            <Text style={styles.titlesub}>{subtitle}</Text>

          <CardBox
            rotate={'-45deg'}
            titleLeft="support@frountier-pay.com"
            iconRight="arrow-forward-outline"
            iconLeft="mail-outline"
            TL_radius={10}
            TR_radius={10}
            onPress={onPress1}
          />
          <CardBox
            rotate={'-45deg'}
            titleLeft="+44 20 7946 0991"
            iconRight="arrow-forward-outline"
            iconLeft="call-outline"
            TL_radius={10}
            TR_radius={10}
            onPress={onPress2}
          />

        </ImageBackground>
    );
};

export default HelpSheet;

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
        marginTop: 5,
        marginBottom: 20
    },
forgetTxt:{
    marginTop: 20
}

});
