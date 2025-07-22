import React from 'react';
import { View, StyleSheet, Image, Text, TouchableOpacity } from 'react-native';
import CustomButton from '../../components/customButton';
import CustomTextField from '../../components/customTextField';
import CustomLabel from '../../components/customLabel';
import Images from '../../config/images';

type ForgetPasswordProps = {};

export const ForgetPassword: React.FC<ForgetPasswordProps> = ({...props}) => {
  return (
    <View style={styles.container}>
      <Image source={Images.logo} style={styles.logo} />

      <Text style={styles.title}>ForgetPassword</Text>

    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 25,
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#fff',
  },
  logo: {
    width: 130,
    height: 40,
    resizeMode: 'contain',
    alignSelf: 'center',
    marginBottom: 50,
  },
  title: {
    fontSize: 26,
    fontWeight: '600',
    color: '#000',
    marginBottom: 30,
    textAlign: 'left',
  },
  forgotText: {
    color: '#000',
    fontSize: 14,
    textAlign: 'center',
    marginTop: 10,
  },
});

export default ForgetPassword;
