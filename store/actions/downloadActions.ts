import Swal from "sweetalert2";
import { iDownloadDetailTransactionReq } from "../../@types/api/req";
import { iCustomResponse } from "../../@types/api/res";
import customFetch from "../../helpers/customFetch";
import manageErrorsMessages from "../../helpers/manageErrorsMessages";

export const downloadTableData =
  (data: iDownloadDetailTransactionReq) => async () => {
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
      await customFetch<iDownloadDetailTransactionReq, any>(
        "detailtransactions/downloadtransactions",
        true,
        "POST",
        data
      );

      Swal.close();
    } catch (err) {
      console.log("Login error: ", err);
      const msg = await manageErrorsMessages(
        (err as iCustomResponse).codeStatus || "1000",
        "es"
      );
      Swal.fire("Error", msg, "error");
    }
  };
