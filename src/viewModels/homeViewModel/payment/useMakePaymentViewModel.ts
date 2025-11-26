import { useIsFocused, useNavigation } from "@react-navigation/native";
import { PAYMENT_OPTION } from "../../../utils/data";
import { useEffect } from "react";
import { StatusBar } from "react-native";
import { THEME } from "../../../styles";

export const useMakePaymentViewModel = () => {
  const navigation = useNavigation();
  const FOCUS = useIsFocused();

  useEffect(()=>{
    if (FOCUS) {
      StatusBar.setBackgroundColor(THEME.darkSecondary)
    }
  },[FOCUS]) 

  const pressBackArrow = () => {
    navigation.goBack();
  };

  const handleNavigate = (route: string) => {
    navigation.navigate(route as never);
  }; 

  return {
    PAYMENT_OPTION,
    pressBackArrow,
    handleNavigate,
  };
};
