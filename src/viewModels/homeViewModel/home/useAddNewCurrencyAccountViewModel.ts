import { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { Images } from "../../../config";

export const useAddNewCurrencyAccountViewModel = () => {
  const navigation = useNavigation();

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
    setRequestSubmitted(true);
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
      title: "Do you want to Add New Currency?",
      body: "",
      confirmText: "Yes",
      downConfirmText: "No",
      backImg: Images.addCardGradient,
      iconName: "checkmark-outline",
    },
    requestSubmitted: {
      visible: requestSubmitted,
      onClose: handleCloseRequestSubmitted,
      onConfirm: handleCloseRequestSubmitted,
      title: "Account Request Submitted",
      body: "Your request to open a new currency account has been submitted successfully. We’ll notify you once it’s approved and ready to use.",
      confirmText: "OK",
      downConfirmText: "Cancel",
      backImg: Images.addCardGradient,
      iconName: "checkmark-outline",
    },
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
  };
};
