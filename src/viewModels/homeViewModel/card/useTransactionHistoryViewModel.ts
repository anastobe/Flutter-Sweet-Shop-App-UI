import { useState, useRef, useEffect } from 'react';
import { useIsFocused, useNavigation } from '@react-navigation/native';
import { DATA, REQUEST_DATA } from '../../../utils/data';
import Metrics from '../../../styles/metrics';
import { HOME_ROUTES } from '../../../constants';
import { StatusBar } from 'react-native';
import { THEME } from '../../../styles';

export default function useTransactionHistoryViewModel() {
  const navigation = useNavigation();
  const cardDetailRef = useRef(null);
  const [cardName, setCardName] = useState('');

  const FOCUS = useIsFocused()

  useEffect(()=>{
    if (FOCUS) {
      StatusBar.setBackgroundColor(THEME.darkSecondary)
    }
  },[FOCUS]) 

  function pressBackArrow() {
    navigation.goBack();
  }

  function onSearch(text) {
    setCardName(text);
  }

  function openFilterSheet() {
    cardDetailRef.current?.open?.();
  }

  function closeFilterSheet() {
    cardDetailRef.current?.close?.();
  }


  const handleNavigateTransactionHistory = () => {
    navigation.navigate(HOME_ROUTES.TRANSACTION_DETAIL);
  };

  

  return {
    DATA,
    REQUEST_DATA,
    cardName,
    setCardName,
    cardDetailRef,
    pressBackArrow,
    onSearch,
    openFilterSheet,
    closeFilterSheet,
    handleNavigateTransactionHistory,
    Metrics
  };
}
