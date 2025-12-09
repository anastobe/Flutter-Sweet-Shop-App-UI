import React from 'react';
import { View, Text, StyleSheet, ImageBackground, ScrollView } from 'react-native';
import { THEME, FONTFAMILY, FONT_SIZES } from '../../styles';
import { Images } from '../../config';
import CustomButton from '../customButton';
import InputField from '../textInput';
import { handleSize } from '../../config/responsiveTheme';

const ContactAdressSheet = ({
  title,
  subtitle,
  style,
  onPress,
  confirmPassword,
  setconfirmPassword,
  secure,
  setSecure,
}) => {
  return (
    <ImageBackground
      resizeMode="cover"
      source={Images.addCardGradient}
      style={style}
    >
      <ScrollView
        style={{ marginTop: handleSize.h(10) }}
        showsVerticalScrollIndicator={false}
      >
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.titlesub}>{subtitle}</Text>

        <InputField
          margTp={handleSize.h(20)}
          image={secure ? 'eye-off-outline' : 'eye-outline'}
          autoCapital={'none'}
          secureEntry={secure}
          blurOnSubmit={false}
          placeholder="Confirm Password"
          value={confirmPassword}
          onPress={() => setSecure(!secure)}
          onChangeText={setconfirmPassword}
          imagetintColor={THEME.white}
          maxlen={30}
        />

        <CustomButton
          btnContSty={styles.forgetTxt}
          title="Confirm & Continue"
          onPress={onPress}
        />

        <View style={{ height: handleSize.h(10) }} />
      </ScrollView>
    </ImageBackground>
  );
};

export default ContactAdressSheet;

const styles = StyleSheet.create({
  title: {
    color: THEME.white,
    fontFamily: FONTFAMILY.SemiBold,
    fontSize: handleSize.f(FONT_SIZES.twosix),
    textAlign: 'center',
    lineHeight: handleSize.h(35),
    marginTop: handleSize.h(30),
  },

  titlesub: {
    color: THEME.white,
    fontFamily: FONTFAMILY.Regular,
    fontSize: handleSize.f(FONT_SIZES.onesix),
    textAlign: 'center',
    marginTop: handleSize.h(5),
  },

  forgetTxt: {
    marginTop: handleSize.h(20),
  },
});
