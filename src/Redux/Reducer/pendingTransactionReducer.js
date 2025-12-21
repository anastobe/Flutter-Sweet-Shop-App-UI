// notificationReducer.js
import ActionType from '../Action/ActionType/actionType';

const initialState = {
  queue: [],
};

export default (state = initialState, action) => {
  switch (action.type) {

    // case ActionType.ENQUEUE_TRANSACTION:
    //   return {
    //     ...state,
    //     queue:  [action.payload, ...state.queue],
    //     // queue: [...state.queue, action.payload],
    //   };

    case ActionType.ENQUEUE_TRANSACTION: {
  const exists = state.queue.find(
    // q => q.data?.sp_transaction_id === action.payload.data?.sp_transaction_id  --> corec but for noe bottom is correct as OOB is not dynamic
    q => q.data?.card_acceptor_name === action.payload.data?.card_acceptor_name
    
  );

  if (exists) {
    return state; // ❌ duplicate ignore
  }

  return {
    ...state,
    queue: [action.payload, ...state.queue],
  };
}


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
