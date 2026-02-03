import { fetch } from 'react-native-ssl-pinning';
import { BASE_URL, BASE_PATH } from '../APICall/constants';
import dataHandlerService from '../APICall/dataHandler.service';
import MessageHandler from '../APICall/messageHandler';
// import { logoutUser } from '../utils/logout.helper';
import { updateUserToken } from '../Redux/Action/Auth/AuthActions';
import ActionType from '../Redux/Action/ActionType/actionType';
import apis from './index';
// import { resetNetworkState } from "../services/https.service";

const ENABLE_SSL_PINNING = false;
const CERTS = ['mycert'];

/**
 * ================================
 * 🔐 REFRESH TOKEN STATE (GLOBAL)
 * ================================
 */
let isRefreshing = false;
let isLoggingOut = false;

let requestQueue: Array<{
  resolve: (value: any) => void;
  reject: (reason?: any) => void;
  request: () => Promise<any>;
}> = [];

console.log(
  '📦 CURRENT QUEUE:',
  requestQueue?.length
);

let requestCounter = 0;

const generateRequestId = () => {
  requestCounter += 1;
  return `REQ-${requestCounter}`;
};

/**
 * ================================
 * 🚪 LOGOUT HANDLER
 * ================================
 *  */

const forceLogout = async () => {

  console.log('🚪 FORCE LOGOUT');
  try {
    if (!isLoggingOut) {
      isRefreshing = true;
      dataHandlerService?.getStore()?.dispatch({
        type: ActionType.LOGOUT,
        payload: {},
      });
      // let res = await apis.LogoutApi({})
      // console.log("logout respnse===>",res);
  }
    
  }catch(err){
    console.log("force logout error is ",err);    
  } 
  finally {
    isLoggingOut = false
  }


};


/**
 * ================================
 * 🔁 REFRESH ACCESS TOKEN
 * ================================
 */
const refreshAccessToken = async (): Promise<any> => {
  const store = dataHandlerService.getStore();
  const userData =
    store.getState()?.AuthReducer?.userData;

  // let body = {
  //   refresh_token: userData?.refreshToken,
  //   user_id: userData?.user_id,
  //   expiry_time: userData?.expiry_time,
  //   ip: userData?.ip
  // }

  const response = await fetch(
    BASE_URL + BASE_PATH + '/refresh_token',
    {
      method: 'GET',
      headers: {
          // 'Content-Type': 'application/json',
        ...(userData?.token && { Authorization: `Bearer ${userData?.token}` }),
      },
      // body: JSON.stringify(body),
      timeoutInterval: 60000,
      sslPinning: ENABLE_SSL_PINNING ? { certs: CERTS } : undefined,
      disableAllSecurity: !ENABLE_SSL_PINNING,
    }
  );

  const json =
    response.bodyString && typeof response.bodyString === 'string'
      ? JSON.parse(response.bodyString)
      : response.bodyString;

    if (!json?.results?.token) {
      throw new Error('REFRESH_FAILED');
    }

  console.log("refresh token api response json==>",json);
  // return
  
  store.dispatch(updateUserToken({
    token: json?.results?.token,
    expiry_time: json?.results?.expiry_time,
  }));

  return json?.results;
};

/**
 * ================================
 * 🌐 MAIN NETWORK FUNCTION
 * ================================
 */

type HttpMethod = 'GET' | 'POST' | 'PUT' | 'DELETE';

const axiosInstance = async (
  url: string,
  method: HttpMethod = 'GET',
  data?: any,
  options?: boolean
) => { 

  const requestId = generateRequestId();

console.log(
  `[${requestId}] ➡️ REQUEST START`,
  method,
  url
);

  const store = dataHandlerService.getStore();
  const accessToken =
    store?.getState()?.AuthReducer?.userData?.token;

  // 🔑 Track token used by THIS request
  const tokenUsedForRequest = accessToken;

  /**
   * 🔁 Make API request
   */
  const makeRequest = async (token?: string) => {
    const fetchOptions: any = {
      method,
      headers: {
        ...(token && { Authorization: `Bearer ${token}` }),
      },
      timeoutInterval: 60000,
      sslPinning: ENABLE_SSL_PINNING ? { certs: CERTS } : undefined,
      disableAllSecurity: !ENABLE_SSL_PINNING,
    };

    if (method === 'POST' || method === 'PUT') {
      fetchOptions.body = data ? JSON.stringify(data) : undefined;
    }

    const response = await fetch(
      BASE_URL + BASE_PATH + url,
      fetchOptions
    );

    // 🔥 Force errors into catch
    if (response.status === 401 || response.status === 403) {
      throw response;
    }

    const responseJson =
      response.bodyString && typeof response.bodyString === 'string'
        ? JSON.parse(response.bodyString)
        : response.bodyString;

    if (options) {
      MessageHandler(responseJson);
    }

    // console.log("main response==>",responseJson);

    console.log(
  `[${requestId}] ✅ SUCCESS`,
  method,
  url
);

    return responseJson;
  };

  /**
   * 🔐 MAIN TRY
   */
  try {
    return await makeRequest(accessToken);
  } catch (error: any) {
    const status = error?.status;
  
    console.log(
  `[${requestId}] ❌ FAILED`,
  status,
  method,
  url
);

    /**
     * ================================
     * 🚪 401 → INACTIVITY → LOGOUT
     * ================================
     */

    if (status === 401) {
      console.log("logout perform code is", status);
      forceLogout();
      throw error;
    }

    /**
     * ================================
     * 🔐 403 → TOKEN EXPIRED → REFRESH
     * ================================
     */ 
    if (status === 403) {

      console.log(
  `[${requestId}] ⏳ QUEUED (403 – token expired)`
);

      const latestToken =
        store.getState()?.AuthReducer?.userData?.token;

      // Token already refreshed
      if (tokenUsedForRequest !== latestToken) {
        return makeRequest(latestToken);
      }

      return new Promise((resolve, reject) => {
        requestQueue.push({
          resolve,
          reject,
          request: () => {
            console.log(
              `[${requestId}] 🚀 EXECUTING FROM QUEUE`
            );
            return makeRequest(
              store.getState()?.AuthReducer?.userData?.token
            );
          },

        });

        if (!isRefreshing) {
          isRefreshing = true;

          refreshAccessToken()
            .then(() => {

              console.log("refresh succes and .then is running",requestQueue);
              
              requestQueue.forEach(p =>
                p.request().then(p.resolve).catch(p.reject)
              );
              requestQueue = [];
            })
            .catch(() => {

              console.log("refresh fail and catch is running");
              
              requestQueue.forEach(p =>
                p.reject(new Error('SESSION_EXPIRED'))
              );
              
              forceLogout();
              return
            })
            .finally(() => {
              isRefreshing = false;

            });
        }
      });
    }

    /**
     * ================================
     * ❌ OTHER ERRORS
     * ================================
     */
    const errorResponse =
      error.bodyString && typeof error.bodyString === 'string'
        ? JSON.parse(error.bodyString)
        : error.bodyString;

    MessageHandler(errorResponse);
    throw errorResponse;
  }
};


export default axiosInstance;




// import { fetch } from 'react-native-ssl-pinning';
// import { BASE_URL, BASE_PATH } from '../APICall/constants';
// import dataHandlerService from '../APICall/dataHandler.service';
// import MessageHandler from '../APICall/messageHandler';
// import { logoutUser } from '../utils/logout.helper';
// import { updateUserToken } from '../Redux/Action/Auth/AuthActions';

// const ENABLE_SSL_PINNING = false;
// const CERTS = ['mycert'];
// const REFRESH_BEFORE = 180; // 3 minutes

// type HttpMethod = 'GET' | 'POST' | 'PUT' | 'DELETE';

// /* =======================
//    REFRESH CONTROL
// ======================= */
// let isRefreshing = false;
// let refreshQueue: Array<(token: string | null) => void> = [];

// const processQueue = (token: string | null) => {
//   //   console.log(
//   //   '🚦 PROCESS QUEUE — releasing',
//   //   refreshQueue.length,
//   //   'requests with token',
//   //   token?.slice(-80)
//   // );

//   refreshQueue.forEach(resolve => resolve(token));
//   refreshQueue = [];
// };

// /* =======================
//    REFRESH TOKEN API
// ======================= */
// const refreshTokenCall = async () => {
//   const store = dataHandlerService.getStore();
//   const userData = store.getState().AuthReducer.userData;

//   if (!userData?.refresh_token) {
//     throw { message: 'No refresh token' };
//   }

//   const payload = {
//     refresh_token: userData.refresh_token,
//     user_id: userData.user_id,
//     expiry_time: userData.expiry_time,
//     ip: userData.ip,
//   };

//   const response = await fetch(
//     BASE_URL + BASE_PATH + '/refresh_token',
//     {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       timeoutInterval: 60000,
//       sslPinning: ENABLE_SSL_PINNING ? { certs: CERTS } : undefined,
//       disableAllSecurity: !ENABLE_SSL_PINNING,
//       body: JSON.stringify(payload),
//     }
//   );

//   const json =
//     response?.bodyString && typeof response?.bodyString === 'string'
//       ? JSON.parse(response?.bodyString)
//       : response?.bodyString;

//   if (!json?.results?.token) {
//     throw { message: json?.message || 'Refresh failed' };
//   }

//   store.dispatch(updateUserToken({
//     token: json?.results?.token,
//     expiry_time: json?.results?.expiry_time,
//   }));

//   return json?.results?.token;
// };

// /* =======================
//    MAIN API WRAPPER
// ======================= */
// const axiosInstance = async (
//   url: string,
//   method: HttpMethod = 'GET',
//   data?: any,
//   options?: boolean
// ) => {
//   const store = dataHandlerService.getStore();
//   const authData = store.getState().AuthReducer.userData;

//   let token = authData?.token;
//   const expiryTime = authData?.expiry_time;

//   const currentTime = Math.floor(Date.now() / 1000);
//   const timeLeft = expiryTime - currentTime;

//   /* =======================
//      TOKEN REFRESH CHECK
//   ======================= */
// // console.log(
// //   timeLeft,
// //   `(${Math.floor(timeLeft / 60)}m ${timeLeft % 60}s before expiry)`,
// //   `${timeLeft <= 575}`
// // );

//   if (timeLeft <= REFRESH_BEFORE) { // ~9 min 40 sec

//     if (!isRefreshing) {
//       isRefreshing = true;
   
//       // console.log('🔁 REFRESH STARTED at', new Date().toLocaleTimeString());

//       try {
//         const newToken = await refreshTokenCall();
        
//         console.log(
//           '✅ REFRESH SUCCESS at',
//           Math.floor(Date.now() / 1000)
//         );
//         console.log("new token is=>",newToken);
        

//         token = newToken;
//         processQueue(newToken);
//       } catch (err) {
//         // console.log('❌ REFRESH FAILED',"---",err);
//         processQueue(null);
//         logoutUser();
//         return;
//       } finally {
//         isRefreshing = false;
//       }

//     } else {
//       //  console.log('⏳ API WAITING FOR REFRESH');
//       token = await new Promise(resolve => {
//         refreshQueue.push(resolve);
//       });

//       if (!token) {
//         logoutUser();
//         return;
//       }
//     }
//   }

//   /* =======================
//      ACTUAL API CALL
//   ======================= */
//   try {
//     const isFormData = data instanceof FormData;

//     const response = await fetch(BASE_URL + BASE_PATH + url, {
//       method,
//       headers: {
//         ...(token && { Authorization: `Bearer ${token}` }),
//         ...(isFormData ? {} : { 'Content-Type': 'application/json' }),
//       },
//       timeoutInterval: 60000,
//       sslPinning: ENABLE_SSL_PINNING ? { certs: CERTS } : undefined,
//       disableAllSecurity: !ENABLE_SSL_PINNING,
//       body:
//         method === 'POST' || method === 'PUT'
//           ? isFormData
//             ? data
//             : JSON.stringify(data)
//           : undefined,
//     });

//     const responseJson =
//       response?.bodyString && typeof response.bodyString === 'string'
//         ? JSON.parse(response.bodyString)
//         : response.bodyString;

//     if (options) MessageHandler(responseJson);

//     return responseJson;

//   } catch (error: any) {

//     console.log("error main==>",error);

//     const err =
//     error?.bodyString && typeof error?.bodyString === 'string'
//     ? JSON.parse(error?.bodyString)
//     : error?.bodyString;
            

//     MessageHandler(err);

//     if (
//       err?.message?.toLowerCase()?.includes('unauthenticated') ||
//       err?.message?.toLowerCase()?.includes('missing token') ||
//       err?.message?.toLowerCase()?.includes('session expired') ||
//       err?.message?.toLowerCase()?.includes('unauthenticated user')
//     ) {
//       logoutUser();
//       return;
//     }

//     throw err;
//   }
// };

// export default axiosInstance;


// const axiosInstance = async (
//   url: string,
//   method: HttpMethod = 'GET',
//   data?: any,
//   options?: boolean
// ) => {

//   try {
//     const token = dataHandlerService?.getStore()?.getState()?.AuthReducer?.userData?.token;

//     // Prepare fetch options
//     const fetchOptions: any = {
//       method,
//       headers: {
//         // 'Content-Type': 'application/json',
//         // Accept: 'application/json',
//         ...(token && { Authorization: `Bearer ${token}` }),
//       },
//       timeoutInterval: 60000,
//       sslPinning: ENABLE_SSL_PINNING ? { certs: CERTS } : undefined,
//       disableAllSecurity: !ENABLE_SSL_PINNING,
//     };

//     // Only attach body for POST and PUT
//     if (method === 'POST' || method === 'PUT') {
//       fetchOptions.body = data ? JSON.stringify(data) : undefined;
//     }

//     const response = await fetch(BASE_URL + BASE_PATH + url, fetchOptions);

//     // console.log("main handler==>",response);

//     // Parse JSON from response.bodyString
//     const responseJson =
//       response.bodyString && typeof response.bodyString === 'string'
//         ? JSON.parse(response.bodyString)
//         : response.bodyString;

//     if (options) {
//       MessageHandler(responseJson);
//     }

//     return responseJson;
//   } catch (error: any) {

//     const errorResponse =
//       error.bodyString && typeof error.bodyString === 'string'
//         ? JSON.parse(error.bodyString)
//         : error.bodyString;

//     console.log("errorResponse main", errorResponse);

//     MessageHandler(errorResponse);
    
//     if (errorResponse?.message?.toLowerCase()?.includes('unauthenticated')) {
//       logoutUser();
//       return; 
//     }

    

//     throw errorResponse;
//   }
// };





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






