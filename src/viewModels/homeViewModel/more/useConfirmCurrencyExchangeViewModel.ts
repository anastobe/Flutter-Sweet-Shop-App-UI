// ConfirmCurrencyExchangeViewModel.js
import { useEffect, useState } from 'react';
import { useIsFocused, useNavigation } from '@react-navigation/native';
import { Alert } from 'react-native';
import { SHOW_CLIENT } from '../../../APICall/constants';
import { StatusBar } from 'react-native';
import { THEME } from '../../../styles';
import { HOME_ROUTES } from '../../../constants';
import { useSelector } from 'react-redux';
import { Toast } from '../../../utils';

export default function useConfirmCurrencyExchangeViewModel({ ...props }) {
  const navigation = useNavigation();

  const params = props?.route?.params;
  const getCurrencyAccArray = useSelector(
    (state: any) => state?.HomeReducer?.getCurrencyAccArray,
  );
  const [openDropdownsty, setOpenDropdownSty] = useState(false);
  const [openDropdownstyToAcc, setOpenDropdownStyToAcc] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(null);
  const [open, setopen] = useState(false);
  const [autoFocused, setautoFocused] = useState(false);

  const [fromAccount, setFromAccount] = useState({
    id: '',
    available_balance: '',
    currency_id: '',
    name: '',
    iso_code: '',
  });

  const [toAccount, settoAccount] = useState({
    id: '',
    available_balance: '',
    currency_id: '',
    name: '',
    iso_code: '',
  });

  const [amount, setamount] = useState('');
  const [youWillReceive, setYouWillReceive] = useState('');
  const [fxInfo, setFxInfo] = useState({
    rateText: '',
    fee: '',
    validFor: '',
    settlementAmount: '',
  });

  const [purpose, setPurpose] = useState('');

  // 🔥 MAIN EFFECT
  useEffect(() => {
    if (!params) return;

    // 1️⃣ stateData se accounts & amount
    if (params?.stateData) {
      setFromAccount(params.stateData.fromAccount);
      settoAccount(params.stateData.toAccount);
      setamount(params.stateData.amount);
      setautoFocused(true);
    }

    // 2️⃣ calculated FX response se "you will receive"
    if (params?.data?.length > 0) {
      const fx = params.data[0];

      setFxInfo({
        rateText: `1 ${fx.tradeCurrency} = ${fx.rate} ${fx.settlementCurrency}`,
        fee: `${fx.fxFeeAmount}`,
        validFor: `${fx.validFor} sec`,
        settlementAmount: fx.settlementAmount?.toString(),
      });

      setYouWillReceive(fx?.settlementAmount?.toString() || '');
    }
  }, [params]);

  console.log(
    'useConfirmCurrencyExchangeViewModel==>',
    youWillReceive,
    '----',
    fromAccount,
    '--',
    toAccount,
    '--',
    amount,
  );

  const pressBackArrow = () => {
    navigation.goBack();
  };

  const onPressBtn = () => {
    if (fromAccount.id == '') {
      return Toast.showToast('Select send account', '', 'error');
    } 
    else if (toAccount.id == '') {
      return Toast.showToast('Select to account', '', 'error');
    } 
    else if (amount == '') {
      return Toast.showToast('Enter Your amount', '', 'error');
    } 
    else if (fromAccount.id == toAccount.id) {
      return Toast.showToast('Select another account', '', 'error');
    } 
    else if (fxInfo?.settlementAmount == '') {
      //add loading condition also
      return Toast.showToast('Wait for converion', '', 'error');
    } 
    else if (purpose == '') {
      return Toast.showToast('Select purpose', '', 'error');
    } else {
      const payload = {
        fromAccount,
        toAccount,
        amount,
        youWillReceive,
        purpose,
        fxInfo,
      };

      console.log('✅ CREATE ORDER PAYLOAD:', payload);
      return;
      // navigation.navigate(HOME_ROUTES.MY_ACCOUNT_TRANSFER, {
      //   data: props?.route?.params,
      // });
    }

    // if (props?.route?.params?.key == "international") {
    //   navigation.navigate(HOME_ROUTES.INTERNATIONAL_TRANSFER,{ data: props?.route?.params })
    // } else if (props?.route?.params?.key == "myaccount") {
    //   navigation.navigate(HOME_ROUTES.MY_ACCOUNT_TRANSFER,{ data: props?.route?.params })
    // }
    // else {
    //   console.log('key do');
    // }
  };

  const toggleDropdown = (key: any) => {
    setOpenDropdown(openDropdown === key ? null : key);
  };

  return {
    youWillReceive,
    setYouWillReceive,
    purpose,
    setPurpose,
    pressBackArrow,
    onPressBtn,
    toggleDropdown,
    getCurrencyAccArray,
    amount,
    setamount,
    openDropdownsty,
    setOpenDropdownSty,
    openDropdownstyToAcc,
    setOpenDropdownStyToAcc,
    open,
    setopen,
    autoFocused,
    setautoFocused,
    fromAccount,
    setFromAccount,
    toAccount,
    settoAccount,
    openDropdown,
    setOpenDropdown,
    fxInfo,
  };
}
