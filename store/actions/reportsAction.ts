// import { Dispatch } from "redux";
// import { iAction } from "../../@types/store";
// import Swal from "sweetalert2";
// import customFetch from "../../helpers/customFetch";
// import {
//   iCustomResponse,
//   iDeployDetailTransactionRes,
//   iGetTransactionDetailRes,
// } from "../../@types/api/res";
// import {
//   iDeployDetailTransactionReq,
//   iGetTransactionDetailReq,
// } from "../../@types/api/req";
// import { iDetail, iTransactionDetailState } from "../../@types/store/states";
// import { transactionsTypes } from "../store-types";
// import manageErrorsMessages from "../../helpers/manageErrorsMessages";

// export const getTransactionData =
//   (data: iDeployDetailTransactionReq) => async (dispatch: any) => {
//     try {
//       Swal.fire({
//         title: "Cargando...",
//         backdrop: `
//       rgba(0,0,123,0.4)
//       left top
//       no-repeat
//     `,
//         allowOutsideClick: false,
//         didOpen: () => {
//           Swal.showLoading();
//         },
//       });

//       const { information } = await customFetch<
//         iDeployDetailTransactionReq,
//         iDeployDetailTransactionRes
//       >("detailtransactions/paymenttransactions", true, "POST", data);

//       dispatch(setDetailTable({ tableData: information?.results || [] }));

//       Swal.close();
//     } catch (err) {
//       console.log("Login error: ", err);
//       const msg = await manageErrorsMessages(
//         (err as iCustomResponse).codeStatus || "1000",
//         "es"
//       );
//       dispatch(
//         setDetailTable({
//           tableData: (err as iCustomResponse).information?.results || [],
//         })
//       );
//       Swal.fire("Error", msg, "error");
//     }
//   };
// export const downloadTableData =
//   (data: iDeployDetailTransactionReq) => async (dispatch: any) => {
//     try {
//       Swal.fire({
//         title: "Cargando...",
//         backdrop: `
//                         rgba(0,0,123,0.4)
//                         left top
//                         no-repeat
//                         `,
//         allowOutsideClick: false,
//         didOpen: () => {
//           Swal.showLoading();
//         },
//       });

//       const { information } = await customFetch<
//         iDeployDetailTransactionReq,
//         any
//       >("detailtransactions/downloadtransactions", true, "POST", data);

//       dispatch(setDetailTable(information));

//       Swal.close();
//     } catch (err) {
//       console.log("Login error: ", err);
//       const msg = await manageErrorsMessages(
//         (err as iCustomResponse).codeStatus || "1000",
//         "es"
//       );
//       Swal.fire("Error", msg, "error");
//     }
//   };

// const setDetailTable = (
//   payload: iTransactionDetailState
// ): iAction<iTransactionDetailState> => ({
//   type: transactionsTypes.setTable,
//   payload,
// });

// const setTransactionDetail = (
//   payload: iTransactionDetailState
// ): iAction<iTransactionDetailState> => ({
//   type: transactionTypes.setDetail,
//   payload,
// });

// const setDetail = (payload: iDetail): iAction<iDetail> => ({
//   type: transactionTypes.setDetailView,
//   payload,
// });

// export const clearDetail = (): iAction => ({
//   type: transactionTypes.unsetDetail,
// });

// export const clearDetailView = (): iAction => ({
//   type: transactionTypes.unsetDetailview,
// });

export {};
