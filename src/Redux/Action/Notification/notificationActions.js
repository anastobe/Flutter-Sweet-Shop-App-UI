import ActionType from '../ActionType/actionType';

export const setPendingTransaction = (data) => {
  return dispatch => {
    dispatch({
      type: ActionType.SET_PENDING_TRANSACTION,
      payload: {
        data,
        receivedAt: Date.now(),
      },
    });
  };
};

export const markTransactionHandled = () => {
  return dispatch => {
    dispatch({
      type: ActionType.MARK_TRANSACTION_HANDLED,
    });
  };
};

export const clearPendingTransaction = () => {
  return dispatch => {
    dispatch({
      type: ActionType.CLEAR_PENDING_TRANSACTION,
    });
  };
};
