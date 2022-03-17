import { iReducer } from "../../@types/store/index";
import { iPaymentsState } from "../../@types/store/states";
import { paymentsTypes } from "../store-types";

const initialState = {
  checkBlocked: false,
};

const PaymentsReducer: iReducer<iPaymentsState> = (
  state = initialState,
  { type, payload }
) => {
  switch (type) {
    case paymentsTypes.setConfig:
      return { ...state, config: payload?.config };
    case paymentsTypes.unsetConfig:
      return { ...state, config: undefined };
    case paymentsTypes.setNewLinkData:
      return { ...state, newLinkData: payload?.newLinkData };
    case paymentsTypes.unsetNewLinkData:
      return { ...state, newLinkData: undefined };
    case paymentsTypes.checkBlocked:
      return { ...state, checkBlocked: true };
    case paymentsTypes.endCheckBlocked:
      return { ...state, checkBlocked: false };
    case paymentsTypes.setReportsTable:
      return { ...state, reportsTable: payload?.reportsTable || [] };
    case paymentsTypes.setReportsDetailActive:
      return { ...state, detailActive: payload?.detailActive };
    case paymentsTypes.unsetStatusLinkDetailActive:
      return { ...state, detailActive: undefined };
    case paymentsTypes.unsetReportsTable:
      return { ...state, reportsTable: undefined };
    default:
      return state;
  }
};

export default PaymentsReducer;
