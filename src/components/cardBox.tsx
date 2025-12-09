import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { FONTFAMILY, FONT_SIZES, THEME } from '../styles';
import Icon from 'react-native-vector-icons/Ionicons';
import LinearGradient from 'react-native-linear-gradient';
import { Images } from '../config';
import { handleSize } from '../config/responsiveTheme';

interface Props {
  rotate?: any;
  titleLeft: string;
  iconRight?: string;
  iconLeft?: string;
  TL_radius?: number;
  TR_radius?: number;
  BL_radius?: number;
  BR_radius?: number;
  onPress?: () => void;
}

export const CardBox: React.FC<Props> = ({
  rotate,
  titleLeft,
  iconRight,
  iconLeft,
  TL_radius = 10,
  TR_radius = 10,
  BL_radius = 10,
  BR_radius = 10,
  onPress,
}) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <LinearGradient
        colors={[THEME.whitergba, THEME.whitergba, THEME.whitergba]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={[
          styles.boxContainer,
          {
            borderTopRightRadius: handleSize.f(TR_radius),
            borderTopLeftRadius: handleSize.f(TL_radius),
            borderBottomRightRadius: handleSize.f(BR_radius),
            borderBottomLeftRadius: handleSize.f(BL_radius),
          },
        ]}
      >
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          {iconLeft && (
            <View
              style={{
                width: handleSize.w(36),
                height: handleSize.h(36),
                backgroundColor: THEME.primary,
                justifyContent: 'center',
                alignItems: 'center',
                borderRadius: handleSize.f(8),
                marginRight: handleSize.w(10),
              }}
            >
              <Icon name={iconLeft} size={handleSize.f(20)} color={THEME.textPrimary} />
            </View>
          )}

          <View>
            <Text style={styles.boxTitleText}>{titleLeft}</Text>
          </View>
        </View>

        <View>
          <Image style={{ width: handleSize.w(22), height: handleSize.h(22) }} source={Images.arrow} />
          {/* <Icon name={iconRight} size={handleSize.f(24)} color={THEME.primary} /> */}
        </View>
      </LinearGradient>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  boxContainer: {
    flexDirection: 'row',
    height: handleSize.h(55),
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: handleSize.w(10),
    marginTop: handleSize.h(8),
  },
  boxTitleText: {
    fontFamily: FONTFAMILY.Medium,
    fontSize: handleSize.f(FONT_SIZES.onefour),
    color: THEME.white,
  },
});

export default CardBox;
