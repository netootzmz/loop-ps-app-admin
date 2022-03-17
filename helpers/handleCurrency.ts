import { KeyboardEvent } from "react";
import Big from "big.js";

const handleCurrency = (
  e: KeyboardEvent<HTMLDivElement>,
  curr: string,
  maxLenght: number | null
): string => {
  const pressedKey = e.keyCode || e.which || e.charCode;
  if (pressedKey === 8) {
    const stringCutted = curr.split(" ")[0].split("$")[1];
    const oldNumber = parseInt(
      Big(parseFloat(stringCutted.replaceAll(",", "")))
        .mul(100)
        .toString()
    ).toString();
    const cuttedOld = oldNumber.slice(0, oldNumber.length - 1);

    const newNumber = new Intl.NumberFormat("en-US").format(
      parseInt(cuttedOld) / 100 || 0
    );

    const formatedNewNumber = `$${newNumber !== "0" ? newNumber : "0.00"} MXN`;
    return formatedNewNumber;
  } else if (/^[0-9\b]+$/.test(e.key)) {
    const stringCutted = curr.split(" ")[0].split("$")[1];
    const oldNumber = parseInt(
      Big(parseFloat(stringCutted.replaceAll(",", "")))
        .mul(100)
        .toString()
    ).toString();
    const lastDigit = oldNumber.charAt(oldNumber.length - 1);
    const cuttedOld = oldNumber.slice(0, oldNumber.length - 1);
    const newNumber = `$${new Intl.NumberFormat("en-US").format(
      parseInt(cuttedOld) || 0
    )}.${lastDigit}${e.key} MXN`;
    if (
      stringCutted.replaceAll(",", "").split(".")[0].length <
      (maxLenght !== null ? maxLenght : 8)
    ) {
      return newNumber;
    }
    return curr;
  }
  return curr;
};

export default handleCurrency;
