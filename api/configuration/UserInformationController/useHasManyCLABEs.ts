import { useQuery } from "react-query";
import customFetch from "helpers/customFetch";
import { iHasManyCLABEs } from "../../../@types/api/res";

async function fetcher(): Promise<iHasManyCLABEs | any> {
  try {
    const { information } = await customFetch<{}, iHasManyCLABEs>(
      "configuration/UserInformationController/hasManyCLABEs",
      true,
      "POST"
    );
    return information;
  } catch (error) {
    return error;
  }
}

export default function useHasManyCLABEs() {
  return useQuery("hasManyCLABEs", fetcher, {
    staleTime: 0,
    refetchOnWindowFocus: false,
  });
}
