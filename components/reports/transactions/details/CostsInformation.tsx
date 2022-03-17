import React from "react";
import { ComponentWithStore } from "../../../../@types/store/index";
import svgs from "../../../../helpers/svgs";
import useAnimate from "../../../../hooks/useAnimate";
import { wrappedOnStore } from "../../../../store";
import SvgWrapper from "../../../SvgWrapper";

const CostsInformation: ComponentWithStore = ({
  transactions: { transactionActive },
}) => {
  useAnimate(".details__information", "fadeIn", []);
  return (
    <div className="details__information">
      <h3 className="details__title">
        <SvgWrapper className="svg svg--big" id={svgs.dollar} />
        <span>Información de costos y comisiones</span>
      </h3>
      <ul className="details__list">
        <li className="details__item">
          <span>
            <b>Monto de la transacción:</b>
          </span>
          <span>
            {transactionActive?.amountAndCommisionsServPtalDto
              ?.transactionAmount &&
            transactionActive?.amountAndCommisionsServPtalDto
              ?.transactionAmount !== "null"
              ? `$${parseFloat(
                  transactionActive?.amountAndCommisionsServPtalDto
                    ?.transactionAmount || "0.00"
                )} MXN`
              : ""}
          </span>
        </li>
        <li className="details__item">
          <span>
            <b>Comisión Tasa base (%):</b>
          </span>
          <span>
            {transactionActive?.amountAndCommisionsServPtalDto
              ?.commissionOnRate &&
            transactionActive?.amountAndCommisionsServPtalDto
              ?.commissionOnRate !== "null"
              ? parseFloat(
                  transactionActive?.amountAndCommisionsServPtalDto
                    ?.commissionOnRate || "0.00"
                )
              : ""}
            %
          </span>
        </li>
        <li className="details__item">
          <span>
            <b>Comisión:</b>
          </span>
          <span>
            {transactionActive?.amountAndCommisionsServPtalDto
              ?.baseRateCommission &&
            transactionActive?.amountAndCommisionsServPtalDto
              ?.baseRateCommission !== "null"
              ? `$${parseFloat(
                  transactionActive?.amountAndCommisionsServPtalDto
                    ?.baseRateCommission || "0.00"
                )} MXN`
              : ""}
          </span>
        </li>
        <li className="details__item">
          <span>
            <b>IVA:</b>
          </span>
          <span>
            {transactionActive?.amountAndCommisionsServPtalDto?.tax &&
            transactionActive?.amountAndCommisionsServPtalDto?.tax !== "null"
              ? `$${parseFloat(
                  transactionActive?.amountAndCommisionsServPtalDto?.tax ||
                    "0.00"
                )} MXN`
              : ""}
          </span>
        </li>
        <li className="details__item">
          <span>
            <b>Comisión + IVA:</b>
          </span>
          <span>
            {transactionActive?.amountAndCommisionsServPtalDto
              ?.totalCommission &&
            transactionActive?.amountAndCommisionsServPtalDto
              ?.totalCommission !== "null"
              ? `$${
                  transactionActive?.amountAndCommisionsServPtalDto
                    ?.totalCommission || "0.00 "
                } MXN`
              : ""}
          </span>
        </li>
      </ul>
    </div>
  );
};

export default wrappedOnStore(CostsInformation);
