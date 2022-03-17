import React from "react";
import { ComponentWithStore } from "../../../../@types/store";
import svgs from "../../../../helpers/svgs";
import useAnimate from "../../../../hooks/useAnimate";
import { wrappedOnStore } from "../../../../store";
import SvgWrapper from "../../../SvgWrapper";

const CardInformation: ComponentWithStore = ({
  transactions: { transactionActive },
}) => {
  useAnimate(".details__information", "fadeIn", []);
  return (
    <div className="details__information">
      <h3 className="details__title">
        <SvgWrapper className="svg svg--big" id={svgs.cc} />
        <span>Información de la tarjeta</span>
      </h3>
      <ul className="details__list">
        <li className="details__item">
          <span>
            <b>Tipo de tarjeta:</b>
          </span>
          <span>
            {transactionActive?.cardServPtalDto.cardType &&
            transactionActive?.cardServPtalDto.cardType !== "null"
              ? transactionActive?.cardServPtalDto.cardType.toUpperCase()
              : ""}
          </span>
        </li>
        <li className="details__item">
          <span>
            <b>Banco del cliente:</b>
          </span>
          <span>
            {transactionActive?.cardServPtalDto.clientBank &&
            transactionActive?.cardServPtalDto.clientBank !== "null"
              ? transactionActive?.cardServPtalDto.clientBank
              : ""}
          </span>
        </li>
        <li className="details__item">
          <span>
            <b>Marca de tarjeta:</b>
          </span>
          <span>
            {transactionActive?.cardServPtalDto.cardBrand &&
            transactionActive?.cardServPtalDto.cardBrand !== "null"
              ? transactionActive?.cardServPtalDto.cardBrand
              : ""}
          </span>
        </li>
        <li className="details__item">
          <span>
            <b>4 digitos de tarjeta:</b>
          </span>
          <span>
            {transactionActive?.cardServPtalDto.fourDigitCard &&
            transactionActive?.cardServPtalDto.fourDigitCard !== "null"
              ? transactionActive?.cardServPtalDto.fourDigitCard.slice(-4)
              : ""}
          </span>
        </li>
      </ul>
    </div>
  );
};

export default wrappedOnStore(CardInformation);
