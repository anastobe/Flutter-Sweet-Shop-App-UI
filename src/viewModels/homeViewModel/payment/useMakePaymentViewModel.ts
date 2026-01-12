import { useIsFocused, useNavigation } from "@react-navigation/native";
import { PAYMENT_OPTION } from "../../../utils/data";
import { useEffect } from "react";
import { StatusBar } from "react-native";
import { THEME } from "../../../styles";
import { HOME_ROUTES } from "../../../constants";
import apis from "../../../services";
import { useDispatch } from "react-redux";

export const useMakePaymentViewModel = () => {
  const navigation = useNavigation(); 
  const dispatch = useDispatch()
  const FOCUS = useIsFocused()

  useEffect(()=>{
    if (FOCUS) {
      getAccountforupdatedResult()    
    }
  },[FOCUS])

  async function getAccountforupdatedResult() {
    apis.getCurrencyAccount(dispatch)
  }

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
