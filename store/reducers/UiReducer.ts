import { langs } from "../../@types/lang";
import { iReducer } from "../../@types/store";
import { iUiState } from "../../@types/store/states";
import { uiTypes } from "../store-types";

const initialState: iUiState = {
  lang: "es",
  cookie: false,
  menu: false,
};

const UiReducer: iReducer<iUiState, string | langs> = (
  state = initialState,
  { type, payload }
) => {
  switch (type) {
    case uiTypes.toogleMenu:
      return { ...state, menu: !state.menu };
    case uiTypes.setLang:
      return { ...state, lang: payload as langs };
    case uiTypes.setTitle:
      return { ...state, title: payload };
    case uiTypes.hideCookie:
      return { ...state, cookie: false };
    case uiTypes.showCookie:
      return { ...state, cookie: true };
    default:
      return state;
  }
};

export default UiReducer;
