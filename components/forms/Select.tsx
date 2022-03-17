import React, {
  DetailedHTMLProps,
  FC,
  OptionHTMLAttributes,
  SelectHTMLAttributes,
} from "react";
import { v4 } from "uuid";

type val = OptionHTMLAttributes<HTMLOptionElement>["value"];

const Select: FC<
  DetailedHTMLProps<
    SelectHTMLAttributes<HTMLSelectElement>,
    HTMLSelectElement
  > & {
    options: Array<{ value: val; text: string | JSX.Element }>;
    label: string;
    error?: string;
    helpText?: string;
    inline?: boolean;
  }
> = ({ options, label, error, helpText, inline = false, ...props }) => {
  const valid = !!!error;
  return (
    <div className={`select__group ${inline ? "select__group--inline" : ""}`}>
      <label htmlFor={props.name} className="select__label">
        {label}
      </label>
      <select className="select" {...props}>
        {options.map((op) => (
          <option className="select__option" value={op.value} key={v4()}>
            {op.text}
          </option>
        ))}
      </select>
      {helpText || (!valid && error) ? (
        <div className="input__text">
          {helpText && valid ? (
            <span className="input__help">{helpText}</span>
          ) : error && !valid ? (
            <span className="text--error">{error}</span>
          ) : (
            <></>
          )}
        </div>
      ) : (
        <></>
      )}
    </div>
  );
};

export default Select;
