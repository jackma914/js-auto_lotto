import { createStore, applyMiddleware } from "redux";

import rooReducer from "../reducers";

const store = createStore(rooReducer, {});

export default store;
