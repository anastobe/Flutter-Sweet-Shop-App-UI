import ActionType from '../Action/ActionType/actionType';

const initialState = {
  userData: {}
  
};

export default (state = initialState, action) => {
  switch (action.type) {

    case ActionType.USER_DATA:
      return {
        ...state,
        userData: action.payload,
      };


    case ActionType.LOGOUT:
      return {
        ...state,
        userData: {}
      };
      // userToken
    default:
      return state;
  }
};


