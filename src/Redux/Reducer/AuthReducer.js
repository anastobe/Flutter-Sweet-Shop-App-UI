import ActionType from '../Action/ActionType/actionType';

const initialState = {
  check: ''
  
};

export default (state = initialState, action) => {
  switch (action.type) {

    case ActionType.OPEN_OPTIONS:
      return {
        ...state,
        check: action.payload,
      };


    case ActionType.LOGOUT:
      return {
        ...state,
        check: ''
      };
      // userToken
    default:
      return state;
  }
};


