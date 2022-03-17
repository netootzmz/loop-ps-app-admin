import { useQuery } from "react-query";
import customFetch from "helpers/customFetch";
import {
  IDepositsAndMovementsServPtalRes,
  IFilters,
} from "../../../@types/api/queries/DepositsAndMovementsServPtalController/getDepositsAndMovementsServPtal";

export async function fetcher(
  filters: Partial<IFilters>
): Promise<IDepositsAndMovementsServPtalRes | any> {
  try {
    const { information } = await customFetch<
      Partial<IFilters>,
      IDepositsAndMovementsServPtalRes
    >(
      "queries/DepositsAndMovementsServPtalController/getDepositsAndMovementsServPtal",
      true,
      "POST",
      filters
    );
    return information;
  } catch (error) {
    return error;
  }
}

export function useGetDepositsAndMovementsServPtal(filters: Partial<IFilters>) {
  return useQuery(
    ["getDepositsAndMovementsServPtal", filters],
    () => fetcher(filters),
    {
      staleTime: 0,
      refetchOnWindowFocus: false,
    }
  );
}
