import { useNavigation } from "@react-navigation/native";
import { useState } from "react";
import { Images } from "../../../config";

export const useBankTransferViewModel = () => {
  const navigation = useNavigation();

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
    console.log("Transfer Payment clicked");
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
  };
};
