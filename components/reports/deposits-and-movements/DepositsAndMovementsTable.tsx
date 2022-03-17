/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { Column } from "react-table";
import { v4 as uuidv4 } from "uuid";
import { useRouter } from "next/router";
import { useQueryClient } from "react-query";

import Table from "components/tables/Table";
import svgs from "../../../helpers/svgs";
import SvgWrapper from "../../SvgWrapper";

import { useFilters } from "./DepositsAndMovementsFiltersContext";
import { fetcher } from "api/queries/DepositsAndMovementsServPtalController/getDepositsAndMovementsServPtal";
import {
  IFilters,
  Result,
} from "../../../@types/api/queries/DepositsAndMovementsServPtalController/getDepositsAndMovementsServPtal";
import moment from "moment";
moment.locale("es");

const dispersionStatus = [
  { cve: "PAG", value: "Pagado" },
  { cve: "NOPAG", value: "No Pagado" },
  { cve: "PENDPAG", value: "Pendiente de pago" },
  { cve: "RECHPAG", value: "Pago Rechazado" },
];

function _objectWithoutProperties(obj: any, keys: Array<string>) {
  var target: any = {};
  for (var i in obj) {
    if (keys.indexOf(i) >= 0) continue;
    if (!Object.prototype.hasOwnProperty.call(obj, i)) continue;
    target[i] = obj[i];
  }
  return target;
}

const getDispersionStatus = (cve: string) => {
  const res = dispersionStatus.filter((i) => {
    if (i.cve === cve) {
      return i;
    }
  });

  return res[0].value;
};

const DepositsAndMovementsTable = () => {
  const [data, setData] = useState([]);
  const router = useRouter();
  const { filters, updateFilters } = useFilters();
  const queryClient = useQueryClient();
  const numberFormat = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  });

  useEffect(() => {
    const justFilters = _objectWithoutProperties(filters, ["updateTable"]);
    // console.log("fetch - iinit table");
    // console.log(justFilters);
    fetchAPI(justFilters);
  }, []);

  useEffect(() => {
    if (filters.updateTable) {
      const justFilters = _objectWithoutProperties(filters, ["updateTable"]);
      // console.log("fetch - update table");
      // console.log(justFilters);
      fetchAPI(justFilters);
      updateFilters({ updateTable: false });
    }
  }, [filters]);

  const fetchAPI = async (filters: Partial<IFilters>) => {
    try {
      const data: any = await queryClient.fetchQuery(
        ["getDepositsAndMovementsServPtal", filters],
        () => fetcher(filters)
      );
      const sanityData = data.results.map((item: Result) => {
        return {
          depositDate: moment(
            `${item.createdAt.dayOfMonth} ${item.createdAt.month} ${item.createdAt.year}`
          ).format("DD/MM/YYYY"),
          depositTime: `${item.createdAt.hour}:${item.createdAt.minute}:${item.createdAt.second}`,
          paymentReference: item.paymentReference,
          clabe: item.clabe,
          trackingKey: item.payment_code,
          depositedAmount:
            item.dispersionStatusCve === "PAG"
              ? item.amount
              : getDispersionStatus(item.dispersionStatusCve),
          balance: item.dispersionStatusCve === "PAG" ? 0 : item.amount,
        };
      });
      setData(sanityData);
      console.log("data", sanityData);
    } catch (error) {
      console.log("no data");
      setData([]);
    }
  };

  const cols: Array<Column> = [
    {
      Header: "Fecha de depósito",
      accessor: "depositDate",
    },
    {
      Header: "Hora depósito",
      accessor: "depositTime",
    },
    {
      Header: "Referencia de pago",
      accessor: "paymentReference",
      Cell: function paymentReference(cell) {
        return <b>{cell.value}</b>;
      },
    },
    {
      Header: "Cuenta CLABE",
      accessor: "clabe",
    },
    {
      Header: "Folio/Clave de rastreo",
      accessor: "trackingKey",
      Cell: function trackingKey(cell) {
        return <b>{cell.value}</b>;
      },
    },
    {
      Header: "Monto depositado",
      accessor: "depositedAmount",
      Cell: function (cell) {
        if (typeof cell.value === "string") {
          return cell.value;
        } else {
          return numberFormat.format(cell.value);
        }
      },
    },
    {
      Header: "Saldo",
      accessor: "balance",
      Cell: (cell) => numberFormat.format(cell.value),
    },
    {
      Header: "Acciones",
      accessor: "id",
      disableSortBy: true,
      Cell: function RowDetails({ cell }) {
        return (
          <div key={uuidv4() + 1} className="">
            <button
              type="button"
              className="btn btn--icon btn--transactions"
              onClick={() => {
                router.push(`/reports/deposits-and-movements/${cell.value}`);
              }}
            >
              <SvgWrapper id={svgs.view} className="svg svg--x-small" />
            </button>
          </div>
        );
      },
    },
  ];

  return (
    <section className="deposits-and-movements__table animate__animated animate__fadeInRight">
      <h3 className="filters__title">
        {"Del " +
          moment(filters.startDate).format("DD MMMM YYYY") +
          " al " +
          moment(filters.endDate).format("DD MMMM YYYY")}
      </h3>
      <div className="card__table">
        <Table information={data} cols={cols} />
      </div>
    </section>
  );
};

export default DepositsAndMovementsTable;
