import { useQuery } from "react-query";
import customFetch from "helpers/customFetch";
import { iGetHierarchy } from "../../../@types/api/res";
import { iGetHierarchyReq } from "../../../@types/api/req";

export default function useGetHierarchy(groupId: string) {
  return useQuery(
    "getHierarchy",
    async (): Promise<iGetHierarchy | any> => {
      const data = {
        groupId: groupId,
      };
      try {
        const { information } = await customFetch<
          iGetHierarchyReq,
          iGetHierarchy
        >(
          "configuration/UserInformationController/getHierarchy",
          true,
          "POST",
          data
        );
        return information;
      } catch (error) {
        return error;
      }
    },
    {
      staleTime: 0,
      refetchOnWindowFocus: false,
    }
  );
}

export async function getHierarchy(
  groupId: string
): Promise<iGetHierarchy | any> {
  const data = {
    groupId: groupId,
  };
  try {
    const { information } = await customFetch<iGetHierarchyReq, iGetHierarchy>(
      "configuration/UserInformationController/getHierarchy",
      true,
      "POST",
      data
    );
    return information;
  } catch (error) {
    return error;
  }
}
