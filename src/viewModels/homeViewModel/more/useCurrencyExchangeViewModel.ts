// CurrencyExchangeViewModel.js
import { useEffect, useState } from 'react';
import { useIsFocused, useNavigation } from '@react-navigation/native';
import { HOME_ROUTES } from '../../../constants';
import { StatusBar } from 'react-native';
import { THEME } from '../../../styles';

export default function useCurrencyExchangeViewModel() {
  const navigation = useNavigation();

  const [openDropdown, setOpenDropdown] = useState(null); 
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

  const toggleDropdown = (key: any) => {
    setOpenDropdown(openDropdown === key ? null : key);
  };
  return {
    sendFrom,
    setSendFrom,
    receiveIn,
    setReceiveIn,
    pressBackArrow,
    onPressBtn,
    toggleDropdown,
    openDropdown
  };
}
