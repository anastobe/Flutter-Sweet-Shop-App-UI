import { useIsFocused, useNavigation } from "@react-navigation/native";
import { useEffect, useRef, useState } from "react";
import { StatusBar } from "react-native";
import { THEME } from "../../styles";

export const useOtpVerifyViewModel = () => {
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
    pressBackArrow,
    handleNavigate,
  };
};
