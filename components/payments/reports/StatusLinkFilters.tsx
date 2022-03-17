import React, { FC, MouseEvent, useEffect, useState } from "react";
import useForm from "../../../hooks/useForm";
import CollapsedFilters from "./CollapsedFilters";
import FiltersTabs from "../../forms/FiltersTabs";
import { useDispatch } from "react-redux";
import { saveAs } from "file-saver";
import { AnimateHeight } from "react-anim-kit";
import { gettingStatusLinkTableData } from "../../../store/actions/paymentAction";
import Swal from "sweetalert2";
import customFetch from "../../../helpers/customFetch";
import { iDownloadStatusLinkTableDataReq } from "../../../@types/api/req";
import { iDownloadStatusLinkTableDataRes } from "../../../@types/api/res";
import moment from "moment";
import DatefilterStatus from "./DatefilterStatus";

const StatusLinkFilters: FC<{
  titles: Partial<any & {}>
}> = ({
  titles
}) => {
  const dispatch = useDispatch();
  const [fullForm, setFullForm] = useState(false);
  const [filters, setFilters] = useState<
    Array<{ filter: string; value: string | number; key: string }>
  >([]);

  const { reset, values, handleInputChange, handleSubmit } = useForm<{
    createdAt: string;
    createdAt2: string;
    linkStatus: number;
    paymentStatus: number;
  }>({
    initialValues: {
      createdAt: moment().startOf("day").format("YYYY-MM-DD"),
      createdAt2: moment().startOf("day").format("YYYY-MM-DD"),
    },
    onSubmit: () => {
      dispatch(gettingStatusLinkTableData({ ...values }));
      const placeholders = {
        createdAt2: "Fecha final",
        createdAt: "Fecha inicial",
        paymentStatus: "Estatus de pago",
        linkStatus: "Estatus de liga",
      };

      const paymentStatusOptions = [
        { value: 0, text: `${titles.adjustment.parameters.status}` },
        { value: 1, text: `${titles.adjustment.parameters.not_pay}` },
        { value: 2, text: `${titles.adjustment.parameters.pay}` },
      ];

      const linkStatusOptions = [
        { value: 0, text: `${titles.adjustment.parameters.status}` },
        { value: 1, text: `${titles.adjustment.parameters.active}` },
        { value: 2, text: `${titles.adjustment.parameters.canceled}` },
        { value: 3, text: `${titles.adjustment.parameters.expired}` },
      ];

      const fils = Object.keys(values)
        .map((key) => {
          const filter = placeholders[key as keyof typeof placeholders];
          const value =
            filter === "Estatus de pago"
              ? paymentStatusOptions.find(
                  (el) =>
                    el.value ===
                    parseInt(values[key as keyof typeof values] as string)
                )?.text || ""
              : values[key as keyof typeof values] &&
                filter === "Estatus de liga"
              ? linkStatusOptions.find(
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
        .filter((el) => el.value);
      setFilters(fils);
    },
  });

  const handleForm = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setFullForm((val) => !val);
  };

  const handleDownloadStatus = async (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    try {
      Swal.fire({
        title: `${titles.adjustment.parameters.wait}`,
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
        iDownloadStatusLinkTableDataReq,
        iDownloadStatusLinkTableDataRes
      >("payments/downloadStatusLink", true, "POST", {
        createdAt: values.createdAt,
        createdAt2: values.createdAt2,
        linkStatus: values.linkStatus,
        paymentStatus: values.paymentStatus,
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

  useEffect(() => {
    const nowDate = moment().startOf("day").format("YYYY-MM-DD");
    console.log("fecha", nowDate);
    dispatch(
      gettingStatusLinkTableData({ createdAt: nowDate, createdAt2: nowDate })
    );
  }, [dispatch]);
  return (
    <form
      className="filters animate__animated animate__fadeInRight"
      onSubmit={handleSubmit}
    >
      <h3 className="filters__title">{titles.adjustment.parameters.filters}</h3>
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
            <DatefilterStatus
              fn={reset}
              vals={values}
              nameStart="createdAt"
              nameEnd="createdAt2"
            />
            <div
              className="filters__transactions--block-sm"
              style={{
                alignContent: fullForm ? "" : "center",
                alignItems: fullForm ? "" : "center",
              }}
            >
            </div>
            {fullForm && (
            <CollapsedFilters
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
          onClick={handleDownloadStatus}
        >
          {titles.adjustment.parameters.download}
        </button>
        <button className="btn btn--secondary filters__submit" type="submit">
          {titles.adjustment.parameters.search}
        </button>
      </FiltersTabs>
    </form>
  );
};

export default StatusLinkFilters;
