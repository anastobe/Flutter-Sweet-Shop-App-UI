import { useEffect, useRef, useState } from 'react';
import { useIsFocused, useNavigation } from '@react-navigation/native';
import { HOME_ROUTES } from '../../../constants';
import { Toast } from '../../../utils';
import { SHOW_CLIENT } from '../../../APICall/constants';
import { Alert } from 'react-native';
import { StatusBar } from 'react-native';
import { THEME } from '../../../styles';
import { useSelector } from 'react-redux';
import { AddnewBeneficiaryApi, UpdateContactAddress } from '../../../queries/moreQueries/moreQuery';

export default function useContactAddressViewModel() {
  const navigation = useNavigation();
  const cardDetailRef = useRef(null);

  const countryList = useSelector((state: any) => state?.MoreReducer?.countryList);

  const [openDropdown, setOpenDropdown] = useState(null); 
  const [open, setOpen] = useState(false);
  const [country, setCountry] = useState('');
  const [city, setCity] = useState('');
  const [address, setAddress] = useState('');
  const [postalCode, setPostalCode] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [secure, setSecure] = useState(true);

  
  const { mutate: UpdateContactAddressFunc, isPending: isPending_UpdateContactAddress } = UpdateContactAddress({
    callback: (res: any) => {
      if (res.success) {
        navigation.goBack() 
      }
    }
  });

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

  function ApiCall() {

    let payloadWithParams = {
      ID: "1",
      payload: {
        address_line1: address,
    // "address_line2": "hello1",
    // "address_line3": "hello1"
        }
    }
    UpdateContactAddressFunc(payloadWithParams)
    console.log(payloadWithParams,"data==>",country,city,address,postalCode,confirmPassword);
    
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
    countryList,
    ApiCall,
    isPending_UpdateContactAddress


  };
}
