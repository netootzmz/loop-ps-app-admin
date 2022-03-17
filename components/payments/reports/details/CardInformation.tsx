import React from "react";
import { ComponentWithStore } from "../../../../@types/store/index";
import svgs from "../../../../helpers/svgs";
import useAnimate from "../../../../hooks/useAnimate";
import { wrappedOnStore } from "../../../../store";
import SvgWrapper from "../../../SvgWrapper";

const CardInformation: ComponentWithStore = ({
  payments: { detailActive },
}) => {
  useAnimate(".details__information", "fadeIn", []);
  return (
    <div className="details__information">
      <h3 className="details__title">
        <SvgWrapper className="svg svg--big" id={svgs.cc} />
        <span>Datos de tarjeta</span>
      </h3>
      <ul className="details__list">
        <li className="details__item">
          <span>
            <b>Número de tarjeta:</b>
          </span>
          <span>{detailActive?.cardData.cardNumber}</span>
        </li>
        <li className="details__item">
          <span>
            <b>Marca de tarjeta:</b>
          </span>
          <span>{detailActive?.cardData.cardName}</span>
        </li>
        <li className="details__item">
          <span>
            <b>Emisor de tarjeta:</b>
          </span>
          <span>{detailActive?.cardData.issuingBank}</span>
        </li>
        <li className="details__item">
          <span>
            <b>Naturaleza de la tarjeta:</b>
          </span>
          <span>{detailActive?.cardData.cardType}</span>
        </li>
      </ul>
    </div>
  );
};

export default wrappedOnStore(CardInformation);
