// CurrencyExchangeViewModel.js
import { useEffect, useState } from 'react';
import { useIsFocused, useNavigation } from '@react-navigation/native';
import { HOME_ROUTES } from '../../../constants';
import { StatusBar } from 'react-native';
import { THEME } from '../../../styles';
import { useFXConversion } from '../../../queries/paymentQuery/paymentQuery';
import { Toast } from '../../../utils';

export default function useCurrencyExchangeViewModel({...props}) {
  const navigation = useNavigation();

  const [openDropdown, setOpenDropdown] = useState(null); 
  const [sendFrom, setSendFrom] = useState('');
  const [receiveIn, setReceiveIn] = useState('');

  const { mutate: useFXConversionFunc, isPending } = useFXConversion({
    callback: (res: any) => {
      if (res?.success) {
        navigation.navigate(HOME_ROUTES.CONFIRM_CURENCY_EXCHANGE,{ key: props?.route?.params?.key, data: res?.results });
      }
    },
  });

  // 🔙 Back button
  const pressBackArrow = () => {
    navigation.goBack();
  };

  // 🔁 Button action
  const onPressBtn = () => {

    //  if (fromAccount.name == "") {
    //       Toast.showToast('Please Select Your Account', '', 'error');
    //     } else if (enterAmount == "") {
    //       Toast.showToast('Enter Your Amount', '', 'error');
    //     }
    //     else if (beneficiary.beneficiary_id == "") {
    //       Toast.showToast('Select Beneficiary', '', 'error');
    //     } 
    //     else if (note == "") {
    //       Toast.showToast('Enter Your Note/Refrence', '', 'error');
    //     } 
    //     else {
          const payload ={
            itemsToQuote: [
              {
                fromCurrency: "USD",
                toCurrency: "EUR",
                amount: 1000
              }
            ]
          }
        console.log("===>payload==>",payload);
        
        useFXConversionFunc(payload)
        // }

  };

  const toggleDropdown = (key: any) => {
    setOpenDropdown(openDropdown === key ? null : key);
  };
  return {
    sendFrom,
    setSendFrom,
    receiveIn,
    setReceiveIn,
    pressBackArrow,
    onPressBtn,
    toggleDropdown,
    openDropdown,
    isPending
  };
}
