import React from "react";
import { ComponentWithStore } from "../../../../@types/store";
import svgs from "../../../../helpers/svgs";
import useAnimate from "../../../../hooks/useAnimate";
import { wrappedOnStore } from "../../../../store";
import SvgWrapper from "../../../SvgWrapper";
import Input from "../../../forms/Input";
import useForm from "../../../../hooks/useForm";
import validator from "validator";
import { useDispatch, useSelector } from "react-redux";
import { iGlobalState, iUiState } from "../../../../@types/store/states";
import useLang from "../../../../hooks/useLang";
import { loginToCancel } from "../../../../store/actions/paymentAction";
import { unsetTransactionActive } from "store/actions/transactionsActions";

const CancelTransaction: ComponentWithStore = ({
  auth: { email },
  transactions: { transactionActive },
}) => {
  useAnimate(".details__information", "fadeIn", []);
  const { lang } = useSelector<iGlobalState, iUiState>(({ ui }) => ui);
  let folioTxn = "";

  const dispatch = useDispatch();
  if (transactionActive !== undefined) {
    folioTxn = transactionActive!.promissoryNoteServPtalDto.folio;
  }
  const {
    login: {
      inputs: { password },
    },
  } = useLang(lang);

  const { values, handleInputChange, errors, handleSubmit } = useForm<{
    email: string;
    password: string;
  }>({
    initialValues: {
      email: email,
    },
    validations: {
      password: {
        required: {
          value: true,
          message: password.error_empty,
        },
        custom: {
          isValid: (val) => validator.isLength(val, { min: 5 }),
          message: password.error_lenght,
        },
      },
    },
    onSubmit: async () => {
      dispatch(loginToCancel(values, lang, { folioTxn: folioTxn }));
      dispatch(unsetTransactionActive());
    },
  });

  return (
    <div className="details__information">
      <h3 className="details__title">
        <SvgWrapper className="svg svg--big" id={svgs.cancelTxn} />
        <span>Cancelar transacción</span>
      </h3>

      <span>
        <b>
          Estás apunto de cancelar la transacción. Ingresa por favor tu
          contraseña para confirmar tu identidad y proceder con la cancelación
        </b>
      </span>
      <br />
      <br />
      <form onSubmit={handleSubmit}>
        <Input
          type="password"
          svgId={svgs.lock}
          placeholder={password.placeholder}
          name="password"
          value={values.password || ""}
          error={errors.password}
          onChange={handleInputChange()}
        />
        <br />
        <br />
        <div className="details__button">
          <button type="submit" className="btn btn--secondary">
            Continuar y cancelar
          </button>
        </div>
      </form>
    </div>
  );
};

export default wrappedOnStore(CancelTransaction);
