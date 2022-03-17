import React, { FC, KeyboardEvent, MouseEvent, ClipboardEvent } from "react";
import Select from "../../forms/Select";
import Input from "../../forms/Input";
// import CustomDatePicker from "../../forms/CustomDatePicker";
import {
  iGetTransmitterDataRes,
  iCustomResponse,
} from "../../../@types/api/res";
import handleCurrency from "../../../helpers/handleCurrency";
import CustomDatePicker from "../../forms/CustomDatePicker";

export const FullFiltersTop: FC<{
  reset: Function;
  values: Partial<any & {}>;
  handleInputChange: Function;
}> = ({ reset, values, handleInputChange }) => {
  const operationTypeIdOptions = [
    { value: 0, text: "Tipo de operación" },
    { value: 2, text: "Venta" },
    { value: 3, text: "Devolución" },
    { value: 4, text: "Cancelación" },
  ];
  return (
    <>
      <CustomDatePicker
        id="datesRange"
        fn={reset}
        vals={values}
        nameStart="initDate"
        nameEnd="endDate"
      />
      <Select
        name="operationTypeId"
        placeholder="Tipo de operación"
        options={operationTypeIdOptions}
        label="Tipo de operación"
        inline
        onChange={handleInputChange((val: string) => parseInt(val))}
        value={values.operationTypeId || ""}
      />
      <Input
        placeholder="Monto de venta"
        name="saleAmount"
        onKeyDown={(e: KeyboardEvent<HTMLDivElement>) =>
          reset({
            ...values,
            saleAmount: handleCurrency(e, values.saleAmount, 20),
          })
        }
        onChange={() => {}}
        value={values.saleAmount || ""}
      />
    </>
  );
};

export const FullFiltersCenter: FC<{
  values: Partial<any & {}>;
  handleInputChange: Function;
}> = ({ values, handleInputChange }) => {
  const hierarchyLevelIdOptions = [
    { value: 2, text: "Grupo" },
    { value: 3, text: "Agrupador" },
    { value: 4, text: "Razón social" },
    { value: 5, text: "Sucursal" },
    { value: 6, text: "Punto de venta" },
  ];

  const agrupadorOptions = [
    { value: 2, text: "Grupo" },
    { value: 3, text: "Agrupador" },
    { value: 4, text: "Razón social" },
    { value: 5, text: "Sucursal" },
    { value: 6, text: "Punto de venta" },
  ];

  const razonSocialOptions = [
    { value: 2, text: "Grupo" },
    { value: 3, text: "Agrupador" },
    { value: 4, text: "Razón social" },
    { value: 5, text: "Sucursal" },
    { value: 6, text: "Punto de venta" },
  ];

  const sucursalOptions = [
    { value: "", text: "Sucursal" },
    { value: "Delta", text: "Detla" },
  ];

  const posOptions = [
    { value: "", text: "PoS" },
    { value: "Punto de venta", text: "Punto de venta" },
  ];
  return (
    <div className="filters__transactions--block">
      <Select
        name="hierarchyLevelId"
        placeholder="Grupo"
        options={hierarchyLevelIdOptions}
        label="Grupo"
        onChange={handleInputChange((val: string) => parseInt(val))}
        value={values.hierarchyLevelId || ""}
        inline
      />
      <Select
        name="agrupador"
        placeholder="Agrupador"
        options={agrupadorOptions}
        label="Agrupador"
        value={values.agrupador || ""}
        onChange={handleInputChange((val: string) => parseInt(val))}
        inline
        disabled
      />
      <Select
        name="razon"
        placeholder="Razón social"
        options={razonSocialOptions}
        onChange={handleInputChange((val: string) => parseInt(val))}
        value={values.razon_social || ""}
        inline
        label="Razón social"
        disabled
      />
      <Select
        name="suc"
        placeholder="Sucursal"
        options={sucursalOptions}
        label="Sucursal"
        onChange={handleInputChange()}
        value={values.sucursal || ""}
        disabled
        inline
      />
      <Select
        name="pos"
        placeholder="PoS"
        options={posOptions}
        label="PoS"
        inline
        onChange={handleInputChange()}
        value={values.pos || ""}
        disabled
      />
    </div>
  );
};
export const FullFiltersBottom: FC<{
  transmitterOptionsData: iCustomResponse<iGetTransmitterDataRes> | undefined;
  reset: Function;
  values: Partial<any & {}>;
  handleInputChange: Function;
}> = ({ transmitterOptionsData, reset, values, handleInputChange }) => {
  const transmitterOptions = [{ value: "", text: "Emisor" }];
  transmitterOptionsData?.information?.results.forEach((option) => {
    transmitterOptions.push({ value: option.cve, text: option.name });
  });

  const handleReset = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    reset();
  };

  const modoOperacionOptions = [
    { value: 0, text: "Modo" },
    { value: 1, text: "Agregación" },
    { value: 2, text: "Procesamiento" },
  ];

  const cardBrandOptions = [
    { value: "", text: "Marca" },
    { value: "VISA", text: "VISA" },
    { value: "Mastercard", text: "Mastercard" },
    { value: "AMERICAN EXPRESS", text: "American Express" },
  ];

  const inputModeOptions = [
    { value: 0, text: "Modo de entrada" },
    { value: 1, text: "Manual" },
    { value: 2, text: "Deslizada" },
    { value: 3, text: "Insertada" },
    { value: 4, text: "Fallback" },
    { value: 5, text: "Código de barras" },
    { value: 6, text: "Comercio electrónico" },
    { value: 7, text: "Contactless deslizada" },
    { value: 8, text: "Contactless chip" },
    { value: 9, text: "En linea" },
    { value: 10, text: "Tag NFC" },
    { value: 11, text: "QR" },
  ];

  const productIdOptions = [
    { value: 0, text: "Producto" },
    { value: 1, text: "Checkout" },
    { value: 2, text: "Liga de pago" },
    { value: 3, text: "Tarjeta presente" },
  ];

  const codeMsiOptions = [
    { value: 0, text: "Meses" },
    { value: 1, text: "1 mes" },
    { value: 3, text: "3 meses" },
    { value: 6, text: "6 meses" },
    { value: 9, text: "9 meses" },
    { value: 12, text: "12 meses" },
  ];

  const estatusOptions = [
    { value: "", text: "Estatus" },
    { value: "Aprobada", text: "Aprobada" },
    { value: "Declinada", text: "Declinada" },
  ];

  const cardTypeOptions = [
    { value: 0, text: "Tipo de tarjeta" },
    { value: 1, text: "Débito" },
    { value: 2, text: "Crédito" },
  ];

  const handleOnPastaSaleAmount = (e: ClipboardEvent<HTMLInputElement>) => {
    const dto = parseFloat(e.clipboardData.getData("text"));
    if (dto) {
      const numberFormat = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
      });
      const dataFormated = `${numberFormat.format(dto)} MXN`;

      reset({
        ...values,
        saleAmount: dataFormated,
      });
    }
  };

  return (
    <>
      <h4 className="filters__sub filters__sub--full">Rango de fechas</h4>
      <div className="filters__transactions--block-tmp">
        <CustomDatePicker
          id="datesRange"
          fn={reset}
          vals={values}
          nameStart="initDate"
          nameEnd="endDate"
        />
        <Input
          type="text"
          placeholder="Monto de pago"
          onKeyDown={(e: KeyboardEvent<HTMLDivElement>) =>
            reset({
              ...values,
              saleAmount: handleCurrency(e, values.saleAmount, 20),
            })
          }
          onChange={() => {}}
          onPaste={handleOnPastaSaleAmount}
          value={values.saleAmount || ""}
        />
        <Input
          placeholder="Referencia"
          maxLength={16}
          name="paymentReference"
          onChange={handleInputChange()}
          value={values.paymentReference || ""}
          type="number"
        />
        <Input
          placeholder="Terminación de tarjeta"
          maxLength={4}
          name="cardNumberEnd"
          onChange={handleInputChange()}
          type="number"
          value={values.cardNumberEnd || ""}
        />
        <Select
          label="Marca"
          options={cardBrandOptions}
          placeholder="Marca"
          onChange={handleInputChange()}
          value={values.cardBrand || ""}
          name="cardBrand"
        />
        <Select
          label="Modo de entrada"
          options={inputModeOptions}
          placeholder="Modo de entrada"
          onChange={handleInputChange((val: string) => parseInt(val))}
          value={values.posEntryModeId || ""}
          name="posEntryModeId"
        />
        <Select
          label="Emisor"
          options={transmitterOptions}
          placeholder="Emisor"
          onChange={handleInputChange()}
          value={values.transmitter || ""}
          name="transmitter"
        />
        <Select
          onChange={handleInputChange((val: string) => parseInt(val))}
          value={values.operationMode || ""}
          name="operationMode"
          placeholder="Modo de operación"
          options={modoOperacionOptions}
          label="Modo de operación"
        />
        <Select
          label="Producto"
          options={productIdOptions}
          placeholder="Producto"
          onChange={handleInputChange((val: string) => parseInt(val))}
          value={values.productId || ""}
          name="productId"
        />
        <Select
          label="Meses sin intereses"
          options={codeMsiOptions}
          placeholder="Meses sin intereses"
          onChange={handleInputChange((val: string) => parseInt(val))}
          value={values.codeMsi || ""}
          name="codeMsi"
        />
        {/*<Input*/}
        {/*  placeholder="Referencia"*/}
        {/*  maxLength={16}*/}
        {/*  name="paymentReference"*/}
        {/*  type="number"*/}
        {/*  onChange={handleInputChange((val: string) => parseInt(val))}*/}
        {/*  value={values.paymentReference || ""}*/}
        {/*/>*/}
        <Select
          label="Estatus"
          options={estatusOptions}
          placeholder="Estatus"
          onChange={handleInputChange()}
          value={values.authorizerStatus || ""}
          name="authorizerStatus"
        />
        <Input
          placeholder="Código de respuesta"
          name="responseCode"
          maxLength={4}
          onChange={handleInputChange()}
          value={values.responseCode || ""}
        />
        <Select
          label="Tipo de tarjeta"
          options={cardTypeOptions}
          placeholder="Tipo de tarjeta"
          onChange={handleInputChange((val: string) => parseInt(val))}
          value={values.cardType || ""}
          name="cardType"
        />
        <Input
          placeholder="Número de aprobación"
          name="approval"
          maxLength={6}
          onChange={handleInputChange()}
          value={values.approval || ""}
        />
        <Input
          placeholder="Afiliación"
          maxLength={10}
          name="merchant"
          onChange={handleInputChange()}
          value={values.merchant || ""}
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
    </>
  );
};
