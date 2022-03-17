import React from "react";
import { ComponentWithStore } from "../../../@types/store/index";
import { wrappedOnStore } from "../../../store";
import Table from "../../tables/Table";
import { v4 as uuidv4 } from "uuid";
import { Column } from "react-table";
import TransactionsActions from "./TransactionsActions";

const TransactionsTable: ComponentWithStore = ({
  transactions: { reportsTable },
}) => {
  let rows: Array<any> = [];

  reportsTable?.forEach((data: any) => {
    rows.push({
      status: getStatus(data),
      hierarchyName: data.hierarchyName || "",
      refSpNumber: data.refSpNumber || "",
      amount: data.amount || 0,
      cardNumber: data.cardNumber || "",
      returnOperation:
        data.returnOperation !== "null" ? data.returnOperation : "",
      transactionDate: data.transactionDate || "",
      cardTypeName: data.cardTypeName || "",
      cardBrand: data.cardBrand || "",
      productDescription: data.productDescription || "",
      actions: data.folioTxn || "",
    });
  });

  const numberFormat = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  });

  function getStatus(data: any) {
    let status = 3;
    if (
      data.authorizerReplyMessage === "APROBADA" &&
      data.paymentStatus === "PAGADO"
    )
      status = 1;
    if (["DENEGADA", "REVERSADA"].includes(data.authorizerReplyMessage))
      status = 2;

    return status;
  }

  const sortDefaultRows = (allData: any[]) => {
    return allData.sort((a, b) =>
      a.refSpNumber < b.refSpNumber
        ? 1
        : a.refSpNumber === b.refSpNumber
        ? a.paymentStatus < b.paymentStatus
          ? 1
          : -1
        : -1
    );
  };
  const cols: Array<Column> = [
    {
      Header: "Estatus",
      accessor: "status",
      Cell: function cell(cell) {
        return (
          <div className="ball__container">
            <div className={`ball ball__status--${cell.value}`}>&times;</div>
          </div>
        );
      },
    },
    {
      Header: "Jerarquía del negocio",
      accessor: "hierarchyName",
    },
    {
      Header: "Referencia",
      accessor: "refSpNumber",
    },
    {
      Header: "Monto",
      accessor: "amount",
      Cell: (cell) => numberFormat.format(cell.value),
    },
    {
      Header: "Tarjeta enmascarada",
      accessor: "cardNumber",
      Cell: (cell) => cell.value.slice(-8),
    },
    {
      Header: "No. de aprobación",
      accessor: "returnOperation",
    },
    {
      Header: "Fecha y hora de transacción",
      accessor: "transactionDate",
    },
    {
      Header: "Tipo de tarjeta",
      accessor: "cardTypeName",
    },
    {
      Header: "Marca",
      accessor: "cardBrand",
      Cell: function cell(cell) {
        return <span>{cell.value === "null" ? "NA" : cell.value}</span>;
      },
    },
    {
      Header: "Producto",
      accessor: "productDescription",
    },
    {
      Header: "Acciones",
      accessor: "actions",
      Cell: function RowDetails({ cell }) {
        return (
          <div key={uuidv4() + 1} className="table__details">
            <TransactionsActions folioTxn={cell.value} />
          </div>
        );
      },
    },
  ];
  return reportsTable ? (
    <Table information={sortDefaultRows(rows)} cols={cols} />
  ) : (
    <></>
  );
};

export default wrappedOnStore(TransactionsTable);
