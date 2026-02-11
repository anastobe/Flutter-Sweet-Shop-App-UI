import { useIsFocused, useNavigation } from "@react-navigation/native";
import { useEffect, useRef, useState } from "react";
import { Images } from "../../../config";
import { SHOW_CLIENT } from "../../../APICall/constants";
import { Alert } from "react-native";
import { StatusBar } from "react-native";
import { THEME } from "../../../styles";
import { useDispatch, useSelector } from "react-redux";
import { CommonUtils, Toast } from "../../../utils";
import { useLogin } from "../../../queries/auth.query";
import { usePaymentTransfer } from "../../../queries/paymentQuery/paymentQuery";
import { HOME_ROUTES } from "../../../constants";
import { getBeneficiaryDetail } from "../../../queries/moreQueries/moreQuery";
import { CUSTOMER_TYPE, GLOBAL_USER_TYPES } from "../../../utils/data";
import { accountScreenRefresh } from "../../../Redux/Action/Home/HomeActions";

export const useBankTransferViewModel = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const beneficiaryRef = useRef(null);

  const loginUserData = useSelector((state: any) => state?.HomeReducer?.loginUserData);
  const getCurrencyAccArray = useSelector((state: any) => state?.HomeReducer?.getCurrencyAccArray);
  const beneficiaryArray = useSelector((state: any) => state?.HomeReducer?.beneficiaryArray)
  const userData = useSelector((state: any) => state?.AuthReducer?.userData);

  let corporateMaker = (userData?.customer_type == CUSTOMER_TYPE.CORPORATE && userData?.role == GLOBAL_USER_TYPES.MAKER )
  const [openDropdownsty, setOpenDropdownSty] = useState(false);
  const [open, setopen] = useState(false);
  const [openSureModal, setopenSureModal] = useState(false);
  const [autoFocused, setautoFocused] = useState(false);
  const [autoFocusedpaymentTypes, setautoFocusedpaymentTypes] = useState(false);
  
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
  const [payment_method_id, setpayment_method_id] = useState({
    method: "",
    id: ""
  });
  
  const [beneficiary, setBeneficiary] = useState({
    beneficiary_id: "",
    first_name: "",
    last_name: ""
  });
  const [recipientType, setRecipientType] = useState();
  const [modalMsg, setmodalMsg] = useState("");

  const { mutate: usePaymentTransferFunc, isPending } = usePaymentTransfer({
    callback: (res: any) => {

      console.log("aaaaaaaaa",res);
      

      if (res?.success) {
        setopenSureModal(false)
        setTimeout(() => {
          setopen(true)
          setmodalMsg(res?.message)
        }, 400);
      }
    },
    onError: (error: any) => {
        setopenSureModal(false)
      console.log("error usePaymentTransfer==>",error);
    },

  });
  
  
  // const { mutate: getBeneficiaryDetailFunc, isPending : isPendinggetBeneficiaryDetail } = getBeneficiaryDetail({
  //   callback: (res: any) => {
  //     const newData = res?.results?.values || [];

  //     console.log("getBeneficiaryDetailFunc==>",newData);
      

  //   },
  // });

  // console.log('FINAL BENEFICIARY IN VIEWMODEL ===>', beneficiary);

  const pressBackArrow = () => navigation.goBack();

  const handlePress = () => {
    console.log("From Account pressed");
  };

  const handleTransfer = () => {


    if (fromAccount.name == "") {
      Toast.showToast('Please select your account', '', 'error');
    } else if (enterAmount == "") {
      Toast.showToast('Enter your amount', '', 'error');
    }
    else if (parseInt(enterAmount) <= 0) {
      Toast.showToast('Enter Correct Amount', '', 'error'); 
    }
    else if (!CommonUtils.RegixNumbersOnly.test(enterAmount)) {
    Toast.showToast('Enter correct amount', '', 'error'); 
  }
    else if (enterAmount > fromAccount?.available_balance) {
      Toast.showToast('Amount is greater than available balance', '', 'error');
    } 
    else if (beneficiary.beneficiary_id == "") {
      Toast.showToast('Select beneficiary', '', 'error');
    } 
    else if (payment_method_id?.id == "") {
      Toast.showToast('Select payment method', '', 'error');
    } 
    else if (note == "") {
      Toast.showToast('Enter Your Note/Refrence', '', 'error');
    } 
    else {

      setopenSureModal(true)

    // return
    // usePaymentTransferFunc(payload)
      // navigation.navigate(HOME_ROUTES.ConfirmCardRequest, { data: payload });
    }

    // fromAccount
    // Alert.alert("NEED",SHOW_CLIENT)
  };

  function pressSure() {
    const payload ={
      amount: enterAmount, 
      asset_id:  fromAccount?.id,
      // asset_id: 'd8a4d860-59ef-4e47-a1d9-28a5b3154dd7'.
      banking_partner_id: loginUserData?.banking_partner_id, 
      beneficiary_id: beneficiary.beneficiary_id,
      currency_id: fromAccount?.currency_id,
      payment_method_id: payment_method_id?.id,
      reference: note,
      is_corporate: corporateMaker ? true : false,  
    }
    console.log("===>payload==>",payload);
    usePaymentTransferFunc(payload)
  }

    
    function onClose(status: boolean) {
      setopen(false)

      if (status) {
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
    // getBeneficiaryDetailFunc,

    openDropdownsty, 
    setOpenDropdownSty,
    fromAccount, 
    setFromAccount,
    getCurrencyAccArray,
    note, 
    setnote,
    beneficiaryArray,
    isPending,
    open, 
    setopen,
    modalMsg,
    onClose,
    beneficiaryRef,
    autoFocused, 
    setautoFocused,
    loginUserData,
    payment_method_id, 
    setpayment_method_id,
    autoFocusedpaymentTypes, 
    setautoFocusedpaymentTypes,
    openSureModal, 
    setopenSureModal,
    pressSure,
    corporateMaker
  
  };
};
