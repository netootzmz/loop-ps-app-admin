import nextConnect from "next-connect";
import { NextApiResponse } from "next";
import Cors from "cors";
import { iCustomReq, iRecoverPasswordReq } from "../../../@types/api/req";
import { iCustomResponse, iGetPermissionsRes } from "../../../@types/api/res";
import customApiFetch from "../../../helpers/customApiFetch";
import validateToken from "../../../middlewares/validate-token";

export default nextConnect<
  iCustomReq<iRecoverPasswordReq>,
  NextApiResponse<iCustomResponse<iGetPermissionsRes>>
>()
  .use(Cors())
  .use(validateToken)
  .get(async (req, res) => {
    try {
      const token = req.headers["x-token"]?.toString();
      const url = process.env.CONFIGURATION_URL;
      const apires = await customApiFetch<
        undefined,
        iCustomResponse<iGetPermissionsRes>
      >(
        `${
          url || "http://localhost:8085"
        }/api/v1/smart/e-commerce/configuration/UserInformationController/getMenu`,
        undefined,
        token || ""
      );
      return res.status(200).json(apires);
    } catch (err) {
      return res.status(500).send(err as iCustomResponse<iGetPermissionsRes>);
    }
  });
