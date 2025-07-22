import api from "../../../APICall/api";
import MessageHandler from "../../../APICall/messageHandler";
import { Toast } from "../../../utils";
import ActionType from "../ActionType/actionType";

export const handleNavigation = (res) => {
    return dispatch => {
      dispatch({type: ActionType.OPEN_OPTIONS, payload: res });
    };
  };
  
export const storeUserToken = (res) => {
    return dispatch => {
      dispatch({type: ActionType.USER_TOKEN, payload: res });
    };
  };

    
// export const getMyCurrentuserData = (res) => {  //ok
//   return dispatch => {
//     dispatch({type: ActionType.GET_ME_DATA, payload: res });
//   };
// };

// export const savedMyFriendsData = (res) => {  //ok
//   return dispatch => {
//     dispatch({type: ActionType.GET_ME_FRIENDLIST, payload: res });
//   };
// };
  
// export const saveCoordinated = (res) => {
//   return dispatch => {
//     dispatch({type: ActionType.COORDINATES, payload: res });
//   };
// };


// export const handleNavigations = (res) => {
//   return dispatch => {
//     dispatch({type: ActionType.HANDLE_NAV, payload: res });
//   };
// };

// export const saveFcmToken = (res) => {
//   return dispatch => {
//     dispatch({type: ActionType.SAVE_FCM, payload: res });
//   };
// };


// export const HandleLoader = (res) => {
//   return dispatch => {
//     dispatch({type: ActionType.FULL_LOADER, payload: res}); // Stop loader
//   };
// };

// export const HandleLocScreenLoader = (res) => {
//   return dispatch => {
//     dispatch({type: ActionType.LOC_SCREEN_LOADER, payload: res}); // Stop loader
//   };
// };

// export const SaveAppleAuthData = (res) => {
//   return dispatch => {
//     dispatch({type: ActionType.APPLE_AUTH_RES, payload: res}); // Stop loader
//   };
// };

// export const SaveThemeType = (res) => {
//   return dispatch => {
//     dispatch({type: ActionType.THEME_TYPE, payload: res}); // Stop loader
//   };
// };

// export const SaveLastThemeType = (res) => {
//   return dispatch => {
//     dispatch({type: ActionType.LAST_THEME_TYPE, payload: res}); // Stop loader
//   };
// };

// export const SaveAutoThemeDarkModeType = (res) => {
//   return dispatch => {
//     dispatch({type: ActionType.THEME_TYPE_AUTO, payload: res}); // Stop loader
//   };
// };



// // export const RegisterMobileMuber = payload => {
// //   return async dispatch => {
// //     try {
// //       dispatch({type: ActionType.BTN_LOADER, payload: true}); // Stop loader
// //       const response = await api(`auth/register`, payload, 'post',dispatch)
// //       MessageHandler(response?.data);
// //       return response?.data;
// //      } catch (error) {
// //       console.error('Error during API call:', error);
// //       return false;
// //     } finally {
// //       dispatch({type: ActionType.BTN_LOADER, payload: false}); // Stop loader
// //     }
// //   };
// // };


// // export const VerifyOtp = payload => {
// //   return async dispatch => {
// //     try {
// //       dispatch({type: ActionType.BTN_LOADER, payload: true}); // Stop loader
// //       const response = await api(`auth/verifyRegistration`, payload, 'post',dispatch)
// //       MessageHandler(response?.data);
// //       return response?.data;
// //      } catch (error) {
// //       console.error('Error during API call:', error);
// //       return false;
// //     } finally {
// //       dispatch({type: ActionType.BTN_LOADER, payload: false}); // Stop loader
// //     }
// //   };
// // };



// // export const VerifyOtpForgetPassword = payload => {
// //   return async dispatch => {
// //     try {
// //       dispatch({type: ActionType.BTN_LOADER, payload: true}); // Stop loader
// //       const response = await api(`auth/forget-password/verification`, payload, 'post',dispatch)
// //       MessageHandler(response?.data);
// //       return response?.data;
// //      } catch (error) {
// //       console.error('Error during API call:', error);
// //       return false;
// //     } finally {
// //       dispatch({type: ActionType.BTN_LOADER, payload: false}); // Stop loader
// //     }
// //   };
// // };



// // export const UserSignup = payload => {
// //   return async dispatch => {
// //     try {
// //       dispatch({type: ActionType.BTN_LOADER, payload: true}); // Stop loader
// //       const response = await api(`auth/signup`, payload, 'post',dispatch)
// //       MessageHandler(response?.data);
// //       return response?.data;
// //      } catch (error) {
// //       console.error('Error during API call:', error);
// //       return false;
// //     } finally {
// //       dispatch({type: ActionType.BTN_LOADER, payload: false}); // Stop loader
// //     }
// //   };
// // };

// // export const UserResetPaswordApi = payload => {
// //   return async dispatch => {
// //     try {
// //       dispatch({type: ActionType.BTN_LOADER, payload: true}); // Stop loader
// //       const response = await api(`auth/reset-password`, payload, 'post',dispatch)
// //       MessageHandler(response?.data);
// //       return response?.data;
// //      } catch (error) {
// //       console.error('Error during API call:', error);
// //       return false;
// //     } finally {
// //       dispatch({type: ActionType.BTN_LOADER, payload: false}); // Stop loader
// //     }
// //   };
// // };

// // export const UserLogin = payload => {
// //   return async dispatch => {
// //     try {
// //       dispatch({type: ActionType.BTN_LOADER, payload: true}); // Stop loader
// //       const response = await api(`auth/login`, payload, 'post',dispatch)
// //       MessageHandler(response?.data);
// //       return response?.data;
// //      } catch (error) {
// //       console.error('Error during API call:', error);
// //       return false;
// //     } finally {
// //       // dispatch({type: ActionType.BTN_LOADER, payload: false}); // Stop loader
// //     }
// //   };
// // };


// // export const GetLoginUserData = () => {
// //   return dispatch => {
// //     return api('user', null, 'get',dispatch)
// //       .then(response => {
// //         if (Array.isArray(response?.data?.message)) {
// //           Toast.showToast(response?.data?.message[0], '', 'error');
// //         }
// //         return response?.data;
// //       })
// //       .catch(error => {
// //         dispatch({type: ActionType.BTN_LOADER, payload: false}); // Stop loader
// //         Toast.showToast(JSON.stringify(error));
// //         return false;
// //       }).finally(()=>{
// //         dispatch({type: ActionType.BTN_LOADER, payload: false}); // Stop loader
// //       })
// //   };
// // };

// // export const UserForgetPassword = payload => {
// //   return async dispatch => {
// //     try {
// //       dispatch({type: ActionType.BTN_LOADER, payload: true}); // Stop loader
// //       const response = await api(`auth/forget-password`, payload, 'post',dispatch)
// //       MessageHandler(response?.data);
// //       return response?.data;
// //      } catch (error) {
// //       console.error('Error during API call:', error);
// //       return false;
// //     } finally {
// //       dispatch({type: ActionType.BTN_LOADER, payload: false}); // Stop loader
// //     }
// //   };
// // };
