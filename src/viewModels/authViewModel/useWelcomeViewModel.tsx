// viewModels/useWelcomeViewModel.ts
import { useState, useEffect, useRef } from "react";
import ReactNativeBiometrics from "react-native-biometrics";
import { useLogin } from "../../queries/auth.query";
import { Alert } from "react-native";
import { useDispatch } from "react-redux";
import { storeUserToken } from "../../Redux/Action/Auth/AuthActions";
import { Toast } from "../../utils";
import { useIsFocused, useNavigation } from "@react-navigation/native";
import { Auth_ROUTES } from "../../constants";
import { StatusBar } from "react-native";
import { THEME } from "../../styles";

export const useWelcomeViewModel = () => {

  const navigation = useNavigation();

  const onPressLogin = () => { 
    navigation.navigate(Auth_ROUTES.LOGIN)
  };

  

  return {
    onPressLogin



  };
};
