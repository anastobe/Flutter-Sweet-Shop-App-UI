import { useEffect, useRef, useState } from 'react';
import { useIsFocused, useNavigation } from '@react-navigation/native';
import { HOME_ROUTES } from '../../../constants';
import { Toast } from '../../../utils';
import { SHOW_CLIENT } from '../../../APICall/constants';
import { Alert } from 'react-native';
import { StatusBar } from 'react-native';
import { THEME } from '../../../styles';

export default function useContactAddressViewModel() {
  const navigation = useNavigation();
  const cardDetailRef = useRef(null);

  const [openDropdown, setOpenDropdown] = useState(null); 
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
    if (!country) return Toast.showToast('Please Select Country', '', 'error');
    else if (!city) return Toast.showToast('Please Select City', '', 'error');
    else if (!address) return Toast.showToast('Please Enter Address', '', 'error');
    else if (!postalCode) return Toast.showToast('Please Enter Postal Code', '', 'error');
    else{
        cardDetailRef?.current?.open();
    }
  }

  function yesConfirm() {
    cardDetailRef?.current?.close();
    setTimeout(() => {
      navigation.navigate(HOME_ROUTES.ConfirmCardRequest, { data: {} });
    }, 1000);
  }

  const toggleDropdown = (key: any) => {
    setOpenDropdown(openDropdown === key ? null : key);
  };

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
    toggleDropdown,
    openDropdown, 
    setOpenDropdown,
  };
}
