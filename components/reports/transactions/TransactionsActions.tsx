import React, { FC } from "react";
import { useDispatch } from "react-redux";
import svgs from "../../../helpers/svgs";
import { startGettingTransactionDetail } from "../../../store/actions/transactionsActions";
import SvgWrapper from "../../SvgWrapper";

const TransactionsActions: FC<{ folioTxn: string }> = ({ folioTxn }) => {
  const dispatch = useDispatch();

  const handleDetail = async () => {
    dispatch(startGettingTransactionDetail({ folioTxn }));
  };
  return (
    <div className="table__actions">
      <button
        type="button"
        className="btn btn--icon btn--action"
        onClick={handleDetail}
      >
        <SvgWrapper id={svgs.view} className="svg svg--x-small" />
      </button>
      {/*<button type="button" className="btn btn--icon btn--action">*/}
      {/*  <SvgWrapper id={svgs.reply} className="svg svg--x-small" />*/}
      {/*</button>*/}
      {/*<button type="button" className="btn btn--icon btn--action">*/}
      {/*  <SvgWrapper id={svgs.clock} className="svg svg--x-small" />*/}
      {/*</button>*/}
    </div>
  );
};

export default TransactionsActions;
