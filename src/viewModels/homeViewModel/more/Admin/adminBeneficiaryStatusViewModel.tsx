import { useIsFocused, useNavigation } from '@react-navigation/native';
import { useEffect, useState } from 'react';
import { BENEFICIARY_TYPES, ACCOUNT_TYPES, COUNTRIES, CURRENCIES } from '../../../../utils/data';
import { StatusBar } from 'react-native';
import { THEME } from '../../../../styles';

export const useAdminBeneficiariesManagementViewModel = () => {
  const navigation = useNavigation();
  const FOCUS = useIsFocused()

  const [open, setOpen] = useState(false);
  const [open2, setOpen2] = useState(false);
  const [checked, setChecked] = useState('frontier');
  const [beneficiaryName, setBeneficiaryName] = useState('');
  const [accountType, setAccountType] = useState('');
  const [accountNo, setAccountNo] = useState('');
  const [bicNo, setBicNo] = useState('');
  const [country, setCountry] = useState('');
  const [currency, setCurrency] = useState('');
  const [openDropdown, setOpenDropdown] = useState(null); 

  useEffect(()=>{
    if (FOCUS) {
      StatusBar.setBackgroundColor(THEME.darkSecondary)
    }
  },[FOCUS]) 

  const handlePressType = (key: string) => setChecked(key);
  const pressBackArrow = () => navigation.goBack();

  const onPressBtn = () => {
    // validation or API call logic here
    setOpen(true);
  };

  const onClosePopup = () => setOpen(false);
  
  const toggleDropdown = (key: any) => {
    setOpenDropdown(openDropdown === key ? null : key);
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
    setOpen,
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
    setOpen2,
    open2,
    toggleDropdown,
    openDropdown
  };
};

