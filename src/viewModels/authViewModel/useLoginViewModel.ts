// viewModels/useLoginViewModel.ts
import React, { useState, useEffect, useRef } from "react";
import ReactNativeBiometrics from "react-native-biometrics";
import { useLogin } from "../../queries/auth.query";
import { Alert, PermissionsAndroid, Platform } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { storeUserToken } from "../../Redux/Action/Auth/AuthActions";
import { SHOW_CLIENT } from "../../APICall/constants";
import { Toast } from "../../utils";
import { StatusBar } from "react-native";
import { THEME } from "../../styles"; 
import { useIsFocused, useNavigation } from "@react-navigation/native";
import { Auth_ROUTES } from "../../constants";
// import messaging from '@react-native-firebase/messaging';
import {
  getMessaging,
  requestPermission,
  getToken,
  AuthorizationStatus,
} from '@react-native-firebase/messaging';

const messagingInstance = getMessaging();

export const useLoginViewModel = () => {

  // const countryList = useSelector((state: any) => state);

  //coperate - checker
  const [email, setEmail] = useState("mohtashim");
  const [password, setPassword] = useState("Uhf@1234");

  //coperate -maker
  // const [email, setEmail] = useState("new-user");
  // const [password, setPassword] = useState("Uhf@1234");

  //user,individual
  // const [email, setEmail] = useState("uhf-personal");
  // const [password, setPassword] = useState("Pass@123");
  const [token, setToken] = useState("");
  const [secure, setSecure] = useState(true);
  const [biometryType, setBiometryType] = useState<string | null>(null);
  const [Open, setOpen] = useState({
    open: false,
    text: ""
  });

  const dispatch = useDispatch()
  const biometryRef = useRef(null); 
  const navigation = useNavigation(); 
  const rnBiometrics = new ReactNativeBiometrics();
 

  useEffect(() => {
    rnBiometrics.isSensorAvailable().then(result => {
      const { available, biometryType } = result;
      if (available) setBiometryType(biometryType);
      else Alert.alert("Biometrics not supported");
    });
  }, []);

  
  React.useEffect(() => {
requestFCMPermission()
  }, []);



  const requestFCMPermission = async () => {
  const authStatus = await requestPermission(messagingInstance);


  const enabled =
    authStatus === AuthorizationStatus.AUTHORIZED ||
    authStatus === AuthorizationStatus.PROVISIONAL;


  if (!enabled) return;


  // const token = await getToken(messagingInstance);
  const token = await getMessaging().getToken()
  console.log("devicde token is:=>",token);
 
    setToken(token)
};
 




  // const requestPermission = async () => {
  //   if (Platform.OS === 'android' && Platform.Version >= 33) {
  //     await PermissionsAndroid.request(
  //       PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS
  //     );
  //   }

  //   const authStatus = await messaging().requestPermission();
  //   if (
  //     authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
  //     authStatus === messaging.AuthorizationStatus.PROVISIONAL
  //   ) {
  //     const token = await messaging().getToken();
  //     console.log('FCM TOKEN:', token);
  //     setToken(token)
  //   }
  // };

  const { mutate: loginFunc, isPending } = useLogin({
    callback: (res: any) => {
      console.log("Login response:", res);
    },
    navigation
  });

  const handleLogin = () => { 

    // setOpen({ open: true, text: "Your device is not registered, Please register your device" })

    // navigation.navigate(Auth_ROUTES.OTPVERIFY)
    // return
          
//     let token = {
//       token: "token"
//     }
//     dispatch(storeUserToken(token))  
//     // Alert.alert("NEED",SHOW_CLIENT)
// return
    if (email == "") {
      Toast.showToast("Enter email address or username", '', 'error');
    } else if (password == ""){
      Toast.showToast("Please enter password", '', 'error');
    }    
    else{
      loginFunc({ username: email, password: password, device_token: token, device_type: Platform.OS });
    }
  };

  const handleBiometricAuth = () => {
    rnBiometrics.simplePrompt({ promptMessage: "Login with Biometrics" })
      .then(({ success }) => {
        if (success) {
          // Alert.alert("Success", "Authenticated Successfully");
          handleLogin()
          biometryRef?.current?.close();
          // setTimeout(() => {
          //   navigation.navigate("LoginSecurePass");
          // }, 1000);
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
    Open, 
    setOpen
  };
};
