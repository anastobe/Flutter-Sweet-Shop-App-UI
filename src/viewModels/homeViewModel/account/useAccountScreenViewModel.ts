import { useIsFocused, useNavigation } from "@react-navigation/native";
import { useEffect, useRef, useState } from "react";
import { Alert, FlatList, Image, NativeScrollEvent, NativeSyntheticEvent, Share } from "react-native";
import Metrics from "../../../styles/metrics";
import { HOME_ROUTES } from "../../../constants";
import { SHOW_CLIENT } from "../../../APICall/constants";
import { AccDelete, AccFreeze, getAccountsAndAssets, getDashboardData, paymentHistry,  } from "../../../queries/accountQueries/accountQuery";
import { useDispatch, useSelector } from "react-redux";
import { useQueryClient } from "@tanstack/react-query";
import { Images } from "../../../config";
import { CommonUtils } from "../../../utils";
import Clipboard from '@react-native-clipboard/clipboard';
import { ACCOUNT_HISTRY_VALIDATION } from "../../../utils/data";
import apis from "../../../services";
import { handleLoader } from "../../../Redux/Action/Auth/AuthActions";
import { storeSelectedAccountWholeApp } from "../../../Redux/Action/Home/HomeActions";

export const useAccountScreenViewModel = () => {

  const loginUserData = useSelector((state: any) => state?.HomeReducer?.loginUserData);
  const allAccounts = useSelector((state: any) => state?.HomeReducer?.allAccounts)
  const selectedAccount_WholeApp = useSelector((state: any) => state?.HomeReducer?.selectedAccount_WholeApp)
  const userData = useSelector((state: any) => state?.AuthReducer?.userData);

  const navigation = useNavigation();
  const dispatch = useDispatch();

  const queryClient = useQueryClient();
  const manageRef = useRef<any>(null);
  const selectAccountRef = useRef<any>(null);
  const editRef = useRef<any>(null);
  const editAccountRef = useRef<any>(null); 
  const flatListRef = useRef<FlatList>(null);

const [refreshing, setRefreshing] = useState(false);
const [transactions, setTransactions] = useState<any[]>([]);
// const [page, setPage] = useState(1); 
// const [hasMore, setHasMore] = useState(true);
// const [isLoadingMore, setIsLoadingMore] = useState(false);


  // const LIMIT = 10;
  // const [allAccounts_withAsset, setallAccounts_withAsset] = useState([])
  // const [selectedAccount_WholeApp, setselectedAccount_WholeApp] = useState([])
  // const [currentAccount, setcurrentAccount] = useState<any | null>(null);


  const [currentAssetDetail, setcurrentAssetDetail] = useState({
    name: "", 
    iban: "", 
    created_at: "",
    id: ""
  });

  const [gbpWallet, setGbpWallet] = useState("");
  const [activeIndex, setActiveIndex] = useState(0);
  const [showbalance, setshowbalance] = useState(false);


  // const { data: getAccountsAndAssets_Data, refetch: refetchgetAccountsAndAssets, isFetching } = getAccountsAndAssets({
  //   enabled: false, 
  //   dispatch,
  // });


  //dashboard
  const { data: getDashboardData_Data, refetch: refetchgetDashboardData, isPending: getDashboardDataPending } = getDashboardData({
    enabled: false, 
    dispatch,
    ID: currentAssetDetail?.id,
  });
 
  //  console.log("getDashboardData_Data=>",getDashboardData_Data);
  


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
  
  const {mutate: AccFreezeFunc, isPending: isPendingAccFreeze} = AccFreeze({
      callback: (response: any) => {
        if (response.success) {
          refetchgetAccountsAndAssets()
          setTimeout(() => {
            editRef?.current?.close() 
          }, 500);
        }
      },
    });

    
  const {mutate: AccDeleteFunc, isPending: isPendingAccDelete} = AccDelete({
      callback: (response: any) => {
        if (response.success) {
          refetchgetAccountsAndAssets()
          setTimeout(() => {
            editRef?.current?.close() 
          }, 500);
        }
      },
    });

    async function refetchgetAccountsAndAssets() {
       await apis.getAccountsAndAssets(dispatch)
    }

  const data = [
    { id: "1", total: "€50,000.00", onHold: "€22.50", available: "€53,534.00" },
    { id: "2", total: "€10,000.00", onHold: "€150.00", available: "€9,850.00" },
    { id: "3", total: "€5,500.00", onHold: "€20.00", available: "€5,480.00" },
  ];

  const features = [
    { icon: Images.add, text: `Add beneficiary`, onPress: () => navigation.navigate(HOME_ROUTES.ADD_NEW_BENEFICIARY), width: 18, height: 18 },
    { icon: Images.transfer, text: "Transfer", onPress: () => navigation.navigate(HOME_ROUTES.MAKE_PAYMENT), width: 22, height: 22 },
    { icon: Images.detail, text: "View details", onPress: () => manageRef?.current?.open(), width: 22, height: 22 },
    { icon: Images.convert, text: "convert", onPress: () => navigation.navigate(HOME_ROUTES.CURRENCY_EXCHANGE), width: 22, height: 22 },
  ];

  const onRefresh = async () => {
  try {
    // setRefreshing(true);

     console.log("🔄 Pull to refresh triggered");

    // 1️⃣ Accounts & Assets refresh
    // await refetchgetAccountsAndAssets();

      let res = await apis.getAccountsAndAssets(dispatch)
    // if (res?.status) {
      const accounts = res?.[0]?.accounts ?? [];

      const foundAccount = accounts.find(acc =>
        acc.assets?.some((asset:any) => asset.id === currentAssetDetail?.id)
      );

     console.log("🔄 foundAccount>",foundAccount); 

      dispatch(storeSelectedAccountWholeApp(foundAccount))
      // setselectedAccount_WholeApp(foundAccount); 
  
    // }


    // 2️⃣ Agar account already selected hai
    if (currentAssetDetail?.id) {
      setTransactions([]); // 🔥 reset list

      // 3️⃣ Dashboard refresh
      await refetchgetDashboardData();

      // 4️⃣ Transactions refresh
      fetchTransactions(currentAssetDetail?.id);
    }
    

  } catch (e) {
    console.log('Refresh error', e);
  } finally {
    // setRefreshing(false);
  }
};

  const onPressCard = () => navigation.navigate(HOME_ROUTES.ACCOUNT_DETAIL);

  const handleNavigateTransactionHistory = () => {
    if (currentAssetDetail?.id != "") {
      navigation.navigate(HOME_ROUTES.TRANSACTIONHISTORY,{assetId: currentAssetDetail?.id, show: ACCOUNT_HISTRY_VALIDATION.INCOMPLETE})
    }
  };


  const handleNavigateTransaction = (item: any) => {
    if (item) {
      navigation.navigate(HOME_ROUTES.TRANSACTION_DETAIL,{ DETAIL: item, showAttachement: true });
    }
  };
  
const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
  const offsetX = event.nativeEvent.contentOffset.x;
  const index = Math.round(offsetX / Metrics.width);

  if (index === activeIndex) return; // 🔥 extra rerender avoid

  setActiveIndex(index);

  if (!selectedAccount_WholeApp?.assets?.length) return;

  const currentAsset = selectedAccount_WholeApp.assets[index];

  if (!currentAsset) return;

  setcurrentAssetDetail({
    name: currentAsset?.account?.name,
    iban: currentAsset?.account?.iban,
    created_at: currentAsset?.created_at,
    id: currentAsset?.id,
  });
};



const onPressShare = async () => {
  try {
    const text = getAccountDetailsText();

    await Share.share({
      message: text,
    });

  } catch (error) {
    console.log('Share error:', error);
  }
};

const onPressCopy = () => {
  const text = getAccountDetailsText();
  Clipboard.setString(text);
  Alert.alert('Copied', 'Account details copied to clipboard');
};


  // const onPressShare = () =>{
  //   //  Alert.alert("share", "share")
  //   getAccountDetailsText()
  //   };

  // const onPressCopy = () => Alert.alert("copy", "copy");
  const onPressEdit = () => editRef?.current?.open();

  const onPressSave = () =>{ Alert.alert("NEED",SHOW_CLIENT) };
  
  const getAccountDetailsText = () => {
  const details = [
    { label: 'Account name', value: selectedAccount_WholeApp?.name ?? 'DUMMY' },
    { label: 'IBAN', value: selectedAccount_WholeApp?.iban ?? 'DUMMY' },
    { label: 'SWIFT code', value: 'DUMMY' },
    { label: 'Currency', value: 'DUMMY' },
    { label: 'Account type', value: 'DUMMY' },
    {
      label: 'Created cards',
      value: selectedAccount_WholeApp?.created_at
        ? CommonUtils.formatDate(selectedAccount_WholeApp.created_at)
        : 'DUMMY',
    },
    { label: 'Linked cards', value: 'DUMMY' },
  ];

  return details
    .map(item => `${item.label}: ${item.value}`)
    .join('\n');
};

  const onPressFreeze = () =>{ 
    let payload ={
      status: "frozen",
      name: selectedAccount_WholeApp.name,
      id: selectedAccount_WholeApp?.id
    }
      AccFreezeFunc(payload)
  }
  const onPressDelete = () => { 
      AccDeleteFunc(currentAssetDetail?.id)
  }

  const onPressEditSave = () => Alert.alert("NEED",SHOW_CLIENT);

  const saveDatainState = (data: any[] = []) => {

    console.log("i am saving data in state");

  const accounts = data ?? [];

  const currrentAsset = accounts?.[0]?.assets[activeIndex]

  if (!accounts.length) return;

  dispatch(storeSelectedAccountWholeApp(accounts?.[0]))

  // setselectedAccount_WholeApp((prev: any) =>
  //   prev?.id === accounts[0]?.id ? prev : accounts[0]
  // );

  setcurrentAssetDetail({
    name: currrentAsset?.currency?.iso_code,
    iban: "000",
    created_at: "create at",
    id: currrentAsset?.id,
  });

  // setallAccounts_withAsset(accounts);
};

//this below useeffect save first asset and all accounts and assets
  useEffect(() => {
    if (allAccounts?.length) {

      
      saveDatainState(allAccounts)
    }

    setTimeout(() => {
      console.log("play ===");
    }, 1000);
  
  }, [allAccounts || selectedAccount_WholeApp?.id]);


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

    } catch (error) {
      dispatch(handleLoader(false))
      console.log("Error fetching initial data:", error);
    } finally {
      dispatch(handleLoader(false))
    }
  };


  useEffect(() => {
    fetchAllInitialData()
    // apis.getCurrencyAccount(dispatch);
  }, []);

  

  useEffect(() => {
  if (currentAssetDetail?.id) {

    // console.log("currentAssetDetail==>",currentAssetDetail);
    
    setTransactions([]); // 🔥 reset
    refetchgetDashboardData()
    fetchTransactions(currentAssetDetail?.id); // 🔥 reset + reload
  }
  }, [currentAssetDetail?.id]);


/** 🔹 Fetch Transactions */
const fetchTransactions = (ID: any) => {
  if (!ID) return;

  // if (pageNumber !== 1 && (!hasMore || isLoadingMore)) return;

  // if (pageNumber === 1) {
  //   setHasMore(true);
  //   setTransactions([]); // 🔥 reset on new asset
  // } else {
  //   setIsLoadingMore(true);
  // }

  // setPage(pageNumber);

    const payloadWithParams = {
      assetId: ID,
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
 
/** 🔹 Load More */
// const loadMoreTransactions = () => {
//   console.log("loadMoreTransactions");
  
//   if (!hasMore || isLoadingMore || isPendingpaymentHistry) return;
//   fetchTransactions(page + 1);
// };

function selectAccount(account: any) {
  // setselectedAccount_WholeApp(account);
    dispatch(storeSelectedAccountWholeApp(account))

  // 🔥 reset index
  setActiveIndex(0);

  // 🔥 scroll assets back to first card
  requestAnimationFrame(() => {
    flatListRef.current?.scrollToIndex({
      index: 0,
      animated: false,
    });
  });

  // 🔥 first asset auto select
  const firstAsset = account?.assets?.[0];
  if (firstAsset) {
    setcurrentAssetDetail({
      name: firstAsset.account?.name,
      iban: firstAsset.account?.iban,
      created_at: firstAsset.created_at,
      id: firstAsset.id,
    });
  }

  selectAccountRef.current?.close();
}

  return {
    navigation,
    manageRef,
    selectAccountRef,
    selectAccount,
    editRef,
    editAccountRef,
    flatListRef,
    gbpWallet,
    setGbpWallet,
    activeIndex,
    setshowbalance,
    showbalance,
    setActiveIndex,
    data,
    features,
    onPressCard,
    handleScroll,
    onPressShare,
    onPressCopy,
    onPressEdit,
    onPressSave,
    onPressFreeze,
    onPressDelete,
    onPressEditSave,
    // getAccountsAndAssets_Data,
    refetchgetAccountsAndAssets,
    // isFetching,
    currentAssetDetail,
    isPendingAccFreeze,
    isPendingAccDelete,
    handleNavigateTransactionHistory,
    handleNavigateTransaction,
    transactions,
    getDashboardData_Data,
    getDashboardDataPending,

    isPendingpaymentHistry,
    // allAccounts_withAsset,
    selectedAccount_WholeApp,
    getAccountDetailsText,
    onRefresh,
    refreshing,
    setRefreshing,
    loginUserData,
    allAccounts,
    userData
    // isLoadingMore,
    // loadMoreTransactions,
    // hasMore, 
    // setHasMore
  };
};