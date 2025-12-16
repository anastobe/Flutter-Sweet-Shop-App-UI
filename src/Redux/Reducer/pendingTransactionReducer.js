import ActionType from '../Action/ActionType/actionType';

const initialState = {
  data: null,
  receivedAt: null,
  handled: false,
};

export default (state = initialState, action) => {
  switch (action.type) {

    case ActionType.SET_PENDING_TRANSACTION:
      return {
        ...state,
        data: action.payload.data,
        receivedAt: action.payload.receivedAt,
        handled: false,
      };

    case ActionType.MARK_TRANSACTION_HANDLED:
      return {
        ...state,
        handled: true,
      };

    case ActionType.CLEAR_PENDING_TRANSACTION:
      return initialState;

    default:
      return state;
  }
};
