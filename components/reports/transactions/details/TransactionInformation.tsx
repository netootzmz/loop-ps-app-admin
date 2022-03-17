import React from "react";
import svgs from "../../../../helpers/svgs";
import SvgWrapper from "../../../SvgWrapper";
import { ComponentWithStore } from "../../../../@types/store/index";
import { wrappedOnStore } from "../../../../store";
import useAnimate from "../../../../hooks/useAnimate";

const TransactionInformation: ComponentWithStore = ({
  transactions: { transactionActive },
}) => {
  useAnimate(".details__information", "fadeIn", []);
  return (
    <div className="details__information">
      <h3 className="details__title">
        <SvgWrapper className="svg svg--big" id={svgs.money} />
        <span>Información de la transacción</span>
      </h3>
      <ul className="details__list">
        <li className="details__item">
          <span>
            <b>Tipo de operación:</b>
          </span>
          <span>
            VENTA
            {/* {transactionActive?.informationServPtalDto.typeOperation &&
            transactionActive?.informationServPtalDto.typeOperation !== "null"
              ? transactionActive?.informationServPtalDto.typeOperation?.toUpperCase()
              : ""} */}
          </span>
        </li>
        <li className="details__item">
          <span>
            <b>Producto:</b>
          </span>
          <span>
            {transactionActive?.informationServPtalDto.product &&
            transactionActive?.informationServPtalDto.product !== "null"
              ? transactionActive?.informationServPtalDto.product
              : ""}
          </span>
        </li>
        <li className="details__item">
          <span>
            <b>Respuesta:</b>
          </span>
          <span>
            {transactionActive?.informationServPtalDto.response &&
            transactionActive?.informationServPtalDto.response !== "null"
              ? transactionActive?.informationServPtalDto.response?.toUpperCase()
              : ""}
          </span>
        </li>
        <li className="details__item">
          <span>
            <b>Fecha:</b>
          </span>
          <span>
            {transactionActive?.informationServPtalDto.date &&
            transactionActive?.informationServPtalDto.date !== "null"
              ? transactionActive?.informationServPtalDto.date
              : ""}
          </span>
        </li>
        <li className="details__item">
          <span>
            <b>Hora:</b>
          </span>
          <span>
            {transactionActive?.informationServPtalDto.hour &&
            transactionActive?.informationServPtalDto.hour !== "null"
              ? transactionActive?.informationServPtalDto.hour
              : ""}
          </span>
        </li>
        <li className="details__item">
          <span>
            <b>Medio de pago:</b>
          </span>
          <span>
            {transactionActive?.informationServPtalDto.paymentMethod &&
            transactionActive?.informationServPtalDto.paymentMethod !== "null"
              ? transactionActive?.informationServPtalDto.paymentMethod
              : ""}
          </span>
        </li>
        <li className="details__item">
          <span>
            <b>Monto Cobrado:</b>
          </span>
          <span>
            ${transactionActive?.informationServPtalDto.amountCharged || "0"}{" "}
            MXN
          </span>
        </li>
        <li className="details__item">
          <span>
            <b>ID Orden:</b>
          </span>
          <span>
            {transactionActive?.informationServPtalDto.orderId
              ? transactionActive?.informationServPtalDto.orderId
              : ""}
          </span>
        </li>
        <li className="details__item">
          <span>
            <b>Código autorización:</b>
          </span>
          <span>
            {transactionActive?.informationServPtalDto.authorizationCode &&
            transactionActive?.informationServPtalDto.authorizationCode !==
              "null"
              ? transactionActive?.informationServPtalDto.authorizationCode
              : ""}
          </span>
        </li>
        <li className="details__item">
          <span>
            <b>Referencia:</b>
          </span>
          <span>
            {transactionActive?.informationServPtalDto.reference &&
            transactionActive?.informationServPtalDto.reference !== "null"
              ? transactionActive?.informationServPtalDto.reference
              : ""}
          </span>
        </li>
        {/*<li className="details__item">*/}
        {/*  <span>*/}
        {/*    <b>Producto:</b>*/}
        {/*  </span>*/}
        {/*  <span>*/}
        {/*    {transactionActive?.informationServPtalDto.productSolution}*/}
        {/*  </span>*/}
        {/*</li>*/}
      </ul>
    </div>
  );
};

export default wrappedOnStore(TransactionInformation);
