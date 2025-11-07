import axios from 'axios';
import {BASE_PATH, BASE_URL} from '../APICall/constants';
import dataHandlerService from '../APICall/dataHandler.service';
import MessageHandler from '../APICall/messageHandler';
import Toast from "react-native-toast-message";
import { Auth_ROUTES } from '../constants';
import { Alert } from 'react-native';

const createAxiosInstance = (baseURL: any) => {
  const api = axios.create({
    baseURL: baseURL,
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
    timeout: 60 * 1000,
  });

  // Add a request interceptor to attach the token
  api.interceptors.request.use(
    config => {
      const token = dataHandlerService?.getStore()?.getState()
        ?.AuthReducer?.userData?.token;

        // console.log("TOKENNNNNNNNN===>",token);
        

      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    },
    error => {
      return Promise.reject(error);
    },
  );

  // Interceptor for response handling
  api.interceptors.response.use(
    response => {

   // ✅ Only show success message if NOT disabled
    if (response.config?.showSuccessMessage !== false) {
      MessageHandler(response?.data);
    }

      return response;
    },
    error => {
      // console.log('axios error===>', error?.response?.data);
      // if (error?.response?.data == 'Unauthenticated User') {
      //   Alert.alert("Perform")
      //   return;
      // }

      MessageHandler(error?.response?.data);

      return Promise.reject(error);
    },
  );

  return api; 
};

const axiosInstance = createAxiosInstance(BASE_URL + BASE_PATH);
export default axiosInstance;
