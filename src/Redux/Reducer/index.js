import {combineReducers} from 'redux';
import AuthReducer from './AuthReducer';
import HomeReducer from './HomeReducer';
import MoreReducer from './MoreReducer';

export default combineReducers({
  AuthReducer,
  HomeReducer,
  MoreReducer
});


