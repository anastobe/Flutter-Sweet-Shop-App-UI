// src/screens/Home/viewModel/PinSecurityViewModel.js

import { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { Toast } from '../../../utils'; // optional if you want validation toasts
import { setPinSecurity } from '../../../queries/card.Queries/card.query';

export default function usePinSecurityViewModel({...props}) {

  const{ cardDetail } = props?.route?.params

  const navigation = useNavigation();
  const [newPin, setNewPin] = useState('');
  const [confirmPin, setConfirmPin] = useState('');

  const {mutate: setPinSecurityFunc, isPending: isPendingsetPinSecurity} = setPinSecurity({
    callback: (response: any) => {
      navigation.goBack();
    },
  });
  

  function pressBackArrow() {
    navigation.goBack();
  }

  function onUpdatePin() {
    if (newPin.length === 0) {
      Toast.showToast('Please enter new PIN', '', 'error');
    } else if (confirmPin.length === 0) {
      Toast.showToast('Please confirm your PIN', '', 'error');
    } else if (newPin !== confirmPin) {
      Toast.showToast('PIN not match', '', 'error');
    } else {
      let payload = {
        card_id: cardDetail?.card_id,
        pin: newPin
      }

      setPinSecurityFunc(payload)
    }
  }

  return {
    newPin,
    setNewPin,
    confirmPin,
    setConfirmPin,
    pressBackArrow,
    onUpdatePin,
    isPendingsetPinSecurity
  };
}
