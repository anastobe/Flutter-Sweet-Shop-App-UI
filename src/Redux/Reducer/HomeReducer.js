import ActionType from '../Action/ActionType/actionType';

const initialState = {
  loginUserData: {},
  getCurrencyAccArray: [],
  beneficiaryArray: []
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
      

      case ActionType.LOGOUT:
      return {
        ...state,
        loginUserData: {},
        getCurrencyAccArray: [],
        beneficiaryArray: []
      };

    default:
      return state;
  }
};


