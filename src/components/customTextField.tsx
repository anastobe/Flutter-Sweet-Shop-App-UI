import React from 'react';
import { TextInput, View, StyleSheet, TextInputProps } from 'react-native';
import { handleSize } from '../config/responsiveTheme';
import { FONT_SIZES } from '../styles';

const CustomTectField = (props: TextInputProps) => (
  <View style={styles.inputContainer}>
    <TextInput style={styles.input} {...props} placeholderTextColor="#888" />
  </View>
);

const styles = StyleSheet.create({
  inputContainer: {
    marginBottom: handleSize.h(15),
  },
  input: {
    height: handleSize.h(50),
    borderWidth: handleSize.f(1),
    borderColor: '#ccc',
    borderRadius: handleSize.f(10),
    paddingHorizontal: handleSize.w(15),
    backgroundColor: '#fff',
    fontSize: handleSize.f(FONT_SIZES.onefive),
  },
});

export default CustomTectField;
