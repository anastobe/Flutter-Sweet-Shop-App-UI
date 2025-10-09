// ConfirmCurrencyExchangeViewModel.js
import { useState } from 'react';
import { useNavigation } from '@react-navigation/native';

export default function useConfirmCurrencyExchangeViewModel() {
  const navigation = useNavigation();

  const [sendFrom, setSendFrom] = useState('');
  const [toCurrency, setToCurrency] = useState('');
  const [youWillReceive, setYouWillReceive] = useState('');
  const [purpose, setPurpose] = useState('');

  const pressBackArrow = () => {
    navigation.goBack();
  };

  const onPressBtn = () => {
    console.log('Pressed Create Order');
    // You can place API logic here later if needed
  };

  return {
    sendFrom,
    setSendFrom,
    toCurrency,
    setToCurrency,
    youWillReceive,
    setYouWillReceive,
    purpose,
    setPurpose,
    pressBackArrow,
    onPressBtn,
  };
}
