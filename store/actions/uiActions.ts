import { langs } from "../../@types/lang";
import { iAction } from "../../@types/store";
import { uiTypes } from "../store-types";
import Swal from "sweetalert2";
import customFetch from "../../helpers/customFetch";
import { iCookieRes, iCustomResponse } from "../../@types/api/res";
import { Dispatch } from "redux";
import { iCookieReq } from "../../@types/api/req";
import manageErrorsMessages from "../../helpers/manageErrorsMessages";

export const getCookieResponse = () => async (dispatch: Dispatch<iAction>) => {
  try {
    Swal.fire({
      title: "Cargando...",
      allowOutsideClick: false,
      showConfirmButton: false,
      heightAuto: false,
      willOpen: () => {
        Swal.showLoading();
      },
    });
    const ipRes = await fetch("https://api.ipify.org/?format=json").catch(
      () => {
        throw new Error("IP");
      }
    );

    const ipJson = await ipRes.json();

    const ip = ipJson.ip;

    const { information } = await customFetch<undefined, iCookieRes>(
      `auth/cookie/${ip}`
    );

    if (information?.cookieAccept) {
      dispatch(hideCookie());
    } else {
      dispatch(showCookie());
    }

    Swal.close();
  } catch (error) {
    if ((error as any).message === "IP") {
      Swal.fire({
        title: "Error",
        text: "No podemos verificar tus datos, desactiva los bloqueadores que uses y recarga la página por favor...",
        allowOutsideClick: false,
        showConfirmButton: false,
        showCancelButton: false,
        icon: "error",
        iconColor: "#cb1414",
        heightAuto: false,
      });
      return;
    }
    const msg = await manageErrorsMessages(
      (error as iCustomResponse).codeStatus || "1000",
      "es"
    );
    Swal.fire("Error", msg, "error");
  }
};

export const startAcceptingCookie =
  () => async (dispatch: Dispatch<iAction>) => {
    try {
      Swal.fire({
        title: "Cargando...",
        allowOutsideClick: false,
        showConfirmButton: false,
        heightAuto: false,
        willOpen: () => {
          Swal.showLoading();
        },
      });
      const ipRes = await fetch("https://api.ipify.org/?format=json").catch(
        () => {
          throw new Error("IP");
        }
      );

      const ipJson = await ipRes.json();

      const ip = ipJson.ip;

      const { information } = await customFetch<iCookieReq, iCookieRes>(
        `auth/cookie/${ip}`,
        false,
        "POST",
        { cookieAccept: true }
      );

      if (information?.bitacoraCookieSaved) dispatch(hideCookie());
      Swal.close();
    } catch (err) {
      if ((err as any).message === "IP") {
        Swal.fire({
          title: "Error",
          text: "No podemos verificar tus datos, desactiva los bloqueadores que uses y recarga la página por favor...",
          allowOutsideClick: false,
          showConfirmButton: false,
          showCancelButton: false,
          icon: "error",
          iconColor: "#cb1414",
          heightAuto: false,
        });
        return;
      }
      console.log("Cookies error: ", err);
      const msg = await manageErrorsMessages(
        (err as iCustomResponse).codeStatus || "1000",
        "es"
      );
      Swal.fire("Error", msg, "error");
    }
  };

export const toogleMenu = (): iAction => ({
  type: uiTypes.toogleMenu,
});

export const hideCookie = (): iAction => ({
  type: uiTypes.hideCookie,
});
export const showCookie = (): iAction => ({
  type: uiTypes.showCookie,
});

export const setPageTitle = (payload: string): iAction<string> => ({
  type: uiTypes.setTitle,
  payload,
});

export const setLanguage = (payload: langs): iAction<string> => ({
  type: uiTypes.setLang,
  payload,
});

export const setPermission = (payload: any): iAction<any> =>({
  type: uiTypes.setPerm,
  payload
})