/* eslint-disable react/display-name */
import React, { FC, forwardRef, useRef, useEffect } from "react";
import { Column } from "react-table";
import TablePending from "../../tables/TablePending";

const IndeterminateCheckbox = forwardRef(
  ({ indeterminate, ...rest }: any, ref: any) => {
    const defaultRef = useRef();
    const resolvedRef = ref || defaultRef;

    useEffect(() => {
      resolvedRef.current.indeterminate;
    }, [resolvedRef, indeterminate]);

    return (
      <div className="conciliationTable__check">
        <input
          type="checkbox"
          className="dispersion__checkbox"
          ref={resolvedRef}
          {...rest}
        />
      </div>
    );
  }
);

export const PendingTable: FC<{
  information: any;
  getInfo: any;
}> = ({ information, getInfo }) => {
  let rows: Array<any> = [];

  const format = (num: number) =>
    num.toLocaleString("en-US", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });

  information.forEach((data: any) => {
    rows.push({
      date: data.createdAt ? data.createdAt.slice(0, 10) : "",
      id_client: data.clientId,
      commerce_name: data.name,
      payment_reference: data.paymentReference,
      account_clabe: data.clabe,
      amount: data.amount ? `$${format(data.amount)}` : "$0.00",
      denied_note: data.motivoDevolucion,
      payment_release: data.referencePaymentDispersionId,
    });
  });

  const cols: Array<Column> = [
    {
      Header: "Fecha",
      accessor: "date",
    },
    {
      Header: "ID Cliente",
      accessor: "id_client",
    },
    {
      Header: "Nombre",
      accessor: "commerce_name",
    },
    {
      Header: "Referencia de pago",
      accessor: "payment_reference",
    },
    {
      Header: "Cuenta CLABE destino",
      accessor: "account_clabe",
    },
    {
      Header: "Importe",
      accessor: "amount",
    },
    {
      Header: "Motivo Rechazo",
      accessor: "denied_note",
    },
    {
      Header: function checkBoxHeader({ getToggleAllRowsSelectedProps }) {
        return (
          <div className="dispersion__table__header">
            <span style={{ marginBottom: "6px" }}>Liberar pago</span>
            <IndeterminateCheckbox {...getToggleAllRowsSelectedProps()} />
          </div>
        );
      },
      accessor: "payment_release",
      Cell: function RowPaymentRelease({ row }) {
        return (
          <div>
            <IndeterminateCheckbox {...row.getToggleRowSelectedProps()} />
          </div>
        );
      },
      width: "200px",
    },
  ];

  return (
    <div style={{ marginTop: "35px" }}>
      <TablePending information={rows} cols={cols} getInfo={getInfo} />
    </div>
  );
};
