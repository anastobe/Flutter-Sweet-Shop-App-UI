import { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { Images } from "../../../config";
import { Alert } from "react-native";
import { SHOW_CLIENT } from "../../../APICall/constants";

export const useAddNewCurrencyAccountViewModel = () => {
  const navigation = useNavigation();

  const [openDropdown, setOpenDropdown] = useState(null); 
  const [accountName, setAccountName] = useState("");
  const [currency, setCurrency] = useState("");
  const [modalAddCurrency, setModalAddCurrency] = useState(false);
  const [requestSubmitted, setRequestSubmitted] = useState(false);

  const pressBackArrow = () => {
    navigation.goBack();
  };

  const handleAddCurrency = () => {
    setModalAddCurrency(true);
  };

  const handleConfirmAddCurrency = () => {
    setModalAddCurrency(false);
    setTimeout(()=>{
      setRequestSubmitted(true);
    },1000)
   
    //  Alert.alert("NEED",SHOW_CLIENT)
  };

  const handleCloseAddCurrency = () => {
    setModalAddCurrency(false);
  };

  const handleCloseRequestSubmitted = () => {
    setRequestSubmitted(false);
  };

  const freezeModalProps = {
    addCurrency: {
      visible: modalAddCurrency,
      onClose: handleCloseAddCurrency,
      onConfirm: handleConfirmAddCurrency,
      title: "Sure, You want to add new currency?",
      marginTopTitle: 40,
      body: "",
      confirmText: "Yes",
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
    openDropdown
  };
};
