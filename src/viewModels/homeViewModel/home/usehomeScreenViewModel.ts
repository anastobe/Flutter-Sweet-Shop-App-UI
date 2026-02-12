// src/viewModels/homeViewModel/useHomeViewModel.ts
import { useIsFocused, useNavigation } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import { HOME_ROUTES } from '../../../constants';
import { ACCOUNT_HISTRY_VALIDATION, CURRENT_ACCOUNT, DATA } from '../../../utils/data';
import { Alert } from 'react-native';
import { useEffect, useMemo, useRef, useState } from 'react';
import { handleLoader } from '../../../Redux/Action/Auth/AuthActions';
import { Images } from '../../../config';
import { StatusBar } from 'react-native';
import { THEME } from '../../../styles';
import apis from '../../../services';
import { fetchLinkedAccCards, getDashboardData, paymentHistry } from '../../../queries/accountQueries/accountQuery';

export const useHomeViewModel = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const selectAccountRef = useRef<any>(null);

  const [refreshing, setRefreshing] = useState(false);
  const [activeIndex, setactiveIndex] = useState(0);
  const [transactions, setTransactions] = useState<any[]>([]);
  const [cards, setcards] = useState<any[]>([]);
  const [showbalance, setshowbalance] = useState(false);
  const [showCurrencyDropdown, setShowCurrencyDropdown] = useState(false);
  // const [selectedCurrency, setSelectedCurrency] = useState<any>();
  const [assetsList, setAssetsList] = useState<any>({
    firstObject: {},
    array: []
  });

  const loader = useSelector((state: any) => state?.AuthReducer?.loader);
  const loginUserData = useSelector((state: any) => state?.HomeReducer?.loginUserData);
  const userData = useSelector((state: any) => state?.AuthReducer?.userData);
  const getCurrencyAccArray = useSelector((state: any) => state?.HomeReducer?.getCurrencyAccArray);

  
  //dashboard
  const { data: getDashboardData_Data, refetch: refetchgetDashboardData, isPending: getDashboardDataPending } = getDashboardData({
    enabled: false, 
    dispatch,
    ID: assetsList?.firstObject?.id,
  });
  
  
  const { mutate: paymentHistryFunc, isPending: isPendingpaymentHistry } =
    paymentHistry({
      callback: (response: any) => {
        if (response?.success) {
          const newData = response?.results?.values || [];
  
          setTransactions(newData);
  
          // if (newData.length < LIMIT) {
          //   setHasMore(false);
          // }
  
          // setIsLoadingMore(false);
        }
      },
    });

    const { mutate: fetchLinkedAccCardsFunc, isPending: isPendingfetchLinkedAccCards } =
    fetchLinkedAccCards({
      callback: (response: any) => {
        if (response?.success) {
          const newData = response?.results?.values || [];
  
          setcards(newData);
  
          // if (newData.length < LIMIT) {
          //   setHasMore(false);
          // }
  
          // setIsLoadingMore(false);
        }
      },
    });

    
  const onRefresh = async () => {
  try {
    // setRefreshing(true);
      const [ currencyAccountRes, AllAsset_n_AccountsRes] =
      await Promise.all([
        apis.getCurrencyAccount(dispatch),
        apis.getAccountsAndAssets(dispatch),
      ]);

      
      
      if (currencyAccountRes?.results) {
      console.log("=====",currencyAccountRes,"-also save-");
      // setSelectedCurrency(currencyAccountRes?.results[0]);
      setAssetsList((prev: any )=> ({
        ...prev,          // keep previous keys same
        firstObject: currencyAccountRes?.results[activeIndex]
      }))

    }

      refreshAccountBasedData()
  } catch (e) {
    console.log('Refresh error', e);
  } finally {
    // setRefreshing(false);
  }
};


  const Sendoption = [ 
    { icon: Images.add, onPress: HOME_ROUTES.ADD_NEW_CURRENCY_ACCOUNT, text: `New currency account`, width: 15, height: 15 },
    { icon: Images.sendMoney, onPress: HOME_ROUTES.MAKE_PAYMENT, text: 'Send money', width: 20, height: 20 },
  ];

  const handleLogout = () => {
    navigation.navigate(HOME_ROUTES.NOTIFICATION);
  };

  const handlePressCard = (item: any) => {
    navigation.navigate(item.onPress)
  };

  const handleNavigateNotification = () => {
    navigation.navigate(HOME_ROUTES.NOTIFICATION)
  };

  const handleNavigateTransactionHistory = () => {
    if (assetsList?.firstObject?.id != "") {
      navigation.navigate(HOME_ROUTES.TRANSACTIONHISTORY,{assetId: assetsList?.firstObject?.id, show: ACCOUNT_HISTRY_VALIDATION.INCOMPLETE })
    }
    // navigation.navigate(HOME_ROUTES.TRANSACTIONHISTORY);
  };

  // const handleNavigateTransaction = () => {
  //   navigation.navigate(HOME_ROUTES.TRANSACTION_DETAIL);
  // };
  

  const handleNavigateProfile = () => {
    navigation.navigate(HOME_ROUTES.PROFILE);
  };

  
const fetchAllInitialData = async () => {
  try {
    dispatch(handleLoader(true));

    const [
      userDetailRes,
      countryRes, currencyRes, assetTypeRes, currencyAccountRes, AllAsset_n_AccountsRes] =
    await Promise.all([
      apis.getUserDetail(dispatch),
      apis.getCoutry(dispatch),
      apis.getCurrency(dispatch),
      apis.getAssetType(dispatch),
      apis.getCurrencyAccount(dispatch), // ✅ This returns your all accounts array
      apis.getAccountsAndAssets(dispatch)

    ]);    

    if (currencyAccountRes?.results) {
      // setSelectedCurrency(currencyAccountRes?.results[0]);
      setAssetsList({
        firstObject: currencyAccountRes?.results[activeIndex],
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

const refreshAccountBasedData = async () => {

  if (!assetsList?.firstObject?.id) return;
  fetchTransactions();
  fetchCard();
  refetchgetDashboardData();
};

  useEffect(()=>{
    fetchAllInitialData()
    refreshAccountBasedData();
  },[])


  useEffect(() => {
    // console.log("Anasid= >",assetsList?.firstObject?.id);
    
  if (assetsList?.firstObject?.id) {
    refreshAccountBasedData();
  }
}, [assetsList?.firstObject?.id]);



/** 🔹 Fetch Transactions */
const fetchTransactions = () => {
  if (!assetsList?.firstObject?.id) return;

  // if (pageNumber !== 1 && (!hasMore || isLoadingMore)) return;

  // if (pageNumber === 1) {
  //   setHasMore(true);
  //   setTransactions([]); // 🔥 reset on new asset
  // } else {
  //   setIsLoadingMore(true);
  // }

  // setPage(pageNumber);

    const payloadWithParams = {
      assetId: assetsList?.firstObject?.id,
      payload: {
        page: 1,
        limit: 10,
        // search,
        sort: {
          key: 'created_at',
          order: 'desc',
        }
        // ,
        // filters: {
        //   ...(filters.from_date && { from_date: filters.from_date }),
        //   ...(filters.to_date && { to_date: filters.to_date }),
        //   ...(filters.types.length > 0 && { types: filters.types }),
        // },
      }
    };

  paymentHistryFunc(payloadWithParams);
};

const fetchCard = () => {
  if (!assetsList?.firstObject?.id) return;

  const payload = {
    account_id: assetsList?.firstObject?.account?.id
  }

  fetchLinkedAccCardsFunc(payload);
};


// console.log("getCurrencyAccount_DATA=>",getCurrencyAccount_DATA,"Ssaas",getCurrencyAccArray);
 

 
// const currencyOptions = useMemo(() => {
//   if (!Array.isArray(assetsList)) return [];  // ✅ No crash

//   const map: any = {};

//   assetsList?.forEach(asset => {
//     map[asset.currency.iso_code] = asset;
//   });

//   return Object.values(map);
// }, [assetsList]);


const onSelectCurrency = (asset: any, index: any) => {
  // setSelectedCurrency(asset);
  setAssetsList((prev: any )=> ({
    ...prev,          // keep previous keys same
    firstObject: asset  // only update this one
  }));
  setactiveIndex(index)
  setShowCurrencyDropdown(false);
  selectAccountRef?.current?.close()
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
    // handleNavigateTransaction,
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
    setshowbalance,
    transactions,
    isPendingpaymentHistry,
    navigation,
    getDashboardData_Data,
    getDashboardDataPending,
    cards,
    isPendingfetchLinkedAccCards,
    onRefresh,
    refreshing,
    setRefreshing,
    selectAccountRef,
    userData
    // currencyOptions

  };
};
