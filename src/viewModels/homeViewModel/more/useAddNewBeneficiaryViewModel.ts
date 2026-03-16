import { useIsFocused, useNavigation } from '@react-navigation/native';
import { useEffect, useRef, useState } from 'react';
import { BENEFICIARY_TYPES, ACCOUNT_TYPES, BENEFICIARY_ADD_FOR, BENEFICIARY_KEY_FOR, CUSTOMER_TYPE, GLOBAL_USER_TYPES, LOGIN_USER_TYPES } from '../../../utils/data';
import { Alert } from 'react-native';
import { CommonUtils, Toast } from '../../../utils';
import { useSelector } from 'react-redux';
import { AddnewBeneficiaryApi, GetCopDetail } from '../../../queries/moreQueries/moreQuery';
import { HOME_ROUTES } from '../../../constants';
import { StatusBar } from 'react-native';
import { THEME } from '../../../styles';
import commonUtils from '../../../utils/common.utils';

export const useAddNewBeneficiaryViewModel = () => {

  const navigation = useNavigation();
  const confirmCop = useRef()

  const countryList = useSelector((state: any) => state?.MoreReducer?.countryList);
  const currencyList = useSelector((state: any) => state?.MoreReducer?.currencyList);
  const accountTypeList = useSelector((state: any) => state?.MoreReducer?.accountTypeList);

  const save_user_type = useSelector((state: any) => state?.AuthReducer?.save_user_type);
  const [adjustScrollHeight, setadjustScrollHeight] = useState(false);
  const [adjustScrollHeightCountry, setadjustScrollHeightCountry] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(null); 
  const [checked, setChecked] = useState('frontier');
  const [firstName, setfirstName] = useState('Anas');
  const [lastName, setlastName] = useState('Ahmed');
  const [email, setemail] = useState('anastobe968@gmail.com');
  const [accountType, setAccountType] = useState('');
  const [selectBeneficiary, setselectBeneficiary] = useState('');
  //id perfect match must return null name,description,reason code
  const [accountName, setaccountName] = useState('Mary Smith Co');
  const [accountNo, setAccountNo] = useState('21111116');
  const [sortCode, setsortCode] = useState('111111');
  //id not perfect match must return name,description,reason code
  // const [accountName, setaccountName] = useState('Tell Money ltasas');
  // const [accountNo, setAccountNo] = useState('21111112');
  // const [sortCode, setsortCode] = useState('111111');

  const [bicNo, setBicNo] = useState('');
  const [country, setCountry] = useState('');
  const [currency, setCurrency] = useState({
    id: "",
    name: ""
  });
  const [saveCopDetail, setsaveCopDetail] = useState({
    Matched: false,
    ReasonCode: null,
    Name: null,
    ReasonDescription: null,
  });


  //   const [accountName, setaccountName] = useState('');
  // const [firstName, setfirstName] = useState('');
  // const [lastName, setlastName] = useState('');
  // const [email, setemail] = useState('');
  // const [accountType, setAccountType] = useState('');
  // const [selectBeneficiary, setselectBeneficiary] = useState('');
  // const [accountNo, setAccountNo] = useState('');
  // const [sortCode, setsortCode] = useState('');
  // const [bicNo, setBicNo] = useState('');
  // const [country, setCountry] = useState('');
  // const [currency, setCurrency] = useState({
  //   id: "",
  //   name: ""
  // });
  // const [saveCopDetail, setsaveCopDetail] = useState({
  //   Matched: true,
  //   ReasonCode: null,
  //   Name: null,
  //   ReasonDescription: null,
  // });

  
  const [open, setOpen] = useState(false);

  const handlePressType = (key: string) => setChecked(key);
  const pressBackArrow = () => navigation.goBack();

  const { mutate: AddnewBeneficiaryApiFunc, isPending: isPending_AddnewBeneficiaryApi } = AddnewBeneficiaryApi({
    callback: (res: any) => {
      setModalVisible(false)
      confirmCop?.current?.close()
      setTimeout(() => {
        setOpen(true)  
      }, 1000);
    },
  });

  const { mutate: GetCopDetailFunc, isPending: isPending_GetCopDetail } = GetCopDetail({
    callback: (res: any) => {
      if (res?.success) {
      setsaveCopDetail({
        Matched: res?.results?.Matched,
        ReasonCode: res?.results?.ReasonCode,
        Name: res?.results?.Name,
        ReasonDescription: res?.results?.ReasonDescription,
      })
       confirmCop?.current?.open()
    }

  }
  });


  const toggleDropdown = (key: any) => {
    setOpenDropdown(openDropdown === key ? null : key);
  };

function openConfirmationModal() {

  if (!checked) {
    Toast.showToast("Please enter beneficiary name", '', 'error');
    return false;
  }

  if (!firstName.trim()) {
    Toast.showToast("Please enter first name", '', 'error');
    return false;
  }

  if (!lastName.trim()) {
    Toast.showToast("Please enter last name", '', 'error');
    return false;
  }

  if (!accountName.trim()) {
    Toast.showToast("Please enter account name", '', 'error');
    return false;
  }

  if (!email.trim()) {
    Toast.showToast("Please enter email", '', 'error');
    return false;
  }

  if (!commonUtils.RegEmail.test(email)) {
    Toast.showToast("Please enter valid email", '', 'error');
    return false;
  }

  if (!selectBeneficiary.trim()) {
    Toast.showToast("Please select beneficiary type", '', 'error');
    return false;
  }

  // 🔹 BANK validation
  if (selectBeneficiary === BENEFICIARY_KEY_FOR.bank) {
    if (!accountNo?.trim()) {
      Toast.showToast("Please enter account number", '', 'error');
      return false;
    }

    // if (!CommonUtils.validateIBAN(accountNo)) {
    //   Toast.showToast("Please enter correct account number", '', 'error');
    //   return false;
    // }
  }

  // 🔹 INTERNATIONAL validation
  if (selectBeneficiary === BENEFICIARY_KEY_FOR.international) {
    if (!bicNo?.trim()) {
      Toast.showToast("Please enter BIC number", '', 'error');
      return false;
    }

    if (!CommonUtils.validateBIC(bicNo)) {
      Toast.showToast("Please enter correct BIC number", '', 'error');
      return false;
    }
  }

  // 🔹 CURRENCY (independent check)
  if (!currency?.id) {
    Toast.showToast("Please select currency", '', 'error');
    return false;
  }

  // ✅ ALL OK
  let payload ={
    sort_code: sortCode,
    account_number: accountNo,
    account_type: save_user_type == LOGIN_USER_TYPES.individual ? "Personal" : "Business", //personal or business
    account_name: accountName
  }
  
  console.log("payload=>",payload);
  
  GetCopDetailFunc(payload)
  // confirmCop?.current?.open()
  // setModalVisible(true);
}

  const onPressBtn = () => {

   const payload = {
          first_name: firstName,
          last_name: lastName,
          email: email,
          is_corporate: save_user_type == LOGIN_USER_TYPES.corporate_maker ? true : false,          
          account_name: accountName,
          currency_id: currency?.id,
          ...(accountNo
            ? { iban: accountNo }
            : bicNo
            ? { bic: bicNo }
            : {}),
          sort_code: sortCode,
          account_type: save_user_type == LOGIN_USER_TYPES.individual ? "personal" : "business", //personal or business
          // account_type: userData?.customer_type == CUSTOMER_TYPE.CORPORATE ? "business" : "personal", //personal or business
        };

        console.log("PAYLOAD==>",payload);

        AddnewBeneficiaryApiFunc(payload)
  };

  const onClosePopup = () =>{
    setOpen(false)
    setTimeout(() => {
      navigation.goBack();
    }, 500); 
    };

  const pressTransferMoney = () =>{
    setTimeout(() => {
      setOpen(false) 
    }, 500);
    navigation.navigate(HOME_ROUTES.MAKE_PAYMENT)    
    };

  function onPressSave() {
    setModalVisible(true);
  }

  function onPressEdit() {
    confirmCop?.current?.close()
  }


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
    navigation,
    setemail,
    sortCode, 
    setsortCode,
    confirmCop,
    onPressSave,
    onPressEdit,
    GetCopDetailFunc,
    isPending_GetCopDetail,
    accountName, 
    setaccountName,
    saveCopDetail, 
    setsaveCopDetail
  };
};
