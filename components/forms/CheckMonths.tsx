import React, { KeyboardEvent, useEffect } from "react";
import Checkbox from "./Checkbox";
import Input from "./Input";
import { useSelector } from "react-redux";
import { iGlobalState, iUiState } from "../../@types/store/states";
import useLang from "../../hooks/useLang";
import handleCurrency from "../../helpers/handleCurrency";

const CheckMonths = (props: any) => {
  const { lang } = useSelector<iGlobalState, iUiState>(({ ui }) => ui);

  const { payments } = useLang(lang);

  useEffect(() => {
    //console.log(JSON.stringify(props,null,2))
  }, [props.errors]);

  return (
    <div className="withoutInterest">
      <div className="withoutInterest__months">
        <Checkbox
          disabled={props.disabled}
          name="three_months"
          placeholder={
            payments.remote.configuration.allow_months_without_interest
              .three_months
          }
          onChange={() =>
            props.reset({
              ...props.values,
              check_three_months: !props.values.check_three_months,
            })
          }
          checked={props.values.check_three_months}
          value={
            Boolean(props.values.check_three_months || false).toString() || ""
          }
        />
        <Input
          disabled={props.disabled || !props.values.check_three_months}
          type="text"
          inline
          name="three_months"
          placeholder={
            payments.remote.configuration.allow_months_without_interest
              .minimum_amount
          }
          onKeyDown={(e: KeyboardEvent<HTMLDivElement>) => {
            props.reset({
              ...props.values,
              three_months: handleCurrency(e, props.values.three_months, 5),
            });
          }}
          onChange={() => {}}
          value={props.values.three_months || ""}
          error={props.errors.three_months}
          //readOnly
        />
      </div>
      <div className="withoutInterest__months">
        <Checkbox
          disabled={props.disabled}
          name="six_months"
          placeholder={
            payments.remote.configuration.allow_months_without_interest
              .six_months
          }
          onChange={() =>
            props.reset({
              ...props.values,
              check_six_months: !props.values.check_six_months,
            })
          }
          checked={props.values.check_six_months}
          value={
            Boolean(props.values.check_six_months || false).toString() || ""
          }
        />
        <Input
          disabled={props.disabled || !props.values.check_six_months}
          type="text"
          inline
          name="six_months"
          placeholder={
            payments.remote.configuration.allow_months_without_interest
              .minimum_amount
          }
          onKeyDown={(e: KeyboardEvent<HTMLDivElement>) => {
            props.reset({
              ...props.values,
              six_months: handleCurrency(e, props.values.six_months, 5),
            });
          }}
          onChange={() => {}}
          // onKeyDown={handleCurrency}
          value={props.values.six_months || ""}
          error={props.errors.six_months}
          //readOnly
        />
      </div>
      <div className="withoutInterest__months">
        <Checkbox
          disabled={props.disabled}
          name="nine_months"
          placeholder={
            payments.remote.configuration.allow_months_without_interest
              .nine_months
          }
          onChange={() =>
            props.reset({
              ...props.values,
              check_nine_months: !props.values.check_nine_months,
            })
          }
          checked={props.values.check_nine_months}
          value={
            Boolean(props.values.check_nine_months || false).toString() || ""
          }
        />
        <Input
          disabled={props.disabled || !props.values.check_nine_months}
          type="text"
          inline
          name="nine_months"
          placeholder={
            payments.remote.configuration.allow_months_without_interest
              .minimum_amount
          }
          onKeyDown={(e: KeyboardEvent<HTMLDivElement>) => {
            props.reset({
              ...props.values,
              nine_months: handleCurrency(e, props.values.nine_months, 5),
            });
          }}
          onChange={() => {}}
          value={props.values.nine_months || ""}
          error={props.errors.nine_months}
        />
      </div>
      <div className="withoutInterest__months">
        <Checkbox
          disabled={props.disabled}
          name="twelve_months"
          placeholder={
            payments.remote.configuration.allow_months_without_interest
              .twelve_months
          }
          onChange={() =>
            props.reset({
              ...props.values,
              check_twelve_months: !props.values.check_twelve_months,
            })
          }
          checked={props.values.check_twelve_months}
          value={
            Boolean(props.values.check_twelve_months || false).toString() || ""
          }
        />
        <Input
          disabled={props.disabled || !props.values.check_twelve_months}
          type="text"
          inline
          name="twelve_months"
          placeholder={
            payments.remote.configuration.allow_months_without_interest
              .minimum_amount
          }
          onKeyDown={(e: KeyboardEvent<HTMLDivElement>) => {
            props.reset({
              ...props.values,
              twelve_months: handleCurrency(e, props.values.twelve_months, 5),
            });
          }}
          onChange={() => {}}
          value={props.values.twelve_months || ""}
          error={props.errors.twelve_months}
        />
      </div>
    </div>
  );
};

export default CheckMonths;
