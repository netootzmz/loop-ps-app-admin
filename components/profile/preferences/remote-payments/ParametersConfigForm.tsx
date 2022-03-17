import React, { FC, useCallback, useEffect } from "react";
import { useSelector } from "react-redux";
import Swal from "sweetalert2";
import { iRemotePaymentParametersReq } from "../../../../@types/api/req";
import {
  iCustomResponse,
  iRemotePaymentParametersRes,
} from "../../../../@types/api/res";
import { iGlobalState, iUiState } from "../../../../@types/store/states";
import customFetch from "../../../../helpers/customFetch";
import useForm from "../../../../hooks/useForm";
import useLang from "../../../../hooks/useLang";
import Checkbox from "../../../forms/Checkbox";
import CheckMonths from "../../../forms/CheckMonths";
import Input from "../../../forms/Input";
import Toogle from "../../../forms/Toogle";
import Big from "big.js";
import manageErrorsMessages from "../../../../helpers/manageErrorsMessages";
import Select from "../../../forms/Select";

const Parameters: FC = () => {
  const { lang } = useSelector<iGlobalState, iUiState>(({ ui }) => ui);

  const { payments, titles } = useLang(lang);

  const formatNumber = (amount: number) => {
    const newNumber = new Intl.NumberFormat("en-US", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(amount / 100 || 0);
    const formatedNewNumber = `$${newNumber !== "0" ? newNumber : "0.00"} MXN`;
    return formatedNewNumber;
  };

  const removeFormatting = (formatedAmount: string) => {
    const stringCutted = formatedAmount.split(" ")[0].split("$")[1];
    const oldNumber = parseInt(
      Big(parseFloat(stringCutted.replaceAll(",", "")))
        .mul(100)
        .toString()
    ).toString();
    return Number(oldNumber.slice(0, oldNumber.length));
  };

  //const [disabledParams, setDisabledParams] = useState<boolean>(true);

  const { values, reset, errors, handleSubmit, handleInputChange } = useForm<{
    config_client_product_id: number;
    id_blocking_behavior: boolean;
    have_msi: boolean;
    check_three_months: boolean;
    check_six_months: boolean;
    check_nine_months: boolean;
    check_twelve_months: boolean;
    three_months: string;
    six_months: string;
    nine_months: string;
    twelve_months: string;
    have_validity_default: boolean;
    validity_default: number;
    validity_value: number;
    validity_unity: number;
    cardHolderDataRequest: boolean;
    name_blocking_behavior: string;
    msg_msi: string;
    allow_msi: boolean;
    allowEdition: boolean;
  }>({
    initialValues: {
      config_client_product_id: 0,
      id_blocking_behavior: false,
      have_msi: false,
      check_three_months: false,
      check_six_months: false,
      check_nine_months: false,
      check_twelve_months: false,
      three_months: "$0.00 MXN",
      six_months: "$0.00 MXN",
      nine_months: "$0.00 MXN",
      twelve_months: "$0.00 MXN",
      have_validity_default: false,
      validity_value: 0,
      validity_default: 0,
      validity_unity: 0,
      cardHolderDataRequest: false,
      name_blocking_behavior: "name",
      msg_msi: "msg",
      allow_msi: false,
      allowEdition: false,
    },
    validations: {
      three_months: {
        custom: {
          isValid: (val) => {
            if (
              parseFloat(val.split(" ")[0].split("$")[1].replaceAll(",", "")) >=
              300
            ) {
              return true;
            }
            return false;
          },
          message: "Debe tener un monto mínimo de 300",
        },
      },
      six_months: {
        custom: {
          isValid: (val) => {
            if (removeFormatting(val) === 0) return true;
            if (values.check_three_months && !values.check_six_months)
              return true;
            if (!values.check_three_months && !values.check_six_months)
              return true;
            if (!values.check_three_months && values.check_six_months)
              return true;
            if (
              values.check_three_months &&
              values.check_six_months &&
              removeFormatting(val) > removeFormatting(values.three_months)
            )
              return true;
            return false;
          },
          message:
            payments.remote.configuration.allow_months_without_interest
              .error_minimum_amount_higher,
        },
        custom2: {
          isValid: (val) => {
            if (
              parseFloat(val.split(" ")[0].split("$")[1].replaceAll(",", "")) >=
              600
            ) {
              return true;
            }
            return false;
          },
          message: "Debe tener un monto mínimo de 600",
        },
      },
      nine_months: {
        custom: {
          isValid: (val) => {
            if (removeFormatting(val) === 0) return true;
            if (!values.check_nine_months) return true;
            if (!values.check_three_months && !values.check_six_months)
              return true;
            if (
              values.check_three_months &&
              !values.check_six_months &&
              removeFormatting(val) > removeFormatting(values.three_months)
            )
              return true;
            if (
              !values.check_three_months &&
              values.check_six_months &&
              removeFormatting(val) > removeFormatting(values.six_months)
            )
              return true;
            if (
              values.check_three_months &&
              values.check_six_months &&
              removeFormatting(val) > removeFormatting(values.six_months) &&
              removeFormatting(val) > removeFormatting(values.three_months)
            )
              return true;
            return false;
          },
          message:
            payments.remote.configuration.allow_months_without_interest
              .error_minimum_amount_higher,
        },
        custom2: {
          isValid: (val) => {
            if (
              parseFloat(val.split(" ")[0].split("$")[1].replaceAll(",", "")) >=
              900
            ) {
              return true;
            }
            return false;
          },
          message: "Debe tener un monto mínimo de 900",
        },
      },
      twelve_months: {
        custom: {
          isValid: (val) => {
            if (removeFormatting(val) === 0) return true;
            if (!values.check_twelve_months) return true;
            if (
              !values.check_three_months &&
              !values.check_six_months &&
              !values.check_nine_months
            )
              return true;
            if (
              values.check_three_months &&
              !values.check_six_months &&
              !values.check_nine_months &&
              removeFormatting(val) > removeFormatting(values.three_months)
            )
              return true;
            if (
              !values.check_three_months &&
              values.check_six_months &&
              !values.check_nine_months &&
              removeFormatting(val) > removeFormatting(values.six_months)
            )
              return true;
            if (
              !values.check_three_months &&
              !values.check_six_months &&
              values.check_nine_months &&
              removeFormatting(val) > removeFormatting(values.nine_months)
            )
              return true;
            if (
              values.check_three_months &&
              values.check_six_months &&
              !values.check_nine_months &&
              removeFormatting(val) > removeFormatting(values.three_months) &&
              removeFormatting(val) > removeFormatting(values.six_months)
            )
              return true;
            if (
              values.check_three_months &&
              !values.check_six_months &&
              values.check_nine_months &&
              removeFormatting(val) > removeFormatting(values.three_months) &&
              removeFormatting(val) > removeFormatting(values.nine_months)
            )
              return true;
            if (
              !values.check_three_months &&
              values.check_six_months &&
              values.check_nine_months &&
              removeFormatting(val) > removeFormatting(values.six_months) &&
              removeFormatting(val) > removeFormatting(values.nine_months)
            )
              return true;
            if (
              values.check_three_months &&
              values.check_six_months &&
              values.check_nine_months &&
              removeFormatting(val) > removeFormatting(values.three_months) &&
              removeFormatting(val) > removeFormatting(values.six_months) &&
              removeFormatting(val) > removeFormatting(values.nine_months)
            )
              return true;
            return false;
          },
          message:
            payments.remote.configuration.allow_months_without_interest
              .error_minimum_amount_higher,
        },
        custom2: {
          isValid: (val) => {
            if (
              parseFloat(val.split(" ")[0].split("$")[1].replaceAll(",", "")) >=
              1200
            ) {
              return true;
            }
            return false;
          },
          message: "Debe tener un monto mínimo de 1200",
        },
      },
    },
    onSubmit: () => {
      var months = new Array<{
        monthsAvailable: number;
        amount_pucharse: number;
        id_msi: number;
        name_msi: string;
      }>();
      if (values.check_three_months) {
        months.push({
          monthsAvailable: 1,
          amount_pucharse: removeFormatting(values.three_months),
          id_msi: 1,
          name_msi: "nameMSI",
        });
      } else
        months.push({
          monthsAvailable: 0,
          amount_pucharse: removeFormatting(values.three_months),
          id_msi: 1,
          name_msi: "nameMSI",
        });
      if (values.check_six_months) {
        months.push({
          monthsAvailable: 1,
          amount_pucharse: removeFormatting(values.six_months),
          id_msi: 2,
          name_msi: "nameMSI",
        });
      } else
        months.push({
          monthsAvailable: 0,
          amount_pucharse: removeFormatting(values.six_months),
          id_msi: 2,
          name_msi: "nameMSI",
        });
      if (values.check_nine_months) {
        months.push({
          monthsAvailable: 1,
          amount_pucharse: removeFormatting(values.nine_months),
          id_msi: 3,
          name_msi: "nameMSI",
        });
      } else
        months.push({
          monthsAvailable: 0,
          amount_pucharse: removeFormatting(values.nine_months),
          id_msi: 3,
          name_msi: "nameMSI",
        });
      if (values.check_twelve_months) {
        months.push({
          monthsAvailable: 1,
          amount_pucharse: removeFormatting(values.twelve_months),
          id_msi: 4,
          name_msi: "nameMSI",
        });
      } else
        months.push({
          monthsAvailable: 0,
          amount_pucharse: removeFormatting(values.twelve_months),
          id_msi: 4,
          name_msi: "nameMSI",
        });

      sendParams({
        //...values,
        cardHolderDataRequest: values.cardHolderDataRequest ? 1 : 0,
        config_client_product_id: values.config_client_product_id,
        have_msi: values.have_msi ? 1 : 0,
        have_validity_default: values.have_validity_default ? 1 : 0,
        id_blocking_behavior: values.id_blocking_behavior ? 1 : 2,
        msg_msi: values.msg_msi,
        msi: months,
        name_blocking_behavior: values.name_blocking_behavior,
        typeSmartlink: 2,
        validity_default: values.validity_default,
        validity_value: values.have_validity_default
          ? values.validity_value
          : 0,
        validity_unity: values.have_validity_default
          ? values.validity_unity
          : 0,
        allow_msi: values.allow_msi ? 1 : 0,
        allowEdition: values.have_validity_default
          ? values.allowEdition
            ? 1
            : 0
          : 0,
      });
    },
  });

  const sendParams = async (data: iRemotePaymentParametersReq) => {
    console.log(JSON.stringify(data, null, 2));
    try {
      const resApi = await customFetch<iRemotePaymentParametersReq, null>(
        "profile/preferences/remote-payments-update-parameters",
        true,
        "POST",
        data
      );
      if (resApi.codeStatus === "00") {
        console.log("sin error");
        console.log(JSON.stringify(resApi, null, 2));
        const msg = await manageErrorsMessages("0" || "1000", lang);
        Swal.fire("Operación exitosa", msg, "success");
      } else {
        console.log("error");
        const msg = await manageErrorsMessages(
          resApi.codeStatus || "1000",
          lang
        );
        Swal.fire("Mensaje", msg, "info");
        console.log(JSON.stringify(resApi, null, 2));
      }
    } catch (err) {
      console.log("otro error");
      const msg = await manageErrorsMessages(
        (err as iCustomResponse).codeStatus || "1000",
        lang
      );
      Swal.fire("Error", msg, "error");
      console.log(JSON.stringify(err, null, 2));
    }
  };

  const getParams = useCallback(async () => {
    try {
      const resApi = await customFetch<undefined, iRemotePaymentParametersRes>(
        "profile/preferences/remote-payments-get-parameters",
        true,
        "GET"
      );
      if (resApi.codeStatus === "00") {
        const result = resApi.information?.results;
        console.log(JSON.stringify(result, null, 2));
        const blocking = result?.id_blocking_behavior === 1;
        const msi = result?.have_msi === 1;
        const vigency = result?.have_validity_default === 1;
        const unit =
          result?.validity_unity === null ||
          result?.validity_unity === undefined ||
          result?.validity_unity === 0;
        const value =
          result?.validity_default === null ||
          result?.validity_default === undefined ||
          result?.validity_default === 0;
        const msiLenght = result!.msi.length;
        const allowNumber = result?.allow_msi === 1;
        const cardHolderData =
          result?.cardHolderDataRequest === null ||
          result?.cardHolderDataRequest === undefined ||
          result?.cardHolderDataRequest === 0;
        const allowedition = resApi.information?.results?.allowEdition === 1;

        let tree_m = getAmount(1, result!.msi);
        let six_m = getAmount(2, result!.msi);
        let nine_m = getAmount(3, result!.msi);
        let twelve_m = getAmount(4, result!.msi);

        reset({
          config_client_product_id: result?.config_client_product_id,
          id_blocking_behavior: blocking || false,
          have_msi: msi || false,
          have_validity_default: vigency || false,
          validity_default: result?.validity_default,
          validity_unity: unit ? 1 : result?.validity_unity,
          validity_value: value ? 1 : result?.validity_default, //value ? 1 : resApi.information.results.validity_value ,
          msg_msi: result?.msg_msi,
          name_blocking_behavior: result?.name_blocking_behavior,
          cardHolderDataRequest: cardHolderData ? false : true,
          allow_msi: allowNumber || false,
          allowEdition: allowedition || false,

          check_three_months:
            result?.msi[0].monthsAvailable === 1 ? true : false,

          check_six_months: result?.msi[1].monthsAvailable === 1 ? true : false,

          check_nine_months:
            result?.msi[2].monthsAvailable === 1 ? true : false,

          check_twelve_months:
            result?.msi[3].monthsAvailable === 1 ? true : false,

          three_months: formatNumber(msiLenght > 0 ? tree_m : 0),
          six_months: formatNumber(msiLenght > 0 ? six_m : 0),
          nine_months: formatNumber(msiLenght > 0 ? nine_m : 0),
          twelve_months: formatNumber(msiLenght > 0 ? twelve_m : 0),
        });

        return;
      } else {
        const msg = await manageErrorsMessages(
          resApi.codeStatus || "1000",
          lang
        );
        Swal.fire("Mensaje", msg, "error");
      }
      reset();
    } catch (err) {
      const msg = await manageErrorsMessages(
        (err as iCustomResponse).codeStatus || "1000",
        lang
      );
      Swal.fire("Error", msg, "error");
    }
  }, [reset, lang]);

  const getAmount = (
    id: number,
    msiArray: Array<{
      monthsAvailable: number;
      amount_pucharse: number;
      id_msi: number;
      name_msi: string;
    }>
  ) => {
    var amount = 0;
    msiArray.forEach((month) => {
      if (month.id_msi === id) amount = month.amount_pucharse;
    });
    return amount;
  };

  const unities = [
    {
      value: 1,
      text: `${titles.profile.preferences.remote_payments.parameter.hour}`,
    },
    {
      value: 2,
      text: `${titles.profile.preferences.remote_payments.parameter.day}`,
    },
    {
      value: 3,
      text: `${titles.profile.preferences.remote_payments.parameter.week}`,
    },
    {
      value: 4,
      text: `${titles.profile.preferences.remote_payments.parameter.month}`,
    },
  ];

  useEffect(() => {
    getParams();
  }, [getParams]);

  return (
    <>
      <form onSubmit={handleSubmit} className="conf-months">
        <h2>{payments.remote.configuration.main_label} </h2>
        <div className="card card--full card--inner-padding">
          <div className="conf-months__container">
            <h2>
              {payments.remote.configuration.behavior_after_shipment.main_label}
            </h2>
            <div className="confMonths">
              <Toogle
                //disabled={disabledParams}
                checkLabel={
                  payments.remote.configuration.behavior_after_shipment.blocking
                }
                uncheckLabel={
                  payments.remote.configuration.behavior_after_shipment
                    .non_blocking
                }
                name="send"
                onChange={() =>
                  reset({
                    ...values,
                    id_blocking_behavior: !values.id_blocking_behavior,
                  })
                }
                checked={values.id_blocking_behavior}
                value={
                  Boolean(values.id_blocking_behavior || false).toString() || ""
                }
              />
            </div>
          </div>
          {values.have_msi && (
            <div className="conf-months__container">
              <h2>
                {
                  payments.remote.configuration.allow_months_without_interest
                    .main_label
                }
              </h2>
              <div className="confMonths">
                <Toogle
                  //disabled={disabledParams}
                  checkLabel={
                    payments.remote.configuration.allow_months_without_interest
                      .allow
                  }
                  uncheckLabel={
                    payments.remote.configuration.allow_months_without_interest
                      .do_not_allow
                  }
                  name="meses"
                  onChange={() =>
                    reset({ ...values, allow_msi: !values.allow_msi })
                  }
                  checked={values.allow_msi}
                  value={Boolean(values.allow_msi || false).toString() || ""}
                />
                <div>
                  <CheckMonths
                    disabled={!values.have_msi || !values.allow_msi}
                    reset={reset}
                    values={values}
                    errors={errors}
                  />
                </div>
              </div>
            </div>
          )}
          <div className="conf-months__container">
            <h2>{payments.remote.configuration.default_vigency.main_label}</h2>
            <div className="confMonths">
              <Toogle
                //disabled={disabledParams}
                checkLabel={
                  payments.remote.configuration.default_vigency.set_up
                }
                uncheckLabel={
                  payments.remote.configuration.default_vigency.do_not_set_up
                }
                name="vigency"
                onChange={() =>
                  reset({
                    ...values,
                    have_validity_default: !values.have_validity_default,
                  })
                }
                checked={values.have_validity_default}
                value={
                  Boolean(values.have_validity_default || false).toString() ||
                  ""
                }
              />
              <Checkbox
                disabled={!values.have_validity_default}
                name="allow_edition"
                placeholder={
                  payments.remote.configuration.default_vigency.allow_edit
                }
                onChange={() =>
                  reset({ ...values, allowEdition: !values.allowEdition })
                }
                checked={values.allowEdition}
                value={Boolean(values.allowEdition || false).toString() || ""}
              />

              <div className="card--vigency">
                <Select
                  disabled={!values.have_validity_default}
                  name="validity_unity"
                  placeholder={
                    payments.remote.configuration.default_vigency.unit
                  }
                  options={unities}
                  label={payments.remote.configuration.default_vigency.unit}
                  value={values.validity_unity || ""}
                  onChange={handleInputChange((val: string) => parseInt(val))}
                  inline
                />
                <Input
                  disabled={!values.have_validity_default}
                  type="number"
                  inline
                  name="validity_value"
                  placeholder={
                    payments.remote.configuration.default_vigency.value
                  }
                  onChange={handleInputChange()}
                  value={values.validity_value}
                />
              </div>
            </div>
          </div>
          <div className="conf-months__container">
            <h2>{payments.remote.configuration.cardholder.main_label}</h2>
            <div className="confMonths">
              <Toogle
                //disabled={disabledParams}
                checkLabel={payments.remote.configuration.cardholder.require}
                uncheckLabel={
                  payments.remote.configuration.cardholder.don_not_require
                }
                name="cardholderData"
                onChange={() =>
                  reset({
                    ...values,
                    cardHolderDataRequest: !values.cardHolderDataRequest,
                  })
                }
                checked={values.cardHolderDataRequest}
                value={
                  Boolean(values.cardHolderDataRequest || false).toString() ||
                  ""
                }
              />
            </div>
          </div>
        </div>
        <div className="interests_buttons">
          <button
            //disabled={disabledParams}
            type="button"
            className="btn btn--default"
            onClick={() => getParams()}
          >
            {titles.profile.preferences.remote_payments.parameter.cancel}
          </button>
          <button
            //disabled={disabledParams}
            type="submit"
            className="btn btn--secondary"
          >
            {titles.profile.preferences.remote_payments.parameter.save}
          </button>
        </div>
      </form>
    </>
  );
};

export default Parameters;
