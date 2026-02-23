import { useIsFocused, useNavigation } from "@react-navigation/native";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { CommonUtils, Toast } from "../../../utils";
import { useFXConversion, usePaymentTransfer,useMyAccount_InternationalTransfer } from "../../../queries/paymentQuery/paymentQuery";
import { HOME_ROUTES } from "../../../constants";
import { accountScreenRefresh } from "../../../Redux/Action/Home/HomeActions";
import { getAssetBalance } from "../../../queries/accountQueries/accountQuery";

export const useMyAccountTransferViewModel = ({...props}) => {
 
  const navigation = useNavigation();
  const params = props?.route?.params?.stateData;
  console.log("useMyAccountTransferViewModel=>",props?.route?.params);
  const dispatch = useDispatch();
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
    fxFeeAmount: "0",
    total_After_Fee: "0",
    Exchange_Rate_Live: "0",
    tradeCurrency: "",
    rateInverted: "0",
    settlementCurrency: "",
    settlementAmount: ""

  });
  
  const [countdown, setCountdown] = useState<number>(0);
  const countdownRef = useRef<NodeJS.Timeout | null>(null);
  const [note, setnote] = useState(""); 
  const [autofocusAmount, setautofocusAmount] = useState(false); 
  const [autofocusnote, setautofocusnote] = useState(false); 
  const [openDropdown, setOpenDropdown] = useState(null); 
  const [enterAmount, setenterAmount] = useState("");

  const [toAccount, settoAccount] = useState({
    id: "",
    available_balance: "",
    currency_id: "",
    name: "",
    iso_code: ""
  });

  const [recipientType, setRecipientType] = useState();
  const [modalMsg, setmodalMsg] = useState({
    msg: "",
    status: false 
  });
  const [autoFocusedpaymentTypes, setautoFocusedpaymentTypes] = useState(false);
  const [payment_method_id, setpayment_method_id] = useState({
    method: "",
    id: ""
  });

  
  /* ----------------------------------
     INIT DATA FROM CONFIRM SCREEN
  ---------------------------------- */
  // useEffect(() => {
  //   if (!params) return;

  //   setFromAccount(params.fromAccount);
  //   settoAccount(params.toAccount);
  //   setenterAmount(params.amount);
  //   setnote(params.purpose);
  //   setautofocusAmount(true); 
  //   setautofocusnote(true) 
  // }, [params]);

   
  const { mutate: useFXConversionFunc, isPending: isPendinguseFXConversion } = useFXConversion({
    callback: (res: any) => {
      if (res?.success) {
        const rateObj = res?.results?.[0];
    
        if (rateObj) {
          setconvertrate({
            quoteId: rateObj?.quoteId,
            fxFeeAmount: rateObj?.fxFeeAmount, // you can update based on API
            total_After_Fee: rateObj?.settlementAmount?.toString() ?? "",
            Exchange_Rate_Live: `${rateObj?.tradeCurrency} = ${rateObj?.rate} ${rateObj?.settlementCurrency}`,
            tradeCurrency: rateObj?.tradeCurrency,
            rateInverted: rateObj?.rateInverted,
            settlementCurrency: rateObj?.settlementCurrency,
            settlementAmount: rateObj?.settlementAmount
          });

          // 🔥 START COUNTDOWN
          startCountdown(Number(rateObj.validFor));

        }
      }
    },
    onError: (res: any) => {
      
      setconvertrate({
        quoteId: "",
        fxFeeAmount: "0",
        total_After_Fee: "0",
        Exchange_Rate_Live: "0",
        tradeCurrency: "",
        rateInverted: "0",
        settlementCurrency: "",
        settlementAmount: ""
      });
      // 🔥 START COUNTDOWN
      startCountdown(60);
    
    }
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
        //asset balance
    const { data: getAssetBalance_Data, refetch: refetchgetAssetBalance, isFetching: getAssetBalancePending } = getAssetBalance({
      enabled: true, 
      dispatch,
      ID: fromAccount?.id,
    });
      
    console.log(getAssetBalancePending,"getAssetBalance_Data==>",getAssetBalance_Data);
  
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
        ],
        account_id: fromAccount?.id
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
        toCurrency: toAccount.iso_code,
        amount: enterAmount
      }
    ],
    account_id: fromAccount?.id
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
      payment_method_id: payment_method_id?.id,
      to_asset: toAccount?.id,  // my acccount transfer
      is_internal: true
    }

    console.log("checking last payload===>",payload);
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
    else if (toAccount.id == "") {
      Toast.showToast('Select To Account', '', 'error');
    } 
    else if (payment_method_id?.id == "") {
      Toast.showToast('Select payment method', '', 'error');
    }
    else if (note == "") {
      Toast.showToast('Enter Your Note/Refrence', '', 'error');
    } 
    else if (toAccount?.id == fromAccount?.id) {
      Toast.showToast('Choose Another Account', '', 'error');
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
    ApiCall,
    autofocusAmount, 
    setautofocusAmount,
    autofocusnote, 
    setautofocusnote,

    loginUserData,
    payment_method_id, 
    setpayment_method_id,
    autoFocusedpaymentTypes, 
    setautoFocusedpaymentTypes,
    countdown,
    refetchgetAssetBalance,
    getAssetBalancePending,
    getAssetBalance_Data,
  
  };
};
