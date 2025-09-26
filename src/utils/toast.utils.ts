import AsyncStorage from "@react-native-async-storage/async-storage";
import { Platform } from "react-native";
import Toast from "react-native-toast-message";

function showToast(
  message?: string,
  error?: string,
  status?: 'info' | 'success' | 'error' | 'warning',
  visibilityTime?: number,
) {
  let err = error;

  if (err === 'timeout of 10000ms exceeded') {
    Toast.show({
      text1: 'Connectivity Issue',
      topOffset: Platform.OS === 'android' ? 10 : 60,
      type: status || 'info',
      visibilityTime: visibilityTime || 2000,
    });
  } else if (err === 'Network Error') {
    Toast.show({
      text1: 'You have lost internet connection',
      type: status || 'info',
      topOffset: Platform.OS === 'android' ? 10 : 60,
      visibilityTime: visibilityTime || 2000,
    });
  }  else {
    Toast.show({
      text1: message || 'Something Went Wrong',
      topOffset: Platform.OS === 'android' ? 10 : 45,
      type: status || 'info',
      visibilityTime: visibilityTime || 2000,
    });
  }
}


export default {
  showToast

};
