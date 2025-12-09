import React from 'react';
import { Image, StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { FONT_SIZES, FONTFAMILY, METRICS, THEME } from '../styles';
import { handleSize } from '../config/responsiveTheme';

const BUTTON_SIZE = handleSize.w(54);

type CardFeatureButton = {
  icon: string;
  onPress: () => void;
};

type Props = {
  features: any;
  buttonColor?: string;
  iconColor?: string;
  onPressbtn?: any;
};

const HomeCardFeatureButtons: React.FC<Props> = ({
  features,
  buttonColor = '#615d87',  // Default: purplish blue
  iconColor = THEME.white,   // Default: white
  onPressbtn
}) => {
  return (
    <View style={styles.container}>
      {features.map((feature: any, index: any) => (
        <View key={index} style={styles.featureItem}>
          <TouchableOpacity
            onPress={() => onPressbtn(feature)}
            style={[styles.button, { backgroundColor: index === 0 ? THEME.prinkishBlue : THEME.primary }]}
          >
            <Image 
              style={{ width: handleSize.w(feature.width), height: handleSize.h(feature.height) }}  
              source={feature.icon} 
              resizeMode='contain' 
            />
          </TouchableOpacity>
          <Text style={styles.label}>
            {feature?.text}
          </Text>
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: "space-evenly",
    alignItems: "center",
    marginTop: handleSize.h(17),
    paddingVertical: handleSize.h(10),
  },
  featureItem: {
    alignItems: 'center',
    height: BUTTON_SIZE,
    width: handleSize.w(METRICS.width / 2),
  },
  button: {
    width: BUTTON_SIZE,
    height: BUTTON_SIZE,
    borderRadius: handleSize.f(100),
    justifyContent: 'center',
    alignItems: 'center',
  },
  label: {
    fontSize: handleSize.f(FONT_SIZES.oneone),
    fontFamily: FONTFAMILY.Medium,
    color: THEME.white,
    textAlign: 'center',
    marginTop: handleSize.h(5),
  },
});

export default HomeCardFeatureButtons;
