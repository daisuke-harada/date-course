import { combineReducers, createStore } from "redux";
import loginReducer from "./loginReducer";

const rootReducer = combineReducers({
  session: loginReducer
});

const store = createStore(rootReducer)

export default store;
