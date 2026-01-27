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
  btnSize?: any;
  txtSize?: any;
  txtLineHeight?: any;
};

const CardFeatureButtons: React.FC<Props> = ({
  features,
  buttonColor = '#615d87',
  iconColor = THEME.white,
  onPressbtn,
  btnSize,
  txtSize,
  txtLineHeight
}) => {


  return (
    <View style={styles.container}>
      {features?.map((feature, index) => (
        <View key={index} style={[styles.featureItem,{ height: btnSize + handleSize.h(20) }]}>
          <TouchableOpacity
            onPress={() => onPressbtn && onPressbtn(feature)}
            style={[styles.button, { width: btnSize, height: btnSize },{ backgroundColor: buttonColor }]}
          >
            <Image
              style={{
                width: feature.width ? handleSize.f(feature.width) : handleSize.f(27),
                height: feature.height ? handleSize.f(feature.height) : handleSize.f(27),
              }}
              tintColor={THEME.white}
              source={feature.icon}
              resizeMode="contain"
            />
          </TouchableOpacity>
          <Text style={[styles.label,{ fontSize: handleSize.f(txtSize), lineHeight: txtLineHeight, }]}>{CommonUtils.firstCapitaAllSmall(feature.text)}</Text>
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    marginHorizontal: 0,
    justifyContent: 'space-evenly',
    alignItems: 'center',
    marginTop: handleSize.h(15),
  },
  featureItem: {
    alignItems: 'center'
  },
  button: {
    borderRadius: 50,
    borderWidth: handleSize.f(0.7),
    borderColor: THEME.white,
    justifyContent: 'center',
    alignItems: 'center',
  },
  label: {
    fontFamily: FONTFAMILY.Medium,
    color: THEME.white,
    textAlign: 'center',
    marginTop: handleSize.h(8),
  },
});

export default CardFeatureButtons;
