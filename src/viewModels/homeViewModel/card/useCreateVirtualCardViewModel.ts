// src/screens/Home/viewModel/CreateVirtualCardViewModel.js

import { useEffect, useState } from 'react';
import { Toast } from '../../../utils';
import { HOME_ROUTES } from '../../../constants';
import { useIsFocused, useNavigation } from '@react-navigation/native';
import { useSelector } from 'react-redux';
import { StatusBar } from 'react-native';
import { THEME } from '../../../styles';

export default function useCreateVirtualCardViewModel() {
  const navigation = useNavigation();

  const countryList = useSelector((state: any) => state?.MoreReducer?.countryList);
  const currencyList = useSelector((state: any) => state?.MoreReducer?.currencyList);
  const accountTypeList = useSelector((state: any) => state?.MoreReducer?.accountTypeList);
  const getCurrencyAccArray = useSelector((state: any) => state?.HomeReducer?.getCurrencyAccArray);
  const allAccounts = useSelector((state: any) => state?.HomeReducer?.allAccounts)

  const [openDropdown, setOpenDropdown] = useState(null); 
  const [cardName, setCardName] = useState('');
  const [pin, setPin] = useState('');
  const [openDropdownsty, setOpenDropdownSty] = useState(false);
  // const [currency, setCurrency] = useState({
  //   __typename: "",
  //   id: "",
  //   iso_code: "",
  //   num_code: ""
  // });
  // const [linkedAccount, setLinkedAccount] = useState( {
  //   id: "",
  //   name: "",
  //   iso_code: "",
  //   num_code: ""
  // });

  
  const [fromAccount, setFromAccount] = useState({
    id: "",
    available_balance: "",
    currency_id: "",
    name: "",
    iso_code: ""
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
    } 
    else if (fromAccount?.id == "" || fromAccount?.currency_id == "") {
      Toast.showToast('Please Select Account', '', 'error');
    } 
    // else if (fromAccount?.name?.length === 0) {
    //   Toast.showToast('Please Select Linked Account Type', '', 'error');
    // } 
    else if (limitType?.length === 0) {
      Toast.showToast('Please Select Limit Type', '', 'error');
    } else if (spendingLimit?.length === 0) {
      Toast.showToast('Please Enter Spending Limit', '', 'error');
    } 
    // else if (pin?.length === 0) {
    //   Toast.showToast('Please Your Security Pin', '', 'error');
    // } 
    // else if (pin?.length < 4) {
    //   Toast.showToast('Security Pin Must be 4 Digit', '', 'error');
    // }  else if (pin?.length > 4) {
    //   Toast.showToast('Security Pin Must be 4 Digit', '', 'error');
    // } 
    else {
      const payload = {
        format: 'virtual',
        card_name: cardName,
        spending_limits: spendingLimit,
        limit_type: limitType?.toLowerCase(),
        currency_type: fromAccount?.currency_id?.toString(),
        linked_account: fromAccount.id
      };
      // card_desgin: 'steel',//REMOVED

      // console.log("ASdasd=>",payload);
      // return

      navigation.navigate(HOME_ROUTES.ConfirmCardRequest, { data: payload, linkedAccount: fromAccount, currency: fromAccount });
    }
  }

  return {
    cardName,
    setCardName,
    // currency,
    // setCurrency,
    // linkedAccount,
    // setLinkedAccount,
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
    setPin,
    allAccounts,
    fromAccount, 
    setFromAccount,
    openDropdownsty, 
    setOpenDropdownSty
  };
}
