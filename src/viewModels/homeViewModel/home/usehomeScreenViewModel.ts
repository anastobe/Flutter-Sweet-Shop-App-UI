// src/viewModels/homeViewModel/useHomeViewModel.ts
import { useNavigation } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import { HOME_ROUTES } from '../../../constants';
import { CURRENT_ACCOUNT, DATA } from '../../../utils/data';
import { Alert } from 'react-native';
import {  getAssetType, getCoutry, getCurrency, getUserDetail } from '../../../queries/homeQueries/homeQuery';
import { useEffect } from 'react';
import { handleLoader } from '../../../Redux/Action/Auth/AuthActions';
import { SHOW_CLIENT } from '../../../APICall/constants';

export const useHomeViewModel = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const loginUserData = useSelector((state: any) => state?.HomeReducer?.loginUserData);

  const Sendoption = [ 
    { icon: 'add-outline', onPress: HOME_ROUTES.ADD_NEW_CURRENCY_ACCOUNT, text: `New Currency\nAccount` },
    { icon: 'wallet-outline', onPress: HOME_ROUTES.MAKE_PAYMENT, text: 'Send Money' },
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

  
const fetchAllInitialData = async () => {
  try {
    dispatch(handleLoader(true));

    await Promise.all([
      refetchgetUserDetail(),
      refetchgetCoutry_Data(),
      refetchgetCurrency_Data(),
      refetchgetAssetType_Data(),
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
  };
};
