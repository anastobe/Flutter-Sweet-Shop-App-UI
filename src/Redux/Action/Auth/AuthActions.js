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
      dispatch({type: ActionType.USER_DATA, payload: res });
    };
  };

export const updateUserToken = (data) => {
  return dispatch => {
    dispatch({
      type: ActionType.UPDATE_TOKEN,
      payload: data, // { token, expiry_time }
    });
  };
};


export const userIsLoggedIn = (res) => {
  return dispatch => {
    dispatch({type: ActionType.USER_LOGGEDIN, payload: res });
  };
};


  export const handleLoader = (res) => {
    return dispatch => {
      dispatch({type: ActionType.LOADER, payload: res });
    };
  };
