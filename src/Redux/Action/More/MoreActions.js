import api from "../../../APICall/api";
import MessageHandler from "../../../APICall/messageHandler";
import { Toast } from "../../../utils";
import ActionType from "../ActionType/actionType";

export const storeCountryData = (res) => {
    return dispatch => {
      dispatch({type: ActionType.GET_COUNTRY, payload: res });
    };
  };

export const storeCurrenryData = (res) => {
return dispatch => {
    dispatch({type: ActionType.GET_CURRENCY, payload: res });
};
};

export const storeAccTypeData = (res) => {
return dispatch => {
    dispatch({type: ActionType.GET_ACCOUNT_TYPE_DATA, payload: res });
};
};
