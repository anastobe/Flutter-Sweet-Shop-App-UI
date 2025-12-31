import { useEffect, useState } from 'react';
import { Auth_ROUTES } from '../../constants';
import { Alert } from 'react-native';
import { SHOW_CLIENT } from '../../APICall/constants';
import { StatusBar } from 'react-native';
import { THEME } from '../../styles';
import { useIsFocused, useNavigation } from '@react-navigation/native';
import { CommonUtils, Toast } from '../../utils';
import { ResetPasswordLink } from '../../queries/auth.query';

export const useForgetPasswordViewModel = () => {
  const navigation = useNavigation();
  const [email, setEmail] = useState('newuser@yopmail.com');
  const [Open, setOpen] = useState(false);

  const { mutate: ResetPasswordLinkFunc, isPending: isPending_ResetPasswordLink } = ResetPasswordLink({
    callback: (res: any) => {
      if (res?.success) {
        setOpen(true)
      }
    },
  });

  const handleSendResetLink = () => {
    if (!email.trim()) {
      return Toast.showToast("Please enter email", '', 'error');
    }
    else if (!CommonUtils.RegEmail.test(email)) {
      return Toast.showToast("Please enter valid email", '', 'error');
    } 
    else {
      let payload = {
        usernameOrEmail: email
      } 
      ResetPasswordLinkFunc(payload) 
    }
    
  };

  const closePopup = () => setOpen(false);

  return {
    email,
    setEmail,
    Open,
    handleSendResetLink,
    // handleOkayPress,
    closePopup,
    isPending_ResetPasswordLink
    
  };
};
