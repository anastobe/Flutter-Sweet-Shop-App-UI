import { useState, useRef } from 'react';
import { useNavigation } from '@react-navigation/native';
import { DATA } from '../../../utils/data';
import Metrics from '../../../styles/metrics';

export default function useTransactionHistoryViewModel() {
  const navigation = useNavigation();
  const cardDetailRef = useRef(null);
  const [cardName, setCardName] = useState('');

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

  return {
    DATA,
    cardName,
    setCardName,
    cardDetailRef,
    pressBackArrow,
    onSearch,
    openFilterSheet,
    closeFilterSheet,
    Metrics
  };
}
