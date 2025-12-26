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
import { Toast } from '../../../utils';

export const useCardScreenViewModel = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation()

  // UI toggles
  const [getCardsData, setgetCardsData] = useState([]);
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

    
  const { mutate: getCardsFunc, isPending } = getCards({
      callback: (response: any) => {
        if (response?.success) {
          // const newData = response?.results?.values || [];
          setgetCardsData(response?.results?.values);
        }
      }, 
    });

  // const { data: getCardsData, refetch: refetchgetCardsData, isPending } = getCards({
  //   enabled: false,
  //   dispatch,
  // });

  // console.log("res===>",getCardsData);

  // current item derived
  const currentItem = getCardsData[currentIndex];

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
      const rule2 = findRule(getCardsUsageRulesData?.results?.usages, 'allow_ecomm');
      const rule3 = findRule(getCardsUsageRulesData?.results?.usages, 'allow_offline_pin');
      const rule4 = findRule(getCardsUsageRulesData?.results?.usages, 'allow_international_transactions');

      // console.log("rule=>1234",rule?.enabled,rule2?.enabled,rule3?.enabled,rule4?.enabled);
      
      setAtmSwitch((rule?.enabled));
      setOnlineSwitch(rule2?.enabled);
      setChipSwitch(rule3?.enabled);
      setWalletSwitch(rule4?.enabled);
    }
  }, [getCardsUsageRulesData]);

  useEffect(() => {
    refetchgetCardsData();
  }, []);

  function refetchgetCardsData() {
    getCardsFunc({})    
  }

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
    refetchgetCardsData();
    setTimeout(() => {
      setRefreshing(false);
    }, 1200);
  };

  function openFreezCard() {
    if (currentItem?.card_status == 'active')  {
      setModalVisible(true);
    }
    else if (currentItem?.card_status == 'freeze')  {
      setmodalVisibleUnfreez(true);
    }
    else {
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
      if (isPendingupdateUsageRules) {
        Toast.showToast("Payments methods is loading", '', 'error')
      }
      else{
        methodsRef?.current?.open();
        refetchgetCardsUsageRules();
      }
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

  function updateCardStatuses() {
    const payload = {
      card_id: currentItem?.card_id,
      usage: [
      { 
        name: 'allow_atm_withdrawal', 
        enabled: atmSwitch 
      },
      {
        name: "allow_ecomm",
        enabled: onlineSwitch
      },
      {
        name: "allow_offline_pin",
        enabled: chipSwitch
      },
      {
        name: "allow_international_transactions",
        enabled: walletSwitch
      }
        ],
    };
    console.log("payload==>",payload);    
    updateUsageRulesFunc(payload);
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
    currentItem,
    updateCardStatuses,
    // refetchgetCardsData,
  };
};

