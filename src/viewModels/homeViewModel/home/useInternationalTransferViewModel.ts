import { useEffect, useState } from 'react';
import { Images } from '../../../config';
import { Alert } from 'react-native';
import { SHOW_CLIENT } from '../../../APICall/constants';
import { useIsFocused } from '@react-navigation/native';
import { StatusBar } from 'react-native';
import { THEME } from '../../../styles';

export const  useInternationalTransferViewModel = () => {
  const [toAccount, setToAccount] = useState('');
  const [openDropdown, setOpenDropdown] = useState(null); 
  const [recipientGets, setRecipientGets] = useState('');
  
  const [fromAccount, setFromAccount] = useState({
    label: 'Clearbank Account',
    currency: 'GBP',
    flag: Images.accountTab,
  });

  const handleFromAccountPress = () => {
    console.log('From Account Pressed');
  };

  const handleTransfer = () => {
    Alert.alert("NEED",SHOW_CLIENT)
  };

  const toggleDropdown = (key: any) => {
    setOpenDropdown(openDropdown === key ? null : key);
  };
  return {
    toAccount,
    setToAccount,
    recipientGets,
    setRecipientGets,
    fromAccount,
    handleFromAccountPress,
    handleTransfer,
    openDropdown,
    toggleDropdown
  };
}
