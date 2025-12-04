import { useIsFocused, useNavigation } from "@react-navigation/native";
import { PAYMENT_OPTION } from "../../../utils/data";
import { useEffect } from "react";
import { StatusBar } from "react-native";
import { THEME } from "../../../styles";

export const useMakePaymentViewModel = () => {
  const navigation = useNavigation(); 

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
