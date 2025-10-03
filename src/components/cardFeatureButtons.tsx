import React from 'react';
import { StyleSheet, Text } from 'react-native';
import { View, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { FONT_SIZES, FONTFAMILY, THEME } from '../styles';

const BUTTON_SIZE = 56;

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
      {features.map((feature, index) => (
        <View key={index} style={styles.featureItem}>
          <TouchableOpacity
            onPress={()=>onPressbtn(feature)}
            style={[styles.button, { backgroundColor: buttonColor }]}
          >
            <Icon name={feature.icon} size={25} color={iconColor} />
          </TouchableOpacity>
          <Text style={styles.label}>
            {feature.text}
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
    marginVertical: 10,
    marginTop:20
  },
  featureItem: {
    alignItems: 'center',
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
    fontSize: FONT_SIZES.onetwo,
    fontFamily: FONTFAMILY.Medium,
    color: THEME.primary,
    textAlign: 'center',
    marginTop: 5,
  },
});

export default CardFeatureButtons;