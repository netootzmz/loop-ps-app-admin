import React, { FC, useEffect, KeyboardEvent, useMemo } from "react";
import Input from "../forms/Input";
import useForm from "../../hooks/useForm";
import useLang from "../../hooks/useLang";
import { useDispatch, useSelector } from "react-redux";
import {
  iGlobalState,
  iUiState,
  iPaymentsState,
} from "../../@types/store/states";
import Select from "../forms/Select";
import Toogle from "../forms/Toogle";
import Checkbox from "../forms/Checkbox";
import handleCurrency from "../../helpers/handleCurrency";
import { iCreatePaymentLeagueReq } from "../../@types/api/req";
import moment from "moment";
import { startCreatingPaymentLink } from "../../store/actions/paymentAction";

const GenerateForm: FC<{
  setShowModal: Function;
}> = ({ setShowModal }) => {
  const { lang, config } = useSelector<iGlobalState, iUiState & iPaymentsState>(
    ({ ui, payments }) => ({ ...ui, ...payments })
  );

  const dispatch = useDispatch();

  const { titles } = useLang(lang);
  const units = useMemo(
    () => [
      { value: 60, text: `${titles.payments.parameters.hours}` },
      { value: 1440, text: `${titles.payments.parameters.days}` },
      { value: 10080, text: `${titles.payments.parameters.weeks}` },
      { value: 43200, text: `${titles.payments.parameters.months}` },
    ],
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  const onlyNumbers = (e: KeyboardEvent<HTMLDivElement>) => {
    const pressedKey = e.keyCode || e.which || e.charCode;
    if (
      (pressedKey <= 36 || pressedKey >= 40) &&
      !/^[0-9\b]+$/.test(e.key) &&
      pressedKey !== 8
    )
      e.preventDefault();
  };

  const { values, handleInputChange, reset, errors, handleSubmit } = useForm<{
    unidad: number;
    vigencia: number;
    concepto: string;
    monto: string;
    referencia: string;
    meses: boolean;
    tres: boolean;
    seis: boolean;
    nueve: boolean;
    doce: boolean;
  }>({
    initialValues: {
      unidad: 60,
      vigencia: 0,
      concepto: "",
      monto: "$0.00 MXN",
      referencia: "",
      // meses: config?.allowMsi ? (config.allowMsi === 1 ? true : false) : false,
      meses: config?.allowMsi ? (config.allowMsi === 1 ? true : false) : false,
      tres: config?.msi
        ? config?.msi[0]?.monthsAvailable
          ? true
          : false
        : false,
      seis: config?.msi
        ? config?.msi[1]?.monthsAvailable
          ? true
          : false
        : false,
      nueve: config?.msi
        ? config?.msi[2]?.monthsAvailable
          ? true
          : false
        : false,
      doce: config?.msi
        ? config?.msi[3]?.monthsAvailable
          ? true
          : false
        : false,
    },
    validations: {
      unidad: {
        required: {
          value: config?.editValidity === 1,
          message: `${titles.payments.parameters.time_unit}`,
        },
      },
      vigencia: {
        required: {
          value: config?.editValidity === 1,
          message: `${titles.payments.parameters.validityMessage}`,
        },
      },
      concepto: {
        required: {
          value: true,
          message: `${titles.payments.parameters.conceptMessage}`,
        },
      },
      referencia: {
        required: {
          value: true,
          message: `${titles.payments.parameters.referenceMessage}`,
        },
      },
      monto: {
        custom: {
          isValid: (val) =>
            parseInt(
              (
                parseFloat(
                  val.split(" ")[0].split("$")[1].replaceAll(",", "")
                ) * 100
              ).toString()
            ) > 0,
          message: `${titles.payments.parameters.valid_quantity}`,
        },
      },
    },
    onSubmit: () => {
      let payload: iCreatePaymentLeagueReq;
      if (values.meses) {
        payload = {
          amount: parseInt(
            (
              parseFloat(
                values.monto.split(" ")[0].split("$")[1].replaceAll(",", "")
              ) * 100
            ).toString()
          ),
          apiKey: config?.apiKey!,
          durationTimeLink:
            config?.editValidity === 0 || config?.allowEdition === 1
              ? values.unidad * values.vigencia
              : config?.validityValue! *
                units[config?.validityUnity! - 1].value,
          reference: values.concepto,
          tradeReference: values.referencia,
          typeSmartlink: 2,
          validUntil: moment()
            .add(values.unidad * values.vigencia, "minutes")
            .toISOString(),
          months: [
            {
              name: "Tres",
              value: values.tres,
              amount: config?.msi ? config!.msi[0].amountPucharse : 0,
            },
            {
              name: "Seis",
              value: values.seis,
              amount: config?.msi ? config!.msi[1].amountPucharse : 0,
            },
            {
              name: "Nueve",
              value: values.nueve,
              amount: config?.msi ? config!.msi[2].amountPucharse : 0,
            },
            {
              name: "Doce",
              value: values.doce,
              amount: config?.msi ? config!.msi[3].amountPucharse : 0,
            },
          ],
        };
      } else {
        payload = {
          amount: parseInt(
            (
              parseFloat(
                values.monto.split(" ")[0].split("$")[1].replaceAll(",", "")
              ) * 100
            ).toString()
          ),
          apiKey: config?.apiKey!,
          durationTimeLink:
            config?.editValidity === 0 || config?.allowEdition === 1
              ? values.unidad * values.vigencia
              : config?.validityValue! *
                units[config?.validityUnity! - 1].value,
          reference: values.concepto,
          tradeReference: values.referencia,
          typeSmartlink: 2,
          validUntil: moment()
            .add(values.unidad * values.vigencia, "minutes")
            .toISOString(),
          months: [
            {
              name: "Tres",
              value: false,
              amount: config?.msi ? config!.msi[0].amountPucharse : 0,
            },
            {
              name: "Seis",
              value: false,
              amount: config?.msi ? config!.msi[1].amountPucharse : 0,
            },
            {
              name: "Nueve",
              value: false,
              amount: config?.msi ? config!.msi[2].amountPucharse : 0,
            },
            {
              name: "Doce",
              value: false,
              amount: config?.msi ? config!.msi[3].amountPucharse : 0,
            },
          ],
        };
      }
      dispatch(startCreatingPaymentLink(payload));
      setShowModal(true);
      reset();
      if (
        config?.validityUnity &&
        config?.validityUnity > 0 &&
        config.validityValue &&
        config.validityValue > 0 &&
        (config?.editValidity === 0 || config?.allowEdition === 1)
      ) {
        reset({
          unidad:
            config?.editValidity === 0
              ? 60
              : units[config.validityUnity - 1].value,
          vigencia: config?.editValidity === 0 ? 0 : config.validityValue,
          concepto: "",
          monto: "$0.00 MXN",
          referencia: "",
          meses: config.haveMsi === 1 || false,
          tres: false,
          seis: false,
          nueve: false,
          doce: false,
        });
      }
    },
  });

  useEffect(() => {
    reset();
    if (
      config?.validityUnity &&
      config?.validityUnity > 0 &&
      config.validityValue &&
      config.validityValue > 0 &&
      (config?.editValidity === 0 || config?.allowEdition === 1)
    ) {
      reset({
        unidad:
          config?.editValidity === 0
            ? 60
            : units[config.validityUnity - 1].value,
        vigencia: config?.editValidity === 0 ? 0 : config.validityValue,
        concepto: "",
        monto: "$0.00 MXN",
        referencia: "",
        meses: config.haveMsi === 1 || false,
        tres: false,
        seis: false,
        nueve: false,
        doce: false,
      });
    }
  }, [
    reset,
    config?.validityValue,
    config?.validityUnity,
    config?.editValidity,
    config?.haveMsi,
    config?.allowEdition,
    units,
  ]);

  if (!config) return null;

  return (
    <form
      className="payments__generate animate__animated animate__fadeIn"
      onSubmit={handleSubmit}
    >
      <h2 className="h2 payments__title">
        {titles.payments.parameters.generate_link}
      </h2>
      <div className="card card--big">
        <div className="form">
          {config?.editValidity === 0 || config?.allowEdition === 1 ? (
            <>
              <h4 className="form__title">
                {titles.payments.parameters.validity}
              </h4>
              <div className="form__inline">
                <Select
                  label={titles.payments.parameters.time_unity}
                  options={units}
                  placeholder={titles.payments.parameters.unity}
                  onChange={handleInputChange((val) => parseInt(val))}
                  value={values.unidad || 60}
                  name="unidad"
                  error={errors.unidad}
                />
                <Input
                  placeholder={titles.payments.parameters.value}
                  type="number"
                  name="vigencia"
                  onKeyDown={onlyNumbers}
                  onChange={handleInputChange((val) => parseInt(val))}
                  value={values.vigencia || ""}
                  error={errors.vigencia}
                />
              </div>
            </>
          ) : (
            <p className="payments__default">
              {titles.payments.parameters.validity_link}{" "}
              {`${config.validityValue} ${
                units[config.validityUnity! - 1]?.text
              }`}
            </p>
          )}
          <div className="half payments__half">
            <div className="form">
              <h4 className="form__title form__title--full">
                {titles.payments.parameters.sale_concept}
              </h4>
              <Input
                textarea
                placeholder={titles.payments.parameters.concept}
                maxLength={120}
                name="concepto"
                helpText={titles.payments.parameters.max_characters}
                full
                onChange={handleInputChange()}
                value={values.concepto || ""}
                error={errors.concepto}
              />
              <h4 className="form__title form__title--full">
                {titles.payments.parameters.amount}
              </h4>
              <Input
                type="text"
                placeholder={titles.payments.parameters.amount}
                full
                onKeyDown={(e: KeyboardEvent<HTMLDivElement>) =>
                  reset({
                    ...values,
                    monto: handleCurrency(
                      e,
                      values.monto,
                      config?.numbersPatterns!
                    ),
                  })
                }
                onChange={() => {}}
                value={values.monto || ""}
                error={errors.monto}
              />
            </div>
            <div className="form">
              <h4 className="form__title form__title--full">
                {titles.payments.parameters.sale_reference}
              </h4>
              <Input
                placeholder={titles.payments.parameters.reference}
                maxLength={12}
                full
                name="referencia"
                onChange={handleInputChange()}
                value={values.referencia || ""}
                error={errors.referencia}
              />
              {config.haveMsi === 1 && (
                <>
                  <h4 className="form__title form__title--full">
                    {titles.payments.parameters.months_without}
                  </h4>
                  <Toogle
                    disabled={config.allowMsi === 1 ? false : true}
                    checkLabel={titles.payments.parameters.accept}
                    uncheckLabel={titles.payments.parameters.not_accept}
                    name="meses"
                    onChange={() => reset({ ...values, meses: !values.meses })}
                    checked={values.meses}
                    value={Boolean(values.meses || false).toString() || ""}
                  />
                  <div className="checkbox__inline">
                    {config.msi?.find((m) => m.msiId === 1) !== undefined && (
                      <Checkbox
                        placeholder={titles.payments.parameters.three_months}
                        name="three"
                        inline
                        disabled={
                          values.meses && config.msi[0].monthsAvailable === 1
                            ? false
                            : true
                        }
                        onChange={() =>
                          reset({ ...values, tres: !values.tres })
                        }
                        checked={values.tres}
                        value={Boolean(values.tres || false).toString() || ""}
                      />
                    )}
                    {config.msi?.find((m) => m.msiId === 2) !== undefined && (
                      <Checkbox
                        placeholder={titles.payments.parameters.six_months}
                        name="six"
                        inline
                        disabled={
                          values.meses && config.msi[1].monthsAvailable === 1
                            ? false
                            : true
                        }
                        onChange={() =>
                          reset({ ...values, seis: !values.seis })
                        }
                        checked={values.seis}
                        value={Boolean(values.seis || false).toString() || ""}
                      />
                    )}
                    {config.msi?.find((m) => m.msiId === 3) !== undefined && (
                      <Checkbox
                        placeholder={titles.payments.parameters.nine_months}
                        name="nine"
                        inline
                        onChange={() =>
                          reset({ ...values, nueve: !values.nueve })
                        }
                        checked={values.nueve}
                        value={Boolean(values.nueve || false).toString() || ""}
                        disabled={
                          values.meses && config.msi[2].monthsAvailable === 1
                            ? false
                            : true
                        }
                      />
                    )}
                    {config.msi?.find((m) => m.msiId === 4) !== undefined && (
                      <Checkbox
                        placeholder={titles.payments.parameters.twelve_months}
                        name="doce"
                        inline
                        onChange={() =>
                          reset({ ...values, doce: !values.doce })
                        }
                        checked={values.doce}
                        value={Boolean(values.doce || false).toString() || ""}
                        disabled={
                          values.meses && config.msi[3].monthsAvailable === 1
                            ? false
                            : true
                        }
                      />
                    )}
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
      <div className="payments__buttons">
        <button
          type="button"
          className="btn btn--default"
          onClick={() => reset()}
        >
          {titles.payments.parameters.clean}
        </button>
        <button type="submit" className="btn btn--primary">
          {titles.payments.parameters.generate}
        </button>
      </div>
    </form>
  );
};
export default GenerateForm;
