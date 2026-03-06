import React, { useState, useEffect, useRef } from "react";
import ReactNativeBiometrics from "react-native-biometrics";
import { useBioMetryLogin, useLogin } from "../../queries/auth.query";
import { Alert, DeviceEventEmitter, PermissionsAndroid, Platform } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { CommonUtils, Toast } from "../../utils";
import { useIsFocused, useNavigation } from "@react-navigation/native";
import messaging from '@react-native-firebase/messaging';
import { saveUserType, storeUserToken, userIsLoggedIn } from "../../Redux/Action/Auth/AuthActions";
import apis from "../../services";
import { getUserDetail } from "../../queries/accountQueries/accountQuery";
import { storeLoginUserData } from "../../Redux/Action/Home/HomeActions";
import { Auth_ROUTES } from "../../constants";

export const useLoginViewModel = () => {

  const [email, setEmail] = useState("auth-test-7");
  const [password, setPassword] = useState("Saadops@12");

  //coperate -maker
  // const [email, setEmail] = useState("new-user");
  // const [password, setPassword] = useState("Uhf@1234");

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
  // const [bioEnable, setbioEnable] = useState(null);
  // const [biometryType, setBiometryType] = useState<string | null>(null);
  const [showBiometricLogin, setShowBiometricLogin] = useState(false);
  const [Open, setOpen] = useState({
    open: false,
    text: ""
  });

  const dispatch = useDispatch()
  const biometryRef = useRef(null); 
  const navigation = useNavigation(); 
  const rnBiometrics = new ReactNativeBiometrics();
 

 useEffect(() => {
  checkBiometricForLogin();
}, []);

const checkBiometricForLogin = async () => {
  const BIO_ENABLE = await CommonUtils.getFromKeychain("BIO_ENABLE");

  const device = await CommonUtils.checkDeviceBiometric();

  console.log("bio metric status==>",device,BIO_ENABLE);

  if (device.hardware && device.configured && BIO_ENABLE === "true") {
    setShowBiometricLogin(true);
  } else {
    setShowBiometricLogin(false);
  }
};

  
  async function saveToKeyChain(results: any) {

    // console.log("aaaaaa=>",results?.user_id,"00",results?.token);
    // return

    if (!results?.user_id || !results?.token) return
    await CommonUtils.saveToKeychain("USER_ID", results?.user_id);
    await CommonUtils.saveToKeychain("TOKEN", results?.refresh_token);
  }

    const {mutate: getUserDetailFunc, isPending: isPendinggetUserDetail} = getUserDetail({
    callback: (response: any) => {
      if (response?.success) {
        let userType = detectAndSaveUserType(response)
        dispatch(saveUserType(userType))
        dispatch(storeLoginUserData(response.results));
      }
    },
  });

  
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

const detectAndSaveUserType = (response: any) => {
  try {
    if (!response?.success) {
      console.log("API not successful");
      return;
    }

    const result = response?.results;

    const customerType = result?.customer_type;
    const memberRole =
      result?.members?.[0]?.member_accounts?.[0]?.member_account_role;

    console.log("Customer Type:", customerType);
    console.log("Member Role:", memberRole);

    let userType = "";

    // ✅ Case 1: Corporate Maker
    if (customerType === "corporate" && memberRole === "maker") {
      userType = "corporate_maker";
    }

    // ✅ Case 2: Corporate Checker
    else if (customerType === "corporate" && memberRole === "checker") {
      userType = "corporate_checker";
    }

    // ✅ Case 3: Individual (Personal Maker)
    else if (customerType === "personal" && memberRole === "maker") {
      userType = "individual";
    }

    else {
      console.log("Unknown user type ❌");
      return;
    }

    // 🔥 Save in AsyncStorage / Redux / Context
    console.log("Detected User Type ✅:", userType);

    // Example: AsyncStorage
    // await AsyncStorage.setItem("USER_TYPE", userType);

    return userType;

  } catch (error) {
    console.log("User Type Detection Error:", error);
  }
};

  const { mutate: loginFunc, isPending } = useLogin({
    callback: (response: any) => {
      console.log("Login response:", response);

      if (response?.success && response?.message == "MFA Required" && response?.results?.token){
        //do Authenticate before setup
        navigation.navigate(Auth_ROUTES.MFA_SETUP,{ results: response?.results })
        dispatch(storeUserToken(response.results))  

      }
      

      // if (response?.success && response?.results?.token) {
          
      //   dispatch(storeUserToken(response.results))  
      //   // saveUserRoleType()
        
      //   getUserDetailFunc()
      //   dispatch(userIsLoggedIn(true))  
        
      //   if (response.results) {
      //     saveToKeyChain(response.results)
      //   }

      // }

      console.log("callback response:", response);

    },
    onErrorCallback: (errorResponse) => {

    // const errorResponse =
    //   error.bodyString && typeof error.bodyString === 'string'
    //     ? JSON.parse(error.bodyString)
    //     : error.bodyString;
      
      if (!errorResponse?.success && errorResponse?.message ==  "Invalid code received for user" && errorResponse?.code == 400){
        //dom MFA setup
        navigation.navigate(Auth_ROUTES.MFA_LOGIN, { creds: { username: email, password: password, device_token: token } } )
        return
      }

      // setOpen({
      //       open: true,
      //       text: response?.message || "Something went wrong"
      // }) 
      console.log("onErrorCallback response:", errorResponse);
    }
  });

  
  const { mutate: useBioMetryLoginFunc, isPending: isPendingBioMetryLogin } = useBioMetryLogin({
    callback: (response: any) => {
      console.log("useBioMetryLoginFunc response:", response);
      if (response?.success) {
          dispatch(storeUserToken(response.results))  
          getUserDetailFunc()
          dispatch(userIsLoggedIn(true))  
      }

    },
    onErrorCallback: (res: any) => {
      console.log("onErrorCallback response:", res);
      setOpen({
            open: true,
            text: res?.message || "Something went wrong"
      }) 
    }
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
      loginFunc({ username: email, password: password, device_token: token, mfa_code: "000000", device_type: Platform.OS });
    }
  };

  function usePassword() {
    biometryRef?.current?.close()
  }


  const handleBiometricAuth = () => {
    rnBiometrics.simplePrompt({ promptMessage: "Login with Biometrics" })
      .then(async({ success }) => {
        if (success) {


          const token = await CommonUtils.getFromKeychain("TOKEN");
          const userId = await CommonUtils.getFromKeychain("USER_ID");


          let payload = {
            refresh_token: token,
            user_id: userId
          }          

          console.log("payload=>",payload);

          useBioMetryLoginFunc(payload)
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
    // biometryType,
    biometryRef,
    handleLogin,
    handleBiometricAuth,
    usePassword,
    isPending,
    Open, 
    setOpen,
    token,
    isPendingBioMetryLogin,
    isPendinggetUserDetail,
    showBiometricLogin
    // bioEnable
  };
};
