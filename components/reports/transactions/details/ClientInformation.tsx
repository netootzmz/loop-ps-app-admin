import React from "react";
import { ComponentWithStore } from "../../../../@types/store";
import svgs from "../../../../helpers/svgs";
import useAnimate from "../../../../hooks/useAnimate";
import { wrappedOnStore } from "../../../../store";
import SvgWrapper from "../../../SvgWrapper";

const ClientInformation: ComponentWithStore = ({
  transactions: { transactionActive },
}) => {
  useAnimate(".details__information", "fadeIn", []);
  return (
    <div className="details__information">
      <h3 className="details__title">
        <SvgWrapper className="svg svg--big" id={svgs.person} />
        <span>Información del cliente</span>
      </h3>
      <ul className="details__list">
        <li className="details__item">
          <span>
            <b>Correo Electrónico:</b>
          </span>
          <span>
            {transactionActive?.clientServPtalDto.email !== "null"
              ? transactionActive?.clientServPtalDto.email
              : ""}
          </span>
        </li>
        <li className="details__item">
          <span>
            <b>Telefono:</b>
          </span>
          <span>
            {transactionActive?.clientServPtalDto.phone
              ? transactionActive?.clientServPtalDto.phone
              : ""}
          </span>
        </li>
        <li className="details__item">
          <span>
            <b>Nombre cliente:</b>
          </span>
          <span>
            {transactionActive?.clientServPtalDto.clientName?.includes(
              "null"
            ) || !transactionActive?.clientServPtalDto.clientName
              ? ""
              : transactionActive?.clientServPtalDto.clientName?.toUpperCase()}
          </span>
        </li>
        <li className="details__item">
          <span>
            <b>Dirección:</b>
          </span>
          <span>
            {transactionActive?.clientServPtalDto.address?.includes("null")
              ? ""
              : transactionActive?.clientServPtalDto.address?.toUpperCase()}
          </span>
        </li>
        <li className="details__item">
          <span>
            <b>Pago:</b>
          </span>
          <span>
            $
            {Intl.NumberFormat("en-US", {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            }).format(
              parseFloat(transactionActive?.clientServPtalDto.amount || "0")
            )}{" "}
            MXN
          </span>
        </li>
      </ul>
    </div>
  );
};

export default wrappedOnStore(ClientInformation);
