// viewModels/useMfaSetupViewModel.ts
import { useState, useEffect, useRef } from "react";
import ReactNativeBiometrics from "react-native-biometrics";
import { FirstTimeEnableMFA, ResetPasswordLink, useLogin } from "../../queries/auth.query";
import { Alert } from "react-native";
import { useDispatch } from "react-redux";
import { storeUserToken } from "../../Redux/Action/Auth/AuthActions";
import { Toast } from "../../utils";
import { useIsFocused, useNavigation } from "@react-navigation/native";
import { Auth_ROUTES } from "../../constants";
import { StatusBar } from "react-native";
import { THEME } from "../../styles";
import Clipboard from "@react-native-clipboard/clipboard";

export const useMfaSetupViewModel = () => {

  const navigation = useNavigation();
  const [otp, setOtp] = useState("");

  const { mutate: FirstTimeEnableMFAFunc, isPending: isPending_FirstTimeEnableMFA } = FirstTimeEnableMFA({
    callback: (res: any) => {
      if (res?.success) {
        navigation.reset({
            index: 0,
            routes: [{ name: Auth_ROUTES.LOGIN }],
        });
      }
    },
  });

  const onPressEnableMFA = () => {
    if (!otp.trim() || otp == "") {
      return Toast.showToast("Enter otp code", '', 'error');
    }
    else {
      let payload = {
        mfa_code: otp
      }       
      FirstTimeEnableMFAFunc(payload) 
    }
    
  };

  function copyTxt(txt: string) {
    Clipboard.setString(txt);
    Alert.alert('Copied', 'copied to clipboard');
  }

  return {
    otp, 
    setOtp,
    onPressEnableMFA,
    copyTxt



  };
};
