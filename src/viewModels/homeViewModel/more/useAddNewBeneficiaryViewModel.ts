import { useIsFocused, useNavigation } from '@react-navigation/native';
import { useEffect, useState } from 'react';
import { BENEFICIARY_TYPES, ACCOUNT_TYPES, COUNTRIES, CURRENCIES, BENEFICIARY_ADD_FOR } from '../../../utils/data';
import { Alert } from 'react-native';
import { SHOW_CLIENT } from '../../../APICall/constants';
import { CommonUtils, Toast } from '../../../utils';
import { useSelector } from 'react-redux';
import { AddnewBeneficiaryApi } from '../../../queries/moreQueries/moreQuery';
import { HOME_ROUTES } from '../../../constants';
import { StatusBar } from 'react-native';
import { THEME } from '../../../styles';
import commonUtils from '../../../utils/common.utils';

export const useAddNewBeneficiaryViewModel = () => {

  const navigation = useNavigation();

  const countryList = useSelector((state: any) => state?.MoreReducer?.countryList);
  const currencyList = useSelector((state: any) => state?.MoreReducer?.currencyList);
  const accountTypeList = useSelector((state: any) => state?.MoreReducer?.accountTypeList);
  
  const [adjustScrollHeight, setadjustScrollHeight] = useState(false);
  const [adjustScrollHeightCountry, setadjustScrollHeightCountry] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(null); 
  const [checked, setChecked] = useState('frontier');
  const [firstName, setfirstName] = useState('');
  const [lastName, setlastName] = useState('');
  const [email, setemail] = useState('');
  const [accountType, setAccountType] = useState('');
  const [selectBeneficiary, setselectBeneficiary] = useState('');
  const [accountNo, setAccountNo] = useState('');
  const [bicNo, setBicNo] = useState('');
  const [country, setCountry] = useState('');
  const [currency, setCurrency] = useState({
    id: "",
    name: ""
  });
  const [open, setOpen] = useState(false);

  const handlePressType = (key: string) => setChecked(key);
  const pressBackArrow = () => navigation.goBack();

  const { mutate: AddnewBeneficiaryApiFunc, isPending: isPending_AddnewBeneficiaryApi } = AddnewBeneficiaryApi({
    callback: (res: any) => {
      setModalVisible(false)
      setTimeout(() => {
        setOpen(true)  
      }, 1000);
    },
  });

  const toggleDropdown = (key: any) => {
    setOpenDropdown(openDropdown === key ? null : key);
  };

  function openConfirmationModal() {
      if (!checked) {
        Toast.showToast("Please enter beneficiary name", '', 'error');
        return false;
      }
      else if (!firstName.trim()) { 
        Toast.showToast("Please enter first name", '', 'error');
        return false;
      }
      else if (!lastName.trim()) { 
        Toast.showToast("Please enter last name", '', 'error');
        return false;
      }
      else if (!email.trim()) { 
        Toast.showToast("Please enter email", '', 'error');
        return false;
      }
      else if (!commonUtils.RegEmail.test(email)) { 
        Toast.showToast("Please enter valid email", '', 'error');
        return false;
      }
      else if (!selectBeneficiary.trim()) {
        Toast.showToast("Please select beneficiary type", '', 'error');
        return false;
      }
      // else if (!accountType.trim()) {
      //   Toast.showToast("Please select account type", '', 'error');
      //   return false;
      // }
      else if (!accountNo.trim()) {
        Toast.showToast("Please enter account number", '', 'error');
        return false;
      }
      else if (!CommonUtils.validateIBAN(accountNo)) {
        Toast.showToast("Please enter correct account number", '', 'error');
        return false;
      } 
      else if (!bicNo.trim()) {
        Toast.showToast("Please enter BIC number", '', 'error');
        return false;
      }
      else if (!CommonUtils.validateBIC(bicNo))  {
        Toast.showToast("Please enter correct BIC number", '', 'error');
        return false;
      }
      // else if (!country.trim()) {
      //   Toast.showToast("Please select country", '', 'error');
      //   return false;
      // }
      else if (!currency?.id) {
        Toast.showToast("Please select currency", '', 'error');
        return false;
      }
      else{
        setModalVisible(true)
      }
  }

  const onPressBtn = () => {

   const payload = {
          first_name: firstName,
          last_name: lastName,
          email: email,
          currency_id: currency?.id,
          ...(accountNo
            ? { iban: accountNo }
            : bicNo
            ? { bic: bicNo }
            : {})
        };

        console.log("PAYLOAD==>",payload);
        
        

        // AddnewBeneficiaryApiFunc(payload)
  };

  const onClosePopup = () =>{
    // Alert.alert("NEED",SHOW_CLIENT)
    setOpen(false) 
    // navigation.goBack() W
    };

  const pressTransferMoney = () =>{
    setTimeout(() => {
      setOpen(false) 
    }, 500);
    navigation.navigate(HOME_ROUTES.MAKE_PAYMENT)    
    };


  return {
    checked,
    firstName,
    accountType,
    accountNo,
    bicNo,
    country,
    currency,
    open,
    BENEFICIARY_TYPES,
    ACCOUNT_TYPES,
    COUNTRIES,
    CURRENCIES,
    setfirstName,
    setAccountType,
    setAccountNo,
    setBicNo,
    setCountry,
    setCurrency,
    handlePressType,
    pressBackArrow,
    onPressBtn,
    onClosePopup,
    pressTransferMoney,
    countryList,
    currencyList,
    accountTypeList,
    BENEFICIARY_ADD_FOR,
    isPending_AddnewBeneficiaryApi,
    toggleDropdown,
    openDropdown,
    modalVisible, 
    setModalVisible,
    openConfirmationModal,
    adjustScrollHeight,
    setadjustScrollHeight,
    adjustScrollHeightCountry, 
    setadjustScrollHeightCountry,
    selectBeneficiary, 
    setselectBeneficiary,
    lastName, 
    setlastName,
    email, 
    setemail
  };
};
