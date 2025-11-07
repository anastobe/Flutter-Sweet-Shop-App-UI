import { useNavigation } from "@react-navigation/native";
import { useState } from "react";
import { Images } from "../../../config";
import { SHOW_CLIENT } from "../../../APICall/constants";
import { Alert } from "react-native";

export const useBankTransferViewModel = () => {
  const navigation = useNavigation();

  const [openDropdown, setOpenDropdown] = useState(null); 
  const [recipientGets, setRecipientGets] = useState("");
  const [beneficiaryBankCountry, setBeneficiaryBankCountry] = useState();
  const [recipientType, setRecipientType] = useState();
  const [fromAcc, setFromAcc] = useState({
    label: "Clearbank Account",
    currency: "GBP",
    flag: Images.account,
  });

  const pressBackArrow = () => navigation.goBack();

  const handlePress = () => {
    console.log("From Account pressed");
  };

  const handleTransfer = () => {
    Alert.alert("NEED",SHOW_CLIENT)
  };

  const toggleDropdown = (key: any) => {
    setOpenDropdown(openDropdown === key ? null : key);
  };
  return {
    recipientGets,
    setRecipientGets,
    beneficiaryBankCountry,
    setBeneficiaryBankCountry,
    recipientType,
    setRecipientType,
    fromAcc,
    pressBackArrow,
    handlePress,
    handleTransfer,
    openDropdown,
    toggleDropdown
  };
};
