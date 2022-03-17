import React, { FC, useState } from "react";
import customFetch from "../../../helpers/customFetch";
import moment from "moment";
import Swal from "sweetalert2";
import useLang from "../../../hooks/useLang";
import { iCustomResponse } from "../../../@types/api/res";
import { iGlobalState, iUiState } from "../../../@types/store/states";
import { iSetManualConciliationReq } from "../../../@types/api/req";
import { useSelector } from "react-redux";
import { v4 as uuidv4 } from "uuid";

export const ConciliationCheckbox: FC<{
  rowVal: any;
  bank: string;
  getInfo: any;
  rowsData: Array<any>;
  setRowsData: Function;
}> = ({ rowVal, rowsData, setRowsData, getInfo }) => {
  const day_name: string = moment(rowVal.fechatxn).format("ddd");
  let bank: number;
  let data = rowsData;
  let index = rowsData.findIndex(function (el) {
    return el.fechatxn === rowVal.fechatxn;
  });
  // console.log(data, "data");

  const { lang } = useSelector<iGlobalState, iUiState>(({ ui }) => ui);
  const { titles } = useLang(lang);
  const dynamicName = uuidv4();
  const [checkConcile, setCheckConcile] = useState(rowVal.concile);
  // if(rowVal.totalTreasurt === rowVal.totalBank){
  //     setCheckConcile(true);
  // }

  const format = (num: number) =>
    num.toLocaleString("en-US", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });

  const postConciliationManualProcess = async () => {
    //Lanzar ms postConciliationManualProcess
    let newTotal: number;
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
    if (!number) {
      setCheckConcile(false);
    }
    if (number && parseFloat(number) > 0) {
      newTotal = parseFloat(number);
      Swal.close();
      const { value: text } = await Swal.fire({
        title: `${titles.conciliation.parameters.manual_conciliation}`,
        input: "text",
        inputLabel: `${titles.conciliation.parameters.description}`,
        inputPlaceholder: `${titles.conciliation.parameters.description}`,
        reverseButtons: true,
        showCancelButton: true,
        cancelButtonText: `${titles.conciliation.parameters.cancel}`,
        cancelButtonColor: "#ababab",
        confirmButtonText: `${titles.conciliation.parameters.save}`,
        confirmButtonColor: "#f2711c",
        inputValidator: (value) => {
          return new Promise((resolve) => {
            if (value.length > 0) {
              resolve("");
            } else {
              resolve("Por favor ingrese una descripción");
            }
          });
        },
      });
      if (text) {
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
        await customFetch<iSetManualConciliationReq, iCustomResponse>(
          "conciliation/manualConciliation",
          true,
          "POST",
          {
            comment: text,
            total_amount_bank: parseFloat(
              rowVal.totalBank.split(" ")[0].split("$")[1].replaceAll(",", "")
            ),
            total_amount_treasury: newTotal,
            acquirer_id: bank,
            status_id: 1,
            conciliation_date: rowVal.fechatxn,
          }
        )
          .then((response) => {
            setCheckConcile(true);
            Swal.close();
            if (response.codeStatus === "200") {
              // Swal.fire({
              //     icon: "success",
              //     title: `${titles.conciliation.parameters.correct_send}`,
              //     // timer: 1000,
              //     showConfirmButton: true,
              //     didClose:()=>{
              //     }
              // });
              data[index] = {
                ...data[index],
                totalTreasury: `$${format(newTotal)} `,
              };
              setRowsData(data);
              getInfo();
            } else if (response.code === "ECONNREFUSED") {
              setCheckConcile(false);
              Swal.fire({
                icon: "error",
                title: "Error",
                text: `${titles.conciliation.parameters.ms_error}`,
                timer: 3000,
                showConfirmButton: true,
              });
            } else if (response.code === "404") {
              setCheckConcile(false);
              Swal.fire({
                icon: "error",
                title: "Error",
                text: "Bad request",
              });
            } else {
              setCheckConcile(false);
              Swal.fire({
                icon: "error",
                title: "Error",
                text: `${titles.conciliation.parameters.error_send}`,
                timer: 3000,
                showConfirmButton: true,
              });
            }
          })
          .catch((error) => {
            Swal.close();
            if (error.codeStatus === "200") {
              // Swal.fire({
              //     icon: "success",
              //     title: `${titles.conciliation.parameters.correct_send}`,
              //     // timer: 1000,
              //     showConfirmButton: true,
              //     didClose:()=>{
              //     }
              // });
              data[index] = {
                ...data[index],
                totalTreasury: `$${format(newTotal)}`,
              };
              setRowsData(data);
              getInfo();
            } else if (error.code === "ECONNREFUSED") {
              setCheckConcile(false);
              Swal.fire({
                icon: "error",
                title: "Error",
                text: `${titles.conciliation.parameters.ms_error}`,
                timer: 3000,
                showConfirmButton: true,
              });
            } else if (error.code === "404") {
              setCheckConcile(false);
              Swal.fire({
                icon: "error",
                title: "Error",
                text: "Bad request",
              });
            } else {
              setCheckConcile(false);
              Swal.fire({
                icon: "error",
                title: "Error",
                text: `${titles.conciliation.parameters.error_send}`,
                timer: 3000,
                showConfirmButton: true,
              });
            }
          });
      }
      if (!text) {
        setCheckConcile(false);
      }
    }
    // if(!checkConcile){
    // }
  };
  if (day_name === "Sat" || day_name === "Fri") {
    return (
      <div className="conciliationTable__check">
        <span
          onClick={() => {}}
          style={{
            display: "flex",
            justifyContent: "center",
            width: "100%",
            color: "#354a5e",
            fontSize: "1.22rem",
            fontWeight: "bold",
          }}
        >
          N/A
        </span>
      </div>
    );
  } else if (rowVal.status === 2) {
    return (
      <div className="conciliationTable__check">
        <input
          checked={checkConcile}
          disabled={true}
          name={dynamicName}
          onChange={() => {
            postConciliationManualProcess();
            setCheckConcile(true);
          }}
          type="checkbox"
          className="conciliationTable__checkbox"
        />
      </div>
    );
  } else {
    return (
      <div className="conciliationTable__check">
        <input
          checked={checkConcile}
          disabled={
            rowVal.concile ||
            (rowVal.totalTreasury === rowVal.totalBank &&
              rowVal.totalBank !== "$0.00")
          }
          name={dynamicName}
          onChange={() => {
            postConciliationManualProcess();
            setCheckConcile(true);
          }}
          type="checkbox"
          className="conciliationTable__checkbox"
        />
      </div>
    );
  }
};
