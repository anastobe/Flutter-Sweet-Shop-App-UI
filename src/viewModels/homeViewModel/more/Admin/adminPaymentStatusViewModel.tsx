import { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { Images } from '../../../../config';
import { Alert } from 'react-native';

export const useAdminPaymentStatusViewModel = () => {
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
  const onTransfer = () => Alert.alert("Reject")

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
