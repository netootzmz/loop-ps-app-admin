import React from "react";
import { ComponentWithStore } from "../../../../@types/store";
import svgs from "../../../../helpers/svgs";
import useAnimate from "../../../../hooks/useAnimate";
import { wrappedOnStore } from "../../../../store";
import SvgWrapper from "../../../SvgWrapper";

const MerchantInformation: ComponentWithStore = ({
  payments: { detailActive },
}) => {
  useAnimate(".details__information", "fadeIn", []);
  return (
    <div className="details__information">
      <h3 className="details__title">
        <SvgWrapper className="svg svg--big" id={svgs.person} />
        <span>Datos del comercio</span>
      </h3>
      <ul className="details__list">
        <li className="details__item">
          <span>
            <b>Razón social:</b>
          </span>
          <span>{detailActive?.businessData.businessName}</span>
        </li>
        <li className="details__item">
          <span>
            <b>Sucursal:</b>
          </span>
          <span>{detailActive?.businessData.subsidiary}</span>
        </li>
      </ul>
    </div>
  );
};

export default wrappedOnStore(MerchantInformation);
