import { useIsFocused, useNavigation } from "@react-navigation/native";
import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { useFXConversion } from "../../../queries/paymentQuery/paymentQuery";
import { HOME_ROUTES } from "../../../constants";
import { CommonUtils, Toast } from "../../../utils";

export default function useCurrencyExchangeViewModel({...props}) {
  const navigation = useNavigation();
  const beneficiaryRef = useRef();
  
  const currencyList = useSelector((state: any) => state?.MoreReducer?.currencyList);
  // const getCurrencyAccArray = useSelector((state: any) => state?.HomeReducer?.getCurrencyAccArray);
  // const [openDropdownsty, setOpenDropdownSty] = useState(false);
  // const [openDropdownstyToAcc, setOpenDropdownStyToAcc] = useState(false);
  const [open, setopen] = useState(false);
  const [autoFocused, setautoFocused] = useState(false);

  const [youWillReceive, setYouWillReceive] = useState('');
  const [fxInfo, setFxInfo] = useState({
    rateText: '',
    fee: '',
    validFor: '',
    settlementAmount: '',
  });

  const [fromCurrency, setfromCurrency] = useState({
    id: "",
    iso_code: "",
    num_code: ""
  });

  const [toCurrency, settoCurrency] = useState({
    id: "",
    iso_code: "",
    num_code: ""
  });
 
  const [amount, setamount] = useState(""); 
  const [openDropdown, setOpenDropdown] = useState(null); 
  const [recipientType, setRecipientType] = useState();
  const [modalMsg, setmodalMsg] = useState("");

  
  const { mutate: useFXConversionFunc, isPending: isPendinguseFXConversion } = useFXConversion({
    callback: (res: any) => {

      if (res?.success && res?.results?.length > 0) {
        const fx = res.results[0];

        setFxInfo({
          rateText: `1 ${fx.tradeCurrency} = ${fx.rate} ${fx.settlementCurrency}`,
          fee: fx.fxFeeAmount?.toString(),
          validFor: `${fx.validFor} sec`,
          settlementAmount: fx.settlementAmount?.toString(),
        });

        setYouWillReceive(fx.settlementAmount?.toString());
      } 

      // if (res?.success) {
      //   navigation.navigate(HOME_ROUTES.CONFIRM_CURENCY_EXCHANGE,{ key: "calculated", data: res?.results, stateData: {fromAccount: fromAccount, toAccount: toAccount, amount: amount} });    
      // }
    }
  });

  const toggleDropdown = (key) => {
    setOpenDropdown(openDropdown === key ? null : key);
  };

  function onPressBtn2() {
    navigation.navigate(HOME_ROUTES.MAKE_PAYMENT)    
    return
  }

  // 🔁 Button action
  const onPressBtn = () => {

      if (fromCurrency.id == "") {
        return Toast.showToast('Select from currency', '', 'error');
      } 
      else if (toCurrency.id == "") {
        return Toast.showToast('Select to currency', '', 'error');
      }
      else if (amount == "" ) {
        return Toast.showToast('Enter amount', '', 'error');
      } 
      else if (!CommonUtils.RegixNumbersOnly.test(amount)) {
          Toast.showToast('Enter correct amount', '', 'error'); 
        }
      else if (parseInt(amount) <= 0 ) {
        return Toast.showToast('Enter Correct amount', '', 'error');
      } 
      else {
        const payload ={
          itemsToQuote: [
            {
              fromCurrency: fromCurrency.iso_code,
              toCurrency: toCurrency.iso_code,
              amount: amount
            }
          ]
        }

      console.log("======>",payload);  
      useFXConversionFunc(payload)
      }

  };



  const pressBackArrow = () => navigation.goBack();

  return {
    isPendinguseFXConversion,
    recipientType,
    setRecipientType,
    pressBackArrow,
    setOpenDropdown,
    amount, 
    setamount,
    open, 
    setopen,
    modalMsg,
    beneficiaryRef,
    autoFocused, 
    setautoFocused,
    currencyList,
    onPressBtn,
    onPressBtn2,
    toCurrency, 
    settoCurrency,
    fromCurrency, 
    setfromCurrency,
    toggleDropdown,
    openDropdown,
    youWillReceive, 
    setYouWillReceive,
    fxInfo, 
    setFxInfo

  };
};


























// import { useIsFocused, useNavigation } from "@react-navigation/native";
// import { useEffect, useRef, useState } from "react";
// import { useSelector } from "react-redux";
// import { useFXConversion } from "../../../queries/paymentQuery/paymentQuery";
// import { HOME_ROUTES } from "../../../constants";
// import { Toast } from "../../../utils";

// export default function useCurrencyExchangeViewModel({...props}) {
//   const navigation = useNavigation();
//   const beneficiaryRef = useRef();

//   const getCurrencyAccArray = useSelector((state: any) => state?.HomeReducer?.getCurrencyAccArray);
//   const [openDropdownsty, setOpenDropdownSty] = useState(false);
//   const [openDropdownstyToAcc, setOpenDropdownStyToAcc] = useState(false);
//   const [open, setopen] = useState(false);
//   const [autoFocused, setautoFocused] = useState(false);
  
//   const [fromAccount, setFromAccount] = useState({
//     id: "",
//     available_balance: "",
//     currency_id: "",
//     name: "",
//     iso_code: ""
//   });

//   const [toAccount, settoAccount] = useState({
//     id: "",
//     available_balance: "",
//     currency_id: "",
//     name: "",
//     iso_code: ""
//   });
 
//   const [amount, setamount] = useState(""); 
//   const [openDropdown, setOpenDropdown] = useState(null); 
//   const [recipientType, setRecipientType] = useState();
//   const [modalMsg, setmodalMsg] = useState("");

  
//   const { mutate: useFXConversionFunc, isPending } = useFXConversion({
//     callback: (res: any) => {
//       if (res?.success) {
//         navigation.navigate(HOME_ROUTES.CONFIRM_CURENCY_EXCHANGE,{ key: "calculated", data: res?.results, stateData: {fromAccount: fromAccount, toAccount: toAccount, amount: amount} });    
//       }
//     }
//   });


//   // 🔁 Button action
//   const onPressBtn = () => {

//       if (fromAccount.id == "") {
//         return Toast.showToast('Select send account', '', 'error');
//       } 
//       else if (toAccount.id == "") {
//         return Toast.showToast('Select to account', '', 'error');
//       }
//       else if (amount == "") {
//         return Toast.showToast('Enter Your amount', '', 'error');
//       } 
//       else if (fromAccount.id  == toAccount.id) {
//         return Toast.showToast('Select another account', '', 'error');
//       } 
//       else {
//         const payload ={
//           itemsToQuote: [
//             {
//               fromCurrency: fromAccount.iso_code,
//               toCurrency: toAccount.iso_code,
//               amount: amount
//             }
//           ]
//         }
//       useFXConversionFunc(payload)
//       }

//   };



//   const pressBackArrow = () => navigation.goBack();

//   return {
//     isPending,
//     recipientType,
//     setRecipientType,
//     pressBackArrow,
//     setOpenDropdown,
//     openDropdownsty, 
//     setOpenDropdownSty,
//     fromAccount, 
//     setFromAccount,
//     getCurrencyAccArray,
//     amount, 
//     setamount,
//     open, 
//     setopen,
//     modalMsg,
//     beneficiaryRef,
//     autoFocused, 
//     setautoFocused,
//     toAccount, 
//     settoAccount,
//     openDropdownstyToAcc, 
//     setOpenDropdownStyToAcc,
//     onPressBtn,
//   };
// };



