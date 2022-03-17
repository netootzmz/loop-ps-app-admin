import { combineReducers } from "redux";
import UiReducer from "./UiReducer";
import AuthReducer from "./AuthReducer";
import PaymentsReducer from "./PaymentsReducer";
import TransactionReducer from "./TransactionReducer";
import PreferencesReducer from "./PreferencesReducer";

const reducers = combineReducers({
  ui: UiReducer,
  auth: AuthReducer,
  payments: PaymentsReducer,
  transactions: TransactionReducer,
  preferences: PreferencesReducer,
});

export default reducers;
