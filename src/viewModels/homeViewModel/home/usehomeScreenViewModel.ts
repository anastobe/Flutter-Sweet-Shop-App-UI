// src/viewModels/homeViewModel/useHomeViewModel.ts
import { useIsFocused, useNavigation } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import { HOME_ROUTES } from '../../../constants';
import { CURRENT_ACCOUNT, DATA } from '../../../utils/data';
import { Alert } from 'react-native';
import {  getAssetType, getCoutry, getCurrency, getCurrencyAccount, getUserDetail } from '../../../queries/homeQueries/homeQuery';
import { useEffect, useMemo, useState } from 'react';
import { handleLoader } from '../../../Redux/Action/Auth/AuthActions';
import { SHOW_CLIENT } from '../../../APICall/constants';
import { Images } from '../../../config';
import { StatusBar } from 'react-native';

export const useHomeViewModel = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const FOCUS = useIsFocused();

  const [showbalance, setshowbalance] = useState(false);
  const [showCurrencyDropdown, setShowCurrencyDropdown] = useState(false);
  const [selectedCurrency, setSelectedCurrency] = useState(null);
  const [assetsList, setAssetsList] = useState([]);

  const loginUserData = useSelector((state: any) => state?.HomeReducer?.loginUserData);
  const getCurrencyAccArray = useSelector((state: any) => state?.HomeReducer?.getCurrencyAccArray);
  
  useEffect(()=>{
    StatusBar.setBackgroundColor("#7c4fc3")
  },[FOCUS]) 

  const Sendoption = [ 
    { icon: Images.add, onPress: HOME_ROUTES.ADD_NEW_CURRENCY_ACCOUNT, text: `New Currency Account`, width: 15, height: 15 },
    { icon: Images.sendMoney, onPress: HOME_ROUTES.MAKE_PAYMENT, text: 'Send Money', width: 20, height: 20 },
  ];

  const handleLogout = () => {
    navigation.navigate(HOME_ROUTES.NOTIFICATION);
  };

  const handlePressCard = (item: any) => {
    navigation.navigate(item.onPress)
  };

  const handleNavigateNotification = () => {
    Alert.alert(SHOW_CLIENT)
  };

  const handleNavigateTransactionHistory = () => {
    navigation.navigate(HOME_ROUTES.TRANSACTIONHISTORY);
  };

  const handleNavigateTransaction = () => {
    navigation.navigate(HOME_ROUTES.TRANSACTION_DETAIL);
  };
  

  const handleNavigateProfile = () => {
    navigation.navigate(HOME_ROUTES.PROFILE);
  };

  // get my account detail
  const {data: getUserDetail_Data, refetch: refetchgetUserDetail } = getUserDetail({
    enabled: false,
    dispatch,
  });

    // get my account detail
  const {data: getCoutry_Data, refetch: refetchgetCoutry_Data } = getCoutry({
    enabled: false,
    dispatch,
  });

    // get my account detail
  const {data: getCurrency_Data, refetch: refetchgetCurrency_Data } = getCurrency({
    enabled: false,
    dispatch,
  });

    // get my account detail
  const {data: getAssetType_Data, refetch: refetchgetAssetType_Data } = getAssetType({
    enabled: false,
    dispatch,
  });

  // get my account detail
  const {data: getCurrencyAccount_DATA, refetch: refetchgetCurrencyAccount, isFetching } = getCurrencyAccount({
    enabled: false,
    dispatch,
  });

  console.log("API=>",getCurrencyAccount_DATA);
  
  
const fetchAllInitialData = async () => {
  try {
    dispatch(handleLoader(true));

    await Promise.all([
      refetchgetUserDetail(),
      refetchgetCoutry_Data(),
      refetchgetCurrency_Data(),
      refetchgetAssetType_Data(),
      refetchgetCurrencyAccount()
    ]);

  } catch (error) {
    dispatch(handleLoader(false))
    console.log("Error fetching initial data:", error);
  } finally {
    dispatch(handleLoader(false))
  }
};

useEffect(()=>{
fetchAllInitialData()
},[])

// console.log("getCurrencyAccount_DATA=>",getCurrencyAccount_DATA,"Ssaas",getCurrencyAccArray);
 

useEffect(() => {
  if (Array.isArray(getCurrencyAccount_DATA?.results)) {

    // save assets list (array)
    setAssetsList(getCurrencyAccount_DATA.results);

    // set default selected currency
    setSelectedCurrency(getCurrencyAccount_DATA.results[0]);
  }
}, [getCurrencyAccount_DATA]);
 
console.log("assetsList==>",getCurrencyAccount_DATA?.results);


// const currencyOptions = useMemo(() => {
//   if (!Array.isArray(assetsList)) return [];  // ✅ No crash

//   const map: any = {};

//   assetsList?.forEach(asset => {
//     map[asset.currency.iso_code] = asset;
//   });

//   return Object.values(map);
// }, [assetsList]);


const onSelectCurrency = (asset: any) => {
  setSelectedCurrency(asset);
  setShowCurrencyDropdown(false);
};

   const personal_customers = loginUserData?.personal_customers?.length && loginUserData?.personal_customers[0]

  return {
    Sendoption,
    DATA,
    CURRENT_ACCOUNT,
    handleLogout,
    handlePressCard,
    handleNavigateNotification,
    handleNavigateTransactionHistory,
    handleNavigateTransaction,
    handleNavigateProfile,
    getUserDetail_Data,
    refetchgetUserDetail,
    loginUserData,
    personal_customers,
    getCurrencyAccount_DATA,
    showCurrencyDropdown, 
    setShowCurrencyDropdown,
    selectedCurrency, 
    setSelectedCurrency,
    assetsList, 
    setAssetsList,
    onSelectCurrency,
    isFetching,
    showbalance, 
    setshowbalance
    // currencyOptions

  };
};
