import { useEffect, useRef, useState } from 'react';
import { useIsFocused, useNavigation } from '@react-navigation/native';
import { DATA } from '../../../utils/data';
import Metrics from '../../../styles/metrics';
import { HOME_ROUTES } from '../../../constants';
import { StatusBar } from 'react-native';
import { THEME } from '../../../styles';

export const useAccountStatementViewModel = () => {
  const navigation = useNavigation();
  const cardDetailRef = useRef<any>(null);
  const FOCUS = useIsFocused()
  const [cardName, setCardName] = useState('');

  useEffect(()=>{
    if (FOCUS) {
      StatusBar.setBackgroundColor(THEME.darkSecondary)
    }
  },[FOCUS]) 

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
