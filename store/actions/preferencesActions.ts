import { Dispatch } from "redux";
import { iAction } from "../../@types/store";
import { iGetUserTableDataReq } from "../../@types/api/req";
import { langs } from "../../@types/lang";
import Swal from "sweetalert2";
import manageErrorsMessages from "../../helpers/manageErrorsMessages";
import {
  iCustomResponse,
  iUserGetTableDataRes,
  iUserGetRolesRes,
  iUserGetStatusRes,
  iUserGetHerarchiesRes,
  iUserInformationRes,
} from "../../@types/api/res";
import customFetch from "../../helpers/customFetch";
import { iGlobalState, iPreferencesState } from "../../@types/store/states";
import { preferencesTypes } from "../store-types";
import {
  iGetFrames,
  iGetGeneralMailColors,
  iGetSmartLinkColors,
} from "../../@types/api/res";

export const startGettingUsersFilters =
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

      const { information: roles } = await customFetch<
        undefined,
        iUserGetRolesRes
      >("profile/preferences/users/roles", true);

      const { information: status } = await customFetch<
        undefined,
        iUserGetStatusRes
      >("profile/preferences/users/status", true);

      const { information: herarchies } = await customFetch<
        undefined,
        iUserGetHerarchiesRes
      >("profile/preferences/users/herarchies", true);

      dispatch(
        setUsersFilters({
          users: {
            filters: {
              profile: roles?.listRoles || [],
              status: status?.listStatus || [],
              hierarchy: herarchies?.listHierarchies || [],
            },
          },
        })
      );

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

export const startGettingUsersTable =
  (req: iGetUserTableDataReq, lang: langs) =>
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

      const { information } = await customFetch<
        iGetUserTableDataReq,
        iUserGetTableDataRes
      >("profile/preferences/users/table", true, "POST", req);

      dispatch(
        setUsersTable({
          users: {
            tableData: information?.list || [],
          },
        })
      );

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

export const startGettingUserInformation =
  (id: number, lang: langs) => async (dispatch: Dispatch<iAction>) => {
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

      const { information } = await customFetch<undefined, iUserInformationRes>(
        `profile/preferences/users/${id}`,
        true
      );

      dispatch(
        setActiveUser({
          users: {
            active: information?.list,
          },
        })
      );

      Swal.close();
    } catch (err) {
      console.log("Login error: ", err);
      const msg = await manageErrorsMessages(
        (err as iCustomResponse).codeStatus || "1000",
        lang
      );

      dispatch(
        setActiveUser({
          users: {
            active: (err as iCustomResponse).information?.list,
          },
        })
      );
      Swal.fire("Error", msg, "error");
    }
  };

export const startGettingGeneralMailsConfiguration =
  () => async (dispatch: Dispatch<iAction>, getState: () => iGlobalState) => {
    const {
      ui: { lang },
      auth: { clientId },
    } = getState();
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

      const { information: frames } = await customFetch<undefined, iGetFrames>(
        "profile/preferences/colors/frames",
        true
      );
      const { information: cols } = await customFetch<
        undefined,
        iGetGeneralMailColors
      >(`profile/preferences/colors/general/${clientId}`, true);

      const colors = {
        bodyTextType: cols?.general_mail[0].bodyTextType!,
        bodyType: cols?.general_mail[0].bodyType!,
        buttonTextType: cols?.general_mail[0].buttonTextType!,
        buttonType: cols?.general_mail[0].buttonType!,
        footerTextType: cols?.general_mail[0].footerTextType!,
        footerType: cols?.general_mail[0].footerType!,
      };

      dispatch(
        setGeneralsMailsConfig({
          mails: {
            general: {
              frames:
                frames?.frames.map((frame) => ({
                  id: frame.framesCatalogId,
                })) || [],
              frame: cols?.general_mail[0].frameId || 1,
              colors,
              logo: cols?.general_mail[0].logoPath || "",
            },
          },
        })
      );

      Swal.close();
    } catch (err) {
      console.log("Start Getting Mails Configuration Error: ", err);
      const msg = await manageErrorsMessages(
        (err as iCustomResponse).codeStatus || "1000",
        lang
      );
      Swal.fire("Error", msg, "error");
    }
  };

export const startGettingSmartLinkColorsConfiguration =
  () => async (dispatch: Dispatch<iAction>, getState: () => iGlobalState) => {
    const {
      ui: { lang },
      auth: { clientId },
    } = getState();
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

      await customFetch<undefined, iGetSmartLinkColors>(
        `profile/preferences/colors/smartlink/${clientId}`,
        true
      )
        .then((response) => {
          const colors = {
            bodyTextType: response.information?.checkout[0].bodyTextType!,
            bodyType: response.information?.checkout[0].bodyType!,
            buttonTextType: response.information?.checkout[0].buttonTextType!,
            buttonType: response.information?.checkout[0].buttonType!,
            footerTextType: response.information?.checkout[0].footerTextType!,
            footerType: response.information?.checkout[0].footerType!,
          };
          dispatch(
            setSmartLinkColors({
              smartlink: {
                colors,
                logo: response.information?.checkout[0].logoPath,
              },
            })
          );
        })
        .catch(() => {
          Swal.fire({
            icon: "error",
            title: "Error",
            text: "Error al cargar los datos",
          });
        });

      Swal.close();
    } catch (err) {
      console.log("Start Getting Mails Configuration Error: ", err);
      const msg = await manageErrorsMessages(
        (err as iCustomResponse).codeStatus || "1000",
        lang
      );
      Swal.fire("Error", msg, "error");
    }
  };
const setUsersTable = (
  payload: iPreferencesState
): iAction<iPreferencesState> => ({
  type: preferencesTypes.setUsersTable,
  payload,
});

const setUsersFilters = (
  payload: iPreferencesState
): iAction<iPreferencesState> => ({
  type: preferencesTypes.setUsersFilters,
  payload,
});

export const unsetUsersTable = (): iAction => ({
  type: preferencesTypes.unsetUsersTable,
});

const setActiveUser = (
  payload: iPreferencesState
): iAction<iPreferencesState> => ({
  type: preferencesTypes.setActiveUser,
  payload,
});

export const unsetActiveUser = (): iAction => ({
  type: preferencesTypes.unsetActiveUser,
});

const setGeneralsMailsConfig = (
  payload: iPreferencesState
): iAction<iPreferencesState> => ({
  type: preferencesTypes.setGeneralsMailsConfig,
  payload,
});

export const unsetGeneralsMailsConfig = (): iAction => ({
  type: preferencesTypes.unsetGeneralsMailsConfig,
});

const setSmartLinkColors = (
  payload: iPreferencesState
): iAction<iPreferencesState> => ({
  type: preferencesTypes.setSmartLinkColors,
  payload,
});
export const unsetSmartLinkColors = (): iAction => ({
  type: preferencesTypes.unsetSmartLinkColors,
});
