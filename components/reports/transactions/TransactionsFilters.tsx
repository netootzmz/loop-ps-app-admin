import React, { FC, MouseEvent, useEffect, useState } from "react";
import useForm from "../../../hooks/useForm";
// import CollapsedFilters from "./CollapsedFilters";
// import CustomDatePicker from "../../forms/CustomDatePicker";
import {
  FullFiltersBottom,
  // FullFiltersCenter,
  // FullFiltersTop,
} from "./FullFilters";
import FiltersTabs from "../../forms/FiltersTabs";
import Swal from "sweetalert2";
import customFetch from "../../../helpers/customFetch";
import { saveAs } from "file-saver";
import { useDispatch } from "react-redux";
import { AnimateHeight } from "react-anim-kit";
import { startGettingTransactionTableData } from "../../../store/actions/transactionsActions";
import { iDownloadTransactionReq } from "../../../@types/api/req";
import {
  iDownloadStatusLinkTableDataRes,
  iGetTransmitterDataRes,
  iCustomResponse,
} from "../../../@types/api/res";
import moment from "moment";
import DateFilterTransaction from "./DateFilterTransaction";

const TransactionsFilters: FC = () => {
  const dispatch = useDispatch();
  const [transmitterOptions, setTransmitterOptions] =
    useState<iCustomResponse<iGetTransmitterDataRes>>();
  const [fullForm, setFullForm] = useState(false);
  const [filters, setFilters] = useState<
    Array<{ filter: string; value: string | number; key: string }>
  >([]);

  const { reset, values, handleInputChange, handleSubmit } = useForm<{
    approval: string;
    cardBrand: string;
    cardNumberEnd: string;
    cardType: number;
    codeMsi: number;
    date_range: string;
    eci: string;
    endDate: string;
    hierarchyLevelId: number;
    initDate: string;
    posEntryModeId: number;
    operationTypeId: number;
    paymentReference: string;
    productId: number;
    responseCode: string;
    saleAmount: string;
    token: string;
    transactionEndDate: string;
    transactionStartDate: string;
    transmitter: string;
    merchant: string;
  }>({
    initialValues: {
      saleAmount: "$0.00 MXN",
      initDate: moment().startOf("day").format("YYYY-MM-DD"),
      endDate: moment().startOf("day").format("YYYY-MM-DD"),
    },
    onSubmit: () => {
      const saleAmount = parseFloat(values.saleAmount.replace(/[$,MXN]/g, ""));

      if (saleAmount !== 0) {
        dispatch(startGettingTransactionTableData({ ...values, saleAmount }));
      } else {
        dispatch(
          startGettingTransactionTableData({ ...values, saleAmount: undefined })
        );
      }
      const placeholders = {
        approval: "No. de aprovación",
        cardBrand: "Marca",
        cardNumberEnd: "Terminación de la tarjeta",
        cardType: "Tipo de tarjeta",
        codeMsi: "Meses sin intereses",
        endDate: "Fecha final",
        hierarchyLevelId: "Grupo",
        initDate: "Fecha inicial",
        operationTypeId: "Tipo de operación",
        paymentReference: "Referencia",
        productId: "Producto",
        saleAmount: "Monto de venta",
        transactionEndDate: "Fecha final de transacción",
        transactionStartDate: "Fecha inicial de transacción",
        transmitter: "Emisor",
        merchant: "Afiliación",
        posEntryModeId: "Modo de entrada",
        responseCode: "Código de respuesta",
        operationMode: "Modo de operación",
      };

      const agrupadorOptions = [
        { value: 2, text: "Grupo" },
        { value: 3, text: "Agrupador" },
        { value: 4, text: "Razón social" },
        { value: 5, text: "Sucursal" },
        { value: 6, text: "Punto de venta" },
      ];

      const fils = Object.keys(values)
        .map((key) => {
          const filter = placeholders[key as keyof typeof placeholders];
          const value =
            filter === "Grupo"
              ? agrupadorOptions.find(
                  (el) =>
                    el.value ===
                    parseInt(values[key as keyof typeof values] as string)
                )?.text || ""
              : values[key as keyof typeof values];

          return {
            key,
            filter,
            value,
          };
        })
        .filter((el) => el.value !== "$0.00 MXN");
      setFilters(fils);
    },
  });

  const handleForm = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setFullForm((val) => !val);
  };

  const handleDownload = async (e: MouseEvent<HTMLButtonElement>) => {
    const saleAmount = parseInt(
      (
        parseFloat(
          values.saleAmount.split(" ")[0].split("$")[1].replaceAll(",", "")
        ) * 100
      ).toString()
    );
    e.preventDefault();
    try {
      Swal.fire({
        title: "Espera un momento mientras preparamos el archivo",
        backdrop: `
      rgba(0,0,123,0.4)
      left top
      no-repeat
    `,
        allowOutsideClick: false,
        didOpen: () => {
          Swal.showLoading();
        },
      });

      const res = await customFetch<
        iDownloadTransactionReq,
        iDownloadStatusLinkTableDataRes
      >("detailtransactions/downloadtransactions", true, "POST", {
        endDate: values.endDate,
        hierarchyLevelId: values.hierarchyLevelId,
        initDate: values.initDate,
        cardBrand: values.cardBrand,
        cardNumberEnd: values.cardNumberEnd,
        cardType: values.cardType,
        codeMsi: values.codeMsi,
        date_range: values.date_range,
        eci: values.eci,
        posEntryModeId: values.posEntryModeId,
        operationTypeId: values.operationTypeId,
        paymentReference: values.paymentReference,
        productId: values.productId,
        responseCode: values.responseCode,
        transactionEndDate: values.transactionEndDate,
        transactionStartDate: values.transactionStartDate,
        transmitter: values.transmitter,
        merchant: values.merchant,
        saleAmount: saleAmount === 0 ? null : saleAmount,
        approval: values.approval,
      });
      if (res.information) {
        var bitmap = Buffer.from(res.information.data, "base64");
        saveAs(
          new Blob([bitmap], { type: "application/octet-stream" }),
          res.information.filename
        );
      }
      Swal.close();
    } catch {
      Swal.close();
    }
  };

  const getTransmitters = async () => {
    await customFetch<{}, iGetTransmitterDataRes>(
      "detailtransactions/getTransmitters",
      true,
      "POST",
      {}
    )
      .then((response) => {
        console.log(response.information);
        setTransmitterOptions(response);
      })
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    const nowDate = moment().startOf("day").format("YYYY-MM-DD");
    console.log("fecha", nowDate);
    dispatch(
      startGettingTransactionTableData({ initDate: nowDate, endDate: nowDate })
    );
  }, [dispatch]);

  useEffect(() => {
    getTransmitters();
  }, []);

  return (
    <form
      className="filters animate__animated animate__fadeInRight"
      onSubmit={handleSubmit}
    >
      <h3 className="filters__title">Filtros</h3>
      <AnimateHeight
        shouldChange={fullForm}
        renderSpaceAfter
        className="card card--full card--inner-padding"
      >
        <div className="card card--full card--inner-padding card--transparent">
          <div
            className={`filters__transactions ${
              fullForm ? "filters__transactions--full" : ""
            }`}
          >
            <DateFilterTransaction
              fn={reset}
              vals={values}
              nameStart="initDate"
              nameEnd="endDate"
            />
            {/*<h4*/}
            {/*  className={`filters__sub ${*/}
            {/*    !fullForm ? "filters__sub--full" : ""*/}
            {/*  }`}*/}
            {/*>*/}
            {/*  Rango de fechas*/}
            {/*</h4>*/}
            {/*{fullForm && <h4 className="filters__sub">Jerarquía comercio</h4>}*/}
            <div
              className="filters__transactions--block-sm"
              style={{
                alignContent: fullForm ? "" : "center",
                alignItems: fullForm ? "" : "center",
              }}
            >
              {/*<CustomDatePicker*/}
              {/*  id="datesRange"*/}
              {/*  fn={reset}*/}
              {/*  vals={values}*/}
              {/*  nameStart="initDate"*/}
              {/*  nameEnd="endDate"*/}
              {/*/>*/}
              {/*{fullForm && (*/}
              {/*  <FullFiltersTop*/}
              {/*    reset={reset}*/}
              {/*    values={values}*/}
              {/*    handleInputChange={handleInputChange}*/}
              {/*  />*/}
              {/*)}*/}
            </div>
            {/*{fullForm ? (*/}
            {/*  <FullFiltersCenter*/}
            {/*    values={values}*/}
            {/*    handleInputChange={handleInputChange}*/}
            {/*  />*/}
            {/*) : (*/}
            {/*<CollapsedFilters*/}
            {/*  reset={reset}*/}
            {/*  values={values}*/}
            {/*  handleInputChange={handleInputChange}*/}
            {/*/>*/}
            {/*)}*/}
            {fullForm && (
              <FullFiltersBottom
                transmitterOptionsData={transmitterOptions}
                reset={reset}
                values={values}
                handleInputChange={handleInputChange}
              />
            )}
          </div>
          <button
            type="button"
            className="btn btn--expand btn--icon"
            onClick={handleForm}
          >
            {fullForm ? <>&#x025B4;</> : <>&#x025BE;</>}
          </button>
        </div>
      </AnimateHeight>
      <FiltersTabs filters={filters} reset={reset} values={values}>
        <button
          className="btn btn--primary"
          type="button"
          onClick={handleDownload}
        >
          Descargar
        </button>
        <button className="btn btn--secondary filters__submit" type="submit">
          Buscar
        </button>
      </FiltersTabs>
    </form>
  );
};

export default TransactionsFilters;
