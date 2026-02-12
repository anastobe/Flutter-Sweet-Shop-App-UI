import { useEffect, useMemo, useRef, useState } from 'react';
import { useIsFocused, useNavigation } from '@react-navigation/native';
import { HOME_ROUTES } from '../../../constants';
import { Toast } from '../../../utils';
import { Alert } from 'react-native';
import { StatusBar } from 'react-native';
import { THEME } from '../../../styles';
import { useDispatch, useSelector } from 'react-redux';
import { AddnewBeneficiaryApi, UpdateContactAddress } from '../../../queries/moreQueries/moreQuery';
import apis from '../../../services';
import { storeLoginUserData } from '../../../Redux/Action/Home/HomeActions';
import { getUserDetail } from '../../../queries/accountQueries/accountQuery';

export default function useContactAddressViewModel() {
  const navigation = useNavigation();
  const cardDetailRef = useRef(null);
  const dispatch = useDispatch()

  const userData = useSelector((state: any) => state?.AuthReducer?.userData);
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
  const [address2, setAddress2] = useState('');
  const [postalCode, setPostalCode] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [secure, setSecure] = useState(true);

  // console.log("userData===>",userData);
  

    const user = useMemo(() => {

      // if (loginUserData?.customer_type == "corporate") {

      //   const foundObject = loginUserData?.members?.find(obj => obj.id === userData?.user_id);
      //   return foundObject ?? null;
        
      // } else if(loginUserData?.customer_type == "personal") { //ok report
        return loginUserData?.members?.[0] ?? null;
      // }
      
    }, [loginUserData]);
  
  const { mutate: UpdateContactAddressFunc, isPending: isPending_UpdateContactAddress } = UpdateContactAddress({
    callback: (res: any) => {
      if (res.success) {
        updateDataInRedux()
        navigation.goBack() 
      }
    }
  });

  const {mutate: getUserDetailFunc, isPending: isPendinggetUserDetail} = getUserDetail({
    callback: (response: any) => {
      if (response.success) {
        // console.log("get user detail fetch",response);         
          if (response?.results) {
            dispatch(storeLoginUserData(response.results));
          }
      }
    },
  });

  useEffect(()=>{
    if (!user) return 
      setCountry({
        id: user?.country?.id,
        name: user?.country?.name
      })
      setown(user?.town)
      setAddress(user?.address_line1)
      setAddress2(user?.address_line1)
      setPostalCode(user?.postcode)
  },[user])

  async function updateDataInRedux() {
    // getUserDetailFunc({skip_activity_check:true})
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
      ID: userData?.user_id, //will change in futhure
      payload: {
        country_id: country?.id,
        town: town,
        address_line1: address,
        address_line2: address2,
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
    userData,
    isPending_UpdateContactAddress,
    address2, 
    setAddress2


  };
}
