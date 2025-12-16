import ActionType from '../Action/ActionType/actionType';

const initialState = {
  userData: {},
  loader: false,
  userlogdedIn: false
  
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
  case ActionType.USER_LOGGEDIN:
    return {
      ...state,
      userlogdedIn: action.payload,
    };
      

    case ActionType.LOGOUT:
      return {
        ...state,
        userData: {},
        loader: false,
        userlogdedIn: false
      };
      // userToken
    default:
      return state;
  }
};


