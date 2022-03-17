import React, { MouseEvent, useEffect, useMemo, useState } from "react";
import FiltersTabs from "../../../forms/FiltersTabs";
import Input from "../../../forms/Input";
import Select from "../../../forms/Select";
import { ComponentWithStore } from "../../../../@types/store/index";
import {
  startGettingUsersFilters,
  startGettingUsersTable,
  unsetActiveUser,
} from "../../../../store/actions/preferencesActions";
import { wrappedOnStore } from "../../../../store";
import useForm from "../../../../hooks/useForm";
import { useRouter } from "next/router";

const UsersFilters: ComponentWithStore = ({
  dispatch,
  preferences,
  ui: { lang },
}) => {
  const router = useRouter();

  const filters = useMemo(
    () => preferences.users?.filters,
    [preferences.users?.filters]
  );

  const [filtersTabs, setFiltersTabs] = useState<
    Array<{ filter: string; value: string | number; key: string }>
  >([]);

  const { handleInputChange, values, handleSubmit, reset } = useForm<{
    hierarchyId: number;
    profileId: number;
    statusId: number;
    stringToSearch: string;
  }>({
    onSubmit: () => {
      const placeholders = {
        hierarchyId: "Jerarquía",
        profileId: "Perfil",
        statusId: "Estatus",
        stringToSearch: "Busqueda",
      };
      const newFiltersTabs = Object.keys(values).map((key) => {
        const filter = placeholders[key as keyof typeof placeholders];
        const value =
          key === "stringToSearch"
            ? values[key]
            : filters
            ? filters[key.replaceAll("Id", "") as keyof typeof filters].find(
                (val) => val.optionId === values[key as keyof typeof values]
              )?.optionDescription || ""
            : "";
        return {
          key,
          filter,
          value,
        };
      });
      setFiltersTabs(newFiltersTabs);

      dispatch(startGettingUsersTable(values, lang));
    },
  });

  const handleNewUser = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    dispatch(unsetActiveUser());
    router.push("/profile/preferences/users/user");
  };

  useEffect(() => {
    if (!filters) {
      dispatch(startGettingUsersFilters(lang));
    }
  }, [filters, dispatch, lang]);

  return (
    <>
      <form className="filters filters--users" onSubmit={handleSubmit}>
        <div className="card card--fit card--full">
          <div className="filters__users">
            <Input
              type="text"
              placeholder="Buscar"
              inline
              search
              name="stringToSearch"
              value={values.stringToSearch || ""}
              onChange={handleInputChange()}
            />
            <Select
              options={[
                { value: 0, text: "" },
                ...(filters?.hierarchy?.map((el) => ({
                  text: el.optionDescription,
                  value: el.optionId,
                })) || []),
              ]}
              label="Jerarquía"
              inline
              onChange={handleInputChange((val) => parseInt(val))}
              name="hierarchyId"
              value={values.hierarchyId || 0}
            />
            <Select
              options={[
                { value: 0, text: "" },
                ...(filters?.profile?.map((el) => ({
                  text: el.optionDescription,
                  value: el.optionId,
                })) || []),
              ]}
              label="Perfil"
              inline
              onChange={handleInputChange((val) => parseInt(val))}
              name="profileId"
              value={values.profileId || 0}
            />
            <Select
              options={[
                { value: 0, text: "" },
                ...(filters?.status?.map((el) => ({
                  text: el.optionDescription,
                  value: el.optionId,
                })) || []),
              ]}
              label="Estatus"
              inline
              onChange={handleInputChange((val) => parseInt(val))}
              name="statusId"
              value={values.statusId || 0}
            />
          </div>
        </div>
        <button
          type="button"
          className="btn btn--secondary"
          onClick={handleNewUser}
        >
          Alta de usuario
        </button>
        <FiltersTabs filters={filtersTabs} values={values} reset={reset} />
      </form>
    </>
  );
};

export default wrappedOnStore(UsersFilters);
