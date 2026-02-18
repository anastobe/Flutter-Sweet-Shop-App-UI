import React, { useState, useEffect, useRef } from "react";
import ReactNativeBiometrics from "react-native-biometrics";
import { useLogin } from "../../queries/auth.query";
import { Alert, PermissionsAndroid, Platform } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { Toast } from "../../utils";
import { useIsFocused, useNavigation } from "@react-navigation/native";
import messaging from '@react-native-firebase/messaging';

export const useLoginViewModel = () => {

  // const [email, setEmail] = useState("auth-test-4");
  // const [password, setPassword] = useState("Saadops@12");

  //coperate -maker
  const [email, setEmail] = useState("new-user");
  const [password, setPassword] = useState("Uhf@1234");

  //coperate - checker
  // const [email, setEmail] = useState("mohtashim");
  // const [password, setPassword] = useState("Uhf@1234");


  //user,individual
  // const [email, setEmail] = useState("uhf-personal");
  // const [password, setPassword] = useState("Pass@1234");

  // const [email, setEmail] = useState("");
  // const [password, setPassword] = useState("");

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
      // else Alert.alert("Biometrics not supported");
    });
  }, []);

  
//   React.useEffect(() => {
// requestFCMPermission()
//   }, []);



//   const requestFCMPermission = async () => {
//   const authStatus = await requestPermission(messagingInstance);


//   const enabled =
//     authStatus === AuthorizationStatus.AUTHORIZED ||
//     authStatus === AuthorizationStatus.PROVISIONAL;


//   if (!enabled) return; 


//   // const token1 = await getToken(messagingInstance);
//   const token2 = await getMessaging().getToken()
//   console.log("devicde token is:=>","\n\n",token2);
 
//     setToken(token2)
// };

useEffect(() => {
  initFCM();
}, []);


const initFCM = async () => {

  // Android 13 permission
  if (Platform.OS === 'android' && Platform.Version >= 33) {
    await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS
    );
  }

  const authStatus = await messaging().requestPermission();

  const enabled =
    authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
    authStatus === messaging.AuthorizationStatus.PROVISIONAL;

  if (!enabled) return;

  // Wait and get token
  const fcmToken = await messaging().getToken();

  if (fcmToken) {
    // console.log("FCM TOKEN:", fcmToken);
    setToken(fcmToken);
  } 

  // IMPORTANT: Listen for refresh
  messaging().onTokenRefresh(token => {
    // console.log("NEW TOKEN:", token);
    setToken(token);
  });
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
// return
    if (email == "") {
      Toast.showToast("Enter email address or username", '', 'error');
    } else if (password == ""){
      Toast.showToast("Please enter password", '', 'error');
    }    
    else{
      console.log("check==>",{ username: email, password: password, device_token: token, device_type: Platform.OS });
      // Alert.alert("token",token)
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
    setOpen,
    token
  };
};
