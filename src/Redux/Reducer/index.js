import {combineReducers} from 'redux';
import AuthReducer from './AuthReducer';
import HomeReducer from './HomeReducer';
import MoreReducer from './MoreReducer';
import pendingTransactionReducer from './pendingTransactionReducer';

export default combineReducers({
  AuthReducer,
  HomeReducer,
  MoreReducer,
  pendingTransaction: pendingTransactionReducer,
});


