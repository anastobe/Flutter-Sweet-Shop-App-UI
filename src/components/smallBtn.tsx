import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import { THEME } from '../styles';
import { handleSize } from '../config/responsiveTheme';

type SmallBtnProps = {
  title: string;
  onPress: () => void;
  style?: any;
};

const SmallBtn = ({ title, onPress, style }: SmallBtnProps) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.8}
      style={[styles.container, style]}
    >
      <Text style={styles.text}>{title}</Text>
    </TouchableOpacity>
  );
};

export default SmallBtn;

const styles = StyleSheet.create({
  container: {
    alignSelf: 'center',
    backgroundColor: THEME.SlateBlue,
    paddingHorizontal: handleSize.w(20),
    paddingVertical: handleSize.h(8),
    borderRadius: handleSize.h(20),
    marginTop: handleSize.h(16),
  },
  text: {
    color: THEME.white,
    fontWeight: '600',
  },
});
