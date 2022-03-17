import React, { FC, ChangeEvent } from "react";
import { HuePicker } from "react-color";
import Input from "./Input";

const ColorInput: FC<{ title: string; color: string, name: string; onColorChange: (newColor: string, name: string) => void}> = ({
  title,
  onColorChange: handleColorChange,
  name,
  color
}) => {


  return (
    <div className="color-input">
      <span className="color-input__title">{title}</span>
      <div className="color-input__color" style={{ background: color }}>
        &nbsp;
      </div>
      <div className="color-input__bars">
        <HuePicker
          color={color}
          className="color-input__hue"
          onChange={(c: {hex: string}) => handleColorChange(c.hex, name)}
          pointer={() => (
            <div
              className="color-input__pointer color-input__pointer--hue"
              style={{ background: color }}
            >
              &nbsp;
            </div>
          )}
        />
      </div>
      <Input
        name={name}
        type="text"
        placeholder="Hex"
        containerClassName="color-input__hex"
        value={color}
        onChange={(e: ChangeEvent<HTMLInputElement>) => handleColorChange(e.target.value || "", name)}
      />
    </div>
  );
};

export default ColorInput;
