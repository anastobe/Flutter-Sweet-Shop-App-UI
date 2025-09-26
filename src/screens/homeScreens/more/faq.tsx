import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const FAQ = () => (
  <View style={styles.container}> 
    <Text style={styles.text}>FAQ</Text>
  </View>
);

export default FAQ;

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  text: { fontSize: 20 },
});
