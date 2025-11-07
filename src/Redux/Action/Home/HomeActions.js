import api from "../../../APICall/api";
import MessageHandler from "../../../APICall/messageHandler";
import { Toast } from "../../../utils";
import ActionType from "../ActionType/actionType";

export const storeLoginUserData = (res) => {
    return dispatch => {
      dispatch({type: ActionType.LOGIN_USER_DATA, payload: res });
    };
  };
