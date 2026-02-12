import { useIsFocused, useNavigation } from "@react-navigation/native";
import { useEffect, useRef, useState } from "react";
import { Images } from "../../../config";
import { Alert } from "react-native";
import { StatusBar } from "react-native";
import { THEME } from "../../../styles";
import { useDispatch, useSelector } from "react-redux";
import { CommonUtils, Toast } from "../../../utils";
import { useLogin } from "../../../queries/auth.query";
import { useFXConversion, usePaymentTransfer,useMyAccount_InternationalTransfer } from "../../../queries/paymentQuery/paymentQuery";
import { HOME_ROUTES } from "../../../constants";
import { CUSTOMER_TYPE, GLOBAL_USER_TYPES } from "../../../utils/data";
import { accountScreenRefresh } from "../../../Redux/Action/Home/HomeActions";
import { getAssetBalance } from "../../../queries/accountQueries/accountQuery";

export const useInternationalTransferViewModel = ({...props}) => {
  const navigation = useNavigation();

  // console.log("useInternationalTransferViewModel=>",props?.route?.params?.data);
  const paymentconfrm = useRef(null); 
  const beneficiaryRef = useRef();
  const dispatch = useDispatch();

  const loginUserData = useSelector((state: any) => state?.HomeReducer?.loginUserData);
  const getCurrencyAccArray = useSelector((state: any) => state?.HomeReducer?.getCurrencyAccArray);
  const beneficiaryArray = useSelector((state: any) => state?.HomeReducer?.beneficiaryArray)
  const userData = useSelector((state: any) => state?.AuthReducer?.userData);

  let corporateMaker = (userData?.customer_type == CUSTOMER_TYPE.CORPORATE && userData?.role == GLOBAL_USER_TYPES.MAKER )
  const [countdown, setCountdown] = useState<number>(0);
  const countdownRef = useRef<NodeJS.Timeout | null>(null);
  const [openDropdownsty, setOpenDropdownSty] = useState(false);
  const [openDropdownstyToAcc, setOpenDropdownStyToAcc] = useState(false);
  const [open, setopen] = useState(false);
  const [autoFocused, setautoFocused] = useState(false);
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
  const [autoFocusedpaymentTypes, setautoFocusedpaymentTypes] = useState(false);
  const [payment_method_id, setpayment_method_id] = useState({
    method: "",
    id: ""
  });
 

  // const [toAccount, settoAccount] = useState({
  //   id: "",
  //   available_balance: "",
  //   currency_id: "",
  //   name: "",
  //   iso_code: ""
  // });

  
  const [beneficiary, setBeneficiary] = useState({
    beneficiary_id: "",
    currency_id: "",
    first_name: "",
    last_name: "",
    iso_code: ""
  });

  const [recipientType, setRecipientType] = useState();
  const [modalMsg, setmodalMsg] = useState({
    msg: "",
    status: false 
  });
   
    //asset balance
  const { data: getAssetBalance_Data, refetch: refetchgetAssetBalance, isFetching: getAssetBalancePending } = getAssetBalance({
    enabled: false, 
    dispatch,
    ID: fromAccount?.id,
  });
    
  console.log(getAssetBalancePending,"getAssetBalance_Data==>",getAssetBalance_Data);

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

          // 🔥 START COUNTDOWN
          startCountdown(Number(rateObj.validFor));
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
      if (!fromAccount?.id || !beneficiary?.beneficiary_id || !enterAmount) return;
  
      const payload ={
        itemsToQuote: [
          {
            fromCurrency:  fromAccount?.iso_code,
            toCurrency: beneficiary?.iso_code,
            amount: enterAmount
          }
        ]
      }

      console.log("payload==>?",payload);
      
  
      useFXConversionFunc(payload)
  

    } catch (e) {
      console.log("FX API ERROR =>", e);
    }
  };

  const debouncedFetchFxRate = debounce(fetchFxRate, 700); // 700ms delay after typing stops

  useEffect(() => {
  if (
    fromAccount?.id &&
    beneficiary.beneficiary_id &&
    enterAmount &&
    Number(enterAmount) > 0
  ) {   
    debouncedFetchFxRate();  // <-- THIS IS IMPORTANT    
  }
}, [fromAccount?.id, beneficiary.beneficiary_id, enterAmount]);



  useEffect(() => {
    return () => {
      if (countdownRef.current) {
        clearInterval(countdownRef.current);
      }
    };
  }, []);

  const reFetchFXRate = () => {
  const payload = {
    itemsToQuote: [
      {
        fromCurrency: fromAccount.iso_code,
        toCurrency: beneficiary.iso_code,
        amount: enterAmount
      }
    ]
  };

  useFXConversionFunc(payload);
};

const startCountdown = (seconds: number) => {
  // clear old timer
  if (countdownRef.current) {
    clearInterval(countdownRef.current);
  }

  setCountdown(seconds);

  countdownRef.current = setInterval(() => {
    setCountdown(prev => {
      if (prev <= 1) {
        clearInterval(countdownRef.current!);
        countdownRef.current = null;

        // 🔁 HIT API AGAIN WHEN TIMER ENDS
        reFetchFXRate();
        return 0;
      }
      return prev - 1;
    });
  }, 1000);
};


  const pressBackArrow = () => navigation.goBack();

  // console.log('FINAL BENEFICIARY IN VIEWMODEL ===>', beneficiary);

  const handlePress = () => {
    console.log("From Account pressed");
  };

   
  function ApiCall() {
    const payload = {
      purpose: note,
      amount: enterAmount,
      quote_id: convertrate.quoteId,  
      from_currency_id: fromAccount.currency_id, 
      to_currency_id: beneficiary.currency_id, //in international beneficiary ki currency id jayegi or in my account transfer to_asset ki currency id jayegi
      from_asset: fromAccount?.id,
      // from_asset: 'd8a4d860-59ef-4e47-a1d9-28a5b3154dd7',
      payment_method_id: payment_method_id?.id,
      beneficiary_id: beneficiary?.beneficiary_id,
      is_internal: false,
      is_corporate: corporateMaker ? true : false
    }

    console.log("going main payload=>",payload);
    // return
    useMyAccount_InternationalTransferFunc(payload)
  }
  
  const handleTransfer = () => {

    if (fromAccount.id == "") {
      Toast.showToast('Please Select Your Account', '', 'error');
    } else if (enterAmount == "") {
      Toast.showToast('Enter Your Amount', '', 'error'); 
    }
    else if (parseInt(enterAmount) <= 0) {
      Toast.showToast('Enter Correct Amount', '', 'error'); 
    }
     else if (!CommonUtils.RegixNumbersOnly.test(enterAmount)) {
      Toast.showToast('Enter Correct Amount', '', 'error'); 
    }
    else if (beneficiary.beneficiary_id == "") {
      Toast.showToast('Select Beneficiary', '', 'error');
    } 
    else if (payment_method_id?.id == "") {
      Toast.showToast('Select payment method', '', 'error');
    }
    else if (note == "") {
      Toast.showToast('Enter Your Note/Refrence', '', 'error');
    } 
    else if (enterAmount > getAssetBalance_Data?.available_balance) {
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
    setopen(false)

    if (status) {
        paymentconfrm?.current?.close()
        setTimeout(() => {

        navigation.popToTop();
        dispatch(accountScreenRefresh(Math.random()))

        // navigation.reset({
        //   index: 0,
        //   routes: [{ name: HOME_ROUTES.MAKE_PAYMENT }],
        // });

        // navigation.navigate(HOME_ROUTES.MAKE_PAYMENT)

        }, 500); 
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
    beneficiary,
    setBeneficiary,
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
    // toAccount, 
    // settoAccount,
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
    ApiCall,
    autoFocused, 
    setautoFocused,
    beneficiaryRef,
    loginUserData,
    payment_method_id, 
    setpayment_method_id,
    autoFocusedpaymentTypes, 
    setautoFocusedpaymentTypes,
    countdown,
    corporateMaker,
    refetchgetAssetBalance,
    getAssetBalancePending,
    getAssetBalance_Data,
  
  };
};
