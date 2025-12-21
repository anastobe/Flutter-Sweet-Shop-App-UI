// notificationReducer.js
import ActionType from '../Action/ActionType/actionType';

const initialState = {
  queue: [],
};

export default (state = initialState, action) => {
  switch (action.type) {

    case ActionType.ENQUEUE_TRANSACTION:
      return {
        ...state,
        queue: [...state.queue, action.payload],
      };

    case ActionType.DEQUEUE_TRANSACTION:
      return {
        ...state,
        queue: state.queue.slice(1),
      };

    case ActionType.LOGOUT:
      return initialState;

    default:
      return state;
  }
};
