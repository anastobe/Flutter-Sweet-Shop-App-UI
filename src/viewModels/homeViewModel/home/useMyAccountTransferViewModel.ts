import { useIsFocused, useNavigation } from "@react-navigation/native";
import { useEffect, useRef, useState } from "react";
import { Images } from "../../../config";
import { SHOW_CLIENT } from "../../../APICall/constants";
import { Alert } from "react-native";
import { StatusBar } from "react-native";
import { THEME } from "../../../styles";
import { useSelector } from "react-redux";
import { CommonUtils, Toast } from "../../../utils";
import { useLogin } from "../../../queries/auth.query";
import { useFXConversion, usePaymentTransfer,useMyAccount_InternationalTransfer } from "../../../queries/paymentQuery/paymentQuery";
import { HOME_ROUTES } from "../../../constants";

export const useMyAccountTransferViewModel = ({...props}) => {
  const navigation = useNavigation();

  // console.log("useMyAccountTransferViewModel=>",props?.route?.params?.data);
  const paymentconfrm = useRef(null); 
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
  const [convertrate, setconvertrate] = useState({
    quoteId: "",
    conversion_Fee: "0",
    total_After_Fee: "0",
    Exchange_Rate_Live: "0"
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
  const [modalMsg, setmodalMsg] = useState({
    msg: "",
    status: false 
  });
   
  const { mutate: useFXConversionFunc, isPending: isPendinguseFXConversion } = useFXConversion({
    callback: (res: any) => {
      if (res?.success) {
        const rateObj = res?.results?.[0];
    
        if (rateObj) {
          setconvertrate({
            quoteId: rateObj?.quoteId,
            conversion_Fee: "£2.00", // you can update based on API
            total_After_Fee: rateObj?.settlementAmount?.toString() ?? "",
            Exchange_Rate_Live: `${rateObj?.tradeCurrency} = ${rateObj?.rate} ${rateObj?.settlementCurrency}`
          });
        }
      }
    },
  });

  const { mutate: useMyAccount_InternationalTransferFunc, isPending } = useMyAccount_InternationalTransfer({
    callback: (res: any) => {
      
      console.log("succes useMyAccount_InternationalTransfer",res);
      
      if (res?.success) {
        setopen(true)
        setmodalMsg({
          msg: res?.message,
          status: res?.success 
        })
      }
    },
    onError: (error: any) => {

      console.log("error useMyAccount_InternationalTransfer==>",error);
        setopen(true)
        setmodalMsg({
          msg: error?.message,
          status: error?.success 
        })
    },
  });
  
  
    function debounce(func, delay) {
      let timeout;
      return (...args) => {
        if (timeout) clearTimeout(timeout);
        timeout = setTimeout(() => {
          func(...args);
        }, delay);
      };
    }
  
    const fetchFxRate = async () => {
    try {
      if (!fromAccount?.id || !toAccount?.id || !enterAmount) return;
  
      const payload ={
        itemsToQuote: [
          {
             fromCurrency:  fromAccount?.iso_code,
            toCurrency: toAccount?.iso_code,
            amount: enterAmount
          }
        ]
      }

      console.log("payload==>",payload);
      
  
      useFXConversionFunc(payload)
  

    } catch (e) {
      console.log("FX API ERROR =>", e);
    }
  };

  const debouncedFetchFxRate = debounce(fetchFxRate, 700); // 700ms delay after typing stops

  useEffect(() => {
  if (
    fromAccount?.id &&
    toAccount?.id &&
    enterAmount &&
    Number(enterAmount) > 0
  ) {   
    debouncedFetchFxRate();  // <-- THIS IS IMPORTANT    
  }
}, [fromAccount?.id, toAccount?.id, enterAmount]);

  const pressBackArrow = () => navigation.goBack();

  const handlePress = () => {
    console.log("From Account pressed");
  };

   
  function ApiCall() {
    const payload = {
      purpose: note,
      amount: enterAmount,
      quote_id: convertrate.quoteId,  
      from_currency_id: fromAccount.currency_id, 
      to_currency_id: toAccount?.currency_id, //in international beneficiary ki currency id jayegi or in my account transfer to_asset ki currency id jayegi
      from_asset: fromAccount?.id,
      to_asset: toAccount?.id,  // my acccount transfer
      is_internal: true
    }
    useMyAccount_InternationalTransferFunc(payload)
  }
  
  const handleTransfer = () => {

    if (fromAccount.id == "") {
      Toast.showToast('Please Select Your Account', '', 'error');
    } else if (enterAmount == "") {
      Toast.showToast('Enter Your Amount', '', 'error'); 
    }
     else if (!CommonUtils.RegixNumbersOnly.test(enterAmount)) {
      Toast.showToast('Enter Correct Amount', '', 'error'); 
    }
    else if (toAccount.id == "") {
      Toast.showToast('Select To Account', '', 'error');
    } 
    else if (note == "") {
      Toast.showToast('Enter Your Note/Refrence', '', 'error');
    } 
    else if (toAccount?.id == fromAccount?.id) {
      Toast.showToast('Choose Another Account', '', 'error');
    } 
    else if (enterAmount > fromAccount?.available_balance) {
      Toast.showToast('Amount is greater than Available Balance', '', 'error');
    } 
    else if (convertrate.quoteId == "") {
      Toast.showToast('Could not initiate payment', '', 'error');
    }
    else {
      fetchFxRate();  // <-- THIS IS IMPORTANT  
      if (!isPendinguseFXConversion) {
        paymentconfrm?.current?.open()
      }
    }
  };

  function onClose(status: boolean) {
      if (status) {
        setTimeout(() => {
          setopen(false)
        }, 1000); 
        navigation.navigate(HOME_ROUTES.TABSTACK, { screen: "HomeStack" });
      } else {
        setopen(false)
      }
    }

  const toggleDropdown = (key: any) => {
    setOpenDropdown(openDropdown === key ? null : key);
  };
  return {
    navigation,
    paymentconfrm,
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
    isPendinguseFXConversion,
    open, 
    setopen,
    modalMsg,
    onClose,
    openDropdownstyToAcc, 
    setOpenDropdownStyToAcc,
    convertrate,
    ApiCall
  
  };
};
