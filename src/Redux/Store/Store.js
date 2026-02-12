import thunk from "redux-thunk";
import combineReducer from "../Reducer/index";
import { createStore, applyMiddleware } from "redux";

const rootReducer = combineReducer;

const Store = createStore(rootReducer, applyMiddleware(thunk));

export { Store };