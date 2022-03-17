import { preferencesTypes } from "../store-types";
import { iReducer } from "../../@types/store/index";
import { iPreferencesState } from "../../@types/store/states";
const initialState = {};
const PreferencesReducer: iReducer<iPreferencesState> = (
  state = initialState,
  { type, payload }
) => {
  switch (type) {
    case preferencesTypes.setUsersFilters:
      return {
        ...state,
        users: {
          ...state,
          filters: payload?.users?.filters,
        },
      };
    case preferencesTypes.setUsersTable:
      return {
        ...state,
        users: {
          ...state.users,
          tableData: payload?.users?.tableData,
        },
      };
    case preferencesTypes.unsetUsersTable:
      return {
        ...state,
        users: {
          ...state.users,
          tableData: undefined,
        },
      };
    case preferencesTypes.setActiveUser:
      return {
        ...state,
        users: {
          ...state.users,
          active: payload?.users?.active,
        },
      };
    case preferencesTypes.unsetActiveUser:
      return {
        ...state,
        users: {
          ...state.users,
          active: undefined,
        },
      };
    case preferencesTypes.setGeneralsMailsConfig:
      return {
        ...state,
        mails: {
          ...state.mails,
          general: payload?.mails?.general,
        },
      };
    case preferencesTypes.unsetGeneralsMailsConfig:
      return {
        ...state,
        mails: {
          ...state.mails,
          general: undefined,
        },
      };
    case preferencesTypes.setSmartLinkColors:
      return {
        ...state,
        smartlink: payload?.smartlink,
      };
    case preferencesTypes.unsetSmartLinkColors:
      return {
        ...state,
        smartlink: undefined,
      };
    default:
      return state;
  }
};

export default PreferencesReducer;
