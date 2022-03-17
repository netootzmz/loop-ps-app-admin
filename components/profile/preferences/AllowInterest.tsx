import React, { FC, useCallback, useEffect } from "react";
import Swal from "sweetalert2";
import { iRemotePaymentParametersReq } from "../../../@types/api/req";
import {
  iCustomResponse,
  iRemotePaymentParametersRes,
} from "../../../@types/api/res";
import customFetch from "../../../helpers/customFetch";
import useForm from "../../../hooks/useForm";
import CheckMonths from "../../forms/CheckMonths";
import Toogle from "../../forms/Toogle";
import Big from "big.js";
import manageErrorsMessages from "../../../helpers/manageErrorsMessages";
import { useSelector } from "react-redux";
import { iGlobalState, iUiState } from "../../../@types/store/states";
import useLang from "../../../hooks/useLang";

const AllowInterest: FC = () => {
  const { lang } = useSelector<iGlobalState, iUiState>(({ ui }) => ui);
  const { titles, payments } = useLang(lang);

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

  const { values, reset, errors, handleSubmit } = useForm<{
    config_client_product_id: number;
    have_msi: boolean;
    check_three_months: boolean;
    check_six_months: boolean;
    check_nine_months: boolean;
    check_twelve_months: boolean;
    three_months: string;
    six_months: string;
    nine_months: string;
    twelve_months: string;
    allow_msi: boolean;
    allowEdition: boolean;
  }>({
    initialValues: {
      config_client_product_id: 0,
      have_msi: false,
      check_three_months: false,
      check_six_months: false,
      check_nine_months: false,
      check_twelve_months: false,
      three_months: "$0.00 MXN",
      six_months: "$0.00 MXN",
      nine_months: "$0.00 MXN",
      twelve_months: "$0.00 MXN",
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
      console.log(JSON.stringify(values, null, 2));
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
        cardHolderDataRequest: 0,
        config_client_product_id: values.config_client_product_id,
        have_msi: values.have_msi ? 1 : 0,
        have_validity_default: 0,
        id_blocking_behavior: 2,
        msg_msi: "msg",
        msi: months,
        name_blocking_behavior: "name",
        typeSmartlink: 1,
        validity_default: 0,
        validity_value: 0,
        validity_unity: 0,
        allow_msi: values.allow_msi ? 1 : 0,
        allowEdition: values.allowEdition ? 1 : 0,
      });
    },
  });

  //const [disabledParams, setDisabledParams] = useState<boolean>(true);

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
        console.log(JSON.stringify(resApi, null, 2));
        const msg = await manageErrorsMessages("0" || "1000", lang);
        Swal.fire(
          `${titles.profile.preferences.checkout.parameters.message}`,
          msg,
          "success"
        );
      } else {
        const msg = await manageErrorsMessages(
          resApi.codeStatus || "1000",
          lang
        );
        Swal.fire(
          `${titles.profile.preferences.checkout.parameters.message}`,
          msg,
          "info"
        );
        console.log(JSON.stringify(resApi, null, 2));
      }
    } catch (err) {
      const msg = await manageErrorsMessages(
        (err as iCustomResponse).codeStatus || "1000",
        lang
      );
      Swal.fire("Error", msg, "error");
      console.log(JSON.stringify(err, null, 2));
    }
  };

  //const values_json = JSON.stringify(values)

  const getParams = useCallback(async () => {
    try {
      const resApi = await customFetch<undefined, iRemotePaymentParametersRes>(
        "profile/preferences/remote-payments-get-parameters",
        true,
        "GET"
      );
      if (resApi.codeStatus === "00") {
        console.log(JSON.stringify(resApi.information?.results, null, 2));
        if (resApi.information?.results?.have_msi !== 1) {
          //setDisabledParams(true);
          const msg = await manageErrorsMessages("72" || "1000", lang);
          Swal.fire("Mensaje", msg, "error");
          return;
        }

        const msi = resApi.information?.results?.have_msi === 1;
        const msiLenght = resApi.information.results.msi.length;
        const allowNumber = resApi.information.results.allow_msi === 1;

        let tree_m = getAmount(1, resApi.information.results.msi);
        let six_m = getAmount(2, resApi.information.results.msi);
        let nine_m = getAmount(3, resApi.information.results.msi);
        let twelve_m = getAmount(4, resApi.information.results.msi);

        //const parsed_vals = JSON.parse(values_json)

        reset({
          //...values_json,
          config_client_product_id:
            resApi.information.results.config_client_product_id,
          have_msi: msi || false,
          check_three_months:
            resApi.information.results.msi[0].monthsAvailable === 1
              ? true
              : false,

          check_six_months:
            resApi.information.results.msi[1].monthsAvailable === 1
              ? true
              : false,

          check_nine_months:
            resApi.information.results.msi[2].monthsAvailable === 1
              ? true
              : false,

          check_twelve_months:
            resApi.information.results.msi[3].monthsAvailable === 1
              ? true
              : false,

          three_months: formatNumber(msiLenght > 0 ? tree_m : 0),
          six_months: formatNumber(msiLenght > 0 ? six_m : 0),
          nine_months: formatNumber(msiLenght > 0 ? nine_m : 0),
          twelve_months: formatNumber(msiLenght > 0 ? twelve_m : 0),
          allow_msi: allowNumber || false,
        });

        return;
      } else {
        const msg = await manageErrorsMessages(
          resApi.codeStatus || "1000",
          lang
        );
        Swal.fire(
          `${titles.profile.preferences.checkout.parameters.message}`,
          msg,
          "error"
        );
      }
      reset();
    } catch (err) {
      const msg = await manageErrorsMessages(
        (err as iCustomResponse).codeStatus || "1000",
        lang
      );
      Swal.fire("Error", msg, "error");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reset, lang]);

  const getAmount = (
    id: number,
    msiArray: Array<{
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

  useEffect(() => {
    getParams();
  }, [getParams]);

  return (
    <form onSubmit={handleSubmit} className="conf-months">
      <h2>
        {titles.profile.preferences.checkout.parameters.configuration_msi}
      </h2>
      <div className="card card--full card--inner-padding">
        <div className="conf-months__container">
          <h2>{titles.profile.preferences.checkout.parameters.allow_msi}</h2>
          <div className="conf-months">
            <Toogle
              disabled={!values.have_msi}
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
      </div>
      <div className="interests_buttons">
        <button
          disabled={!values.have_msi}
          type="button"
          className="btn btn--default"
          onClick={() => getParams()}
        >
          {titles.profile.preferences.checkout.parameters.cancel}
        </button>
        <button type="submit" className="btn btn--secondary">
          {titles.profile.preferences.checkout.parameters.save}
        </button>
      </div>
    </form>
  );
};

export default AllowInterest;
