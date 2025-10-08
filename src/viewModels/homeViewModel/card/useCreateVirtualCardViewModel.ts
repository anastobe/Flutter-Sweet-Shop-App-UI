// src/screens/Home/viewModel/CreateVirtualCardViewModel.js

import { useState } from 'react';
import { Toast } from '../../../utils';
import { HOME_ROUTES } from '../../../constants';
import { useNavigation } from '@react-navigation/native';

export default function useCreateVirtualCardViewModel() {
  const navigation = useNavigation();

  const [cardName, setCardName] = useState('');
  const [currency, setCurrency] = useState('');
  const [linkedAccount, setLinkedAccount] = useState('');
  const [limitType, setLimitType] = useState('Weekly');
  const [spendingLimit, setSpendingLimit] = useState('');

  function pressBackArrow() {
    navigation.goBack();
  }

  function onPressBtn() {
    if (cardName?.length === 0) {
      Toast.showToast('Please Enter Name', '', 'error');
    } else if (currency?.length === 0) {
      Toast.showToast('Please Select Currency', '', 'error');
    } else if (linkedAccount?.length === 0) {
      Toast.showToast('Please Select Linked Account Type', '', 'error');
    } else if (limitType?.length === 0) {
      Toast.showToast('Please Select Limit Type', '', 'error');
    } else if (spendingLimit?.length === 0) {
      Toast.showToast('Please Enter Spending Limit', '', 'error');
    } else {
      const payload = {
        format: 'virtual',
        card_name: cardName,
        spending_limits: spendingLimit,
        limit_type: limitType,
        currency_type: currency,
        linked_account: linkedAccount,
        card_desgin: 'steel',
      };
      navigation.navigate(HOME_ROUTES.ConfirmCardRequest, { data: payload });
    }
  }

  return {
    cardName,
    setCardName,
    currency,
    setCurrency,
    linkedAccount,
    setLinkedAccount,
    limitType,
    setLimitType,
    spendingLimit,
    setSpendingLimit,
    pressBackArrow,
    onPressBtn,
  };
}
