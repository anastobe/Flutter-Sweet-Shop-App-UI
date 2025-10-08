import { useRef, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { HOME_ROUTES } from '../../../constants';
import { Toast } from '../../../utils';

export function useCreatePhysicalCardViewModel() {
  const navigation = useNavigation();
  const cardDetailRef = useRef(null);

  const [cardName, setcardName] = useState('');
  const [currency, setcurrency] = useState('');
  const [linkedAccount, setLinkedAccount] = useState('');
  const [limitType, setLimitType] = useState('Weekly');
  const [spendingLimit, setSpendingLimit] = useState('');

  const pressBackArrow = () => navigation.goBack();

  const onPressBtn = () => {
    if (!cardName) {
      Toast.showToast('Please Enter Name', '', 'error');
    } else if (!currency) {
      Toast.showToast('Please Select Currency', '', 'error');
    } else if (!linkedAccount) {
      Toast.showToast('Please Select Linked Account Type', '', 'error');
    } else if (!limitType) {
      Toast.showToast('Please Select Limit Type', '', 'error');
    } else if (!spendingLimit) {
      Toast.showToast('Please Enter Spending Limit', '', 'error');
    } else {
      cardDetailRef?.current?.open();
    }
  };

  const yesConfirm = () => {
    cardDetailRef?.current?.close();
    setTimeout(() => {
      const payload = {
        format: 'physical',
        card_name: cardName,
        spending_limits: spendingLimit,
        limit_type: limitType,
        currency_type: currency,
        linked_account: linkedAccount,
        card_desgin: 'steel',
      };
      navigation.navigate(HOME_ROUTES.ConfirmCardRequest, { data: payload });
    }, 800);
  };

  const updateLocation = () => {
    cardDetailRef?.current?.close();
    setTimeout(() => {
      navigation.navigate(HOME_ROUTES.UPDATE_ADDRESS);
    }, 800);
  };

  return {
    cardDetailRef,
    cardName,
    setcardName,
    currency,
    setcurrency,
    linkedAccount,
    setLinkedAccount,
    limitType,
    setLimitType,
    spendingLimit,
    setSpendingLimit,
    pressBackArrow,
    onPressBtn,
    yesConfirm,
    updateLocation,
  };
}
