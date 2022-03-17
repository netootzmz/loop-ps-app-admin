import React from "react";

import DepositsAndMovementsFilters from "./DepositsAndMovementsFilters";
import DepositsAndMovementsTable from "./DepositsAndMovementsTable";

const DepositsAndMovementsContainer = () => {
  return (
    <>
      <DepositsAndMovementsFilters />
      <DepositsAndMovementsTable />
    </>
  );
};

export default DepositsAndMovementsContainer;
