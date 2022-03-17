import { Action, Dispatch } from "redux";
import Swal from "sweetalert2";
import { iLoginReq } from "../../@types/api/req";
import {
  iCustomResponse,
  iGetPermissionsRes,
  iLoginRes,
} from "../../@types/api/res";
import { iAction } from "../../@types/store";
import { iAuthState } from "../../@types/store/states";
import customFetch from "../../helpers/customFetch";
import { authTypes } from "../store-types";
import moment from "moment";
import { setLanguage } from "./uiActions";
import { langs } from "../../@types/lang/index";
import manageErrorsMessages from "../../helpers/manageErrorsMessages";
import Router from "next/router";

export const startLogin =
  (data: { email: string; password: string }, lang: langs) =>
  async (dispatch: Dispatch<iAction>) => {
    try {
      Swal.fire({
        title: lang === "es" ? "Cargando..." : "Loading...",
        backdrop: `
      rgba(0,0,123,0.4)
      left top
      no-repeat
    `,
        allowOutsideClick: false,
        didOpen: () => {
          Swal.showLoading();
        },
      });

      const { information } = await customFetch<iLoginReq, iLoginRes>(
        "auth",
        false,
        "POST",
        data
      );

      const { token } = information!;
      dispatch(setLanguage((token.languageCve.toLowerCase() as langs) || "es"));

      dispatch(
        login({
          ...token,
          lang: (token.languageCve.toLowerCase() as langs) || "es",
        })
      );

      const { information: permissions } = await customFetch<
        undefined,
        iGetPermissionsRes
      >("auth/getpermissions", true);

      dispatch(
        login({
          ...token,
          ...permissions?.userInfo,
          lang: (token.languageCve.toLowerCase() as langs) || "es",
        })
      );

      if (information?.token.dayPassFlag === 2) {
        const cad = await Swal.fire({
          title: lang === "es" ? "Atención" : "Warning",
          text:
            lang === "es"
              ? "¡Tu contraseña está a punto de caducar!"
              : "Your password is going to expire!",
          showConfirmButton: true,
          confirmButtonColor: "#f2711c",
          confirmButtonText:
            lang === "es" ? "Actualizar mi contraseña" : "Update my password",
          showDenyButton: true,
          denyButtonText: lang === "es" ? "Continuar" : "Continue",
          denyButtonColor: "#cb1414",
        });
        if (cad.isConfirmed) {
          Router.push("/account/password");
        }
      }

      if (information?.token.dayPassFlag === 3) {
        const cad = await Swal.fire({
          title: lang === "es" ? "Atención" : "Warning",
          text:
            lang === "es"
              ? "¡Tu contraseña a caducado!"
              : "Your password is expired!",
          showConfirmButton: true,
          confirmButtonColor: "#f2711c",
          confirmButtonText:
            lang === "es" ? "Actualizar mi contraseña" : "Update my password",
          allowEscapeKey: false,
          allowOutsideClick: false,
          allowEnterKey: false,
        });
        if (cad.isConfirmed) {
          Router.push("/account/password");
        }
      }

      Swal.close();
    } catch (err) {
      console.log("Login error: ", err);
      const msg = await manageErrorsMessages(
        (err as iCustomResponse).codeStatus || "1000",
        lang
      );
      Swal.fire("Error", msg, "error");
    }
  };

export const startRenew =
  (lang: langs) => async (dispatch: Dispatch<iAction>) => {
    try {
      Swal.fire({
        title: lang === "es" ? "Cargando..." : "Loading...",
        backdrop: `
            rgba(0,0,123,0.4)
            left top
            no-repeat
          `,
        allowOutsideClick: false,
        didOpen: () => {
          Swal.showLoading();
        },
      });

      const { information } = await customFetch<undefined, iLoginRes>(
        "auth/renew",
        true
      );

      const { token } = information!;

      if (information?.token.dayPassFlag === 2) {
        const cad = await Swal.fire({
          title: lang === "es" ? "Atención" : "Warning",
          text:
            lang === "es"
              ? "¡Tu contraseña está a punto de caducar!"
              : "Your password is going to expire!",
          showConfirmButton: true,
          confirmButtonColor: "#f2711c",
          confirmButtonText:
            lang === "es" ? "Actualizar mi contraseña" : "Update my password",
          showDenyButton: true,
          denyButtonText: lang === "es" ? "Continuar" : "Continue",
          denyButtonColor: "#cb1414",
        });
        if (cad.isConfirmed) {
          Router.push("/account/password");
        }
      }

      if (information?.token.dayPassFlag === 3) {
        const cad = await Swal.fire({
          title: lang === "es" ? "Atención" : "Warning",
          text:
            lang === "es"
              ? "¡Tu contraseña a caducado!"
              : "Your password is expired!",
          showConfirmButton: true,
          confirmButtonColor: "#f2711c",
          confirmButtonText:
            lang === "es" ? "Actualizar mi contraseña" : "Update my password",
          allowEscapeKey: false,
          allowOutsideClick: false,
          allowEnterKey: false,
        });
        if (cad.isConfirmed) {
          Router.push("/account/password");
        }
      }
      if (token) {
        dispatch(
          login({ ...token, lang: token.languageCve.toLowerCase() as langs })
        );

        const { information: permissions } = await customFetch<
          undefined,
          iGetPermissionsRes
        >("auth/getpermissions", true);

        dispatch(
          login({
            ...token,
            ...permissions?.userInfo,
            lang: token.languageCve.toLowerCase() as langs,
          })
        );

        dispatch(
          setLanguage((token.languageCve.toLowerCase() as langs) || "es")
        );
      } else {
        localStorage.clear();
      }

      Swal.close();
    } catch (err) {
      console.log("Renew error: ", err);
      const msg = await manageErrorsMessages(
        (err as iCustomResponse).codeStatus || "1000",
        "es"
      );
      Swal.fire("Error", msg, "error");
    }
  };

export const startLogout = () => (dispatch: Dispatch<Action>) => {
  localStorage.clear();
  window.location.replace("/auth/login");
  return dispatch(logout());
};

const login = (payload: iAuthState): iAction<iAuthState> => {
  localStorage.setItem("x-token", payload.access_token!);
  localStorage.setItem("lang", payload.lang!);
  localStorage.setItem("init-date", moment().toISOString());

  return {
    type: authTypes.login,
    payload,
  };
};

const logout = () => ({ type: authTypes.logout });
