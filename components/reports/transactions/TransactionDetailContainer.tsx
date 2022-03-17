import React, { MouseEvent, useState } from "react";
import { CSSTransition } from "react-transition-group";
import { ComponentWithStore } from "../../../@types/store";
import { wrappedOnStore } from "../../../store";
import { unsetTransactionActive } from "../../../store/actions/transactionsActions";
import TransactiondetailContent from "./TransactiondetailContent";

const TransactionDetailContainer: ComponentWithStore = ({
  dispatch,
  transactions: { transactionActive },
}) => {
  const [tab, setTab] = useState(1);

  const handleClose = () => {
    dispatch(unsetTransactionActive());
  };

  const handleTab = (e: MouseEvent<HTMLButtonElement>, index: number) => {
    e.preventDefault();
    setTab(index);
  };

  return (
    <>
      {transactionActive && (
        <div className="details__container" onClick={handleClose}></div>
      )}
      <CSSTransition
        in={transactionActive !== undefined}
        classNames={{
          enter: "animate__animated animate__fadeInRight",
          exit: "animate__animated animate__fadeOutRight",
        }}
        unmountOnExit
        timeout={500}
      >
        <TransactiondetailContent
          tab={tab}
          handleTab={handleTab}
          setTab={setTab}
        />
      </CSSTransition>
    </>
  );
};

export default wrappedOnStore(TransactionDetailContainer);
