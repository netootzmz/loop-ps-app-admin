import React, { FC, KeyboardEvent, useEffect, useState } from "react";
import Swal from "sweetalert2";
import {
  iGetBusinessNameReq,
  iGetGroupByCatalogReq,
  iGetSubsidiaryCatalogReq,
} from "../../../@types/api/req";
import {
  iGetBusinessNameRes,
  iGetGroupByCatalogRes,
  iGetSubsidiaryCatalogRes,
} from "../../../@types/api/res";
import customFetch from "../../../helpers/customFetch";
import CustomDatePicker from "../../forms/CustomDatePicker";
import Input from "../../forms/Input";
import Selection from "../../forms/Selection";

export const PendingFilter: FC<{
  values: Partial<any & {}>;
  reset: Function;
  handleInputChange: Function;
  titles: Partial<any & {}>;
  getInfo: any;
  groupCatalog: Array<any>;
}> = ({ values, reset, handleInputChange, titles, getInfo, groupCatalog }) => {
  const [groups, setGroups] = useState<any>();
  const [business, setBusiness] = useState<any>();
  const [subsidiary, setSubsidiary] = useState<any>();

  const GroupOptions = [{ value: "", text: "Grupo" }];

  const GroupByOptions = [{ value: "", text: "Agrupador" }];

  const BusinessNameOptions = [{ value: "", text: "Razón social" }];

  const SubsidiaryOptions = [{ value: "", text: "Sucursal" }];

  if (groupCatalog.length > 0) {
    groupCatalog.forEach((data: any) => {
      GroupOptions.push({
        value: data.group_id,
        text: data.name,
      });
    });
  }

  const onlyNumbers = (e: KeyboardEvent<HTMLDivElement>) => {
    const pressedKey = e.keyCode || e.which || e.charCode;
    if (
      (pressedKey <= 36 || pressedKey >= 40) &&
      !/^[0-9\b]+$/.test(e.key) &&
      pressedKey !== 8
    )
      e.preventDefault();
  };

  const getGroupByCatalog = async () => {
    let groupsOptions;
    if (values.group && values.group !== "") {
      await customFetch<iGetGroupByCatalogReq, iGetGroupByCatalogRes>(
        "dispersion/getGroupByCatalog",
        true,
        "POST",
        {
          group_id: values.group,
        }
      )
        .then((response: any) => {
          if (response.information.group.length > 0) {
            groupsOptions = [
              {
                value: "",
                text: "Agrupador",
              },
            ];
            response.information.group.forEach((data: any) => {
              groupsOptions.push({
                value: data.group_id,
                text: data.name,
              });
            });
            setGroups(groupsOptions);
          } else {
            setGroups([
              {
                value: "",
                text: "Agrupador",
              },
            ]);
          }
        })
        .catch(() => {
          Swal.fire({
            icon: "error",
            title: "Error",
            text: "Error al obtener el catalogo de Agrupador",
          });
        });
    } else {
      setGroups([
        {
          value: "",
          text: "Agrupador",
        },
      ]);
    }
  };

  const getBusinessNameCatalog = async () => {
    let businessOptions;
    if (values.group_by !== "") {
      await customFetch<iGetBusinessNameReq, iGetBusinessNameRes>(
        "dispersion/getBusinessNameCatalog",
        true,
        "POST",
        {
          group_id: values.group_by,
        }
      )
        .then((response: any) => {
          if (response.information?.group.length > 0) {
            businessOptions = [
              {
                value: "",
                text: "Razón social",
              },
            ];
            response.information.group.forEach((data: any) => {
              businessOptions.push({
                value: data.group_id,
                text: data.name,
              });
            });
            setBusiness(businessOptions);
          } else {
            setBusiness([
              {
                value: "",
                text: "Razón social",
              },
            ]);
          }
        })
        .catch(() => {
          Swal.fire({
            icon: "error",
            title: "Error",
            text: "Error al obtener el catalogo de razón social",
          });
        });
    } else {
      setBusiness([
        {
          value: "",
          text: "Razón social",
        },
      ]);
    }
    if (values.group === "") {
      setBusiness([
        {
          value: "",
          text: "Razón social",
        },
      ]);
    }
  };

  const getSubsidiaryCatalog = async () => {
    let subsidaryOptions;
    if (values.business_name !== "") {
      await customFetch<iGetSubsidiaryCatalogReq, iGetSubsidiaryCatalogRes>(
        "dispersion/getSubsidiaryCatalog",
        true,
        "POST",
        {
          group_id: values.business_name,
        }
      )
        .then((response: any) => {
          if (response.information.group.length > 0) {
            subsidaryOptions = [
              {
                value: "",
                text: "Sucursal",
              },
            ];
            response.information.group.forEach((data: any) => {
              subsidaryOptions.push({
                value: data.group_id,
                text: data.name,
              });
            });
            setSubsidiary(subsidaryOptions);
          } else {
            setSubsidiary([
              {
                value: "",
                text: "Sucursal",
              },
            ]);
          }
        })
        .catch(() => {
          Swal.fire({
            icon: "error",
            title: "Error",
            text: "Error al obtener el catalogo de sucursal",
          });
        });
    } else {
      setSubsidiary([
        {
          value: "",
          text: "Sucursal",
        },
      ]);
    }
    if (values.group === "") {
      setSubsidiary([
        {
          value: "",
          text: "Sucursal",
        },
      ]);
    }
    if (values.group_by === "") {
      setSubsidiary([
        {
          value: "",
          text: "Sucursal",
        },
      ]);
    }
    if (values.business_name === "") {
      setSubsidiary([
        {
          value: "",
          text: "Sucursal",
        },
      ]);
    }
  };

  useEffect(() => {
    getGroupByCatalog();
    if (values.group === "") {
      reset({
        ...values,
        group: "",
        business_name: "",
        group_by: "",
        subsidiary: "",
        level: 0,
      });
    } else {
      reset({
        ...values,
        business_name: "",
        group_by: "",
        subsidiary: "",
        level: 2,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [values.group]);

  useEffect(() => {
    getBusinessNameCatalog();
    if (values.group_by === "") {
      if (values.group === "") {
        reset({
          ...values,
          group_by: "",
          business_name: "",
          subsidiary: "",
          level: 0,
        });
      } else {
        reset({
          ...values,
          group_by: "",
          business_name: "",
          subsidiary: "",
          level: 2,
        });
      }
    } else {
      reset({
        ...values,
        business_name: "",
        subsidiary: "",
        level: 3,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [values.group_by]);

  useEffect(() => {
    getSubsidiaryCatalog();
    if (values.business_name === "") {
      if (values.group === "") {
        reset({
          ...values,
          group_by: "",
          business_name: "",
          subsidiary: "",
          level: 0,
        });
      } else if (values.group_by === "") {
        reset({
          ...values,
          group_by: "",
          business_name: "",
          subsidiary: "",
          level: 2,
        });
      } else {
        reset({
          ...values,
          business_name: "",
          subsidiary: "",
        });
      }
    } else {
      reset({
        ...values,
        subsidiary: "",
        level: 4,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [values.business_name]);

  useEffect(() => {
    if (values.subsidiary === "") {
      if (values.group === "") {
        reset({
          ...values,
          group_by: "",
          business_name: "",
          subsidiary: "",
          level: 0,
        });
      } else if (values.group_by === "") {
        reset({
          ...values,
          group_by: "",
          business_name: "",
          subsidiary: "",
          level: 2,
        });
      } else if (values.business_name === "") {
        reset({
          ...values,
          business_name: "",
          subsidiary: "",
          level: 3,
        });
      } else {
        reset({
          ...values,
          subsidiary: "",
          level: 4,
        });
      }
    } else {
      reset({
        ...values,
        level: 5,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [values.subsidiary]);

  return (
    <div>
      <h3 className="filters__title">Filtros</h3>
      <form className="card card--full card--short">
        <span className="conciliation__dateText dispersion__fields_first">
          {titles.conciliation.parameters.date_range}
        </span>
        <span className="dispersion__dateText dispersion__fields_second">
          Jerarquía comercio
        </span>
        <div className="dispersion__fields_third">
          <CustomDatePicker
            id="datesRange"
            fn={reset}
            vals={values}
            nameStart="createdAt"
            nameEnd="createdAt2"
          />
        </div>
        <div className="dispersion__fields_fourth">
          <Input
            inline
            maxLength={13}
            name="rfc"
            onChange={handleInputChange()}
            placeholder="RFC"
            type="text"
            value={values.rfc}
          />
        </div>
        <div className="dispersion__fields_fifth">
          <Selection
            name="group"
            placeholder="Grupo"
            options={GroupOptions}
            label="Grupo"
            onChange={handleInputChange()}
            value={values.group}
          />
        </div>
        <div className="dispersion__fields_sixth">
          <Selection
            name="group_by"
            placeholder="Agrupador"
            options={groups || GroupByOptions}
            label="Agrupador"
            onChange={handleInputChange()}
            value={values.group_by}
          />
        </div>
        <div className="dispersion__fields_seventh">
          <Input
            inline
            maxLength={18}
            name="account_clabe"
            onChange={handleInputChange()}
            onKeyDown={onlyNumbers}
            placeholder="Cuenta CLABE"
            type="text"
            value={values.account_clabe}
          />
        </div>
        <div className="dispersion__fields_eight">
          <Selection
            name="business_name"
            placeholder="Razón social"
            options={business || BusinessNameOptions}
            label="Razón social"
            onChange={handleInputChange()}
            value={values.business_name}
          />
        </div>
        <div className="dispersion__fields_nineth">
          <Selection
            name="subsidiary"
            placeholder="Sucursal"
            options={subsidiary || SubsidiaryOptions}
            label="Sucursal"
            onChange={handleInputChange()}
            value={values.subsidiary}
          />
        </div>
      </form>
      <div className="dispersion__buttons">
        <button
          type="button"
          className="btn btn--cancel"
          onClick={() => reset()}
        >
          Limpiar
        </button>
        <button type="button" className="btn btn--mailServer" onClick={getInfo}>
          Buscar
        </button>
      </div>
    </div>
  );
};
