import { iReducer } from "../../@types/store";
import { iAuthState } from "../../@types/store/states";
import { authTypes } from "../store-types";

const initialState = {};

const AuthReducer: iReducer<iAuthState> = (
  state = initialState,
  { type, payload }
) => {
  switch (type) {
    case authTypes.login:
      return { ...state, ...payload };

    case authTypes.logout:
      return initialState;

    default:
      return state;
  }
};

export default AuthReducer;
