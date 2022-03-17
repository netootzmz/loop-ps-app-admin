import { useQuery } from "react-query";
import customFetch from "helpers/customFetch";
import { iHasManyRFCs } from "../../../@types/api/res";

async function fetcher(): Promise<iHasManyRFCs | any> {
  try {
    const { information } = await customFetch<{}, iHasManyRFCs>(
      "configuration/UserInformationController/hasManyRFCs",
      true,
      "POST"
    );
    return information;
  } catch (error) {
    return error;
  }
}

export default function useHasManyRFCs() {
  return useQuery("hasManyRFCs", fetcher, {
    staleTime: 0,
    refetchOnWindowFocus: false,
  });
}
