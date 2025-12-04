// src/viewModels/homeViewModel/card/useCardScreenViewModel.ts
import { useEffect, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useIsFocused, useNavigation } from '@react-navigation/native';
import { Alert } from 'react-native';
import {
  createCard,
  freezUnFreezCard,
  getCards,
} from '../../../queries/auth.query';
import {
  getCardsUsageRules,
  getSucureCard,
  updateUsageRules,
} from '../../../queries/card.Queries/card.query';
import { Images } from '../../../config';
import { HOME_ROUTES } from '../../../constants';
import { StatusBar } from 'react-native';
import { THEME } from '../../../styles';

export const useCardScreenViewModel = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation()

  // UI toggles
  const [atmSwitch, setAtmSwitch] = useState(true);
  const [onlineSwitch, setOnlineSwitch] = useState(false);
  const [chipSwitch, setChipSwitch] = useState(true);
  const [walletSwitch, setWalletSwitch] = useState(false);

  // modal / bottom sheet state
  const [open, setopen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [saveCureentDisplayData, setsaveCureentDisplayData] = useState<any>({});
  const [modalVisible, setModalVisible] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [modalVisibleUnfreez, setmodalVisibleUnfreez] = useState(false);

  // refs for bottom sheets (exposed so View can attach)
  const AddCardRef = useRef<any>(null);
  const cardDetailRef = useRef<any>(null);
  const methodsRef = useRef<any>(null);
  const manageRef = useRef<any>(null);


  // queries / mutations (hooks you already used)
  const { mutate: freezUnFreezCardFunc, isPending: isPendingfreezUnFreezCard } =
    freezUnFreezCard({
      callback: (response: any) => {
        refetchgetCardsData();
        setModalVisible(false);
        setmodalVisibleUnfreez(false);
      },
    });

  const { mutate: updateUsageRulesFunc, isPending: isPendingupdateUsageRules } =
    updateUsageRules({
      callback: (response: any) => {
        refetchgetCardsData();
        setModalVisible(false);
        setmodalVisibleUnfreez(false);
      },
    });

  const { data: getCardsData, refetch: refetchgetCardsData, isPending } = getCards({
    enabled: false,
    dispatch,
  });

  // current item derived
  const currentItem = getCardsData?.results?.values?.[currentIndex];

  const {
    data: getCardsUsageRulesData,
    refetch: refetchgetCardsUsageRules,
    isFetching: isPendingGetCardsUsageRules,
  } = getCardsUsageRules({
    enabled: false,
    dispatch,
    card_id: currentItem?.card_id,
  });

  const {
    data: getSucureCardData,
    refetch: refetchgetSucureCard,
    isFetching: isPendinggetSucureCard,
  } = getSucureCard({
    enabled: false,
    dispatch,
    card_id: currentItem?.card_id,
  });

  useEffect(() => {
    if (getCardsUsageRulesData?.success) {
      const rule = findRule(getCardsUsageRulesData?.results?.usages, 'allow_atm_withdrawal');
      setAtmSwitch(Boolean(rule?.enabled));
    }
  }, [getCardsUsageRulesData]);

  useEffect(() => {
    refetchgetCardsData();
  }, []);

  // Viewability config and handler
  const onViewableItemsChanged = useRef(({ viewableItems }: any) => {
    if (viewableItems.length > 0) {
      setCurrentIndex(viewableItems[0].index ?? 0);
    }
  }).current;

  const viewabilityConfig = useRef({ viewAreaCoveragePercentThreshold: 50 }).current;

  const findRule = (rulesArray: any[] = [], ruleName: string) => {
    return rulesArray?.find((item: any) => item.name === ruleName);
  };

  const onRefresh = () => {
    setRefreshing(true);
    // call refetch if needed
    refetchgetCardsData?.();
    setTimeout(() => {
      setRefreshing(false);
    }, 1200);
  };

  function openFreezCard() {
    if (currentItem?.card_status == 'active') {
      setModalVisible(true);
    } else {
      setmodalVisibleUnfreez(true);
    }
  }

  function onPressCard(item: any) {
    setsaveCureentDisplayData(item);
    cardDetailRef?.current?.open();
  }

  function onPressfeature(item: any, navigation: any) {
    if (!currentItem) return;

    if (item.text == 'Freeze Card' || item.text == 'Unfreeze Card') {
      openFreezCard();
    } else if (item.text == 'Replace Card') {
      navigation.navigate('REPLACE_CARD' as any, { cardDetail: currentItem });
    } else if (item.text == 'Methods') {
      methodsRef?.current?.open();
      refetchgetCardsUsageRules();
    } else if (item.text == 'Manage') {
      manageRef?.current?.open();
    }
  }

  function renderCardFeature() {
    return [
      { icon: Images.freeze, text: currentItem?.card_status == 'freeze' || currentItem?.card_status == 'inactive' ? 'Unfreeze Card' : 'Freeze Card', width: 22, height: 22 },
      { icon: Images.replace, text: 'Replace Card', width: 22, height: 22 },
      { icon: Images.methods, text: 'Methods', width: 22, height: 22 },
      { icon: Images.manage, text: 'Manage', width: 22, height: 22 },
    ];
  }

  function HandleOnPress(option: any, navigation: any) {
    AddCardRef?.current?.close();
    setTimeout(() => {
      if (option == '1') navigation.navigate('CREATE_VC' as any);
      else navigation.navigate('CREATE_PC' as any);
    }, 500);
  }

  async function HandleOnPressCardDetail(txt: any) {
    // this calls secure card data
    await refetchgetSucureCard();
  }

  function freezCardApi(status: any) {
    const payload = {
      card_id: currentItem?.card_id,
      status: `${status}`,
      note: `Card confirmed ${status}`,
    };
    freezUnFreezCardFunc(payload);
  }

  function onPressOption(id: any) {
    manageRef?.current?.close();
    setTimeout(() => {
      if (id == 1) {
        if (currentItem?.format == 'physical') {
          setopen(true);
        }
        else if (currentItem?.format == 'virtual') {
          navigation.navigate(HOME_ROUTES.PIN_SECURITY, { cardDetail: currentItem })    
        }
      } else if (id == 2) {  
        navigation.navigate(HOME_ROUTES.SET_LIMIT, { cardDetail: currentItem, getCardsData: getCardsData })    
      }
    }, 1000);
  }

  return {
    // state
    atmSwitch,
    onlineSwitch,
    chipSwitch,
    walletSwitch,
    open,
    currentIndex,
    saveCureentDisplayData,
    modalVisible,
    refreshing,
    modalVisibleUnfreez,
    // refs
    AddCardRef,
    cardDetailRef,
    methodsRef,
    manageRef,
    // data/flags
    getCardsData,
    isPending,
    getCardsUsageRulesData,
    getSucureCardData,
    isPendingGetCardsUsageRules,
    isPendinggetSucureCard,
    isPendingfreezUnFreezCard,
    // handlers
    setAtmSwitch,
    setOnlineSwitch,
    setChipSwitch,
    setWalletSwitch,
    setopen,
    setCurrentIndex,
    setsaveCureentDisplayData,
    setModalVisible,
    setmodalVisibleUnfreez,
    setRefreshing,
    freezCardApi,
    onPressCard,
    onPressfeature,
    renderCardFeature,
    TransactionListProps: {
      onRefresh,
    },
    SlidingCardsProps: {
      onViewableItemsChanged,
      viewabilityConfig,
    },
    HandleOnPress,
    HandleOnPressCardDetail,
    onPressOption,
    updateUsageRulesFunc,
    refetchgetCardsData,
  };
};





// import { useEffect, useRef, useState } from 'react';
// import { useIsFocused, useNavigation } from '@react-navigation/native';
// import { ViewToken } from 'react-native';
// import { useDispatch } from 'react-redux';
// import { HOME_ROUTES } from '../../../constants';
// import { freezUnFreezCard, getCards } from '../../../queries/auth.query';

// export function useCardScreenViewModel() {
//   const [currentIndex, setCurrentIndex] = useState(0);
//   const [modalVisible, setModalVisible] = useState(false);
//   const [refreshing, setRefreshing] = useState(false);
//   const [modalVisibleUnfreez, setmodalVisibleUnfreez] = useState(false);

//   const AddCardRef = useRef(null);
//   const cardDetailRef = useRef(null);
//   const methodsRef = useRef(null);
//   const manageRef = useRef(null);

//   const dispatch = useDispatch();
//   const navigation = useNavigation();
//   const FOCUS = useIsFocused();

//   const { mutate: freezUnFreezCardFunc, isPending: isPendingfreezUnFreezCard } = freezUnFreezCard({
//     callback: () => {
//       refetchgetCardsData().then(() => {
//         setModalVisible(false);
//         setmodalVisibleUnfreez(false);
//       });
//     },
//   });

//   const { data: getCardsData, refetch: refetchgetCardsData, isPending } = getCards({
//     enabled: false,
//     dispatch,
//   });

//   const viewabilityConfig = useRef({ viewAreaCoveragePercentThreshold: 50 }).current;

//   useEffect(() => {
//     refetchgetCardsData();
//   }, []);

//   const onViewableItemsChanged = useRef(({ viewableItems }: { viewableItems: ViewToken[] }) => {
//     if (viewableItems.length > 0) setCurrentIndex(viewableItems[0].index ?? 0);
//   }).current;

//   const onRefresh = () => {
//     setRefreshing(true);
//     refetchgetCardsData();
//     setTimeout(() => setRefreshing(false), 2000);
//   };

//   const openFreezCard = (currentItem: any) => {
//     if (currentItem?.card_status === 'active') setModalVisible(true);
//     else if (currentItem?.card_status === 'inactive') setmodalVisibleUnfreez(true);
//   };

//   const freezCardApi = (status: any, currentItem: any) => {
//     const payload = {
//       card_id: currentItem?.card_id,
//       status: `${status}`,
//       note: `Card confirmed ${status}`,
//     };
//     freezUnFreezCardFunc(payload);
//   };

//   const HandleOnPress = (txt: any) => {
//     AddCardRef?.current?.close();
//     setTimeout(() => {
//       navigation.navigate(txt == 1 ? HOME_ROUTES.CREATE_VC : HOME_ROUTES.CREATE_PC);
//     }, 500);
//   };

//   const onPressfeature = (item: any, currentItem: any) => {
//     if (item.text === 'Freeze Card') openFreezCard(currentItem);
//     else if (item.text === 'Replace Card')
//       navigation.navigate(HOME_ROUTES.REPLACE_CARD, { cardDetail: currentItem });
//     else if (item.text === 'Methods') methodsRef?.current?.open();
//     else if (item.text === 'Manage') manageRef?.current?.open();
//   };

//   const onPressOption = (id: any) => {
//     manageRef?.current?.close();
//     setTimeout(() => {
//       if (id == 1) navigation.navigate(HOME_ROUTES.SET_LIMIT);
//       else if (id == 2) navigation.navigate(HOME_ROUTES.PIN_SECURITY);
//     }, 1000);
//   };

//   return {
//     currentIndex,
//     modalVisible,
//     setModalVisible,
//     modalVisibleUnfreez,
//     setmodalVisibleUnfreez,
//     refreshing,
//     onRefresh,
//     onViewableItemsChanged,
//     viewabilityConfig,
//     AddCardRef,
//     cardDetailRef,
//     methodsRef,
//     manageRef,
//     navigation,
//     getCardsData,
//     refetchgetCardsData,
//     isPending,
//     isPendingfreezUnFreezCard,
//     openFreezCard,
//     freezCardApi,
//     HandleOnPress,
//     onPressfeature,
//     onPressOption,
//   };
// }
