import { useEffect, useRef, useState } from 'react';
import { useIsFocused, useNavigation } from '@react-navigation/native';
import { HOME_ROUTES } from '../../../constants';
import { Toast } from '../../../utils';
import { SHOW_CLIENT } from '../../../APICall/constants';
import { Alert } from 'react-native';
import { StatusBar } from 'react-native';
import { THEME } from '../../../styles';
import { useDispatch, useSelector } from 'react-redux';
import { AddnewBeneficiaryApi, UpdateContactAddress } from '../../../queries/moreQueries/moreQuery';
import apis from '../../../services';

export default function useContactAddressViewModel() {
  const navigation = useNavigation();
  const cardDetailRef = useRef(null);
  const dispatch = useDispatch()

  const loginUserData = useSelector((state: any) => state?.HomeReducer?.loginUserData)
  const countryList = useSelector((state: any) => state?.MoreReducer?.countryList);

  const [openDropdown, setOpenDropdown] = useState(null); 
  const [open, setOpen] = useState(false);
  const [country, setCountry] = useState({
    id: '',
    name: ''
  });
  const [town, setown] = useState('');
  const [address, setAddress] = useState('');
  const [postalCode, setPostalCode] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [secure, setSecure] = useState(true);

  
  const { mutate: UpdateContactAddressFunc, isPending: isPending_UpdateContactAddress } = UpdateContactAddress({
    callback: (res: any) => {
      if (res.success) {
        updateDataInRedux()
        navigation.goBack() 
      }
    }
  });

  useEffect(()=>{
    if (loginUserData) { 
      setCountry({
        id: loginUserData?.country?.id,
        name: loginUserData?.country?.name
      })
      setown(loginUserData?.town)
      setAddress(loginUserData?.address_line1)
      setPostalCode(loginUserData?.postcode)
    }
  },[loginUserData])

  async function updateDataInRedux() {
    await apis.getUserDetail(dispatch)
  }

  function pressBackArrow() {
    navigation.goBack();
  }

  function onPressBtn() {
    if (!country?.id) return Toast.showToast('Please select country', '', 'error');
    else if (!town) return Toast.showToast('Please enter town', '', 'error');
    else if (!address) return Toast.showToast('Please enter address', '', 'error');
    else if (!postalCode) return Toast.showToast('Please enter postal code', '', 'error');
    // else if (!confirmPassword) return Toast.showToast('Please enter password', '', 'error')

    else{
      
    let payloadWithParams = {
      ID: loginUserData?.id, //will change in futhure
      payload: {
        country_id: country?.id,
        town: town,
        address_line1: address,
        postcode: postalCode,
        password: confirmPassword
      }
    }
    UpdateContactAddressFunc(payloadWithParams)

        // cardDetailRef?.current?.open();
    }
  }

  function yesConfirm() {
    cardDetailRef?.current?.close();
    setTimeout(() => {
      navigation.navigate(HOME_ROUTES.ConfirmCardRequest, { data: {} });
    }, 1000);
  }

  function ApiCall() {

console.log("play");

    
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
    town,
    setown,
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
    loginUserData,
    isPending_UpdateContactAddress


  };
}
