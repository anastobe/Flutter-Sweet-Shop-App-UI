// ConfirmCurrencyExchangeViewModel.js
import { useEffect, useState } from 'react';
import { useIsFocused, useNavigation } from '@react-navigation/native';
import { Alert } from 'react-native';
import { SHOW_CLIENT } from '../../../APICall/constants';
import { StatusBar } from 'react-native';
import { THEME } from '../../../styles';
import { HOME_ROUTES } from '../../../constants';

export default function useConfirmCurrencyExchangeViewModel({...props}) {
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
    if (props?.route?.params?.key == "international") {
      navigation.navigate(HOME_ROUTES.INTERNATIONAL_TRANSFER,{ key: props?.route?.params?.key })
    } else if (props?.route?.params?.key == "myaccount") {
      navigation.navigate(HOME_ROUTES.MY_ACCOUNT_TRANSFER,{ key: props?.route?.params?.key })
    }
    else {
      console.log('key do');
    }
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
