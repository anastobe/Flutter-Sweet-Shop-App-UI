import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { FONT_SIZES, FONTFAMILY, THEME } from '../styles';
import { handleSize } from '../config/responsiveTheme';

const BUTTON_SIZE = handleSize.w(24);

type CardFeatureButton = {
  icon: string;
  onPress: () => void;
  text?: string;
};

type Props = {
  features?: CardFeatureButton[];
  iconColor?: string;
};

const CardDetailOptions: React.FC<Props> = ({
  features = [],
  iconColor = '#FFFFFF',
}) => {
  return (
    <View style={styles.container}>
      {features.map((feature, index) => (
        <View key={index} style={styles.featureItem}>
          <TouchableOpacity onPress={feature.onPress} style={styles.button}>
            <Icon name={feature.icon} size={handleSize.f(25)} color={iconColor} />
          </TouchableOpacity>
          {feature.text && <Text style={styles.label}>{feature.text}</Text>}
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    marginHorizontal: handleSize.w(20),
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: handleSize.h(20),
    backgroundColor: THEME.textPrimary,
    borderRadius: handleSize.f(20),
    height: handleSize.h(150),
    flexWrap: 'wrap',
  },
  featureItem: {
    alignItems: 'center',
    justifyContent: 'center',
    width: '33%',
    height: handleSize.h(75),
  },
  button: {
    width: BUTTON_SIZE,
    height: BUTTON_SIZE,
    borderRadius: BUTTON_SIZE / 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  label: {
    fontSize: handleSize.f(FONT_SIZES.onetwo),
    fontFamily: FONTFAMILY.Medium,
    color: THEME.primary,
    marginTop: handleSize.h(5),
  },
});

export default CardDetailOptions;
