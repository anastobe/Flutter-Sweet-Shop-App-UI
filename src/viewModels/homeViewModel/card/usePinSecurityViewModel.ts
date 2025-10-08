// src/screens/Home/viewModel/PinSecurityViewModel.js

import { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { Toast } from '../../../utils'; // optional if you want validation toasts

export default function usePinSecurityViewModel() {
  const navigation = useNavigation();
  const [newPin, setNewPin] = useState('');
  const [confirmPin, setConfirmPin] = useState('');

  function pressBackArrow() {
    navigation.goBack();
  }

  function onUpdatePin() {
    if (newPin.length === 0) {
      Toast.showToast('Please enter new PIN', '', 'error');
    } else if (confirmPin.length === 0) {
      Toast.showToast('Please confirm your PIN', '', 'error');
    } else if (newPin !== confirmPin) {
      Toast.showToast('PINs do not match', '', 'error');
    } else {
      Toast.showToast('PIN updated successfully', '', 'success');
      navigation.goBack();
    }
  }

  return {
    newPin,
    setNewPin,
    confirmPin,
    setConfirmPin,
    pressBackArrow,
    onUpdatePin,
  };
}
