import MessageHandler from "../../../APICall/messageHandler";
import { Toast } from "../../../utils";
import ActionType from "../ActionType/actionType";

export const storeLoginUserData = (res) => {
    return dispatch => {
      dispatch({type: ActionType.LOGIN_USER_DATA, payload: res });
    };
  };

  export const storeCurrArrayData = (res) => {
  return dispatch => {
      dispatch({type: ActionType.GET_CURR_ACCOUNTS, payload: res });
  };
  };

  export const saveBeneficiaryData = (res) => {
  return dispatch => {
      dispatch({type: ActionType.GET_BENEFICIARY, payload: res });
  };
  };
  
  export const card_Screen_Refresh = (res) => {
  return dispatch => {
      dispatch({type: ActionType.CARD_SCREEN_REFRESH, payload: res });
  };
  };
  
  
  export const storeAccounts = (res) => {
  return dispatch => {
      dispatch({type: ActionType.GET_ACCOUNTS, payload: res });
  };
  };

  export const storeSelectedAccountWholeApp = (res) => {
  return dispatch => {
      dispatch({type: ActionType.SELECTED_ACCOUNT_WHOLE_APP, payload: res });
  };
  };

  export const accountScreenRefresh = (res) => {
  return dispatch => {
      dispatch({type: ActionType.ACCOUNT_SCREEN_REFRESH, payload: res });
  };
  };