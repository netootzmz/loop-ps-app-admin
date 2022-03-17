import nextConnect from "next-connect";
import { NextApiResponse } from "next";
import Cors from "cors";
import {
  iCustomResponse,
  iUserGetTableDataRes,
} from "../../../../../@types/api/res";
import validateToken from "../../../../../middlewares/validate-token";
import customApiFetch from "../../../../../helpers/customApiFetch";
import {
  iGetUserTableDataReq,
  iCustomReq,
} from "../../../../../@types/api/req";

export default nextConnect<
  iCustomReq<iGetUserTableDataReq>,
  NextApiResponse<iCustomResponse<iUserGetTableDataRes>>
>()
  .use(Cors())
  .use(validateToken)
  .post(async (req, res) => {
    try {
      const token = req.headers["x-token"]?.toString();
      const url = process.env.ADMINISTRATION_URL;
      const apires = await customApiFetch<
        iGetUserTableDataReq,
        iCustomResponse<iUserGetTableDataRes>
      >(
        `${
          url || "http://localhost:9095"
        }/api/v1/smart/e-commerce/administration/user/getUsersBySearchFiltered`,
        req.body,
        token
      );
      return res.status(200).json(apires);
    } catch (err) {
      console.log("Error Renew", err);
      return res.status(500).send(err as iCustomResponse<iUserGetTableDataRes>);
    }
  });
