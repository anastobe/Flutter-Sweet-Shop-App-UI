import { useEffect, useRef, useState } from 'react';
import { useIsFocused, useNavigation } from '@react-navigation/native';
import { Auth_ROUTES, HOME_ROUTES } from '../../../constants';
import { Toast } from '../../../utils';
import { useSelector } from 'react-redux';
import { StatusBar } from 'react-native';
import { THEME } from '../../../styles';

export function useCreatePhysicalCardViewModel() {
  const navigation = useNavigation();
  const cardDetailRef = useRef(null);

  const loginUserData = useSelector((state: any) => state?.HomeReducer?.loginUserData);
  const countryList = useSelector((state: any) => state?.MoreReducer?.countryList);
  const currencyList = useSelector((state: any) => state?.MoreReducer?.currencyList);
  const accountTypeList = useSelector((state: any) => state?.MoreReducer?.accountTypeList);
  const getCurrencyAccArray = useSelector((state: any) => state?.HomeReducer?.getCurrencyAccArray);
  const allAccounts = useSelector((state: any) => state?.HomeReducer?.allAccounts)

  const [openDropdown, setOpenDropdown] = useState(null); 
  const [design, setdesign] = useState({id: "", name: ""});
  const [pin, setPin] = useState('');
  const [cardName, setcardName] = useState('');

  const [openDropdownsty, setOpenDropdownSty] = useState(false);
  
  const [fromAccount, setFromAccount] = useState({
    id: "",
    available_balance: "",
    currency_id: "",
    name: "",
    iso_code: ""
  });

  // const [currency, setCurrency] = useState({
  //   __typename: "",
  //   id: "",
  //   iso_code: "",
  //   num_code: ""
  // });
  
  // const [linkedAccount, setLinkedAccount] = useState( {
  //   id: "",
  //   name: "",
  //   iso_code: "",
  //   num_code: ""
  // });

  const [limitType, setLimitType] = useState('Weekly');
  const [spendingLimit, setSpendingLimit] = useState('');

  const pressBackArrow = () => navigation.goBack();

  const toggleDropdown = (key: any) => {
    setOpenDropdown(openDropdown === key ? null : key);
  };

  const onPressBtn = () => {
    if (!cardName) {
      Toast.showToast('Please Enter Name', '', 'error');
    }
    else if (fromAccount?.id == "" || fromAccount?.currency_id == "") {
      Toast.showToast('Please Select Account', '', 'error');
    } 
    // else if (currency?.iso_code?.length === 0) {
    //   Toast.showToast('Please Select Currency', '', 'error');
    // } 
    // else if (linkedAccount?.name?.length === 0) {
    //   Toast.showToast('Please Select Linked Account Type', '', 'error');
    // } 
    else if (!limitType) {
      Toast.showToast('Please Select Limit Type', '', 'error');
    } 
    else if (!spendingLimit) {
      Toast.showToast('Please Enter Spending Limit', '', 'error');
    } else if (pin?.length === 0) {
      Toast.showToast('Please Your Security Pin', '', 'error');
    } else if (pin?.length < 4) {
      Toast.showToast('Security Pin Must be 4 Digit', '', 'error');
    } else if (pin?.length > 4) {
      Toast.showToast('Security Pin Must be 4 Digit', '', 'error');
    }  else {

      console.log("ASdasdsasa====>",cardName,fromAccount,limitType,spendingLimit);
      

      cardDetailRef?.current?.open();
    }
  };

  const yesConfirm = () => {
    cardDetailRef?.current?.close();
    let completeAddress = loginUserData.address_line1 + " " + loginUserData.address_line2 + " " + loginUserData.address_line3
    setTimeout(() => {
      const payload = {
        format: 'physical',
        card_name: cardName,
        spending_limits: spendingLimit,
        limit_type: limitType?.toLowerCase(),//
        currency_type: fromAccount?.currency_id?.toString(),
        linked_account: fromAccount.id,
        pin: pin
      };
      // card_desgin: 'steel', REMOVED
      navigation.navigate(HOME_ROUTES.ConfirmCardRequest, { data: payload, address: completeAddress, linkedAccount: fromAccount, currency: fromAccount  });
    }, 800);
  };

  const updateLocation = () => {
    cardDetailRef?.current?.close();
    setTimeout(() => {
      navigation.navigate(HOME_ROUTES.CONTACTADDRESS);
    }, 800);
  };

  return {
    cardDetailRef,
    cardName,
    setcardName,
    // currency,
    // setCurrency,
    // linkedAccount,
    // setLinkedAccount,
    limitType,
    setLimitType,
    spendingLimit,
    setSpendingLimit,
    pressBackArrow,
    onPressBtn,
    yesConfirm,
    updateLocation,
    countryList,
    currencyList,
    accountTypeList,
    design, 
    setdesign,
    openDropdown, 
    setOpenDropdown,
    toggleDropdown,
    getCurrencyAccArray,
    loginUserData,
    pin, 
    setPin,
    allAccounts,
    fromAccount, 
    setFromAccount,
    openDropdownsty, 
    setOpenDropdownSty
  };
}
