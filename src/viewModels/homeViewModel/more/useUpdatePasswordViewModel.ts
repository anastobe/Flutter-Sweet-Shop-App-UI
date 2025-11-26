import { useEffect, useState } from 'react';
import { useIsFocused, useNavigation } from '@react-navigation/native';
import { Auth_ROUTES } from '../../../constants';
import { Alert } from 'react-native';
import { SHOW_CLIENT } from '../../../APICall/constants';
import { Toast } from '../../../utils';
import { StatusBar } from 'react-native';
import { THEME } from '../../../styles';

export default function useUpdatePasswordViewModel() {
  const navigation = useNavigation();

  const [password, setPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmNewPassword, setConfirmNewPassword] = useState('');
  const [secure, setSecure] = useState(true);
  const [secure2, setSecure2] = useState(true);
  const [secure3, setSecure3] = useState(true);
  const FOCUS = useIsFocused()

  useEffect(()=>{
    if (FOCUS) {
      StatusBar.setBackgroundColor(THEME.darkSecondary)
    }
  },[FOCUS]) 

  const rules = {
    minLength: (text: string) => text.length >= 8,
    lowerCase: (text: string) => /[a-z]/.test(text),
    upperCase: (text: string) => /[A-Z]/.test(text),
    number: (text: string) => /\d/.test(text),
    specialChar: (text: string) => /[!@#$%^&*]/.test(text),
  };

  function pressBackArrow() {
    navigation.goBack();
  }

  function onUpdatePress() {
    if (!password) {
      Toast.showToast('Please enter password', '', 'error');
    } 
    else if (!newPassword) {
      Toast.showToast('Please enter new password', '', 'error');
    } 
    else if (confirmNewPassword !== newPassword) {
      Toast.showToast('Password not match', '', 'error');
    } 
    else { 
      Alert.alert("NEED",SHOW_CLIENT)
    }
  } 

  return {
    password,
    setPassword,
    newPassword,
    setNewPassword,
    confirmNewPassword,
    setConfirmNewPassword,
    secure,
    setSecure,
    secure2,
    setSecure2,
    secure3,
    setSecure3,
    rules,
    pressBackArrow,
    onUpdatePress,
  };
}
