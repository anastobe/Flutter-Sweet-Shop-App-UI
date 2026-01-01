import React from 'react';
import { Image, StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { FONTFAMILY, FONT_SIZES, THEME } from '../styles';
import { Images } from '../config';
import { handleSize } from '../config/responsiveTheme';
import { CommonUtils } from '../utils';

type CardFeatureButton = {
  icon: any;
  text: string;
  width?: number;
  height?: number;
};

type Props = {
  features: CardFeatureButton[];
  buttonColor?: string;
  iconColor?: string;
  onPressbtn?: (feature: CardFeatureButton) => void;
};

const CardFeatureButtons: React.FC<Props> = ({
  features,
  buttonColor = '#615d87',
  iconColor = THEME.white,
  onPressbtn,
}) => {


  return (
    <View style={styles.container}>
      {features.map((feature, index) => (
        <View key={index} style={styles.featureItem}>
          <TouchableOpacity
            onPress={() => onPressbtn && onPressbtn(feature)}
            style={[styles.button, { backgroundColor: buttonColor }]}
          >
            <Image
              style={{
                width: feature.width ? handleSize.w(feature.width) : handleSize.w(27),
                height: feature.height ? handleSize.h(feature.height) : handleSize.h(27),
              }}
              source={feature.icon}
              resizeMode="contain"
            />
          </TouchableOpacity>
          <Text style={styles.label}>{CommonUtils.firstCapitaAllSmall(feature.text)}</Text>
        </View>
      ))}
    </View>
  );
};

const BUTTON_SIZE = handleSize.f(54);

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    marginHorizontal: 0,
    justifyContent: 'space-evenly',
    alignItems: 'center',
    marginTop: handleSize.h(15),
  },
  featureItem: {
    alignItems: 'center',
    height: BUTTON_SIZE + handleSize.h(20), // button + label spacing
  },
  button: {
    width: BUTTON_SIZE,
    height: BUTTON_SIZE,
    borderRadius: BUTTON_SIZE / 2,
    borderWidth: handleSize.f(0.7),
    borderColor: THEME.white,
    justifyContent: 'center',
    alignItems: 'center',
  },
  label: {
    fontSize: handleSize.f(FONT_SIZES.oneone),
    fontFamily: FONTFAMILY.Medium,
    color: THEME.white,
    textAlign: 'center',
    marginTop: handleSize.h(8),
  },
});

export default CardFeatureButtons;
