import { useIsFocused, useNavigation } from "@react-navigation/native";
import { useEffect, useRef, useState } from "react";
import { Alert, FlatList, Image, NativeScrollEvent, NativeSyntheticEvent, Share } from "react-native";
import Metrics from "../../../styles/metrics";
import { HOME_ROUTES } from "../../../constants";
import { SHOW_CLIENT } from "../../../APICall/constants";
import { AccDelete, AccFreeze, getAccountsAndAssets, getDashboardData, paymentHistry,  } from "../../../queries/accountQueries/accountQuery";
import { useDispatch } from "react-redux";
import { useQueryClient } from "@tanstack/react-query";
import { Images } from "../../../config";
import { CommonUtils } from "../../../utils";
import Clipboard from '@react-native-clipboard/clipboard';

export const useAccountScreenViewModel = () => {
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
  const [allAccounts_withAsset, setallAccounts_withAsset] = useState([])
  // const [currentAccount, setcurrentAccount] = useState([])
  const [currentAccount, setcurrentAccount] = useState<any | null>(null);

  const [currentAccDetail, setcurrentAccDetail] = useState({
    name: "", 
    iban: "", 
    created_at: "",
    id: ""
  });

  const [gbpWallet, setGbpWallet] = useState("");
  const [activeIndex, setActiveIndex] = useState(0);
  const [showbalance, setshowbalance] = useState(false);


  const { data: getAccountsAndAssets_Data, refetch: refetchgetAccountsAndAssets, isFetching } = getAccountsAndAssets({
    enabled: false, 
    dispatch,
  });


  //dashboard
  const { data: getDashboardData_Data, refetch: refetchgetDashboardData, isPending: getDashboardDataPending } = getDashboardData({
    enabled: false, 
    dispatch,
    ID: currentAccDetail?.id,
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

  const data = [
    { id: "1", total: "€50,000.00", onHold: "€22.50", available: "€53,534.00" },
    { id: "2", total: "€10,000.00", onHold: "€150.00", available: "€9,850.00" },
    { id: "3", total: "€5,500.00", onHold: "€20.00", available: "€5,480.00" },
  ];

  const features = [
    { icon: Images.add, text: `Add Beneficiary`, onPress: () => navigation.navigate(HOME_ROUTES.ADD_NEW_BENEFICIARY), width: 18, height: 18 },
    { icon: Images.transfer, text: "Transfer", onPress: () => navigation.navigate(HOME_ROUTES.MAKE_PAYMENT), width: 22, height: 22 },
    { icon: Images.detail, text: "View Details", onPress: () => manageRef?.current?.open(), width: 22, height: 22 },
    { icon: Images.convert, text: "Convert", onPress: () => navigation.navigate(HOME_ROUTES.CURRENCY_EXCHANGE), width: 22, height: 22 },
  ];

  const onRefresh = async () => {
  try {
    setRefreshing(true);

     console.log("🔄 Pull to refresh triggered");

    // 1️⃣ Accounts & Assets refresh
    await refetchgetAccountsAndAssets();

    // 2️⃣ Agar account already selected hai
    if (currentAccDetail?.id) {
      setTransactions([]); // 🔥 reset list

      // 3️⃣ Dashboard refresh
      await refetchgetDashboardData();

      // 4️⃣ Transactions refresh
      fetchTransactions(currentAccDetail.id);
    }
    

  } catch (e) {
    console.log('Refresh error', e);
  } finally {
    setRefreshing(false);
  }
};

  const onPressCard = () => navigation.navigate(HOME_ROUTES.ACCOUNT_DETAIL);

  const handleNavigateTransactionHistory = () => {
    if (currentAccDetail?.id != "") {
      navigation.navigate(HOME_ROUTES.TRANSACTIONHISTORY,{assetId: currentAccDetail?.id})
    }
  };


  const handleNavigateTransaction = (item: any) => {
    if (item) {
      navigation.navigate(HOME_ROUTES.TRANSACTION_DETAIL,{ DETAIL: item });
    }
  };
  
const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
  const offsetX = event.nativeEvent.contentOffset.x;
  const index = Math.round(offsetX / Metrics.width);

  if (index === activeIndex) return; // 🔥 extra rerender avoid

  setActiveIndex(index);

  if (!currentAccount?.assets?.length) return;

  const currentAsset = currentAccount.assets[index];

  if (!currentAsset) return;

  setcurrentAccDetail({
    name: currentAsset.account?.name,
    iban: currentAsset.account?.iban,
    created_at: currentAsset.created_at,
    id: currentAsset.id,
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
    { label: 'Account Name', value: currentAccount?.name ?? 'DUMMY' },
    { label: 'IBAN', value: currentAccount?.iban ?? 'DUMMY' },
    { label: 'SWIFT Code', value: 'DUMMY' },
    { label: 'Currency', value: 'DUMMY' },
    { label: 'Account Type', value: 'DUMMY' },
    {
      label: 'Created On',
      value: currentAccount?.created_at
        ? CommonUtils.formatDate(currentAccount.created_at)
        : 'DUMMY',
    },
    { label: 'Linked Cards', value: 'DUMMY' },
  ];

  return details
    .map(item => `${item.label}: ${item.value}`)
    .join('\n');
};

  const onPressFreeze = () =>{ 
    let payload ={
      status: "frozen",
      name: currentAccount.name,
      id: currentAccount?.id
    }
      AccFreezeFunc(payload)
  }
  const onPressDelete = () => { 
      AccDeleteFunc(currentAccDetail?.id)
  }

  const onPressEditSave = () => Alert.alert("NEED",SHOW_CLIENT);

  const saveDatainState = (data: any[] = []) => {
  const accounts = data?.[0]?.accounts ?? [];

  if (!accounts.length) return;

  setcurrentAccount((prev: any) =>
    prev?.id === accounts[0]?.id ? prev : accounts[0]
  );

  setallAccounts_withAsset(accounts);
};

//this below useeffect save first asset and all accounts and assets
  useEffect(() => {
    
    if (getAccountsAndAssets_Data?.length) {

      saveDatainState(getAccountsAndAssets_Data)


  //   if (firstAsset) {
  //     setcurrentAccDetail({ 
  //       name: firstAsset.name, //change
  //       iban: firstAsset.account?.iban,
  //       created_at: firstAsset.created_at,
  //       id: firstAsset?.id
  //     });
  // }
}

  }, [getAccountsAndAssets_Data]);

  useEffect(() => {
    refetchgetAccountsAndAssets();
    // apis.getCurrencyAccount(dispatch);
  }, []);

  

  useEffect(() => {
  if (currentAccDetail.id) {

    // console.log("currentAccDetail==>",currentAccDetail);
    
    setTransactions([]); // 🔥 reset
    refetchgetDashboardData()
    fetchTransactions(currentAccDetail?.id); // 🔥 reset + reload
  }
  }, [currentAccDetail?.id]);


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
  setcurrentAccount(account);

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
    setcurrentAccDetail({
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
    getAccountsAndAssets_Data,
    refetchgetAccountsAndAssets,
    isFetching,
    currentAccDetail,
    isPendingAccFreeze,
    isPendingAccDelete,
    handleNavigateTransactionHistory,
    handleNavigateTransaction,
    transactions,
    getDashboardData_Data,
    getDashboardDataPending,

    isPendingpaymentHistry,
    allAccounts_withAsset,
    currentAccount,
    getAccountDetailsText,
    onRefresh,
    refreshing,
    setRefreshing
    // isLoadingMore,
    // loadMoreTransactions,
    // hasMore, 
    // setHasMore
  };
};