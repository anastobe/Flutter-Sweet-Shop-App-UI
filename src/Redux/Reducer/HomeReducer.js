import ActionType from '../Action/ActionType/actionType';

const initialState = {
  loginUserData: {},
  getCurrencyAccArray: [],
  beneficiaryArray: [],
  refreshCall: Math.random()
};

export default (state = initialState, action) => {
  switch (action.type) {

    case ActionType.LOGIN_USER_DATA:
      return {
        ...state,
        loginUserData: action.payload,
      };

      case ActionType.GET_CURR_ACCOUNTS:
      return {
        ...state,
        getCurrencyAccArray: action.payload,
      };
      case ActionType.GET_BENEFICIARY:
      return {
        ...state,
        beneficiaryArray: action.payload,
      };
      case ActionType.CARD_SCREEN_REFRESH:
      return {
        ...state,
        refreshCall: action.payload,
      };
      

      case ActionType.LOGOUT:
      return {
        ...state,
        loginUserData: {},
        getCurrencyAccArray: [],
        beneficiaryArray: [],
        refreshCall: ""
      };

    default:
      return state;
  }
};


