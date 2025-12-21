// notificationActions.js
import ActionType from '../ActionType/actionType';

export const enqueueTransaction = (data) => ({
  type: ActionType.ENQUEUE_TRANSACTION,
  payload: {
    data,
    receivedAt: Date.now(),
  },
});

export const dequeueTransaction = () => ({
  type: ActionType.DEQUEUE_TRANSACTION,
});

export const clearQueue = () => ({
  type: ActionType.LOGOUT,
});
