import React, { DetailedHTMLProps, FC, InputHTMLAttributes } from "react";

const Toogle: FC<
  DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> & {
    uncheckLabel: string;
    checkLabel: string;
    center?: boolean;
  }
> = ({ uncheckLabel, checkLabel, center = false, ...props }) => {
  return (
    <div
      className={`toogle__container ${
        center ? "toogle__container--center" : ""
      }`}
    >
      <span className="toogle__text">{uncheckLabel}</span>
      <input
        type="checkbox"
        id={props.name}
        {...props}
        className="toogle__checkbox"
      />
      <label htmlFor={props.name} className="toogle">
        &nbsp;
      </label>
      <span className="toogle__text">{checkLabel}</span>
    </div>
  );
};

export default Toogle;
