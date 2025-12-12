import { useIsFocused, useNavigation } from "@react-navigation/native";
import { useEffect, useState } from "react";
import { Images } from "../../../config";
import { SHOW_CLIENT } from "../../../APICall/constants";
import { Alert } from "react-native";
import { StatusBar } from "react-native";
import { THEME } from "../../../styles";
import { useSelector } from "react-redux";
import { Toast } from "../../../utils";
import { useLogin } from "../../../queries/auth.query";
import { usePaymentTransfer } from "../../../queries/paymentQuery/paymentQuery";
import { HOME_ROUTES } from "../../../constants";

export const useMyAccountTransferViewModel = ({...props}) => {
  const navigation = useNavigation();

  console.log("useMyAccountTransferViewModel=>",props?.route?.params?.data);

  const loginUserData = useSelector((state: any) => state?.HomeReducer?.loginUserData);
  const getCurrencyAccArray = useSelector((state: any) => state?.HomeReducer?.getCurrencyAccArray);
  const beneficiaryArray = useSelector((state: any) => state?.HomeReducer?.beneficiaryArray)
  const [openDropdownsty, setOpenDropdownSty] = useState(false);
  const [openDropdownstyToAcc, setOpenDropdownStyToAcc] = useState(false);
  const [open, setopen] = useState(false);
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

  const [toAccount, settoAccount] = useState({
    id: "",
    available_balance: "",
    currency_id: "",
    name: "",
    iso_code: ""
  });
 
  
  // const [beneficiary, setBeneficiary] = useState({
  //   beneficiary_id: "",
  //   first_name: "",
  //   last_name: ""
  // });
  const [recipientType, setRecipientType] = useState();
  const [modalMsg, setmodalMsg] = useState("");

  const { mutate: usePaymentTransferFunc, isPending } = usePaymentTransfer({
    callback: (res: any) => {

      console.log("aaaaaaaaa",res);
      

      if (res?.success) {
        setopen(true)
        setmodalMsg(res?.message)
      }
    },
  });
  
  

  const pressBackArrow = () => navigation.goBack();

  const handlePress = () => {
    console.log("From Account pressed");
  };

  const handleTransfer = () => {


    if (fromAccount.name == "") {
      Toast.showToast('Please Select Your Account', '', 'error');
    } else if (enterAmount == "") {
      Toast.showToast('Enter Your Amount', '', 'error');
    }
    else if (toAccount.name == "") {
      Toast.showToast('Select To Account', '', 'error');
    } 
    else if (note == "") {
      Toast.showToast('Enter Your Note/Refrence', '', 'error');
    } 
    else if (toAccount?.id == fromAccount?.id) {
      Toast.showToast('Choose Another Account', '', 'error');
    } 
    else {
      const payload ={
      amount: enterAmount, 
      asset_id:  fromAccount?.id,
      banking_partner_id: loginUserData?.banking_partner_id, 
      beneficiary_id: toAccount?.id,
      currency_id: fromAccount?.currency_id,
      reference: note
    }
    console.log("===>payload==>",payload);
    
    usePaymentTransferFunc(payload)
    }

    // fromAccount
    // Alert.alert("NEED",SHOW_CLIENT)
  };

  function onClose() {
      setTimeout(() => {
        setopen(false)
      }, 1000); 
      navigation.navigate(HOME_ROUTES.TABSTACK, { screen: "HomeStack" });
    }

  const toggleDropdown = (key: any) => {
    setOpenDropdown(openDropdown === key ? null : key);
  };
  return {
    navigation,
    enterAmount,
    setenterAmount,
    // beneficiary,
    // setBeneficiary,
    recipientType,
    setRecipientType,
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
    toAccount, 
    settoAccount,
    getCurrencyAccArray,
    note, 
    setnote,
    beneficiaryArray,
    isPending,
    open, 
    setopen,
    modalMsg,
    onClose,
    openDropdownstyToAcc, 
    setOpenDropdownStyToAcc
  
  };
};
