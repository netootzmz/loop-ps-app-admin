import { createWrapper } from "next-redux-wrapper";
import { connect } from "react-redux";
import { applyMiddleware, createStore } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";
import reducers from "./reducers";
import { iGlobalState } from "../@types/store/states";

const middlewares = [thunk];

const initialState = {};

const store = createStore(
  reducers,
  initialState,
  composeWithDevTools(applyMiddleware(...middlewares))
);

const makeStore = () => store;

const wrapper = createWrapper(makeStore, { debug: true });

export const wrappedOnStore = connect((state: iGlobalState) => state);

export default wrapper;
