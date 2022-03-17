import React from "react";
import {ComponentWithStore} from "../../../@types/store/index";
import {wrappedOnStore} from "../../../store";
import Table from "../../tables/Table";
import {v4 as uuidv4} from "uuid";
import {Column} from "react-table";
import StatusLinkActions from "./StatusLinkActions";

const StatusLinkTable: ComponentWithStore = ({
                                                 payments: {reportsTable},
                                             }) => {
    const cols: Array<Column> = [
        {
            Header: "Estatus",
            accessor: "paymentStatus",
            Cell: function cell(cell) {
                return (
                    <div className="ball__container">
                        <div
                            className={`ball ball__status--${cell.value.replaceAll(" ", "")}`}
                        >
                            &times;
                        </div>
                    </div>
                );
            },
        },
        {
            Header: "Jerarquía del negocio",
            accessor: "hierarchy",
        },
        {
            Header: "Referencia",
            accessor: "tradeReference",
        },
        {
            Header: "Monto",
            accessor: "amount",
            Cell: (cell) => ("$" + cell.value),
        },
        {
            Header: "Fecha y hora de creación",
            accessor: "transactionCreatedAt",
        },
        {
            Header: "Usuario",
            accessor: "createdAtUser",
        },
        {
            Header: "Modalidad",
            accessor: "modality",
            Cell: () => ("Individual"),
        },
        {
            Header: "Acciones",
            accessor: "actions",
            disableSortBy: true,
            Cell: function RowDetails({cell}) {
                return (
                    <div key={uuidv4() + 1} className="table__details">
                        <StatusLinkActions action={cell.value}/>
                    </div>
                );
            },
        },
    ];
    return reportsTable ? (
        <Table
            information={reportsTable.map((el) => ({
                ...el,
                actions: {folioTx: el.folio, status: el.paymentStatus},
            }))}
            cols={cols}
        />
    ) : (
        <></>
    );
};

export default wrappedOnStore(StatusLinkTable);
