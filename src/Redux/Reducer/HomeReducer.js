import ActionType from '../Action/ActionType/actionType';

const initialState = {
  loginUserData: {},
  getCurrencyAccArray: []
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


    default:
      return state;
  }
};


