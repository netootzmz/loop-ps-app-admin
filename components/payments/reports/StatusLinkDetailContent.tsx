import React, { Dispatch, FC, SetStateAction, useEffect } from "react";
import svgs from "../../../helpers/svgs";
import SvgWrapper from "../../SvgWrapper";
import CardInformation from "./details/CardInformation";
import PaymentInformation from "./details/PaymentInformation";
import PaymentLinkInformation from "./details/PaymentLinkInformation";

const StatusLinkDetailContent: FC<{
  handleTab: Function;
  tab: number;
  setTab: Dispatch<SetStateAction<number>>;
}> = ({ handleTab, tab, setTab }) => {
  useEffect(() => {
    return () => {
      setTab(1);
    };
  }, [setTab]);
  return (
    <>
      <article className="details">
        <div className="details__menu">
          {/*Sección se comenta para */}
          {/*<button*/}
          {/*  className={`btn btn--nav ${tab === 1 ? "btn--nav--active" : ""}`}*/}
          {/*  onClick={(e) => handleTab(e, 1)}*/}
          {/*>*/}
          {/*  <SvgWrapper className="svg svg--medium" id={svgs.person} />*/}
          {/*  <span>Comercio</span>*/}
          {/*</button>*/}
          <button
              className={`btn btn--nav ${tab === 2 ? "btn--nav--active" : ""}`}
              onClick={(e) => handleTab(e, 2)}
          >
            <SvgWrapper className="svg svg--medium" id={svgs.dollar} />
            <span>Pago</span>
          </button>
          <button
            className={`btn btn--nav ${tab === 3 ? "btn--nav--active" : ""}`}
            onClick={(e) => handleTab(e, 3)}
          >
            <SvgWrapper className="svg svg--medium" id={svgs.cc} />
            <span>Tarjeta</span>
          </button>
          <button
            className={`btn btn--nav ${tab === 4 ? "btn--nav--active" : ""}`}
            onClick={(e) => handleTab(e, 4)}
          >
            <SvgWrapper className="svg svg--medium" id={svgs.link} />
            <span>Liga de pago</span>
          </button>
        </div>
        <div className="details__view">
          {
          //  Se comenta esta sección por regla de negocio, se deja por si se requiere
          //   tab === 1 ? (
          //   <MerchantInformation />
          // ) :
            tab === 2 ? (
            <PaymentInformation />
          ) : tab === 3 ? (
            <CardInformation />
          ) :  (
            <PaymentLinkInformation />
          ) }
        </div>
      </article>
    </>
  );
};

export default StatusLinkDetailContent;
