import ActionType from '../Action/ActionType/actionType';

const initialState = {
  loginUserData: {}
  
};

export default (state = initialState, action) => {
  switch (action.type) {

    case ActionType.LOGIN_USER_DATA:
      return {
        ...state,
        loginUserData: action.payload,
      };


    default:
      return state;
  }
};


