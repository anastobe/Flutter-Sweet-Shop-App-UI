import { useEffect, useState } from 'react';
import { useIsFocused, useNavigation } from '@react-navigation/native';
import { Images } from '../../../config';
import { Alert } from 'react-native';
import { SHOW_CLIENT } from '../../../APICall/constants';
import { StatusBar } from 'react-native';
import { THEME } from '../../../styles';

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
  const onTransfer = () =>     Alert.alert("NEED",SHOW_CLIENT);

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
