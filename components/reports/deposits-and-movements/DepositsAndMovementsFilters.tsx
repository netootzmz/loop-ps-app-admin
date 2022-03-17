/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import moment from "moment";

import {
  useHasManyRFCs,
  useHasManyCLABEs,
  useGetMenu,
} from "api/configuration/UserInformationController";

import CustomDatePicker from "../../forms/CustomDatePicker";
import Input from "components/forms/Input";
import Hierarchies from "./Hierarchies";

import { useFilters } from "./DepositsAndMovementsFiltersContext";
import useForm from "hooks/useForm";

const DepositsAndMovementsFilters = () => {
  const [showRFCInput, setShowRFCInput] = useState(false);
  const [showCLABEInput, setShowCLABEInput] = useState(false);
  const queryHasManyRFCs = useHasManyRFCs();
  const queryHasManyCLABEs = useHasManyCLABEs();
  const queryGetMenu = useGetMenu();
  const { filters, updateFilters, resetFilters } = useFilters();
  const { values, reset } = useForm<{
    startDate: string;
    endDate: string;
  }>({
    initialValues: {
      startDate: moment().startOf("day").format("YYYY-MM-DD"),
      endDate: moment().startOf("day").format("YYYY-MM-DD"),
    },
  });
  const [inputs, setInputs] = useState({
    paymentReference: filters.paymentReference,
    rfc: filters.rfc,
    clabe: filters.clabe,
  });

  useEffect(() => {
    setInputs({
      rfc: filters.rfc,
      paymentReference: filters.paymentReference,
      clabe: filters.clabe,
    });
  }, [filters]);

  useEffect(() => {
    if (values.startDate) {
      updateFilters({ startDate: values.startDate });
    }
    if (values.endDate) {
      updateFilters({ endDate: values.endDate });
    }
  }, [values]);

  useEffect(() => {
    if (queryHasManyRFCs.status === "success") {
      setShowRFCInput(queryHasManyRFCs.data.has_many_rfcs);
    }
  }, [queryHasManyRFCs]);

  useEffect(() => {
    if (queryHasManyCLABEs.status === "success") {
      setShowCLABEInput(queryHasManyCLABEs.data.has_many_clabes);
    }
  }, [queryHasManyCLABEs]);

  const onChaneInput = (event: React.FormEvent<HTMLInputElement>) => {
    event.preventDefault();
    updateFilters({
      ...filters,
      [event.currentTarget.name]: event.currentTarget.value.toLocaleUpperCase(),
    });
  };

  return (
    <div className="deposits-and-movements__filters animate__animated animate__fadeInRight">
      <h3 className="filters__title">Filtros</h3>
      <section className="card card--full filters-container">
        <section className="side">
          <h4 className="h4" style={{ marginBottom: "1.5rem" }}>
            <b>Rango de fechas</b>
          </h4>
          <div className="side--container">
            <article>
              <CustomDatePicker
                id="datesRange"
                fn={reset}
                vals={values}
                nameStart="startDate"
                nameEnd="endDate"
                className="input-date"
              />
            </article>
            {showRFCInput && (
              <article>
                <Input
                  placeholder="RFC"
                  name="rfc"
                  onChange={onChaneInput}
                  value={inputs.rfc}
                  maxLength={13}
                />
              </article>
            )}
            <article>
              <Input
                placeholder="Referencia de pago"
                name="paymentReference"
                onChange={onChaneInput}
                value={inputs.paymentReference}
              />
            </article>
            {showCLABEInput && (
              <article>
                <Input
                  placeholder="Cuenta CLABE"
                  name="clabe"
                  onChange={onChaneInput}
                  value={inputs.clabe}
                  maxLength={18}
                />
              </article>
            )}
          </div>
        </section>
        {queryGetMenu.isSuccess && (
          <Hierarchies groupId={queryGetMenu.data.userInfo.group} />
        )}
      </section>
      <section className="btns-section">
        <button
          className="btn btn--cancel"
          type="button"
          onClick={() => {
            reset();
            resetFilters();
          }}
        >
          Limpiar
        </button>
        <button
          className="btn btn--secondary filters__submit"
          type="button"
          onClick={() => {
            updateFilters({ updateTable: true });
          }}
        >
          Buscar
        </button>
      </section>
    </div>
  );
};

export default DepositsAndMovementsFilters;
