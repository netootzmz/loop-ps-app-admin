import { createContext, useContext, useState } from "react";
import moment from "moment";

import { IFilters } from "../../../@types/api/queries/DepositsAndMovementsServPtalController/getDepositsAndMovementsServPtal";

interface IContextProps {
  filters: IFilters;
  updateFilters: (data: Partial<IFilters>) => void;
  resetFilters: () => void;
}

const defautlState: IFilters = {
  startDate: moment().format("YYYY-MM-DD"),
  endDate: moment().format("YYYY-MM-DD"),
  paymentReference: "",
  rfc: "",
  clabe: "",
  groupId: "",
  grouperId: "",
  reasonSocialId: "",
  branchId: "",
  updateTable: false,
};

const FiltersContext = createContext({} as IContextProps);

export const FiltersProvider = ({ children }: any) => {
  const [filters, setFilters] = useState(defautlState);

  const updateFilters = (data: Partial<IFilters>) => {
    setFilters({ ...filters, ...data });
  };
  const resetFilters = () => {
    setFilters({ ...defautlState, updateTable: true });
  };

  return (
    <FiltersContext.Provider
      value={{
        filters,
        updateFilters,
        resetFilters,
      }}
    >
      {children}
    </FiltersContext.Provider>
  );
};

export const useFilters = () => {
  return useContext(FiltersContext);
};
