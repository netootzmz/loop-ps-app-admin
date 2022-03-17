import React from "react";
import { Column } from "react-table";
import { wrappedOnStore } from "../../../../store";
import Table from "../../../tables/Table";
import { ComponentWithStore } from "../../../../@types/store/index";
import moment from "moment";
import UsersActions from "./UsersActions";

const UsersTable: ComponentWithStore = ({ preferences }) => {
  const cols: Array<Column> = [
    {
      Header: "Estatus",
      accessor: "status_id",
      Cell: function cell(cell) {
        return (
          <div className="ball__container">
            <div className={`ball ball__status--${cell.value}`}>&times;</div>
          </div>
        );
      },
    },
    {
      Header: "Jerarquía",
      accessor: "hierarchy",
    },
    {
      Header: "Nombre",
      accessor: "name_user",
    },
    {
      Header: "Perfil",
      accessor: "role",
      Cell: (cell) =>
        preferences.users?.filters?.profile.find(
          (el) => el.optionId === cell.value
        )?.optionDescription || "",
    },
    {
      Header: "Última sesión",
      accessor: "last_login",
      Cell: (cell) => moment(cell.value).format("DD-MM-YYYY HH:mm:ss"),
    },
    {
      Header: "Acciones",
      accessor: "actions",
      Cell: function cell(cell) {
        return <UsersActions id={cell.value.id} status={cell.value.status} />;
      },
    },
  ];

  return preferences.users?.tableData !== undefined ? (
    <Table
      cols={cols}
      information={
        preferences.users.tableData.map((item) => ({
          ...item,
          actions: { id: item.id, status: item.status_id },
        })) || []
      }
    />
  ) : (
    <></>
  );
};

export default wrappedOnStore(UsersTable);
