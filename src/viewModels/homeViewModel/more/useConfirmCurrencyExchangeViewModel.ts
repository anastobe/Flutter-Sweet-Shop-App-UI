// ConfirmCurrencyExchangeViewModel.js
import { useEffect, useState } from 'react';
import { useIsFocused, useNavigation } from '@react-navigation/native';
import { Alert } from 'react-native';
import { SHOW_CLIENT } from '../../../APICall/constants';
import { StatusBar } from 'react-native';
import { THEME } from '../../../styles';

export default function useConfirmCurrencyExchangeViewModel() {
  const navigation = useNavigation();

  const [openDropdown, setOpenDropdown] = useState(null); 
  const [sendFrom, setSendFrom] = useState('');
  const [toCurrency, setToCurrency] = useState('');
  const [youWillReceive, setYouWillReceive] = useState('');
  const [purpose, setPurpose] = useState('');

  const pressBackArrow = () => {
    navigation.goBack();
  };

  const onPressBtn = () => {
    console.log('Pressed Create Order');
    Alert.alert("NEED",SHOW_CLIENT)
    // You can place API logic here later if needed
  };

  const toggleDropdown = (key: any) => {
    setOpenDropdown(openDropdown === key ? null : key);
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
    toggleDropdown,
    openDropdown
  };
}
