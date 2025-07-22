import React from 'react';
import { TextInput, View, StyleSheet, TextInputProps } from 'react-native';

const CustomTectField = (props: TextInputProps) => (
  <View style={styles.inputContainer}>
    <TextInput style={styles.input} {...props} placeholderTextColor="#888" />
  </View>
);

const styles = StyleSheet.create({
  inputContainer: {
    marginBottom: 15,
  },
  input: {
    height: 50,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    paddingHorizontal: 15,
    backgroundColor: '#fff',
    fontSize: 15,
  },
});

export default CustomTectField;
