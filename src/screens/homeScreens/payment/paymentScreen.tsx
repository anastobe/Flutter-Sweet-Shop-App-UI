import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const PaymentScreen = () => (
  <View style={styles.container}> 
    <Text style={styles.text}>PaymentScreen</Text>
  </View>
);

export default PaymentScreen;

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  text: { fontSize: 20 },
});
