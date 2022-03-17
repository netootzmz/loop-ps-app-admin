import React, { FC, KeyboardEvent, MouseEvent } from "react";
import handleCurrency from "../../../helpers/handleCurrency";
import Input from "../../forms/Input";

const CollapsedFilters: FC<{
  reset: Function;
  values: Partial<any & {}>;
  handleInputChange: Function;
}> = ({ reset, values, handleInputChange }) => {
  const handleReset = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    reset();
  };

  return (
    <div className="filters__transactions--collapsed">
      <Input
        type="number"
        placeholder="Referencia"
        maxLength={16}
        name="paymentReference"
        onChange={handleInputChange((val: string) => parseInt(val))}
        value={values.paymentReference || ""}
      />
      <Input
        type="text"
        placeholder="Monto de pago"
        full
        onKeyDown={(e: KeyboardEvent<HTMLDivElement>) =>
          reset({
            ...values,
            saleAmount: handleCurrency(e, values.saleAmount, 20),
          })
        }
        onChange={() => {}}
        value={values.saleAmount || ""}
      />
      <button
        type="button"
        className="btn btn--default"
        onClick={handleReset}
        style={{
          alignSelf: "center",
          marginBottom: "1rem",
          marginLeft: "3rem",
        }}
      >
        Limpiar
      </button>
    </div>
  );
};

export default CollapsedFilters;
