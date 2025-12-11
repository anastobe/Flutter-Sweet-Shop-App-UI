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
  