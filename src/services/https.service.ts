import { fetch } from 'react-native-ssl-pinning';
import { BASE_URL, BASE_PATH } from '../APICall/constants';
import dataHandlerService from '../APICall/dataHandler.service';
import MessageHandler from '../APICall/messageHandler';
import { logoutUser } from '../utils/logout.helper';

const ENABLE_SSL_PINNING = false; // 🔹 Set TRUE when certificate is available
const CERTS = ['mycert']; // 🔹 Certificate name(s) without extension

type HttpMethod = 'GET' | 'POST' | 'PUT' | 'DELETE';

const axiosInstance = async (
  url: string,
  method: HttpMethod = 'GET',
  data?: any,
  options?: boolean
) => {

  try {
    const token = dataHandlerService?.getStore()?.getState()?.AuthReducer?.userData?.token;

    // Prepare fetch options
    const fetchOptions: any = {
      method,
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        ...(token && { Authorization: `Bearer ${token}` }),
      },
      timeoutInterval: 60000,
      sslPinning: ENABLE_SSL_PINNING ? { certs: CERTS } : undefined,
      disableAllSecurity: !ENABLE_SSL_PINNING,
    };

    // Only attach body for POST and PUT
    if (method === 'POST' || method === 'PUT') {
      fetchOptions.body = data ? JSON.stringify(data) : undefined;
    }

    const response = await fetch(BASE_URL + BASE_PATH + url, fetchOptions);

    // console.log("main handler==>",response);

    // Parse JSON from response.bodyString
    const responseJson =
      response.bodyString && typeof response.bodyString === 'string'
        ? JSON.parse(response.bodyString)
        : response.bodyString;

    if (options) {
      MessageHandler(responseJson);
    }

    return responseJson;
  } catch (error: any) {

    const errorResponse =
      error.bodyString && typeof error.bodyString === 'string'
        ? JSON.parse(error.bodyString)
        : error.bodyString;

    console.log("errorResponse main", errorResponse);

    MessageHandler(errorResponse);
    
    if (errorResponse?.message?.toLowerCase()?.includes('unauthenticated')) {
      logoutUser();
      return; 
    }

    

    throw errorResponse;
  }
};

export default axiosInstance;



// import axios from 'axios';
// import {BASE_PATH, BASE_URL} from '../APICall/constants';
// import dataHandlerService from '../APICall/dataHandler.service';
// import MessageHandler from '../APICall/messageHandler';
// import Toast from "react-native-toast-message";
// import { Auth_ROUTES } from '../constants';
// import { Alert } from 'react-native';
// import { logoutUser } from '../utils/logout.helper';

// const createAxiosInstance = (baseURL: any) => {
//   const api = axios.create({
//     baseURL: baseURL,
//     headers: {
//       'Content-Type': 'application/json',
//       Accept: 'application/json',
//     },
//     timeout: 60 * 1000,
//   });

//   // Add a request interceptor to attach the token
//   api.interceptors.request.use(
//     config => {
//       const token = dataHandlerService?.getStore()?.getState()
//         ?.AuthReducer?.userData?.token;

//         // console.log("TOKENNNNNNNNN===>",token);
        

//       if (token) {
//         config.headers.Authorization = `Bearer ${token}`;
//       }
//       return config;
//     },
//     error => {
//       return Promise.reject(error);
//     },
//   );

//   // Interceptor for response handling
//   api.interceptors.response.use(
//     response => {
      
//    // ✅ Only show success message if NOT disabled
//     if (response.config?.showSuccessMessage !== false) {
//       MessageHandler(response?.data);
//     }

//     console.log("check== >",response);
    
 
//       return response;
//     },
//     error => {
//       if (error?.response?.data?.message == "Unauthenticated User") {
//         logoutUser();
//         return;
//       }

//       MessageHandler(error?.response?.data);

//       return Promise.reject(error);
//     },
//   );

//   return api; 
// };

// const axiosInstance = createAxiosInstance(BASE_URL + BASE_PATH);
// export default axiosInstance;






