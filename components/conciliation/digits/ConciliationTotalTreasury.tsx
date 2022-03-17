import React, { FC } from "react";
import customFetch from "../../../helpers/customFetch";
import Swal from "sweetalert2";
import { iSetTreasuryAmountReq } from "../../../@types/api/req";
import { iCustomResponse } from "../../../@types/api/res";
import moment from "moment";

export const ConciliationTotalTreasury: FC<{
  rowVal: any;
  titles: Partial<any & {}>;
  getInfo: any;
  rowsData: Array<any>;
  setRowsData: Function;
}> = ({ rowVal, titles, rowsData, setRowsData, getInfo }) => {
  const day_name: string = moment(rowVal.fechatxn).format("ddd");
  let bank: number;

  let data = rowsData;
  let index = rowsData.findIndex(function (el) {
    return el.fechatxn === rowVal.fechatxn;
  });

  const format = (num: number) =>
    num.toLocaleString("en-US", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });

  const configureTreasuryAmount = async () => {
    if (rowVal.bank === "BANORTE") {
      bank = 3;
    } else if (rowVal.bank === "ACENDO") {
      bank = 1;
    } else {
      bank = 2;
    }
    const newAmount = Swal.mixin({
      customClass: {
        input: "conciliationTable__input",
      },
    });
    const { value: number } = await newAmount.fire({
      title: `${titles.conciliation.parameters.treasury_title}`,
      input: "text",
      inputLabel: `${titles.conciliation.parameters.treasury_placeholder}`,
      inputPlaceholder: `${titles.conciliation.parameters.treasury_placeholder}`,
      reverseButtons: true,
      showCancelButton: true,
      cancelButtonText: `${titles.conciliation.parameters.treasury_cancel}`,
      cancelButtonColor: "#ababab",
      confirmButtonText: `${titles.conciliation.parameters.treasury_save}`,
      confirmButtonColor: "#f2711c",
      inputValidator: (value) => {
        return new Promise((resolve) => {
          if (
            !isNaN(parseFloat(value)) &&
            isFinite(parseFloat(value)) &&
            parseFloat(value) > 0
          ) {
            resolve("");
          } else {
            resolve(`${titles.conciliation.parameters.more_than_zero}`);
          }
        });
      },
    });
    if (number && parseFloat(number) > 0) {
      // Swal.fire({
      //     title: `${titles.conciliation.parameters.processing}`,
      //     backdrop: `
      //     rgba(0,0,123,0.4)
      //     left top
      //     no-repeat
      // `,
      //     allowOutsideClick: false,
      //     didOpen: () => {
      //         Swal.showLoading();
      //     },
      // });
      await customFetch<iSetTreasuryAmountReq, iCustomResponse>(
        "conciliation/configureTreasury",
        true,
        "POST",
        {
          acquireId: bank,
          amount: parseFloat(number),
          dateConciliation: rowVal.fechatxn,
        }
      )
        .then((response) => {
          Swal.close();

          if (response.codeStatus == "00") {
            // rowVal.totalTreasury = number;
            // Swal.fire({
            //     icon: "success",
            //     title: response.message,
            //     timer: 2000,
            //     showConfirmButton: true
            // })
            data[index] = {
              ...data[index],
              totalTreasury: `$${format(parseFloat(number))} MXN`,
            };
            setRowsData(data);
            getInfo();
          } else {
            Swal.fire({
              icon: "error",
              title: `${titles.conciliation.parameters.error}`,
              text: `${titles.conciliation.parameters.treasury_not_register}`,
              timer: 3000,
            });
          }
        })
        .catch(() => {
          Swal.close();
          Swal.fire({
            icon: "error",
            title: `${titles.conciliation.parameters.error}`,
            text: `${titles.conciliation.parameters.treasury_not_obtain}`,
          });
        });
    } else if (parseFloat(number) < 0) {
      Swal.fire({
        icon: "error",
        title: `${titles.conciliation.parameters.error}`,
        text: `${titles.conciliation.parameters.treasury_not_over}`,
      });
    }
  };
  // return(
  //     <button
  //         className="btn btn--configureTreasury"
  //         onClick={()=>configureTreasuryAmount()}
  //     >
  //         {rowVal.totalTreasury}
  //     </button>
  // )
  // if(rowVal.concile){
  //     return(
  //         <button
  //             className="btn btn--configureTreasury"
  //             onClick={()=>configureTreasuryAmount()}
  //             disabled={true}
  //         >
  //             {rowVal.totalTreasury}
  //         </button>
  //     )
  // }else{
  // }
  if (day_name === "Sat" || day_name === "Fri") {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          width: "100%",
          textDecorationLine: "line-through",
          color: "#354a5e",
          fontSize: "1.22rem",
          fontWeight: "bold",
        }}
      >
        ------
      </div>
    );
  } else {
    if (rowVal.totalTreasury === "$0.00") {
      return (
        <div
          style={{ display: "flex", justifyContent: "center", width: "100%" }}
        >
          <button
            className="btn btn--configureTreasury"
            onClick={() => configureTreasuryAmount()}
          >
            {rowVal.totalTreasury}
          </button>
        </div>
      );
    } else {
      return (
        <div
          style={{ display: "flex", justifyContent: "center", width: "100%" }}
        >
          <button
            className="btn btn--configureTreasury"
            onClick={() => configureTreasuryAmount()}
            disabled={true}
          >
            {rowVal.totalTreasury}
          </button>
        </div>
      );
    }
  }
};
