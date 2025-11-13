import { useNavigation } from "@react-navigation/native";
import { useEffect, useRef, useState } from "react";
import { Alert, FlatList, NativeScrollEvent, NativeSyntheticEvent } from "react-native";
import Metrics from "../../../styles/metrics";
import { HOME_ROUTES } from "../../../constants";
import { ACTIVE_ACCOUNT } from "../../../utils/data";
import { SHOW_CLIENT } from "../../../APICall/constants";
import { getCards } from "../../../queries/auth.query";
import { AccDelete, AccFreeze, getAccounts } from "../../../queries/accountQueries/accountQuery";
import { useDispatch } from "react-redux";
import { useQueryClient } from "@tanstack/react-query";
import QueryKey from "../../../queries/queryKey";

export const useAccountScreenViewModel = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const queryClient = useQueryClient();
  const manageRef = useRef<any>(null);
  const editRef = useRef<any>(null);
  const editAccountRef = useRef<any>(null);
  const flatListRef = useRef<FlatList>(null);

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
  
  const { data: getAccounts_Data, refetch: refetchgetAccounts, isPending } = getAccounts({
    enabled: false, 
    dispatch,
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
    { icon: "add-outline", text: `Add\nBeneficiary`, onPress: () => navigation.navigate(HOME_ROUTES.ADD_NEW_BENEFICIARY) },
    { icon: "card-outline", text: "Transfer", onPress: () => navigation.navigate(HOME_ROUTES.MAKE_PAYMENT) },
    { icon: "reader-outline", text: "View Details", onPress: () => manageRef?.current?.open() },
    { icon: "server-outline", text: "Convert", onPress: () => navigation.navigate(HOME_ROUTES.CURRENCY_EXCHANGE) },
  ];

  const onPressCard = () => navigation.navigate(HOME_ROUTES.ACCOUNT_DETAIL);

  const handleNavigateTransactionHistory = () => {
    // navigation.navigate(HOME_ROUTES.TRANSACTIONHISTORY);
    navigation.navigate(HOME_ROUTES.ACCOUNT_STATEMENT)
  };

  const handleNavigateTransaction = () => {
    navigation.navigate(HOME_ROUTES.TRANSACTION_DETAIL);
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
  }, []);

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
    handleNavigateTransaction
  };
};
