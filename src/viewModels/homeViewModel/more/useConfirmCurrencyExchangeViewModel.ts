import { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { Toast } from '../../../utils';
import { useNavigation } from '@react-navigation/native';
import { useFXConversion } from '../../../queries/paymentQuery/paymentQuery';

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
  const [purpose, setPurpose] = useState('');
  // const [isFxLoading, setIsFxLoading] = useState(false);

  const [fxInfo, setFxInfo] = useState({
    rateText: '',
    fee: '',
    validFor: '',
    settlementAmount: '',
  });

  /* ----------------------------------
     DEBOUNCE (stable ref)
  ---------------------------------- */
  const debounceRef = useRef(null);

  const debounce = (func, delay) => {
    return (...args) => {
      if (debounceRef.current) {
        clearTimeout(debounceRef.current);
      }
      debounceRef.current = setTimeout(() => {
        func(...args);
      }, delay);
    };
  };

  /* ----------------------------------
     FX API HOOK
  ---------------------------------- */
  const { mutate: useFXConversionFunc, isPending: isPendinguseFXConversion } = useFXConversion({
    callback: (res: any) => {
      // setIsFxLoading(false);

      if (res?.success && res?.results?.length > 0) {
        const fx = res.results[0];

        setFxInfo({
          rateText: `1 ${fx.tradeCurrency} = ${fx.rate} ${fx.settlementCurrency}`,
          fee: fx.fxFeeAmount?.toString(),
          validFor: `${fx.validFor} sec`,
          settlementAmount: fx.settlementAmount?.toString(),
        });

        setYouWillReceive(fx.settlementAmount?.toString());
      } else {
        setFxInfo({
          rateText: '',
          fee: '',
          validFor: '',
          settlementAmount: '',
        });
        setYouWillReceive('');
      }
    },
  });

  /* ----------------------------------
     FX API CALL
  ---------------------------------- */
  const fetchFxRate = () => {
    if (
      !fromAccount?.iso_code ||
      !toAccount?.iso_code ||
      !amount ||
      Number(amount) <= 0
    ) {
      return;
    }

    // setIsFxLoading(true);

    const payload = {
      itemsToQuote: [
        {
          fromCurrency: fromAccount.iso_code,
          toCurrency: toAccount.iso_code,
          amount: amount,
        },
      ],
    };

    console.log('💱 FX PAYLOAD:', payload);
    useFXConversionFunc(payload);
  };

  const debouncedFetchFxRate = debounce(fetchFxRate, 700);

  /* ----------------------------------
     INITIAL PARAMS SET
  ---------------------------------- */
  useEffect(() => {
    if (!params) return;

    if (params?.stateData) {
      setFromAccount(params.stateData.fromAccount);
      settoAccount(params.stateData.toAccount);
      setamount(params.stateData.amount);
      setautoFocused(true);
    }

    if (params?.data?.length > 0) {
      const fx = params.data[0];

      setFxInfo({
        rateText: `1 ${fx.tradeCurrency} = ${fx.rate} ${fx.settlementCurrency}`,
        fee: `${fx.fxFeeAmount}`,
        validFor: `${fx.validFor} sec`,
        settlementAmount: fx.settlementAmount?.toString(),
      });

      setYouWillReceive(fx.settlementAmount?.toString() || '');
    }
  }, [params]);

  /* ----------------------------------
     AUTO FX RECALCULATION
  ---------------------------------- */
  useEffect(() => {
    if (
      fromAccount?.id &&
      toAccount?.id &&
      amount &&
      Number(amount) > 0
    ) {
      debouncedFetchFxRate();
    }
  }, [fromAccount?.id, toAccount?.id, amount]);

  /* ----------------------------------
     ACTIONS
  ---------------------------------- */
  const pressBackArrow = () => navigation.goBack();

  const onPressBtn = () => {
    if (!fromAccount.id)
      return Toast.showToast('Select send account', '', 'error');

    if (!toAccount.id)
      return Toast.showToast('Select to account', '', 'error');

    if (!amount)
      return Toast.showToast('Enter amount', '', 'error');

    if (fromAccount.id === toAccount.id)
      return Toast.showToast('Select different account', '', 'error');

    if (isPendinguseFXConversion)
      return Toast.showToast('Calculating exchange rate...', '', 'error');

    if (!fxInfo?.settlementAmount)
      return Toast.showToast('Wait for conversion', '', 'error');

    if (!purpose)
      return Toast.showToast('Select purpose', '', 'error');

    const payload = {
      fromAccount,
      toAccount,
      amount,
      youWillReceive,
      purpose,
      fxInfo,
    };

    console.log('✅ CREATE ORDER PAYLOAD:', payload);
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
    // isFxLoading,
    isPendinguseFXConversion
  };
}
