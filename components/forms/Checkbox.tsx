import React, { DetailedHTMLProps, FC, InputHTMLAttributes } from "react";

const Checkbox: FC<
  DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> & {
    inline?: boolean;
  }
> = ({ inline = false, ...props }) => {
  return (
    <div
      className={`checkbox__container ${
        inline ? "checkbox__container--inline" : ""
      }`}
    >
      <input
        type="checkbox"
        id={props.name}
        className="checkbox__check"
        {...props}
      />
      <label
        htmlFor={props.name}
        className={`checkbox__label  ${
          props.disabled ? "checkbox__label--disabled" : ""
        }`}
      >
        <span className="checkbox">&#10003;</span>
        {props.placeholder && (
          <span className="checkbox__text">{props.placeholder}</span>
        )}
      </label>
    </div>
  );
};

export default Checkbox;
