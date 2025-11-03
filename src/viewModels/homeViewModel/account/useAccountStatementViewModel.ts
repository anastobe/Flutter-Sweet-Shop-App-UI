import { useRef, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { DATA } from '../../../utils/data';
import Metrics from '../../../styles/metrics';
import { HOME_ROUTES } from '../../../constants';

export const useAccountStatementViewModel = () => {
  const navigation = useNavigation();
  const cardDetailRef = useRef<any>(null);
  const [cardName, setCardName] = useState('');

  function pressBackArrow() {
    navigation.goBack();
  }

  function openFilterSheet() {
    cardDetailRef?.current?.open();
  }

  function closeFilterSheet() {
    cardDetailRef?.current?.close();
  }

  const handleNavigateTransactionHistory = () => {
    navigation.navigate(HOME_ROUTES.TRANSACTION_DETAIL);
  };

  return {
    navigation,
    cardDetailRef,
    cardName,
    setCardName,
    pressBackArrow,
    openFilterSheet,
    closeFilterSheet,
    handleNavigateTransactionHistory,
    DATA,
    Metrics,
  };
};
