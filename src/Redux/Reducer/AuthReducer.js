import ActionType from '../Action/ActionType/actionType';

const initialState = {
  userData: {},
  loader: false
  
};

export default (state = initialState, action) => {
  switch (action.type) {

    case ActionType.USER_DATA:
      return {
        ...state,
        userData: action.payload,
      };
    case ActionType.LOADER:
      return {
        ...state,
        loader: action.payload,
      };

    case ActionType.LOGOUT:
      return {
        ...state,
        userData: {},
        loader: false
      };
      // userToken
    default:
      return state;
  }
};


