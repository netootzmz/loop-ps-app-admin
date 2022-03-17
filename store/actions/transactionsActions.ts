import Swal from "sweetalert2";
import {
  iTransactionsTableReq,
  iGetTransactionDetailReq,
} from "../../@types/api/req";
import customFetch from "../../helpers/customFetch";
import {
  iCustomResponse,
  iTransactionsTableRes,
  iGetTransactionDetailRes,
} from "../../@types/api/res";
import manageErrorsMessages from "../../helpers/manageErrorsMessages";
import { iAction } from "../../@types/store";
import { transactionsTypes } from "../store-types";
import { iTransactionsState } from "../../@types/store/states";
import { Dispatch } from "redux";

export const startGettingTransactionTableData =
  (data: iTransactionsTableReq) => async (dispatch: Dispatch<iAction>) => {
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
        iTransactionsTableReq,
        iTransactionsTableRes
      >("detailtransactions/paymenttransactions", true, "POST", data);

      dispatch(
        setTransactionsTable({ reportsTable: information?.results || [] })
      );

      Swal.close();
    } catch (err) {
      console.log("Login error: ", err);
      const msg = await manageErrorsMessages(
        (err as iCustomResponse).codeStatus || "1000",
        "es"
      );
      dispatch(
        setTransactionsTable({
          reportsTable: (err as iCustomResponse).information?.results || [],
        })
      );
      Swal.fire({ title: msg, icon: "info", confirmButtonColor: "#f2711c" });
    }
  };

export const startGettingTransactionDetail =
  (data: { folioTxn: string }) => async (dispatch: Dispatch<iAction>) => {
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
        iGetTransactionDetailReq,
        iGetTransactionDetailRes
      >("reports/getdetail", true, "POST", data);

      dispatch(
        setTransactionActive({ transactionActive: information?.results })
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

const setTransactionsTable = (
  payload: iTransactionsState
): iAction<iTransactionsState> => ({
  type: transactionsTypes.setReportsTable,
  payload,
});

const setTransactionActive = (
  payload: iTransactionsState
): iAction<iTransactionsState> => ({
  type: transactionsTypes.setTransactionActive,
  payload,
});
export const unsetTransactionActive = (): iAction => ({
  type: transactionsTypes.unsetTransactionActive,
});

export const unsetTransactionsTable = (): iAction => ({
  type: transactionsTypes.unsetReportsTable,
});
