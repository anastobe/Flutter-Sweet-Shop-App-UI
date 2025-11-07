import React from 'react';
import { TouchableOpacity, Text, StyleSheet, StyleProp, ViewStyle, Image } from 'react-native';
import { FONT_SIZES, FONTFAMILY, THEME } from '../styles';
import { scale } from 'react-native-size-matters';
import { ActivityIndicator } from 'react-native';

const CustomButton = ({
  title,
  onPress,
  btnContSty,
  txtColor,
  image,
  showmyStyleOnly,
  loading = false,
  tintColor
}: {
  title: string;
  onPress: any;
  btnContSty?: StyleProp<ViewStyle>;
  txtColor?: any;
  image?: any;
  showmyStyleOnly?: any
  loading?: boolean;
  tintColor?: any
}) => (
  <TouchableOpacity
    style={[showmyStyleOnly ? btnContSty : styles.button, btnContSty]}
    onPress={onPress}
    disabled={loading} // Disable button while loading
  >
    {loading ? (
      <ActivityIndicator size="small" color={THEME.textPrimary} />
    ) : (
      <>
        {image && <Image source={image} resizeMode='contain' tintColor={tintColor} style={{ width: 20, height: 20, marginRight: 6 }} />}
        <Text style={[showmyStyleOnly ? txtColor : styles.buttonText, txtColor]}>
          {title}
        </Text>
      </>
    )}
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  button: {
    backgroundColor: THEME.primary,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: 'center',
    height: scale(55),

  },
  buttonText: {
    color: THEME.textPrimary,
    fontFamily: FONTFAMILY.Regular,
    fontSize: FONT_SIZES.oneeight
  },
});

export default CustomButton;
