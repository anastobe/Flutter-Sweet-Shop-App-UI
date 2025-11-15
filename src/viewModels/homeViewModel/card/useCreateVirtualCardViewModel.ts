// src/screens/Home/viewModel/CreateVirtualCardViewModel.js

import { useState } from 'react';
import { Toast } from '../../../utils';
import { HOME_ROUTES } from '../../../constants';
import { useNavigation } from '@react-navigation/native';
import { useSelector } from 'react-redux';

export default function useCreateVirtualCardViewModel() {
  const navigation = useNavigation();

  const countryList = useSelector((state: any) => state?.MoreReducer?.countryList);
  const currencyList = useSelector((state: any) => state?.MoreReducer?.currencyList);
  const accountTypeList = useSelector((state: any) => state?.MoreReducer?.accountTypeList);
  const getCurrencyAccArray = useSelector((state: any) => state?.HomeReducer?.getCurrencyAccArray);

  const [openDropdown, setOpenDropdown] = useState(null); 
  const [cardName, setCardName] = useState('');
  const [pin, setPin] = useState('');
  const [currency, setCurrency] = useState({
    __typename: "",
    id: "",
    iso_code: "",
    num_code: ""
  });
  const [linkedAccount, setLinkedAccount] = useState( {
    id: "",
    name: "",
    iso_code: "",
    num_code: ""
  });
  const [limitType, setLimitType] = useState('');
  const [spendingLimit, setSpendingLimit] = useState('');

  function pressBackArrow() {
    navigation.goBack();
  }

  const toggleDropdown = (key) => {
    setOpenDropdown(openDropdown === key ? null : key);
  };
  

  function onPressBtn() {
    if (cardName?.length === 0) {
      Toast.showToast('Please Enter Name', '', 'error');
    } else if (currency?.iso_code?.length === 0) {
      Toast.showToast('Please Select Currency', '', 'error');
    } else if (linkedAccount?.name?.length === 0) {
      Toast.showToast('Please Select Linked Account Type', '', 'error');
    } else if (limitType?.length === 0) {
      Toast.showToast('Please Select Limit Type', '', 'error');
    } else if (spendingLimit?.length === 0) {
      Toast.showToast('Please Enter Spending Limit', '', 'error');
    } else if (pin?.length === 0) {
      Toast.showToast('Please Your Security Pin', '', 'error');
    } else if (pin?.length < 4) {
      Toast.showToast('Security Pin Must be 4 Digit', '', 'error');
    }  else if (pin?.length > 4) {
      Toast.showToast('Security Pin Must be 4 Digit', '', 'error');
    } else {
      const payload = {
        format: 'virtual',
        card_name: cardName,
        spending_limits: spendingLimit,
        limit_type: limitType,
        currency_type: currency.iso_code,
        linked_account: linkedAccount.name,
        card_desgin: 'steel',
        pin: pin
      };

      console.log("ASdasd=>",payload);
      // return

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
    countryList,
    currencyList,
    accountTypeList,
    openDropdown, 
    setOpenDropdown,
    toggleDropdown,
    getCurrencyAccArray,
    pin, 
    setPin
  };
}
