import { useNavigation } from "@react-navigation/native";
import { useRef, useState } from "react";
import { Alert, FlatList, NativeScrollEvent, NativeSyntheticEvent } from "react-native";
import Metrics from "../../../styles/metrics";
import { HOME_ROUTES } from "../../../constants";
import { ACTIVE_ACCOUNT } from "../../../utils/data";

export const useAccountScreenViewModel = () => {
  const navigation = useNavigation();

  const manageRef = useRef<any>(null);
  const editRef = useRef<any>(null);
  const editAccountRef = useRef<any>(null);
  const flatListRef = useRef<FlatList>(null);

  const [gbpWallet, setGbpWallet] = useState("");
  const [activeIndex, setActiveIndex] = useState(0);

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

  const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const offsetX = event.nativeEvent.contentOffset.x;
    const index = Math.round(offsetX / Metrics.width);
    setActiveIndex(index);
  };

  const onPressShare = () => Alert.alert("share", "share");
  const onPressCopy = () => Alert.alert("copy", "copy");
  const onPressEdit = () => editRef?.current?.open();

  const onPressSave = () => Alert.alert("Save Changes");
  const onPressFreeze = () => Alert.alert("Freeze Account");
  const onPressDelete = () => Alert.alert("Delete Account");

  const onPressEditSave = () => editAccountRef?.current?.close();

  return {
    navigation,
    manageRef,
    editRef,
    editAccountRef,
    flatListRef,
    gbpWallet,
    setGbpWallet,
    activeIndex,
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
  };
};
