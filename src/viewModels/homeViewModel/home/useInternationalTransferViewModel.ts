import { useState } from 'react';
import { Images } from '../../../config';
import { Alert } from 'react-native';
import { SHOW_CLIENT } from '../../../APICall/constants';

export const  useInternationalTransferViewModel = () => {
  const [toAccount, setToAccount] = useState('');
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

  return {
    toAccount,
    setToAccount,
    recipientGets,
    setRecipientGets,
    fromAccount,
    handleFromAccountPress,
    handleTransfer,
  };
}
