import React, { MouseEvent, useState } from "react";
import { CSSTransition } from "react-transition-group";
import { ComponentWithStore } from "../../../@types/store";
import { wrappedOnStore } from "../../../store";
import StatusLinkDetailContent from "./StatusLinkDetailContent";
import { unsetStatusLinkDetailActive } from "../../../store/actions/paymentAction";

const StatusLinkDetailContainer: ComponentWithStore = ({
  dispatch,
  payments: { detailActive },
}) => {
  const [tab, setTab] = useState(1);

  const handleClose = () => {
    dispatch(unsetStatusLinkDetailActive());
  };

  const handleTab = (e: MouseEvent<HTMLButtonElement>, index: number) => {
    e.preventDefault();
    setTab(index);
  };

  return (
    <>
      {detailActive && (
        <div className="details__container" onClick={handleClose}></div>
      )}
      <CSSTransition
        in={detailActive !== undefined}
        classNames={{
          enter: "animate__animated animate__fadeInRight",
          exit: "animate__animated animate__fadeOutRight",
        }}
        unmountOnExit
        timeout={500}
      >
        <StatusLinkDetailContent
          tab={tab}
          handleTab={handleTab}
          setTab={setTab}
        />
      </CSSTransition>
    </>
  );
};

export default wrappedOnStore(StatusLinkDetailContainer);
