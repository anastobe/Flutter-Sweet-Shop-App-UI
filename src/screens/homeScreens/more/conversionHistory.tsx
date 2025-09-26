import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const ConversionHistory = () => (
  <View style={styles.container}> 
    <Text style={styles.text}>ConversionHistory</Text>
  </View>
);

export default ConversionHistory;

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  text: { fontSize: 20 },
});
