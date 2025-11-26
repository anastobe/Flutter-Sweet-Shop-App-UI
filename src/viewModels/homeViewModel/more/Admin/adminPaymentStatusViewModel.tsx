import { useEffect, useState } from 'react';
import { useIsFocused, useNavigation } from '@react-navigation/native';
import { Images } from '../../../../config';
import { Alert } from 'react-native';
import { StatusBar } from 'react-native';
import { THEME } from '../../../../styles';

export const useAdminPaymentStatusViewModel = () => {
  const navigation = useNavigation();

    const [open, setOpen] = useState(false);
  const [open2, setOpen2] = useState(false);
  const [amountSpend, setAmountSpend] = useState('');
  const [fromAcc] = useState({
    label: 'Clearbank Account',
    currency: 'GBP',
    flag: Images.account,
  });
  const [toAcc] = useState({
    label: 'Bank of Spain',
    currency: 'EUR',
    flag: Images.account,
  });
  const FOCUS = useIsFocused()

  useEffect(()=>{
    if (FOCUS) {
      StatusBar.setBackgroundColor(THEME.darkSecondary)
    }
  },[FOCUS]) 


  const pressBackArrow = () => navigation.goBack();
  const handlePress = () => setOpen2(!open2)
  const onTransfer = () => setOpen(!open)

  return {
    amountSpend,
    setAmountSpend,
    fromAcc,
    toAcc,
    pressBackArrow,
    handlePress,
    onTransfer,
    open,
    setOpen,
    open2,
    setOpen2,
  };
};
