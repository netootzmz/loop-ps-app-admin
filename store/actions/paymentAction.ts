import { Dispatch } from "redux";
import Swal from "sweetalert2";
import moment from "moment";
import { iAction } from "../../@types/store";
import customFetch from "../../helpers/customFetch";
import {
  iCancelStatusLinkRes,
  iCreatePaymentLeagueRes,
  iCustomResponse,
  iGetPaymentsConfig,
  iGetStatusLinkDetailRes,
  iLoginRes,
  iReplayLinkRes,
  iStatusLinkTableDataRes,
} from "../../@types/api/res";
import { iPaymentsState } from "../../@types/store/states";
import { paymentsTypes } from "../store-types";
import {
  iCancelStatusLinkReq,
  iCancelTransactionReq,
  iCreatePaymentLeagueReq,
  iGetStatusLinkDetailReq,
  iGetStatusLinkTableDataReq,
  iLoginReq,
  iReplayLinkReq,
  iSendPaymentLeagueReq,
} from "../../@types/api/req";
import manageErrorsMessages from "../../helpers/manageErrorsMessages";
import { iSendPaymentLeagueRes } from "../../@types/api/res";
import { langs } from "../../@types/lang";

export const startGettingConfiguration =
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

      const res = await customFetch<undefined, iGetPaymentsConfig>(
        "payments/getconfig",
        true
      );

      dispatch(setConfiguration({ config: res.information?.configuration! }));

      Swal.close();
    } catch (err) {
      console.log("Get Config error: ", err);
      const msg = await manageErrorsMessages(
        (err as iCustomResponse).codeStatus || "1000",
        "es"
      );
      Swal.fire("Error", msg, "error");
    }
  };

export const startCreatingPaymentLink =
  (payload: iCreatePaymentLeagueReq) => async (dispatch: Dispatch<iAction>) => {
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

      const res = await customFetch<
        iCreatePaymentLeagueReq,
        iCreatePaymentLeagueRes
      >("payments/create", true, "POST", payload);

      const confirm = await Swal.fire({
        title: "¡Éxito!",
        text: "¡Liga creada con éxito!",
        icon: "success",

        confirmButtonColor: "#f2711c",
        confirmButtonText: "Continuar",
        allowEscapeKey: false,
        allowOutsideClick: false,
      });
      if (confirm.isConfirmed) {
        dispatch(setNewLinkData({ newLinkData: res.information?.response! }));
      }

      Swal.close();
    } catch (err) {
      console.log("Create payment error: ", err);
      const msg = await manageErrorsMessages(
        (err as iCustomResponse).codeStatus || "1000",
        "es"
      );
      Swal.fire("Error", msg, "error");
    }
  };

export const gettingStatusLinkTableData =
  (data: iGetStatusLinkTableDataReq) => async (dispatch: Dispatch<iAction>) => {
    try {
      Swal.fire({
        title: "Cargando...",
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
        iGetStatusLinkTableDataReq,
        iStatusLinkTableDataRes
      >("payments/getStatusLink", true, "POST", data);

      dispatch(
        setStatusLinkTable({ reportsTable: information?.listReport || [] })
      );

      Swal.close();
    } catch (err) {
      console.log("Login error: ", err);
      const msg = await manageErrorsMessages(
        (err as iCustomResponse).codeStatus || "1000",
        "es"
      );
      dispatch(
        setStatusLinkTable({
          reportsTable: (err as iCustomResponse).information?.listReport || [],
        })
      );
      Swal.fire("Error", msg, "error");
    }
  };

export const gettingStatusLinkTableDetail =
  (data: { folioTx: string }) => async (dispatch: Dispatch<iAction>) => {
    try {
      Swal.fire({
        title: "Cargando...",
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
        iGetStatusLinkDetailReq,
        iGetStatusLinkDetailRes
      >("payments/getDetailStatusLink", true, "POST", data);

      dispatch(
        setStatusLinkDetailActive({ detailActive: information?.linkreport })
      );

      Swal.close();
    } catch (error) {
      console.log("Login error: ", error);
      const msg = await manageErrorsMessages(
        (error as iCustomResponse).codeStatus || "1000",
        "es"
      );
      Swal.fire("Error", msg, "error");
      return Swal.close();
    }
  };

export const startSendingPayment =
  (addressee: string, folioTxn: string, blocked: boolean) =>
  async (dispatch: Dispatch<iAction>) => {
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

      await customFetch<iSendPaymentLeagueReq, iSendPaymentLeagueRes>(
        "payments/send",
        true,
        "POST",
        {
          folioTxn,
          addressee,
          typeTemplate: 1,
        }
      );

      const confirm = await Swal.fire({
        title: "¡Éxito!",
        text: "¡Liga creada con éxito!",
        icon: "success",

        confirmButtonColor: "#f2711c",
        confirmButtonText: "Continuar",
        allowEscapeKey: false,
        allowOutsideClick: false,
      });

      if (confirm.isConfirmed) {
        if (!blocked) {
          //Router.push("tabla");
          dispatch(unsetNewLinkData());
          return;
        }
        dispatch(checkBlockedPayment());
      }

      Swal.close();
    } catch (err) {
      console.log("Send payment error: ", err);
      const msg = await manageErrorsMessages(
        (err as iCustomResponse).codeStatus || "1000",
        "es"
      );
      Swal.fire("Error", msg, "error");
    }
  };

export const cancelStatusLink =
  (data: iCancelStatusLinkReq) => async (dispatch: Dispatch<iAction>) => {
    try {
      Swal.fire({
        title: "Cargando...",
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
      const res = await customFetch<iCancelStatusLinkReq, iCancelStatusLinkRes>(
        "payments/cancelStatusLink",
        true,
        "POST",
        data
      );

      if (res.codeStatus === "00") {
        const nowDate = moment().startOf("day").format("YYYY-MM-DD");
        const { information } = await customFetch<
          iGetStatusLinkTableDataReq,
          iStatusLinkTableDataRes
        >("payments/getStatusLink", true, "POST", {
          createdAt: nowDate,
          createdAt2: nowDate,
        });

        dispatch(
          setStatusLinkTable({ reportsTable: information?.listReport || [] })
        );

        Swal.fire({
          title: "Éxito",
          icon: "success",
          showConfirmButton: true,
        });
      } else {
        Swal.fire({
          icon: "warning",
          text: res.message,
          showConfirmButton: true,
        });
      }
    } catch (error) {
      Swal.fire({
        icon: "warning",
        text: (error as iCustomResponse).message,
        showConfirmButton: true,
      });
    }
  };

export const replayStatusLink = (data: iReplayLinkReq) => async () => {
  try {
    Swal.fire({
      title: "Cargando...",
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
    const res = await customFetch<iReplayLinkReq, iReplayLinkRes>(
      "payments/replayStatusLink",
      true,
      "POST",
      data
    );

    if (res.codeStatus === "00") {
      Swal.fire({
        title: "Éxito",
        icon: "success",
        showConfirmButton: true,
      });
    } else {
      Swal.fire({
        icon: "warning",
        text: res.message,
        showConfirmButton: true,
      });
    }
  } catch (error) {
    Swal.fire({
      icon: "warning",
      text: (error as iCustomResponse).message,
      showConfirmButton: true,
    });
  }
};

export const loginToCancel =
  (
    data: { email: string; password: string },
    lang: langs,
    folioTxn: iCancelTransactionReq
  ) =>
  async () => {
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
      if (token) {
        const res = await customFetch<iCancelTransactionReq, iCustomResponse>(
          "payments/cancelTransaction",
          true,
          "POST",
          folioTxn
        );

        if (res.codeStatus === "00") {
          Swal.close();
          Swal.fire({
            icon: "success",
            text: "Se completo la operacion",
            showConfirmButton: true,
          });
        } else {
          Swal.close();
          Swal.fire({
            icon: "warning",
            text: "No se pudo realizar la operación, favor de intentar más tarde",
            showConfirmButton: true,
          });
        }
      }
    } catch (err) {
      console.log("Login error: ", err);
      Swal.close();
      Swal.fire({
        icon: "error",
        text: "No se pudo realizar la operación, favor de intentar más tarde",
        showConfirmButton: true,
      });
    }
  };

const setConfiguration = (
  payload: iPaymentsState
): iAction<iPaymentsState> => ({
  type: paymentsTypes.setConfig,
  payload,
});

export const unsetConfiguration = (): iAction => ({
  type: paymentsTypes.unsetConfig,
});

const setNewLinkData = (payload: iPaymentsState): iAction<iPaymentsState> => ({
  type: paymentsTypes.setNewLinkData,
  payload,
});

const unsetNewLinkData = (): iAction => ({
  type: paymentsTypes.unsetNewLinkData,
});

const checkBlockedPayment = (): iAction => ({
  type: paymentsTypes.checkBlocked,
});

const setStatusLinkTable = (
  payload: iPaymentsState
): iAction<iPaymentsState> => ({
  type: paymentsTypes.setReportsTable,
  payload,
});

const setStatusLinkDetailActive = (
  payload: iPaymentsState
): iAction<iPaymentsState> => ({
  type: paymentsTypes.setReportsDetailActive,
  payload,
});

export const unsetStatusLinkDetailActive = (): iAction => ({
  type: paymentsTypes.unsetStatusLinkDetailActive,
});

export const unsetStatusLinkTable = (): iAction => ({
  type: paymentsTypes.unsetReportsTable,
});
