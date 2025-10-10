import { useState } from 'react';
import { Auth_ROUTES } from '../../constants';

export const useForgetPasswordViewModel = (navigation: any) => {
  const [email, setEmail] = useState('');
  const [Open, setOpen] = useState(false);

  const handleSendResetLink = () => {
    // Placeholder for API integration if needed later
    setOpen(true);
  };

  const handleOkayPress = () => {
    setOpen(false);
    // setTimeout(() => {
    //   navigation.navigate(Auth_ROUTES.SETPASSWORD);
    // }, 1000);
  };

  const closePopup = () => setOpen(false);

  return {
    email,
    setEmail,
    Open,
    handleSendResetLink,
    handleOkayPress,
    closePopup,
  };
};
