import React from 'react';
import { Text, StyleSheet } from 'react-native';

const CustomLabel = ({ text }: { text: string }) => (
  <Text style={styles.label}>{text}</Text>
);

const styles = StyleSheet.create({
  label: {
    fontSize: 16,
    fontWeight: '500',
    color: '#000',
    marginBottom: 5,
  },
});

export default CustomLabel;
