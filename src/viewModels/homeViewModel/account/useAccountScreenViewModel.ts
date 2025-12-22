import { useIsFocused, useNavigation } from "@react-navigation/native";
import { useEffect, useRef, useState } from "react";
import { Alert, FlatList, Image, NativeScrollEvent, NativeSyntheticEvent } from "react-native";
import Metrics from "../../../styles/metrics";
import { HOME_ROUTES } from "../../../constants";
import { ACTIVE_ACCOUNT } from "../../../utils/data";
import { SHOW_CLIENT } from "../../../APICall/constants";
import { getCards } from "../../../queries/auth.query";
import { AccDelete, AccFreeze, getAccounts, getDashboardData, paymentHistry, transactionsHistry } from "../../../queries/accountQueries/accountQuery";
import { useDispatch } from "react-redux";
import { useQueryClient } from "@tanstack/react-query";
import QueryKey from "../../../queries/queryKey";
import { Images } from "../../../config";
import { StatusBar } from "react-native";
import { THEME } from "../../../styles";
import apis from "../../../services";

export const useAccountScreenViewModel = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const queryClient = useQueryClient();
  const manageRef = useRef<any>(null);
  const editRef = useRef<any>(null);
  const editAccountRef = useRef<any>(null); 
  const flatListRef = useRef<FlatList>(null);

  
const [transactions, setTransactions] = useState<any[]>([]);
// const [page, setPage] = useState(1); 
// const [hasMore, setHasMore] = useState(true);
// const [isLoadingMore, setIsLoadingMore] = useState(false);


  // const LIMIT = 10;

  const [currentAccDetail, setcurrentAccDetail] = useState({
        asset_type_id: "", 
        name: "", 
        iban: "", 
        currency_id: "", 
        created_at: "",
        iso_code: "",
        linkedAccount: "",
        id: ""
      });

  const [gbpWallet, setGbpWallet] = useState("");
  const [activeIndex, setActiveIndex] = useState(0);
  const [showbalance, setshowbalance] = useState(false);

  const currentAssetId = currentAccDetail.id;

  const { data: getAccounts_Data, refetch: refetchgetAccounts, isPending } = getAccounts({
    enabled: false, 
    dispatch,
  });

  //dashboard
  const { data: getDashboardData_Data, refetch: refetchgetDashboardData, isPending: getDashboardDataPending } = getDashboardData({
    enabled: false, 
    dispatch,
    ID: currentAccDetail.id,
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
          refetchgetAccounts()
          setTimeout(() => {
            editRef?.current?.close() 
          }, 500);
        }
      },
    });

    
  const {mutate: AccDeleteFunc, isPending: isPendingAccDelete} = AccDelete({
      callback: (response: any) => {
        if (response.success) {
          refetchgetAccounts()
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
    setActiveIndex(index);

    if (!getAccounts_Data) return; //if no data found so return from their

    if (getAccounts_Data?.length) {
    const currentItem = getAccounts_Data[index];
     
    if (currentItem) {
      setcurrentAccDetail({ 
        asset_type_id: currentItem.asset_type_id,
        name: currentItem.account?.name,
        iban: currentItem.account?.iban,
        currency_id: currentItem.currency_id,
        created_at: currentItem.created_at,
        iso_code: currentItem.currency?.iso_code,
        linkedAccount:  currentItem.currency?.name,
        id: currentItem.id
      });
  }
  };
}

  const onPressShare = () => Alert.alert("share", "share");
  const onPressCopy = () => Alert.alert("copy", "copy");
  const onPressEdit = () => editRef?.current?.open();

  const onPressSave = () =>{ Alert.alert("NEED",SHOW_CLIENT) };
  
  const onPressFreeze = () =>{ 
    let payload ={
      status: "frozen",
      name: currentAccDetail.name,
      id: currentAccDetail?.id
    }
      AccFreezeFunc(payload)
  }
  const onPressDelete = () => { 
      AccDeleteFunc(currentAccDetail?.id)
  }

  const onPressEditSave = () => Alert.alert("NEED",SHOW_CLIENT);


  useEffect(() => {
    if (getAccounts_Data?.length) {
    const firstItem = getAccounts_Data[0];
     
    if (firstItem) {
      setcurrentAccDetail({ 
        asset_type_id: firstItem.asset_type_id,
        name: firstItem.account?.name,
        iban: firstItem.account?.iban,
        currency_id: firstItem.currency_id,
        created_at: firstItem.created_at,
        iso_code: firstItem.currency?.iso_code,
        linkedAccount: firstItem.currency?.name,
        id: firstItem?.id
      });
  }
}

  }, [getAccounts_Data?.length]);

  useEffect(() => {
    refetchgetAccounts();
    apis.getCurrencyAccount(dispatch);
  }, []);

  

  useEffect(() => {
  if (currentAccDetail.id) {
    refetchgetDashboardData(currentAccDetail?.id)
    fetchTransactions(1); // 🔥 reset + reload
  }
  }, [currentAccDetail?.id]);


/** 🔹 Fetch Transactions */
const fetchTransactions = (pageNumber: number) => {
  if (!currentAssetId) return;

  // if (pageNumber !== 1 && (!hasMore || isLoadingMore)) return;

  // if (pageNumber === 1) {
  //   setHasMore(true);
  //   setTransactions([]); // 🔥 reset on new asset
  // } else {
  //   setIsLoadingMore(true);
  // }

  // setPage(pageNumber);

    const payloadWithParams = {
      assetId: currentAssetId,
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

  return {
    navigation,
    manageRef,
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
    getAccounts_Data,
    refetchgetAccounts,
    isPending,
    currentAccDetail,
    isPendingAccFreeze,
    isPendingAccDelete,
    handleNavigateTransactionHistory,
    handleNavigateTransaction,
    transactions,
    getDashboardData_Data,
    getDashboardDataPending,

    isPendingpaymentHistry,
    // isLoadingMore,
    // loadMoreTransactions,
    // hasMore, 
    // setHasMore
  };
};
