import { useEffect, useState } from 'react';
import { useIsFocused, useNavigation } from '@react-navigation/native';
import { Auth_ROUTES } from '../../constants';
import { Alert } from 'react-native';
import { Toast } from '../../utils';
import { StatusBar } from 'react-native';
import { THEME } from '../../styles';
import { AddnewBeneficiaryApi, changePassword } from '../../queries/moreQueries/moreQuery';
import { resetPassword } from '../../queries/auth.query';

export default function useforgetPassResetViewModel(props: any) {
  const navigation = useNavigation();
  const { email } = props?.route?.params

  const [newPassword, setNewPassword] = useState('');
  const [confirmNewPassword, setConfirmNewPassword] = useState('');
  const [secure, setSecure] = useState(true);
  const [secure2, setSecure2] = useState(true);
  const [secure3, setSecure3] = useState(true);
  const [otp, setOtp] = useState("");
   
    const { mutate: resetPasswordFunc, isPending: isPending_resetPassword } = resetPassword({
      callback: (response: any) => {
          if (response?.success) {
            navigation.reset({
              index: 0,
              routes: [{ name: Auth_ROUTES.LOGIN }],
            });
          }
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

  // console.log("chk rules==>",!(rules.minLength(newPassword) && rules.lowerCase(newPassword) && rules.upperCase(newPassword) && rules.number(newPassword) && rules.specialChar(newPassword)) ? "true" : "false" );
  

  function onUpdatePress() {

    if (otp == "") {
      return Toast.showToast("Enter otp code", '', 'error');
    } 
    else if (!(rules.minLength(newPassword) && rules.lowerCase(newPassword) && rules.upperCase(newPassword) && rules.number(newPassword) && rules.specialChar(newPassword))) {
      return Toast.showToast("Incorrect new password", '', 'error');
    }
    else if (!newPassword.trim()) {
      return Toast.showToast("Enter new password", '', 'error');
    }
    else { 
      let payload ={
        usernameOrEmail: email,
        confirmationCode: otp, 
        newPassword: newPassword
      }

      // console.log("payoload==>",payload);
      // return

      resetPasswordFunc(payload)
    }
  } 

  return {
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
    pressBackArrow,
    onUpdatePress,
    isPending_resetPassword,
    otp, 
    setOtp,
    rules

  };
}
