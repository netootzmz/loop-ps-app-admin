import { iReducer } from "../../@types/store";
import { iTransactionsState } from "../../@types/store/states";
import { transactionsTypes } from "../store-types";

const initialState = {};

const TransactionsReducer: iReducer<iTransactionsState> = (
  state = initialState,
  { type, payload }
) => {
  switch (type) {
    case transactionsTypes.setReportsTable:
      return {
        ...state,
        reportsTable: payload?.reportsTable || [],
      };
    case transactionsTypes.unsetReportsTable:
      return {
        ...state,
        reportsTable: undefined,
      };
    case transactionsTypes.setTransactionActive:
      return {
        ...state,
        transactionActive: payload?.transactionActive,
      };
    case transactionsTypes.unsetTransactionActive:
      return {
        ...state,
        transactionActive: undefined,
      };
    default:
      return state;
  }
};

export default TransactionsReducer;
