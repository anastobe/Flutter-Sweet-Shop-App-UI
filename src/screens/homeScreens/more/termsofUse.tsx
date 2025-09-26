import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const TermsofUse = () => (
  <View style={styles.container}> 
    <Text style={styles.text}>TermsofUse</Text>
  </View>
);

export default TermsofUse;

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  text: { fontSize: 20 },
});
