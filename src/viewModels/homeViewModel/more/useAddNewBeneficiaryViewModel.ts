import { useNavigation } from '@react-navigation/native';
import { useState } from 'react';
import { BENEFICIARY_TYPES, ACCOUNT_TYPES, COUNTRIES, CURRENCIES } from '../../../utils/data';
import { Alert } from 'react-native';
import { SHOW_CLIENT } from '../../../APICall/constants';
import { Toast } from '../../../utils';
import { useSelector } from 'react-redux';
import { AddnewBeneficiaryApi } from '../../../queries/moreQueries/moreQuery';
import { HOME_ROUTES } from '../../../constants';

export const useAddNewBeneficiaryViewModel = () => {

  const navigation = useNavigation();

  const countryList = useSelector((state: any) => state?.MoreReducer?.countryList);
  const currencyList = useSelector((state: any) => state?.MoreReducer?.currencyList);
  const accountTypeList = useSelector((state: any) => state?.MoreReducer?.accountTypeList);
  
  const [openDropdown, setOpenDropdown] = useState(null); 
  const [checked, setChecked] = useState('frontier');
  const [beneficiaryName, setBeneficiaryName] = useState('');
  const [accountType, setAccountType] = useState('');
  const [accountNo, setAccountNo] = useState('');
  const [bicNo, setBicNo] = useState('');
  const [country, setCountry] = useState('');
  const [currency, setCurrency] = useState('');
  const [open, setOpen] = useState(false);

  const handlePressType = (key: string) => setChecked(key);
  const pressBackArrow = () => navigation.goBack();

  const { mutate: AddnewBeneficiaryApiFunc, isPending: isPending_AddnewBeneficiaryApi } = AddnewBeneficiaryApi({
    callback: (res: any) => {
      setOpen(true)
    },
  });

  const toggleDropdown = (key: any) => {
    setOpenDropdown(openDropdown === key ? null : key);
  };

  const onPressBtn = () => {
      if (!checked) {
        Toast.showToast("Please enter beneficiary name", '', 'error');
        return false;
      }
      else if (!beneficiaryName.trim()) { 
        Toast.showToast("Please enter beneficiary name", '', 'error');
        return false;
      }
      else if (!accountType.trim()) {
        Toast.showToast("Please select account type", '', 'error');
        return false;
      }
      else if (!accountNo.trim()) {
        Toast.showToast("Please enter account number", '', 'error');
        return false;
      }
      else if (!bicNo.trim()) {
        Toast.showToast("Please enter BIC number", '', 'error');
        return false;
      }
      else if (!country.trim()) {
        Toast.showToast("Please select country", '', 'error');
        return false;
      }
      else if (!currency.trim()) {
        Toast.showToast("Please select currency", '', 'error');
        return false;
      }
      else{
      let payload = {
          first_name: beneficiaryName,
          last_name: "",
          // email: "john.doe@example.com",
        //   account_number: "1234567890123",
          account_name: accountNo,
          iban: accountNo,
          bic: bicNo,
          // country_id: country, 
        //   mobile_number: "+923001234567",
        //   bank_branch_name: "Main Branch Karachi",
        //   branch_code: "BR123"
        }
        AddnewBeneficiaryApiFunc(payload)
      }

  };

  const onClosePopup = () =>{
    // Alert.alert("NEED",SHOW_CLIENT)
    setOpen(false) 
    // navigation.goBack() W
    };

  const pressTransferMoney = () =>{
    setOpen(false)
    navigation.navigate(HOME_ROUTES.MAKE_PAYMENT)    
    };


  return {
    checked,
    beneficiaryName,
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
    setBeneficiaryName,
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
    isPending_AddnewBeneficiaryApi,
    toggleDropdown,
    openDropdown
  };
};
