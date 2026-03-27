import { useEffect, useState } from 'react';
import { useIsFocused, useNavigation } from '@react-navigation/native';
import { Auth_ROUTES } from '../../../constants';
import { Alert } from 'react-native';
import { Toast } from '../../../utils';
import { StatusBar } from 'react-native';
import { THEME } from '../../../styles';
import { AddnewBeneficiaryApi, changePassword, setcardPassword } from '../../../queries/moreQueries/moreQuery';
import dataHandlerService from '../../../APICall/dataHandler.service';
import ActionType from '../../../Redux/Action/ActionType/actionType';

export default function usesetCardPasswordViewModel() {
  const navigation = useNavigation();

  const [password, setPassword] = useState('');
  const [confirmNewPassword, setConfirmNewPassword] = useState('');
  const [secure, setSecure] = useState(true);
  const [secure2, setSecure2] = useState(true);
  const [secure3, setSecure3] = useState(true);

  
    const { mutate: setcardPasswordFunc, isPending: isPending_changePassword } = setcardPassword({
      callback: (response: any) => {

        console.log("setcardPasswordFunc response", response);
        return

      },
    });

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
    else if (!confirmNewPassword) {
      Toast.showToast('Please confirm password', '', 'error');
    } 
    else if (password !== confirmNewPassword) {
      Toast.showToast('Password not match', '', 'error');
    } 
    else { 
      let payload ={
        card_id: "58f3a779-34bc-437c-af47-6aea4bb94646",
        password: password
      }

      setcardPasswordFunc(payload)
    }
  } 

  return {
    password,
    setPassword,
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
    isPending_changePassword
  };
}
