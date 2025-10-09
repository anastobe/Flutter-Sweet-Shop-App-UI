import { useRef, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { HOME_ROUTES } from '../../../constants';
import { Toast } from '../../../utils';

export default function useContactAddressViewModel() {
  const navigation = useNavigation();
  const cardDetailRef = useRef(null);

  const [open, setOpen] = useState(false);
  const [country, setCountry] = useState('');
  const [city, setCity] = useState('');
  const [address, setAddress] = useState('');
  const [postalCode, setPostalCode] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [secure, setSecure] = useState(true);

  function pressBackArrow() {
    navigation.goBack();
  }

  function onPressBtn() {
    cardDetailRef?.current?.open();

    if (!country) return Toast.showToast('Please Select Country', '', 'error');
    if (!city) return Toast.showToast('Please Select City', '', 'error');
    if (!address) return Toast.showToast('Please Enter Address', '', 'error');
    if (!postalCode) return Toast.showToast('Please Enter Postal Code', '', 'error');
  }

  function yesConfirm() {
    cardDetailRef?.current?.close();
    setTimeout(() => {
      navigation.navigate(HOME_ROUTES.ConfirmCardRequest, { data: {} });
    }, 1000);
  }

  return {
    pressBackArrow,
    onPressBtn,
    yesConfirm,
    cardDetailRef,
    open,
    setOpen,
    country,
    setCountry,
    city,
    setCity,
    address,
    setAddress,
    postalCode,
    setPostalCode,
    confirmPassword,
    setConfirmPassword,
    secure,
    setSecure,
  };
}
