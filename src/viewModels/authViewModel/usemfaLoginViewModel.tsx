// viewModels/usemfaLoginViewModel.ts
import { useState, useEffect, useRef } from "react";
import ReactNativeBiometrics from "react-native-biometrics";
import { FirstTimeEnableMFA, ResetPasswordLink, useLogin } from "../../queries/auth.query";
import { Alert, Platform } from "react-native";
import { useDispatch } from "react-redux";
import { saveUserType, storeUserToken, userIsLoggedIn } from "../../Redux/Action/Auth/AuthActions";
import { CommonUtils, Toast } from "../../utils";
import { useIsFocused, useNavigation } from "@react-navigation/native";
import { Auth_ROUTES } from "../../constants";
import { StatusBar } from "react-native";
import { THEME } from "../../styles";
import Clipboard from "@react-native-clipboard/clipboard";
import { storeLoginUserData } from "../../Redux/Action/Home/HomeActions";
import { getUserDetail } from "../../queries/accountQueries/accountQuery";

export const usemfaLoginViewModel = (props: any) => {

  const{creds} = props?.route?.params

  const dispatch = useDispatch();
  const navigation = useNavigation();
  const [otp, setOtp] = useState("");



  const {mutate: getUserDetailFunc, isPending: isPendinggetUserDetail} = getUserDetail({
  callback: (response: any) => {
      if (response?.success) {
        let userType = detectAndSaveUserType(response)
        dispatch(saveUserType(userType))
        dispatch(storeLoginUserData(response.results));
      }
    },
  });

  const { mutate: loginFunc, isPending } = useLogin({
    callback: (response: any) => {
      console.log("Login response:", response);
      if (response?.success && response?.results?.token) {
          
        dispatch(storeUserToken(response.results))  
        // saveUserRoleType()
        
        getUserDetailFunc()
        dispatch(userIsLoggedIn(true))  
        
        if (response.results) {
          saveToKeyChain(response.results)
        }

      }

    },
    onErrorCallback: (res: any) => {
      Toast.showToast(res?.message || "Something went wrong", '', 'error');
      console.log("onErrorCallback response:", res);
    }
  });

    async function saveToKeyChain(results: any) {
  
      // console.log("aaaaaa=>",results?.user_id,"00",results?.token);
      // return
  
      if (!results?.user_id || !results?.token) return
      await CommonUtils.saveToKeychain("USER_ID", results?.user_id);
      await CommonUtils.saveToKeychain("TOKEN", results?.refresh_token);
    }
  

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

  const onPressLoginApi = () => {
    if (!otp.trim() || otp == "") {
      return Toast.showToast("Enter otp code", '', 'error');
    }
    else {
      let payload = { 
        username: creds.username, 
        password: creds.password, 
        device_token: creds.device_token, 
        mfa_code: otp, 
        device_type: Platform.OS 
      }

      console.log("going payload==>",payload);
      
      loginFunc(payload);
    }
    
  };

  function copyTxt(txt: string) {
    Clipboard.setString(txt);
    Alert.alert('Copied', 'copied to clipboard');
  }

  return {
    otp, 
    setOtp,
    onPressLoginApi,
    copyTxt,
    isPendinggetUserDetail,
    isPending,
    navigation



  };
};
