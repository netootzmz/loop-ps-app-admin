import React, { FC } from "react";
const FiltersTabs: FC<{
  filters: Array<{ filter: string; value: string | number; key: string }>;
  reset: Function;
  values: Partial<any & {}>;
}> = ({ filters, reset, values, children }) => {
  const handleResetFilter = (filter: {
    filter: string;
    value: string | number;
    key: string;
  }) => {
    console.log(values[filter.key]);
    delete values[filter.key];
    if (filter.key === "saleAmount") {
      reset({ ...values, [filter.key]: "$0.00 MXN" });
      return;
    }
    if (Object.keys(values).length === 0) {
      reset();
      return;
    }
    reset({ ...values });
  };

  const productIdOptions = [
    "Producto",
    "Checkout",
    "Liga de pago",
    "Tarjeta presente",
  ];

  const cardTypeOptions = ["Tipo de tarjeta", "Débito", "Crédito"];

  const inputModeOptions = [
    "Modo de entrada",
    "Manual",
    "Deslizada",
    "Insertada",
    "Fallback",
    "Código de barras",
    "Comercio electrónico",
    "Contactless deslizada",
    "Contactless chip",
    "En linea",
    "Tag NFC",
    "QR",
  ];

  const modoOperacionOptions = ["Modo", "Agregación", "Procesamiento"];

  return (
    <div className="filters__footer">
      <div className="filters__tabs">
        {filters.map((filter, i) => (
          <div
            className="filters__tab-container animate__animated animate__bounceIn"
            key={`${i}-${filter}`}
          >
            <h5 className="filters__tab-title">{filter.filter}</h5>
            <div className="filters__tab">
              {filter.key === "productId" ? (
                <span>{productIdOptions[filter.value as number]}</span>
              ) : filter.key === "cardType" ? (
                <span>{cardTypeOptions[filter.value as number]}</span>
              ) : filter.key === "posEntryModeId" ? (
                <span>{inputModeOptions[filter.value as number]}</span>
              ) : filter.key === "operationMode" ? (
                <span>{modoOperacionOptions[filter.value as number]}</span>
              ) : (
                <span>{filter.value}</span>
              )}
              <button
                type="submit"
                className="btn btn--icon filters__close"
                onClick={() => handleResetFilter(filter)}
              >
                &times;
              </button>
            </div>
          </div>
        ))}
      </div>
      {children}
    </div>
  );
};

export default FiltersTabs;
