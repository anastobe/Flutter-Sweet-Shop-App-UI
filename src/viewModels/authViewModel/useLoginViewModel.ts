// viewModels/useLoginViewModel.ts
import { useState, useEffect, useRef } from "react";
import ReactNativeBiometrics from "react-native-biometrics";
import { useLogin } from "../../queries/auth.query";
import { Alert } from "react-native";
import { useDispatch } from "react-redux";
import { storeUserToken } from "../../Redux/Action/Auth/AuthActions";
import { SHOW_CLIENT } from "../../APICall/constants";
import { Toast } from "../../utils";

export const useLoginViewModel = (navigation: any) => {

  const [email, setEmail] = useState("hlahooti@frontier-pay.com");
  const [password, setPassword] = useState("test-post-auth@Front1er");
  const [secure, setSecure] = useState(true);
  const [biometryType, setBiometryType] = useState<string | null>(null);

  const dispatch = useDispatch()
  const biometryRef = useRef(null);
  const rnBiometrics = new ReactNativeBiometrics();

  useEffect(() => {
    rnBiometrics.isSensorAvailable().then(result => {
      const { available, biometryType } = result;
      if (available) setBiometryType(biometryType);
      else Alert.alert("Biometrics not supported");
    });
  }, []);

  const { mutate: loginFunc, isPending } = useLogin({
    callback: (res: any) => {
      console.log("Login response:", res);
    },
  });

  const handleLogin = () => { 
          
    let token = {
      token: "token"
    }
    dispatch(storeUserToken(token))  
    // Alert.alert("NEED",SHOW_CLIENT)
return
    if (email == "") {
      Toast.showToast("Please Enter Email Address", '', 'error');
    } else if (password == ""){
      Toast.showToast("Please Enter Password", '', 'error');
    }
    else{
      loginFunc({ username: email, password: password });
    }
  };

  const handleBiometricAuth = () => {
    rnBiometrics.simplePrompt({ promptMessage: "Login with Biometrics" })
      .then(({ success }) => {
        if (success) {
          Alert.alert("Success", "Authenticated Successfully");
          biometryRef?.current?.close();
          setTimeout(() => {
            navigation.navigate("LoginSecurePass");
          }, 1000);
        } else {
          Alert.alert("Cancelled", "User Cancelled");
        }
      })
      .catch(() => Alert.alert("Error", "Biometric auth failed"));
  };

  

  return {
    email,
    setEmail,
    password,
    setPassword,
    secure,
    setSecure,
    biometryType,
    biometryRef,
    handleLogin,
    handleBiometricAuth,
    isPending,
  };
};
