import { combineReducers } from "redux";

import userReducer from "./userReducer";

const rooReducer = combineReducers({
  userState: userReducer,
});

export default rooReducer;
