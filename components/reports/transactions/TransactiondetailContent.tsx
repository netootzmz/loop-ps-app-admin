import React, { Dispatch, FC, SetStateAction, useEffect } from "react";
import svgs from "../../../helpers/svgs";
import SvgWrapper from "../../SvgWrapper";
import CardInformation from "./details/CardInformation";
import ClientInformation from "./details/ClientInformation";
import TransactionInformation from "./details/TransactionInformation";
import VoucherInformation from "./details/VoucherInformation";
import CostsInformation from "./details/CostsInformation";
import CancelTransaction from "./details/CancelTransaction";
import { useSelector } from "react-redux";
import { iGlobalState, iTransactionsState } from "../../../@types/store/states";

const TransactiondetailContent: FC<{
  handleTab: Function;
  tab: number;
  setTab: Dispatch<SetStateAction<number>>;
}> = ({ handleTab, tab, setTab }) => {
  let typeTransaction = "";
  const { transactionActive } = useSelector<iGlobalState, iTransactionsState>(
    ({ transactions }) => transactions
  );

  if (transactionActive !== undefined) {
    typeTransaction =
      transactionActive!.promissoryNoteServPtalDto.transactionType.toString();
    console.log(status);
  }
  useEffect(() => {
    return () => {
      setTab(1);
    };
  }, [setTab]);
  return (
    <>
      <article className="details">
        <div className="details__menu">
          <button
            className={`btn btn--nav ${tab === 1 ? "btn--nav--active" : ""}`}
            onClick={(e) => handleTab(e, 1)}
          >
            <SvgWrapper className="svg svg--medium" id={svgs.person} />
            <span>Cliente</span>
          </button>
          <button
            className={`btn btn--nav ${tab === 2 ? "btn--nav--active" : ""}`}
            onClick={(e) => handleTab(e, 2)}
          >
            <SvgWrapper className="svg svg--medium" id={svgs.receipt} />
            <span>Pagaré</span>
          </button>
          <button
            className={`btn btn--nav ${tab === 3 ? "btn--nav--active" : ""}`}
            onClick={(e) => handleTab(e, 3)}
          >
            <SvgWrapper className="svg svg--medium" id={svgs.money} />
            <span>Transacción</span>
          </button>
          <button
            className={`btn btn--nav ${tab === 4 ? "btn--nav--active" : ""}`}
            onClick={(e) => handleTab(e, 4)}
          >
            <SvgWrapper className="svg svg--medium" id={svgs.cc} />
            <span>Tarjeta</span>
          </button>
          <button
            className={`btn btn--nav ${tab === 5 ? "btn--nav--active" : ""}`}
            onClick={(e) => handleTab(e, 5)}
          >
            <SvgWrapper className="svg svg--medium" id={svgs.dollar} />
            <span>Costos y comisiones</span>
          </button>
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <button
            className={`btn btn--nav ${tab === 6 ? "btn--nav--active" : ""}`}
            onClick={(e) => handleTab(e, 6)}
            disabled={typeTransaction !== "Venta"}
          >
            <SvgWrapper className="svg svg--medium" id={svgs.cancelTxn}/>
            <span>Cancelar transacción</span>
          </button>
        </div>
        <div className="details__view">
          {tab === 1 ? (
            <ClientInformation />
          ) : tab === 2 ? (
            <VoucherInformation />
          ) : tab === 3 ? (
            <TransactionInformation />
          ) : tab === 4 ? (
            <CardInformation />
          ) : tab === 6 ? (
            <CancelTransaction />
          ) : (
            <CostsInformation />
          )}
        </div>
      </article>
    </>
  );
};

export default TransactiondetailContent;
