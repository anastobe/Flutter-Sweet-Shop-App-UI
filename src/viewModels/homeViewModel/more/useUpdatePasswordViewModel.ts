import { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { Auth_ROUTES } from '../../../constants';

export default function useUpdatePasswordViewModel() {
  const navigation = useNavigation();

  const [password, setPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmNewPassword, setConfirmNewPassword] = useState('');
  const [secure, setSecure] = useState(true);
  const [secure2, setSecure2] = useState(true);
  const [secure3, setSecure3] = useState(true);

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
    navigation.navigate(Auth_ROUTES.LOGIN);
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
