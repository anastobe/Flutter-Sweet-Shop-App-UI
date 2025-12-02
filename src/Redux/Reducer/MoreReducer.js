import ActionType from '../Action/ActionType/actionType';

const initialState = {
  countryList: [],
  currencyList: [],
  accountTypeList: []
  
};

export default (state = initialState, action) => {
  switch (action.type) {

    case ActionType.GET_COUNTRY:
      return {
        ...state,
        countryList: action.payload,
      };

    case ActionType.GET_CURRENCY:
      return {
        ...state,
        currencyList: action.payload,
      };

    case ActionType.GET_ACCOUNT_TYPE_DATA:
      return {
        ...state,
        accountTypeList: action.payload,
      };

    case ActionType.LOGOUT:
    return {
      ...state,
      countryList: [],
      currencyList: [],
      accountTypeList: []
    };

    default:
      return state;
  }
};




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
