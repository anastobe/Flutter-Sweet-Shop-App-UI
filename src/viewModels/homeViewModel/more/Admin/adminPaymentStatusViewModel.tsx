import { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { Images } from '../../../../config';
import { Alert } from 'react-native';

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
