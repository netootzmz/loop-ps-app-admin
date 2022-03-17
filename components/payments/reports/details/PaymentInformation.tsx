import React from "react";
import svgs from "../../../../helpers/svgs";
import SvgWrapper from "../../../SvgWrapper";
import { ComponentWithStore } from "../../../../@types/store/index";
import { wrappedOnStore } from "../../../../store";
import useAnimate from "../../../../hooks/useAnimate";

const PaymentInformation: ComponentWithStore = ({
  payments: { detailActive },
}) => {
  useAnimate(".details__information", "fadeIn", []);
  return (
    <div className="details__information">
      <h3 className="details__title">
        <SvgWrapper className="svg svg--big" id={svgs.dollar} />
        <span>Datos del pago</span>
      </h3>
      <ul className="details__list">
        <li className="details__item">
          <span>
            <b>Concepto de la venta:</b>
          </span>
          <span>
            {detailActive?.paymentData.linkConcept}
          </span>
        </li>
        <li className="details__item">
          <span>
            <b>Referencia de la venta :</b>
          </span>
          <span>{detailActive?.paymentData.refSPNum}</span>
        </li>
        <li className="details__item">
          <span>
            <b>Monto Cobrado:</b>
          </span>
          <span>
            $
            {detailActive?.paymentData.amount}{" "}
            MXN
          </span>
        </li>
        <li className="details__item">
          <span>
            <b>Meses sin intereses:</b>
          </span>
          <span>{detailActive?.paymentData.monthsWithoutInterest}</span>
        </li>
        <li className="details__item">
          <span>
            <b>Estatus de pago:</b>
          </span>
          <span>{detailActive?.paymentData.paymentStatus}</span>
        </li>
        <li className="details__item">
          <span>
            <b>Número de autorización:</b>
          </span>
          <span>{detailActive?.paymentData.returnOperation}</span>
        </li>
        <li className="details__item">
          <span>
            <b>Mensajes respuesta banco:</b>
          </span>
          <span>{detailActive?.paymentData.authorizerReplyMesssage}</span>
        </li>
      </ul>
    </div>
  );
};

export default wrappedOnStore(PaymentInformation);
