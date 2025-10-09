// CurrencyExchangeViewModel.js
import { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { HOME_ROUTES } from '../../../constants';

export default function useCurrencyExchangeViewModel() {
  const navigation = useNavigation();

  const [sendFrom, setSendFrom] = useState('');
  const [receiveIn, setReceiveIn] = useState('');

  // 🔙 Back button
  const pressBackArrow = () => {
    navigation.goBack();
  };

  // 🔁 Button action
  const onPressBtn = () => {
    navigation.navigate(HOME_ROUTES.CONFIRM_CURENCY_EXCHANGE);
  };

  return {
    sendFrom,
    setSendFrom,
    receiveIn,
    setReceiveIn,
    pressBackArrow,
    onPressBtn,
  };
}
