import { useIsFocused, useNavigation } from "@react-navigation/native";
import { PAYMENT_OPTION } from "../../../utils/data";
import { useEffect } from "react";
import { StatusBar } from "react-native";
import { THEME } from "../../../styles";
import { HOME_ROUTES } from "../../../constants";

export const useMakePaymentViewModel = () => {
  const navigation = useNavigation(); 

  const pressBackArrow = () => {
    navigation.goBack();
  };

  const handleNavigate = (route: string, key: any) => {
    navigation.navigate(route,{key: key});
    // navigation.navigate(HOME_ROUTES.CONFIRM_CURENCY_EXCHANGE)
  }; 

  return {
    PAYMENT_OPTION,
    pressBackArrow,
    handleNavigate,
  };
};
