import { useState } from 'react';
import { Images } from '../../../config';

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
    console.log('Transfer initiated');
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
