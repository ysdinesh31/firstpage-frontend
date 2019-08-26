import { createStore, combineReducers } from "redux";
import AuthReducer from "../reducers/AuthReducer";
import ListReducer from "../reducers/ListReducer";
import TaskListReducer from "../reducers/TaskListReducer";

const allReducers = combineReducers({
  AuthReducer,
  ListReducer,
  TaskListReducer
});

const store = createStore(allReducers);

export default store;
