import { useQuery } from "react-query";
import customFetch from "helpers/customFetch";
import { iGetMenu } from "../../../@types/api/res";

async function fetcher(): Promise<iGetMenu | any> {
  try {
    const { information } = await customFetch<{}, iGetMenu>(
      "configuration/UserInformationController/getMenu",
      true,
      "POST"
    );
    return information;
  } catch (error) {
    return error;
  }
}

export default function useGetMenu() {
  return useQuery("getMenu", fetcher, {
    staleTime: 0,
    refetchOnWindowFocus: false,
  });
}
