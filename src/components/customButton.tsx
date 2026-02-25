import React from 'react';
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  StyleProp,
  ViewStyle,
  Image,
} from 'react-native';
import { FONT_SIZES, FONTFAMILY, THEME } from '../styles';
import { ActivityIndicator } from 'react-native';
import { handleSize } from '../config/responsiveTheme';

const CustomButton = ({
  indicatorColor,
  title,
  onPress,
  btnContSty,
  txtColor,
  image,
  showmyStyleOnly,
  loading = false,
  tintColor,
}: {
  indicatorColor: string;
  title: string;
  onPress: any;
  btnContSty?: StyleProp<ViewStyle>;
  txtColor?: any;
  image?: any;
  showmyStyleOnly?: any;
  loading?: boolean;
  tintColor?: any;
}) => (
  <TouchableOpacity
    style={[showmyStyleOnly ? btnContSty : styles.button, btnContSty]}
    onPress={onPress}
    disabled={loading}
  >
    {loading ? (
      <ActivityIndicator
        size="small"
        color={indicatorColor ? indicatorColor : THEME.textPrimary}
        style={{ padding: handleSize.f(4) }}
      />
    ) : (
      <>
        {image && (
          <Image
            source={image}
            resizeMode="contain"
            tintColor={tintColor}
            style={styles.img}
          />
        )}

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
    borderRadius: handleSize.f(10),
    justifyContent: 'center',
    alignItems: 'center',
    height: handleSize.h(56),
    flexDirection: 'row',
  },

  img: {
    width: handleSize.w(20),
    height: handleSize.h(20),
    marginRight: handleSize.w(6),
  },

  buttonText: {
    color: THEME.textPrimary,
    fontFamily: FONTFAMILY.Regular,
    fontSize: handleSize.f(FONT_SIZES.oneeight),
  },
});

export default CustomButton;
