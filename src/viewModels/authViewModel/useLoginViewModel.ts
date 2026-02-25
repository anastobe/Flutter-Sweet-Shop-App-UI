import React, { useState, useEffect, useRef } from "react";
import ReactNativeBiometrics from "react-native-biometrics";
import { useBioMetryLogin, useLogin } from "../../queries/auth.query";
import { Alert, PermissionsAndroid, Platform } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { Toast } from "../../utils";
import { useIsFocused, useNavigation } from "@react-navigation/native";
import messaging from '@react-native-firebase/messaging';
import { storeUserToken, userIsLoggedIn } from "../../Redux/Action/Auth/AuthActions";

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
    callback: (response: any) => {
      console.log("Login response:", response);
      if (response?.success) {
          dispatch(storeUserToken(response.results))  
          dispatch(userIsLoggedIn(true))  
      }

    },
    onErrorCallback: (res: any) => {
      setOpen({
            open: true,
            text: res?.message
      }) 
      console.log("onErrorCallback response:", res);
    }
  });

  
  const { mutate: useBioMetryLoginFunc, isPending: isPendingBioMetryLogin } = useBioMetryLogin({
    callback: (response: any) => {
      console.log("Login response:", response);
      if (response?.success) {
          dispatch(storeUserToken(response.results))  
          dispatch(userIsLoggedIn(true))  
      }

    },
    onErrorCallback: (res: any) => {
      console.log("onErrorCallback response:", res);
      setOpen({
            open: true,
            text: res?.message
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
      loginFunc({ username: email, password: password, device_token: token, device_type: Platform.OS });
    }
  };

  const handleBiometricAuth = () => {
    rnBiometrics.simplePrompt({ promptMessage: "Login with Biometrics" })
      .then(({ success }) => {
        if (success) {

          let payload = {
            refresh_token: 'eyJjdHkiOiJKV1QiLCJlbmMiOiJBMjU2R0NNIiwiYWxnIjoiUlNBLU9BRVAifQ.qY3D1p1aCZU5Bw6NoWnVmN3u38nIO4ddjq1v1rVKreP3yTUsS-7s4DOHILKNQekpdFqds70L8yo-QJCIgmvbZaAJdZOenV0bLDRiiAUHO1HUmWK4cspzVtepuNTxFpjpujcU-haFPVbcDeNGUQmIUV-OK8M0By6Qrck7EN89PpX_DGYy5yZ3enWixJBHjUdXETmNZetMkXP397v7E02Be-sWrB5JN80w1Cptk7_7m23Fx4OQ5Ohmdd2SiRn8196Hzz8pis_yXLEyeXIzMEq49NFswZ36FrGcF5eMbFODHxegj5f81Tj0A2zFBDXpUCCN57WNTFGzfXUHtrpO6-hsRg.zqKE8tM2wPerHpvk.SyLIiVF1DKnN_4vpCsZcx5jUrek1C2OErG9rqkBh9SZCaBePMOhzx2chL6DNqX6qGuCfi-tMmFiXcxV3jucU0rI1yDtQChED6_1HITMX4TeUHv4s6vCk1J4evcZLN-ELhy7u38miDO-ZnLbL78qcg5EMg_c3Tpgg37Nnq3DyuGG5_77wZYJruQs7FMBsvkGdrPRp-w4etUoJy08GQBji17KpdTJZXt9l-I231YnI9rMoCLUac-Ro3rS9yB0nMKSiVOAoiGSBDq0hgSuU9UaCTDT8C6fj61MkC2-jQXjhgGrGFA5ruOPo4TgQLQRT4dun9zWYxjcWMdm8P-DQICRlvUB5GRC9ZxkyyxRin1Qx5VO9jlySnGHsuFAWARulNjqtwy2qze9NDYok48q3dT3L7MXEHyg7wzxucwAhXpY0MWSRTLuOLpTWb-Ldtv3ruIbh5FrpBDPMP6r6EiHDLtHiP10ZOvKk_qk6xHwKPMvqfrqkgVCFKMrsJDqLoWAkf-Ija1UfesLUJgW6GQ4knBiPQC77nZ_UpspLoP3i_JhzN7H33tYueSwekGTsS6PwjYXMUqzfjZ_JOUon95I5mUxB90ZkzOP_6fs89mh9wPqdi-1zKRBbXb9YKMhgNwHJchpXDFdimG5Vf2M2IXDhWmv6iOi4CgnIVEnXRM_326xme1ZFtSJUqOncbwVUWBoINbF7SdkLQ5mT_MH8IhVt4tp2DWwrdDi7lTonb6LR-iBKALAMmkcDoI6ByNMHavV_oYGQ3rVXxgrJDJ6kRRIcDW2L8FCoQyQ5RGDM-JoqxSptgaVc9Xmz47x5zlag4BRfYVN4AwNPwkLRimsvuchU9XfklbAtmq8W_flrRYpeq5XviMyDHixsONHdVSkCCny24T7YjGfiRkBvgbbmu-SjH6lhlgvLE5whnLsu0jUJ7RTlBd1mP4SNLYekbio50ZSeL9x991PgohivzQ2F69eBzzdBTk9DNBLcRsTloHt9_WW4qEwq_AT2QVz1pA1AbfLK7TXSIjKCuIxsLvACdn9UUkUFP2vrgQIogUOA2nwgWlksjPBguJVO32ePa18mFAkfbyNipC8QL7pn1TJTCJrMuZ22iLoKNI-t_CHHec9osIj17_YKLpqPeYfKMvCAfTwdJbLGgKmfWWPuDiTjh-whfylZMwZH7wzJIWNGpim5f9vbQVbL43nszA7Vi1myjO7rom2i2xOF1qJK_mPtfiEylH0w760zS16UIkeE-X7lotUjMuiqPu44ugU_StThVy78jDTjwHTCDRQV.mFWSJypSN_cO2XohejYCaQ',
            user_id: '46123284-a041-708b-16aa-4f1c1e3b021a'
          }

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
    biometryType,
    biometryRef,
    handleLogin,
    handleBiometricAuth,
    isPending,
    Open, 
    setOpen,
    token,
    isPendingBioMetryLogin
  };
};
