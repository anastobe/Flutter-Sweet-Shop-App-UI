// FingerPrintContent.tsx
import React from 'react';
import { View, Text, StyleSheet, ImageBackground, TouchableOpacity, ScrollView } from 'react-native';
import { THEME, FONTFAMILY, FONT_SIZES } from '../../styles';
import { Images } from '../../config';
import CustomButton from '../customButton';
import { handleSize } from '../../config/responsiveTheme';

type Props = {
  refrence: any;
  title: string;
  subtitle?: string;
  style?: any;
  onPress: () => void;
  onPress2: () => void;
  img?: any;
};

const FingerPrintContent: React.FC<Props> = ({ refrence, title, subtitle, style, onPress,onPress2,  img }) => {
  return (
    <ImageBackground resizeMode="cover" source={Images.addCardGradient} style={style}>
      <ScrollView style={{ marginTop: handleSize.h(10) }} showsVerticalScrollIndicator={false}>
        <Text style={styles.title}>{title}</Text>

        <TouchableOpacity onPress={onPress}>
          <Text style={styles.titlesubbelow}>Having trouble?</Text>
        </TouchableOpacity>

        <CustomButton
          btnContSty={styles.forgetTxt}
          title="Use password"
          onPress={onPress2}
        />
      </ScrollView>
    </ImageBackground>
  );
};

export default FingerPrintContent; 

const styles = StyleSheet.create({
  title: {
    color: THEME.white,
    fontFamily: FONTFAMILY.Light,
    fontSize: handleSize.f(FONT_SIZES.threezero),
    textAlign: "center",
    lineHeight: handleSize.h(35),
    marginTop: handleSize.h(30),
  },
  titlesub: {
    color: THEME.white,
    fontFamily: FONTFAMILY.Light,
    fontSize: handleSize.f(FONT_SIZES.onesix),
    textAlign: "center",
    marginTop: handleSize.h(5),
  },
  titlesubbelow: {
    color: THEME.white,
    fontFamily: FONTFAMILY.Light,
    fontSize: handleSize.f(FONT_SIZES.onesix),
    textAlign: "center",
    marginTop: handleSize.h(20),
  },
  forgetTxt: {
    marginTop: handleSize.h(20),
    marginBottom: handleSize.h(20),
    width: '100%',
  },
});
