import React from 'react';
import { Image, StyleSheet, Text } from 'react-native';
import { View, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { FONT_SIZES, FONTFAMILY, THEME } from '../styles';
import { scale } from 'react-native-size-matters';
import Metrics from '../styles/metrics';
import { Images } from '../config';

const BUTTON_SIZE = 54

type CardFeatureButton = {
  icon: string;
  onPress: () => void;
};

type Props = {
  features: any;
  buttonColor?: string;
  iconColor?: string;
  onPressbtn?: any
};

const CardFeatureButtons: React.FC<Props> = ({
  features,
  buttonColor = '#615d87',  // Default: purplish blue
  iconColor = THEME.white,     // Default: white
  onPressbtn
}) => {
  return (
<View style={styles.container}>
      {features.map((feature: any, index: any) => (
        <View key={index} style={styles.featureItem}>
          <TouchableOpacity
            onPress={()=>onPressbtn(feature)}
            style={[styles.button, { backgroundColor: buttonColor }]}
          >
            <Image style={{ width: 22, height: 22 }}  source={feature.icon} resizeMode='contain' />
            {/* <Icon name={feature.icon} size={scale(27)} color={iconColor} /> */}
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
    marginHorizontal: 20,
    justifyContent: "space-evenly", 
    alignItems: "center",
    marginTop:15 
  },
  featureItem: {
    alignItems: 'center',
    height: BUTTON_SIZE,
  },
  button: {
    width: BUTTON_SIZE,
    height: BUTTON_SIZE,
    borderRadius: 100,
    borderWidth:0.7,
    borderColor: THEME.white,
    justifyContent: 'center',
    alignItems: 'center',
  },
  label: {
    fontSize: FONT_SIZES.oneone,
    fontFamily: FONTFAMILY.Medium,
    color: THEME.white,
    textAlign: 'center',
    marginTop: 5,
  },
});

export default CardFeatureButtons;