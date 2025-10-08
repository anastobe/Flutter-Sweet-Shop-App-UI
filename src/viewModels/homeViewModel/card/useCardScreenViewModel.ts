import { useEffect, useRef, useState } from 'react';
import { useIsFocused, useNavigation } from '@react-navigation/native';
import { ViewToken } from 'react-native';
import { useDispatch } from 'react-redux';
import { HOME_ROUTES } from '../../../constants';
import { freezUnFreezCard, getCards } from '../../../queries/auth.query';

export function useCardScreenViewModel() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [modalVisible, setModalVisible] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [modalVisibleUnfreez, setmodalVisibleUnfreez] = useState(false);

  const AddCardRef = useRef(null);
  const cardDetailRef = useRef(null);
  const methodsRef = useRef(null);
  const manageRef = useRef(null);

  const dispatch = useDispatch();
  const navigation = useNavigation();
  const FOCUS = useIsFocused();

  const { mutate: freezUnFreezCardFunc, isPending: isPendingfreezUnFreezCard } = freezUnFreezCard({
    callback: () => {
      refetchgetCardsData().then(() => {
        setModalVisible(false);
        setmodalVisibleUnfreez(false);
      });
    },
  });

  const { data: getCardsData, refetch: refetchgetCardsData, isPending } = getCards({
    enabled: false,
    dispatch,
  });

  const viewabilityConfig = useRef({ viewAreaCoveragePercentThreshold: 50 }).current;

  useEffect(() => {
    refetchgetCardsData();
  }, []);

  const onViewableItemsChanged = useRef(({ viewableItems }: { viewableItems: ViewToken[] }) => {
    if (viewableItems.length > 0) setCurrentIndex(viewableItems[0].index ?? 0);
  }).current;

  const onRefresh = () => {
    setRefreshing(true);
    refetchgetCardsData();
    setTimeout(() => setRefreshing(false), 2000);
  };

  const openFreezCard = (currentItem: any) => {
    if (currentItem?.card_status === 'active') setModalVisible(true);
    else if (currentItem?.card_status === 'inactive') setmodalVisibleUnfreez(true);
  };

  const freezCardApi = (status: any, currentItem: any) => {
    const payload = {
      card_id: currentItem?.card_id,
      status: `${status}`,
      note: `Card confirmed ${status}`,
    };
    freezUnFreezCardFunc(payload);
  };

  const HandleOnPress = (txt: any) => {
    AddCardRef?.current?.close();
    setTimeout(() => {
      navigation.navigate(txt == 1 ? HOME_ROUTES.CREATE_VC : HOME_ROUTES.CREATE_PC);
    }, 500);
  };

  const onPressfeature = (item: any, currentItem: any) => {
    if (item.text === 'Freeze Card') openFreezCard(currentItem);
    else if (item.text === 'Replace Card')
      navigation.navigate(HOME_ROUTES.REPLACE_CARD, { cardDetail: currentItem });
    else if (item.text === 'Methods') methodsRef?.current?.open();
    else if (item.text === 'Manage') manageRef?.current?.open();
  };

  const onPressOption = (id: any) => {
    manageRef?.current?.close();
    setTimeout(() => {
      if (id == 1) navigation.navigate(HOME_ROUTES.SET_LIMIT);
      else if (id == 2) navigation.navigate(HOME_ROUTES.PIN_SECURITY);
    }, 1000);
  };

  return {
    currentIndex,
    modalVisible,
    setModalVisible,
    modalVisibleUnfreez,
    setmodalVisibleUnfreez,
    refreshing,
    onRefresh,
    onViewableItemsChanged,
    viewabilityConfig,
    AddCardRef,
    cardDetailRef,
    methodsRef,
    manageRef,
    navigation,
    getCardsData,
    refetchgetCardsData,
    isPending,
    isPendingfreezUnFreezCard,
    openFreezCard,
    freezCardApi,
    HandleOnPress,
    onPressfeature,
    onPressOption,
  };
}
