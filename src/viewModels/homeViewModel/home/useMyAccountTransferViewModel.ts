import { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { Images } from '../../../config';

export const useMyAccountTransferViewModel = () => {
  const navigation = useNavigation();

  const [amountSpend, setAmountSpend] = useState('');
  const [fromAcc] = useState({
    label: 'Clearbank Account',
    currency: 'GBP',
    flag: Images.account,
  });
  const [toAcc] = useState({
    label: 'Bank of Spain',
    currency: 'EUR',
    flag: Images.account,
  });

  const pressBackArrow = () => navigation.goBack();
  const handlePress = () => {};
  const onTransfer = () => console.log('Transfer Initiated');

  return {
    amountSpend,
    setAmountSpend,
    fromAcc,
    toAcc,
    pressBackArrow,
    handlePress,
    onTransfer,
  };
};
