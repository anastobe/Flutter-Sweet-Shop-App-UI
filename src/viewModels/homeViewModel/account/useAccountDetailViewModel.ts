import { useEffect, useRef } from 'react';
import { Alert } from 'react-native';
import { useIsFocused, useNavigation } from '@react-navigation/native';
import { CARD_DETAIL, SPECIFIC_ACCOUNT_DETAIL } from '../../../utils/data';
import { HOME_ROUTES } from '../../../constants';
import { StatusBar } from 'react-native';
import { THEME } from '../../../styles';

export const useAccountDetailViewModel = () => {
  const navigation = useNavigation();
  const manageRef = useRef<any>(null);
  const FOCUS = useIsFocused()
  
  useEffect(()=>{
    if (FOCUS) {
      StatusBar.setBackgroundColor(THEME.darkSecondary)
    }
  },[FOCUS]) 

  const pressBackArrow = () => navigation.goBack();

  const Sendoption = [
    { icon: 'repeat-outline', onPress: () => console.log("Withdraw"), text: "Withdraw" },
    { icon: 'cash-outline', onPress: () => console.log("Add Funds"), text: "Add Funds" },
    { icon: 'wallet-outline', onPress: () => console.log("Transfer"), text: "Transfer" },
    { icon: 'card-outline', onPress: () => console.log("Exchange"), text: "Exchange" },
    { icon: 'arrow-forward-outline', onPress: () => manageRef?.current?.open(), text: "View Details" },
    { icon: 'settings-outline', onPress: () => console.log("Settings"), text: "Settings" },
  ];

  const onPressCard = (item: any) => {
    console.log("Selected Card =>", item);
  };

  const onPressShare = () => Alert.alert("share", "share");
  const onPressCopy = () => Alert.alert("copy", "copy");

  return {
    navigation,
    manageRef,
    pressBackArrow,
    Sendoption,
    onPressCard,
    CARD_DETAIL,
    SPECIFIC_ACCOUNT_DETAIL,
    onPressShare,
    onPressCopy,
  };
};
