// src/viewModels/homeViewModel/useHomeViewModel.ts
import { useIsFocused, useNavigation } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import { HOME_ROUTES } from '../../../constants';
import { CURRENT_ACCOUNT, DATA } from '../../../utils/data';
import { Alert } from 'react-native';
import { useEffect, useMemo, useState } from 'react';
import { handleLoader } from '../../../Redux/Action/Auth/AuthActions';
import { SHOW_CLIENT } from '../../../APICall/constants';
import { Images } from '../../../config';
import { StatusBar } from 'react-native';
import { THEME } from '../../../styles';
import apis from '../../../services';

export const useHomeViewModel = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const [showbalance, setshowbalance] = useState(false);
  const [showCurrencyDropdown, setShowCurrencyDropdown] = useState(false);
  // const [selectedCurrency, setSelectedCurrency] = useState<any>();
  const [assetsList, setAssetsList] = useState<any>({
    firstObject: {},
    array: []
  });

  const loader = useSelector((state: any) => state?.AuthReducer?.loader);
  const loginUserData = useSelector((state: any) => state?.HomeReducer?.loginUserData);
  const getCurrencyAccArray = useSelector((state: any) => state?.HomeReducer?.getCurrencyAccArray);

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

  
const fetchAllInitialData = async () => {
  try {
    dispatch(handleLoader(true));

    const [beneficiaryList, userDetailRes, countryRes, currencyRes, assetTypeRes, currencyAccountRes] =
    await Promise.all([
      apis.getBeneficiaryDetail(dispatch),
      apis.getUserDetail(dispatch),
      apis.getCoutry(dispatch),
      apis.getCurrency(dispatch),
      apis.getAssetType(dispatch),
      apis.getCurrencyAccount(dispatch), // ✅ This returns your array
    ]);    

    if (currencyAccountRes?.results) {
      // setSelectedCurrency(currencyAccountRes?.results[0]);
      setAssetsList({
        firstObject: currencyAccountRes?.results[0],
        array: currencyAccountRes?.results
      })
    }

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
 

 
// const currencyOptions = useMemo(() => {
//   if (!Array.isArray(assetsList)) return [];  // ✅ No crash

//   const map: any = {};

//   assetsList?.forEach(asset => {
//     map[asset.currency.iso_code] = asset;
//   });

//   return Object.values(map);
// }, [assetsList]);


const onSelectCurrency = (asset: any) => {
  // setSelectedCurrency(asset);
  setAssetsList((prev: any )=> ({
    ...prev,          // keep previous keys same
    firstObject: asset  // only update this one
  }));
  setShowCurrencyDropdown(false);
};


   const personal_customers = loginUserData?.customer_type == "personal" ? loginUserData?.personal_customers[0] : loginUserData
  
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
    loginUserData,
    personal_customers,
    showCurrencyDropdown, 
    setShowCurrencyDropdown,
    assetsList, 
    setAssetsList, 
    onSelectCurrency,
     loader,
    showbalance, 
    setshowbalance
    // currencyOptions

  };
};
