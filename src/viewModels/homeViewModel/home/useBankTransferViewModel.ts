import { useIsFocused, useNavigation } from "@react-navigation/native";
import { useEffect, useState } from "react";
import { Images } from "../../../config";
import { SHOW_CLIENT } from "../../../APICall/constants";
import { Alert } from "react-native";
import { StatusBar } from "react-native";
import { THEME } from "../../../styles";
import { useSelector } from "react-redux";
import { Toast } from "../../../utils";

export const useBankTransferViewModel = () => {
  const navigation = useNavigation();

  const loginUserData = useSelector((state: any) => state?.HomeReducer?.loginUserData);
  const getCurrencyAccArray = useSelector((state: any) => state?.HomeReducer?.getCurrencyAccArray);
  const beneficiaryArray = useSelector((state: any) => state?.HomeReducer?.beneficiaryArray)
  const [openDropdownsty, setOpenDropdownSty] = useState(false);
  const [fromAccount, setFromAccount] = useState({
    id: "",
    available_balance: "",
    currency_id: "",
    name: "",
    iso_code: ""
  });
 
  const [note, setnote] = useState(""); 
  const [openDropdown, setOpenDropdown] = useState(null); 
  const [enterAmount, setenterAmount] = useState("");
  
  const [beneficiary, setBeneficiary] = useState({
    beneficiary_id: "",
    first_name: "",
    last_name: ""
  });
  const [recipientType, setRecipientType] = useState();
  const [fromAcc, setFromAcc] = useState({
    label: "Clearbank Account",
    currency: "GBP",
    flag: Images.account,
  });

  console.log("beneficiary==>",beneficiary);
  

  const pressBackArrow = () => navigation.goBack();

  const handlePress = () => {
    console.log("From Account pressed");
  };

  const handleTransfer = () => {


    if (fromAccount == null) {
      Toast.showToast('Please Select Your Acount', '', 'error');
    } else if (enterAmount == "") {
      Toast.showToast('Enter Your Amount', '', 'error');
    }
    else if (beneficiary.beneficiary_id == "") {
      Toast.showToast('Select Beneficiary', '', 'error');
    } 
    else if (note == "") {
      Toast.showToast('Enter Your Note/Refrence', '', 'error');
    } 
    else {
      const payload ={
      ok__amount: enterAmount,  //user enter -done
      ok__asset_id:  fromAccount?.id,  //ok
      ok__banking_partner_id: loginUserData?.banking_partner_id, 
      beneficiary_id: beneficiary.beneficiary_id, //ok
      ok__currency_id: fromAccount?.currency_id, //ok
      ok__reference: note //ok
    }

      console.log("ASdasd=>",payload);
      // // return

      // navigation.navigate(HOME_ROUTES.ConfirmCardRequest, { data: payload });
    }

    // fromAccount
    // Alert.alert("NEED",SHOW_CLIENT)
  };

  const toggleDropdown = (key: any) => {
    setOpenDropdown(openDropdown === key ? null : key);
  };
  return {
    enterAmount,
    setenterAmount,
    beneficiary,
    setBeneficiary,
    recipientType,
    setRecipientType,
    fromAcc,
    pressBackArrow,
    handlePress,
    handleTransfer,
    openDropdown,
    toggleDropdown,
    setOpenDropdown,

    openDropdownsty, 
    setOpenDropdownSty,
    fromAccount, 
    setFromAccount,
    getCurrencyAccArray,
    note, 
    setnote,
    beneficiaryArray
  
  };
};
