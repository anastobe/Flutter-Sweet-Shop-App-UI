import { useEffect, useState } from "react";
import { useIsFocused, useNavigation } from "@react-navigation/native";
import { Images } from "../../../config";
import { Alert } from "react-native";
import { SHOW_CLIENT } from "../../../APICall/constants";
import { StatusBar } from "react-native";
import { THEME } from "../../../styles";
import { useSelector } from "react-redux";
import { Toast } from "../../../utils";
import { useFXConversion } from "../../../queries/paymentQuery/paymentQuery";
import { useaddAsset } from "../../../queries/homeQueries/homeQuery";
import { HOME_ROUTES } from "../../../constants";

export const useAddNewCurrencyAccountViewModel = () => {
  const navigation = useNavigation();

  const allAccounts = useSelector((state: any) => state?.HomeReducer?.allAccounts)
  const getCurrencyAccArray = useSelector((state: any) => state?.HomeReducer?.getCurrencyAccArray);
  const [openDropdownsty, setOpenDropdownSty] = useState(false);
  const [openDropdownstyToAcc, setOpenDropdownStyToAcc] = useState(false);
  const currencyList = useSelector((state: any) => state?.MoreReducer?.currencyList);
  const accountTypeList = useSelector((state: any) => state?.MoreReducer?.accountTypeList);

  const [fromAccount, setFromAccount] = useState({
    id: "",
    name: ""
  });
  const [openDropdown, setOpenDropdown] = useState(null); 
  const [accountName, setAccountName] = useState("");
  const [modalAddCurrency, setModalAddCurrency] = useState(false);
  const [requestSubmitted, setRequestSubmitted] = useState(false);
  const [currency, setCurrency] = useState({
    id: "",
    name: ""
  });
  const [assetType, setassetType] = useState({
    id: "",
    name: ""
  });
  
  
  const { mutate: useaddAssetFunc, isPending } = useaddAsset({
    callback: (res: any) => {
      if (res?.success) {
        setModalAddCurrency(false);
        setTimeout(()=>{
          setRequestSubmitted(true);
        },1000)
      }
    }
  });

  const pressBackArrow = () => {
    navigation.goBack();
  };

  const handleAddCurrency = () => {
    if (fromAccount.id == '') {
      return Toast.showToast('Select your account', '', 'error');
    } 
    else if (currency.id == '') {
      return Toast.showToast('Select currency', '', 'error');
    } 
    else if (assetType?.id == '') {
      return Toast.showToast('Select asset type', '', 'error');
    } 
    else {
      setModalAddCurrency(true);
    }
  };

  const handleConfirmAddCurrency = () => {
      const payload = {
        currency_id: currency.id,
        asset_type_id: assetType?.id,
        account_id: fromAccount.id
      };
      console.log("PAYLOAD==>",payload);
      
      useaddAssetFunc(payload)
  };

  const handleCloseAddCurrency = () => {
    setModalAddCurrency(false);
  };

  const handleCloseRequestSubmitted = () => {
    // setRequestSubmitted(false);
    navigation.reset({
      index: 0,
      routes: [{ name: HOME_ROUTES.HOME }],
    });
  };

  const freezeModalProps = {
    addCurrency: {
      visible: modalAddCurrency,
      onClose: isPending ? null : handleCloseAddCurrency,
      onConfirm:  handleConfirmAddCurrency,
      title: "Sure, You want to add new currency?",
      marginTopTitle: 30,
      body: "",
      confirmText: "Yes",
      btnLoader: isPending,
      downConfirmText: "No",
      backImg: Images.addCardGradient,
      iconName: "",
    },
    requestSubmitted: {
      visible: requestSubmitted,
      onClose: handleCloseRequestSubmitted,
      onConfirm: handleCloseRequestSubmitted,
      title: "Account Request Submitted",
      marginTopTitle: 30,
      body: "Your request to open a new currency account has been submitted successfully. We’ll notify you once it’s approved and ready to use.",
      confirmText: "OK",
      downConfirmText: "Cancel",
      backImg: Images.addCardGradient,
      iconName: "checkmark-outline",
    },
  };

  const toggleDropdown = (key: any) => {
    setOpenDropdown(openDropdown === key ? null : key);
  };
 

  return {
    accountName,
    setAccountName,
    currency,
    setCurrency,
    modalAddCurrency,
    requestSubmitted,
    pressBackArrow,
    handleAddCurrency,
    freezeModalProps,
    toggleDropdown,
    openDropdown,
    currencyList,
    accountTypeList,
    setOpenDropdown,
    openDropdownsty, 
    setOpenDropdownSty,
    fromAccount, 
    setFromAccount,
    openDropdownstyToAcc, 
    setOpenDropdownStyToAcc,
    getCurrencyAccArray,
    allAccounts,
    assetType, 
    setassetType,
    isPending

  };
};
