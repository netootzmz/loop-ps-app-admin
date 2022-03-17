import React from "react";
import { useRouter } from "next/router";
import { Column } from "react-table";

import Table from "components/tables/Table";
import svgs from "helpers/svgs";
import SvgWrapper from "../../SvgWrapper";

interface Props {
  depositId: string;
}

const DepositDetailsContainer = ({ depositId }: Props) => {
  const router = useRouter();
  console.log(depositId);

  const colsTwo: Array<Column> = [
    {
      Header: "Total a depositar",
      accessor: "depositTotal",
    },
  ];

  const dataTwo = [
    { depositTotal: 0 },
    { depositTotal: 0 },
    { depositTotal: 0 },
    { depositTotal: 0 },
    { depositTotal: 0 },
  ];

  const cols: Array<Column> = [
    {
      Header: "Hora",
      accessor: "time",
    },
    {
      Header: "Operación",
      accessor: "operation",
    },
    {
      Header: "Referencia Smart",
      accessor: "smartReference",
    },
    {
      Header: "Referencia Cliente",
      accessor: "customerReference",
    },
    {
      Header: "Monto",
      accessor: "amount",
    },
    {
      Header: "Propina",
      accessor: "propina",
    },
    {
      Header: "Tipo tasa",
      accessor: "tasaType",
    },
    {
      Header: "Comisión Base ($)",
      accessor: "baseComision",
    },
    {
      Header: "Sobre Tasa ($)",
      accessor: "tasaOver",
    },
    {
      Header: "Comisión Total ($)",
      accessor: "totalComision",
    },
    {
      Header: "IVA Comisión Base ($)",
      accessor: "ivaBaseComision",
    },
  ];

  const data = [
    {
      time: "HH/MM/SS",
      operation: "Operación",
      smartReference: "XXX000",
      customerReference: "XXX000",
      amount: 0,
      propina: 0,
      tasaType: "Tipo",
      baseComision: 0,
      tasaOver: 0,
      totalComision: 0,
      ivaBaseComision: 0,
    },
    {
      time: "HH/MM/SS",
      operation: "Operación",
      smartReference: "XXX000",
      customerReference: "XXX000",
      amount: 0,
      propina: 0,
      tasaType: "Tipo",
      baseComision: 0,
      tasaOver: 0,
      totalComision: 0,
      ivaBaseComision: 0,
    },
    {
      time: "HH/MM/SS",
      operation: "Operación",
      smartReference: "XXX000",
      customerReference: "XXX000",
      amount: 0,
      propina: 0,
      tasaType: "Tipo",
      baseComision: 0,
      tasaOver: 0,
      totalComision: 0,
      ivaBaseComision: 0,
    },
    {
      time: "HH/MM/SS",
      operation: "Operación",
      smartReference: "XXX000",
      customerReference: "XXX000",
      amount: 0,
      propina: 0,
      tasaType: "Tipo",
      baseComision: 0,
      tasaOver: 0,
      totalComision: 0,
      ivaBaseComision: 0,
    },
    {
      time: "HH/MM/SS",
      operation: "Operación",
      smartReference: "XXX000",
      customerReference: "XXX000",
      amount: 0,
      propina: 0,
      tasaType: "Tipo",
      baseComision: 0,
      tasaOver: 0,
      totalComision: 0,
      ivaBaseComision: 0,
    },
  ];

  return (
    <>
      <section className="header-message animate__animated animate__fadeInRight">
        <h1 className="h2">
          <span
            onClick={() => {
              router.back();
            }}
          >
            <SvgWrapper id={svgs.arrLeft} className="svg svg--small" />
          </span>
          Depósitos del día Lunes 13 de Septiembre 2021 - Referencia de pago:
          0002046
        </h1>
      </section>
      <section className="container-top-colum animate__animated animate__fadeInRight">
        <section className="container-main-cards">
          <article className="card">
            <div className="card-container">
              <h2 className="h2 title">Balance anterior</h2>
              <SvgWrapper
                id={svgs.info}
                className="svg svg--x-small color-secondary"
              />
            </div>
            <p className="h2 subtitle">$0.00</p>
          </article>
          <article className="card">
            <div className="card-container">
              <h2 className="h2 title">Monto total a depositar</h2>
              <SvgWrapper
                id={svgs.info}
                className="svg svg--x-small color-secondary"
              />
            </div>
            <p className="h2 subtitle color-secondary">$10,565.00</p>
          </article>
          <article className="card">
            <div className="card-container">
              <h2 className="h2 title">Monto total depositado</h2>
              <SvgWrapper
                id={svgs.info}
                className="svg svg--x-small color-secondary"
              />
            </div>
            <p className="h2 subtitle color-secondary">$10,565.00</p>
          </article>
          <article className="card">
            <div className="card-container">
              <h2 className="h2 title">Nuevo balance</h2>
              <SvgWrapper
                id={svgs.info}
                className="svg svg--x-small color-secondary"
              />
            </div>
            <p className="h2 subtitle color-secondary">$0.00</p>
          </article>
        </section>
        <section className="report-btn">
          <button
            className="btn btn--secondary filters__submit"
            type="button"
            onClick={() => {}}
          >
            Descargar reporte
          </button>
        </section>
      </section>
      <section className="container-detail-filters animate__animated animate__fadeInRight">
        <article className="paper paper--selected">
          <p className="title">Transacciones procesadas</p>
          <p className="subtitle">+$20,000.00</p>
        </article>
        <article className="paper">
          <p className="title">Comisiones cobradas</p>
          <p className="subtitle">+$20,000.00</p>
        </article>
        <article className="paper">
          <p className="title">Monto a depositar por txns</p>
          <p className="subtitle">+$10,000.00</p>
        </article>
        <article className="paper">
          <p className="title">Contracargos</p>
          <p className="subtitle">+$0.00</p>
        </article>
        <article className="paper">
          <p className="title">Propinas</p>
          <p className="subtitle">+$0.00</p>
        </article>
        <article className="paper">
          <p className="title">IVA Comisiones</p>
          <p className="subtitle">+$75.20</p>
        </article>
        <article className="paper">
          <p className="title">Ajustes</p>
          <p className="subtitle">+$0.00</p>
        </article>
        <article className="paper">
          <p className="title">Otros</p>
          <p className="subtitle">+$0.00</p>
        </article>
      </section>
      <div className="card__table processed-transactions">
        <Table information={data} cols={cols} />
        <Table information={dataTwo} cols={colsTwo} />
      </div>
    </>
  );
};

export default DepositDetailsContainer;
