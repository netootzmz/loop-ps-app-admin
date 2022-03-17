import React, { FC } from "react";
import CustomDatePickerSeven from "../../forms/CustomDatePickerSeven";
import Selection from "../../forms/Selection";

export const ConciliationFilter: FC<{
  values: Partial<any & {}>;
  errors: any;
  reset: Function;
  handleInputchange: Function;
  handleSubmit: any;
  catalogInfo: any;
  titles: Partial<any & {}>;
}> = ({
  reset,
  values,
  handleInputchange,
  handleSubmit,
  catalogInfo,
  titles,
}) => {
  const BankOptions = [
    {
      value: "",
      text: `${titles.conciliation.parameters.trasmitter_placeholder}`,
    },
  ];

  const statusOptions = [
    {
      value: `${titles.conciliation.parameters.all_placeholder}`,
      text: `${titles.conciliation.parameters.all_placeholder}`,
    },
    {
      value: `${titles.conciliation.parameters.status_conciliated}`,
      text: `Cerrado`,
    },
    {
      value: `${titles.conciliation.parameters.status_not_conciliated}`,
      text: `Con diferencia`,
    },
  ];

  const conciliationTypeOptions = [
    {
      value: `${titles.conciliation.parameters.all_placeholder}`,
      text: `${titles.conciliation.parameters.all_placeholder}`,
    },
    {
      value: `${titles.conciliation.parameters.conciliation_manual}`,
      text: `${titles.conciliation.parameters.conciliation_manual}`,
    },
    {
      value: `Automatica`,
      text: `${titles.conciliation.parameters.conciliation_auto}`,
    },
  ];
  if (catalogInfo.information) {
    catalogInfo.information.information.forEach((data: any) => {
      BankOptions.push({ value: data.nameOption, text: data.nameOption });
    });
  }
  return (
    <>
      <h3 className="filters__title">
        {titles.conciliation.parameters.control_title}
      </h3>
      <form className="card card--full">
        <div className="conciliation">
          <div>
            <span className="conciliation__dateText">
              {titles.conciliation.parameters.date_range}
            </span>
            <div className="conciliation__date_selector">
              <CustomDatePickerSeven
                id="datesRange"
                fn={reset}
                vals={values}
                nameStart="createdAt"
                nameEnd="createdAt2"
              />
            </div>
          </div>
          <div className="conciliation__selector">
            <Selection
              name="bank"
              placeholder={`${titles.conciliation.parameters.trasmitter_placeholder}`}
              options={BankOptions}
              label={`${titles.conciliation.parameters.transmitter_label}`}
              onChange={handleInputchange()}
              value={values.bank || ""}
            />
          </div>
          <div className="conciliation__selector">
            <Selection
              name="status"
              placeholder={`${titles.conciliation.parameters.status_placeholder}`}
              options={statusOptions}
              label={`${titles.conciliation.parameters.status_placeholder}`}
              onChange={handleInputchange()}
              value={values.status}
            />
          </div>
          <div className="conciliation__selector">
            <Selection
              name="conciliationType"
              placeholder={`${titles.conciliation.parameters.conciliation_placeholder}`}
              options={conciliationTypeOptions}
              label={`${titles.conciliation.parameters.conciliation_placeholder}`}
              onChange={handleInputchange()}
              value={values.conciliationType}
            />
          </div>
          <div className="conciliation__buttons">
            <button
              type="button"
              className="btn btn--cancel"
              onClick={() => reset()}
            >
              {`${titles.conciliation.parameters.clean_button}`}
            </button>
            <button
              type="button"
              className="btn btn--mailServer"
              onClick={handleSubmit}
            >
              {`${titles.conciliation.parameters.search_button}`}
            </button>
          </div>
        </div>
      </form>
    </>
  );
};
