import React, { FC, useState } from "react";
import moment from "moment";
import TableConciliation from "../../tables/TableConciliation";
import { Column } from "react-table";
import { v4 as uuidv4 } from "uuid";
import { ConciliationCheckbox } from "./ConciliationCheckbox";
import { iGetConciliationTableInfoRes } from "../../../@types/api/res";
// import { ConciliationDownloadFile } from './ConciliationDownloadFile';

import { ConciliationTotalTreasury } from "./ConciliationTotalTreasury";
// import SvgWrapper from '../../SvgWrapper';
// import svgs from '../../../helpers/svgs';
// import { ConciliationDownloadSettled } from './ConciliationDownloadSettled';
import { ConciliationLogs } from "./ConciliationLogs";

export const ConciliationTable: FC<{
  information: iGetConciliationTableInfoRes | any;
  bank: string;
  titles: Partial<any & {}>;
  getInfo: any;
}> = ({ information, bank, titles, getInfo }) => {
  // eslint-disable-next-line react-hooks/exhaustive-deps
  let rows: Array<any> = [];
  const [rowsData, setRowsData] = useState<Array<any>>(rows);

  const format = (num: number) =>
    num.toLocaleString("en-US", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });

  if (information.data) {
    information.data.forEach((data: any) => {
      rows.push({
        fechatxn: data["summary-transaction-date"],
        bank: data["summary-bank"],
        status: data["summary-is-concilied"],
        noTxn: data["summary-concilied"]["smart-notxn"] || "00",
        noTxnBank: data["summary-concilied"]["bank-notxn"] || "00",
        amountSmart: data["summary-concilied"]["smart-amount"]
          ? `$${format(data["summary-concilied"]["smart-amount"])}`
          : "$0.00",
        bankAmount: data["summary-concilied"]["bank-amount"]
          ? `$${format(data["summary-concilied"]["bank-amount"])}`
          : "$0.00",
        downloadProcessed: true,
        noTxnSmart: data["summary-settlement"]["smart-notxn"] || "00",
        noTxnBank2: data["summary-settlement"]["bank-notxn"] || "00",
        smartAmount: data["summary-settlement"]["smart-amount"]
          ? `$${format(data["summary-settlement"]["smart-amount"])}`
          : "$0.00",
        bankAmount2: data["summary-settlement"]["bank-amount"]
          ? `$${format(data["summary-settlement"]["bank-amount"])}`
          : "$0.00",
        downloadSettled: true,
        contraCharge: data["summary-settlement"]["chargeback-amount"]
          ? `$${format(data["summary-settlement"]["chargeback-amount"])}`
          : "$0.00",
        devolution: data["summary-settlement"]["refund-amount"]
          ? `$${format(data["summary-settlement"]["refund-amount"])}`
          : "$0.00",
        totalBank: data["summary-total-bank-amount"]
          ? `$${format(data["summary-total-bank-amount"])}`
          : "$0.00",
        totalTreasury: data["summary-total-treasury-amount"]
          ? `$${format(data["summary-total-treasury-amount"])}`
          : "$0.00",
        concile: data["manual-conciliation"]["hasManual"],
        logs: [
          data["manual-conciliation"]["createAt"],
          data["manual-conciliation"]["userName"] || "N/A",
          data["manual-conciliation"]["description"],
          data["amount-treasury"]["created_at"] || null,
          data["amount-treasury"]["userName"] || null,
          data["amount-treasury"]["amount"]
            ? format(data["amount-treasury"]["amount"])
            : "0.00",
        ],
      });
    });
  }

  rows.forEach((data: any) => {
    // console.log(data, "hola");
    const day_name: string = moment(data.fechatxn).format("ddd");
    let total: number = 0;
    let totalTreasury: number = 0;
    if (day_name === "Sun") {
      totalTreasury = parseFloat(
        data.totalTreasury.split(" ")[0].split("$")[1].replaceAll(",", "")
      );
      const sunday_index = rows.findIndex((element: any) => {
        if (element.fechatxn === data.fechatxn && element.bank === data.bank) {
          return true;
        }
      });
      const saturday_index = rows.findIndex((element: any) => {
        if (
          element.fechatxn ===
            moment(data.fechatxn).subtract(1, "days").format("YYYY-MM-DD") &&
          element.bank === data.bank
        ) {
          return true;
        }
      });
      const friday_index = rows.findIndex((element: any) => {
        if (
          element.fechatxn ===
            moment(data.fechatxn).subtract(2, "days").format("YYYY-MM-DD") &&
          element.bank === data.bank
        ) {
          return true;
        }
      });
      total +=
        saturday_index !== -1
          ? parseFloat(
              rows[saturday_index].totalBank
                .split(" ")[0]
                .split("$")[1]
                .replaceAll(",", "")
            )
          : 0.0;
      total +=
        friday_index !== -1
          ? parseFloat(
              rows[friday_index].totalBank
                .split(" ")[0]
                .split("$")[1]
                .replaceAll(",", "")
            )
          : 0.0;
      total += parseFloat(
        data.totalBank.split(" ")[0].split("$")[1].replaceAll(",", "")
      );
      console.log(totalTreasury, "tesoreria");
      if (totalTreasury === Math.round(total * 100) / 100) {
        rows[saturday_index] ? (rows[saturday_index].status = 2) : false;
        rows[friday_index] ? (rows[friday_index].status = 2) : false;
        rows[sunday_index] ? (rows[sunday_index].status = 2) : false;
      }
    }
  });

  console.log(rows);

  const cols: Array<Column> = [
    {
      Header: `${titles.conciliation.parameters.date_txn}`,
      accessor: "fechatxn",
    },
    {
      Header: `${titles.conciliation.parameters.bank}`,
      accessor: "bank",
      Cell: function RowBank({ cell }) {
        return (
          <span className="conciliationTable__bank">
            {cell.row.values.bank}
          </span>
        );
      },
    },
    {
      Header: `${titles.conciliation.parameters.status_placeholder}`,
      accessor: "status",
      Cell: function RowStatus({ cell }) {
        if (
          moment(cell.row.values.fechatxn).format("ddd") === "Fri" ||
          moment(cell.row.values.fechatxn).format("ddd") === "Sat" ||
          moment(cell.row.values.fechatxn).format("ddd") === "Sun"
        ) {
          if (
            cell.row.values.noTxn === cell.row.values.noTxnBank &&
            cell.row.values.bankAmount === cell.row.values.amountSmart &&
            cell.row.values.noTxnSmart === cell.row.values.noTxnBank2 &&
            cell.row.values.smartAmount === cell.row.values.bankAmount2 &&
            cell.row.values.status === 2
          ) {
            return (
              <div className="conciliationTable__conciliated">
                {cell.row.values.status}
              </div>
            );
          } else {
            return (
              <div className="conciliationTable__noConciliated">
                {cell.row.values.status}
              </div>
            );
          }
        } else if (
          cell.row.values.noTxn === cell.row.values.noTxnBank &&
          cell.row.values.bankAmount === cell.row.values.amountSmart &&
          cell.row.values.noTxnSmart === cell.row.values.noTxnBank2 &&
          cell.row.values.smartAmount === cell.row.values.bankAmount2 &&
          cell.row.values.totalBank === cell.row.values.totalTreasury
        ) {
          return (
            <div className="conciliationTable__conciliated">
              {cell.row.values.status}
            </div>
          );
        } else {
          return (
            <div className="conciliationTable__noConciliated">
              {cell.row.values.status}
            </div>
          );
        }
      },
    },
    {
      Header: `${titles.conciliation.parameters.no_txn_smart}`,
      accessor: "noTxn",
      Cell: function RowTxnSmart1({ cell }) {
        if (cell.row.values.noTxn === cell.row.values.noTxnBank) {
          return (
            <div className="conciliationTable">
              <span className="conciliationTable__value">
                {cell.row.values.noTxn}
              </span>
            </div>
          );
        } else {
          return (
            <div className="conciliationTable">
              <span className="conciliationTable__valueFalse">
                {cell.row.values.noTxn}
              </span>
            </div>
          );
        }
      },
    },
    {
      Header: `${titles.conciliation.parameters.no_txn_bank}`,
      accessor: "noTxnBank",
      Cell: function RowTxnBank1({ cell }) {
        if (cell.row.values.noTxn === cell.row.values.noTxnBank) {
          return (
            <div className="conciliationTable">
              <span className="conciliationTable__value">
                {cell.row.values.noTxnBank}
              </span>
            </div>
          );
        } else {
          return (
            <div className="conciliationTable">
              <span className="conciliationTable__valueFalse">
                {cell.row.values.noTxnBank}
              </span>
            </div>
          );
        }
      },
    },
    {
      Header: `${titles.conciliation.parameters.smart_amount}`,
      accessor: "amountSmart",
      Cell: function RowSmartAmount({ cell }) {
        if (cell.row.values.bankAmount === cell.row.values.amountSmart) {
          return (
            <div className="conciliationTable">
              <span className="conciliationTable__value">
                {cell.row.values.amountSmart}
              </span>
            </div>
          );
        } else {
          return (
            <div className="conciliationTable">
              <span className="conciliationTable__valueFalse">
                {cell.row.values.amountSmart}
              </span>
            </div>
          );
        }
      },
    },
    {
      Header: `${titles.conciliation.parameters.bank_amount}`,
      accessor: "bankAmount",
      Cell: function RowBankAmount({ cell }) {
        if (cell.row.values.bankAmount === cell.row.values.amountSmart) {
          return (
            <div className="conciliationTable">
              <span className="conciliationTable__value">
                {cell.row.values.bankAmount}
              </span>
            </div>
          );
        } else {
          return (
            <div className="conciliationTable">
              <span className="conciliationTable__valueFalse">
                {cell.row.values.bankAmount}
              </span>
            </div>
          );
        }
      },
    },
    // {
    //     Header: <SvgWrapper id={svgs.conciliationHeadDownload} className="svg svg--small"/>,
    //     accessor: "downloadProccessed",
    //     Cell: function RowDownloadProcessed({cell}){
    //         return(
    //             <div className="registerAdjust__table" key={uuidv4() + 1}>
    //                 <ConciliationDownloadFile
    //                     rowVal={cell.row.values}
    //                     bank={bank}
    //                     titles={titles}
    //                 />
    //             </div>
    //         )
    //     }
    // },
    {
      Header: `${titles.conciliation.parameters.no_txn_smart}`,
      accessor: "noTxnSmart",
      Cell: function RowTxnSmart2({ cell }) {
        if (cell.row.values.noTxnSmart === cell.row.values.noTxnBank2) {
          return (
            <div className="conciliationTable">
              <span className="conciliationTable__value">
                {cell.row.values.noTxnSmart}
              </span>
            </div>
          );
        } else {
          return (
            <div className="conciliationTable">
              <span className="conciliationTable__valueFalse">
                {cell.row.values.noTxnSmart}
              </span>
            </div>
          );
        }
      },
    },
    {
      Header: `${titles.conciliation.parameters.no_txn_bank}`,
      accessor: "noTxnBank2",
      Cell: function RowTxnBank2({ cell }) {
        if (cell.row.values.noTxnSmart === cell.row.values.noTxnBank2) {
          return (
            <div className="conciliationTable">
              <span className="conciliationTable__value">
                {cell.row.values.noTxnBank2}
              </span>
            </div>
          );
        } else {
          return (
            <div className="conciliationTable">
              <span className="conciliationTable__valueFalse">
                {cell.row.values.noTxnBank2}
              </span>
            </div>
          );
        }
      },
    },
    {
      Header: `${titles.conciliation.parameters.smart_amount}`,
      accessor: "smartAmount",
      Cell: function RowSmartAmount2({ cell }) {
        if (cell.row.values.smartAmount === cell.row.values.bankAmount2) {
          return (
            <div className="conciliationTable">
              <span className="conciliationTable__value">
                {cell.row.values.smartAmount}
              </span>
            </div>
          );
        } else {
          return (
            <div className="conciliationTable">
              <span className="conciliationTable__valueFalse">
                {cell.row.values.smartAmount}
              </span>
            </div>
          );
        }
      },
    },
    {
      Header: `${titles.conciliation.parameters.bank_amount}`,
      accessor: "bankAmount2",
      Cell: function RowBankAmount2({ cell }) {
        if (cell.row.values.smartAmount === cell.row.values.bankAmount2) {
          return (
            <div className="conciliationTable">
              <span className="conciliationTable__value">
                {cell.row.values.bankAmount2}
              </span>
            </div>
          );
        } else {
          return (
            <div className="conciliationTable">
              <span className="conciliationTable__valueFalse">
                {cell.row.values.bankAmount2}
              </span>
            </div>
          );
        }
      },
    },
    // {
    //     Header: <SvgWrapper id={svgs.conciliationHeadDownload} className="svg svg--small"/>,
    //     accessor: "downloadSettled",
    //     Cell: function RowDownloadSettled({cell}){
    //         return(
    //             <ConciliationDownloadSettled
    //                 rowVal={cell.row.values}
    //                 bank={bank}
    //                 titles={titles}
    //             />
    //         )
    //     }
    // },
    {
      Header: `${titles.conciliation.parameters.chargeback}`,
      accessor: "contraCharge",
    },
    {
      Header: `${titles.conciliation.parameters.refund}`,
      accessor: "devolution",
    },
    {
      Header: `${titles.conciliation.parameters.total_bank}`,
      accessor: "totalBank",
      Cell: function RowTotalBank({ cell }) {
        if (
          moment(cell.row.values.fechatxn).format("ddd") === "Fri" ||
          moment(cell.row.values.fechatxn).format("ddd") === "Sat" ||
          moment(cell.row.values.fechatxn).format("ddd") === "Sun"
        ) {
          if (cell.row.values.status === 2) {
            return (
              <div className="conciliationTable">
                <span className="conciliationTable__value">
                  {cell.row.values.totalBank}
                </span>
              </div>
            );
          } else {
            return (
              <div className="conciliationTable">
                <span className="conciliationTable__valueFalse">
                  {cell.row.values.totalBank}
                </span>
              </div>
            );
          }
        } else if (
          cell.row.values.totalBank === cell.row.values.totalTreasury
        ) {
          return (
            <div className="conciliationTable">
              <span className="conciliationTable__value">
                {cell.row.values.totalBank}
              </span>
            </div>
          );
        } else {
          return (
            <div className="conciliationTable">
              <span className="conciliationTable__valueFalse">
                {cell.row.values.totalBank}
              </span>
            </div>
          );
        }
      },
    },
    {
      Header: `${titles.conciliation.parameters.total_treasury}`,
      accessor: "totalTreasury",
      Cell: function RowTreasury({ cell }) {
        return (
          <div key={uuidv4() + 1}>
            <ConciliationTotalTreasury
              rowVal={cell.row.values}
              titles={titles}
              getInfo={getInfo}
              rowsData={rowsData}
              setRowsData={setRowsData}
            />
          </div>
        );
      },
    },
    {
      Header: `${titles.conciliation.parameters.manual_conciliation}`,
      accessor: "concile",
      Cell: function RowConcile({ cell }) {
        return (
          <div className="registerAdjust__table" key={uuidv4() + 1}>
            <ConciliationCheckbox
              rowVal={cell.row.values}
              bank={bank}
              getInfo={getInfo}
              rowsData={rowsData}
              setRowsData={setRowsData}
            />
          </div>
        );
      },
    },
    {
      Header: "",
      accessor: "logs",
      Cell: function RowLogs({ cell }) {
        return <ConciliationLogs rowVal={cell.row.values} titles={titles} />;
      },
    },
  ];
  return (
    <div style={{ marginTop: "25px" }}>
      <h3 className="filters__title">{`${titles.conciliation.parameters.conciliation}`}</h3>
      <TableConciliation information={rows!} cols={cols} titles={titles} />
    </div>
  );
};
