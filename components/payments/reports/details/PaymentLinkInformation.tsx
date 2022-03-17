import React from "react";
import {ComponentWithStore} from "../../../../@types/store";
import svgs from "../../../../helpers/svgs";
import useAnimate from "../../../../hooks/useAnimate";
import {wrappedOnStore} from "../../../../store";
import SvgWrapper from "../../../SvgWrapper";

const PaymentLinkInformation: ComponentWithStore = ({
                                                        payments: {detailActive},
                                                    }) => {
    useAnimate(".details__information", "fadeIn", []);
    return (
        <div className="details__information">
            <h3 className="details__title">
                <SvgWrapper className="svg svg--big" id={svgs.link}/>
                <span>Datos de liga de pago</span>
            </h3>
            <ul className="details__list">
                <li className="details__item">
          <span>
            <b>Fecha de generación:</b>
          </span>
                    <span>{detailActive?.linkPaymentData.linkDate}</span>
                </li>
                <li className="details__item">
          <span>
            <b>Hora de generación:</b>
          </span>
                    <span>{detailActive?.linkPaymentData.linkHour}</span>
                </li>
                <li className="details__item">
          <span>
            <b>Usuario de generación:</b>
          </span>
                    <span>{detailActive?.linkPaymentData.linkUser}</span>
                </li>
                <li className="details__item">
          <span>
            <b>Fecha de pago:</b>
          </span>
                    <span>{detailActive?.linkPaymentData.paymentDate}</span>
                </li>
                <li className="details__item">
          <span>
            <b>Hora de pago:</b>
          </span>
                    <span>{detailActive?.linkPaymentData.paymentHour}</span>
                </li>
                <li className="details__item">
          <span>
            <b>Estatus de la liga:</b>
          </span>
                    <span>{detailActive?.linkPaymentData.linkStatus}</span>
                </li>

            </ul>
        </div>
    );
};

export default wrappedOnStore(PaymentLinkInformation);
