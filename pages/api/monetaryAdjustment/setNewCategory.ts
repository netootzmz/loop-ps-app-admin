import nextConnect from "next-connect";
import { NextApiResponse } from "next";
import Cors from "cors";
import { iCustomReq, iMonetaryAdjustmentNewCategoryReq } from "../../../@types/api/req";
import { iCustomResponse } from "../../../@types/api/res";
import customApiFetch from "../../../helpers/customApiFetch";
import validateToken from "../../../middlewares/validate-token";

export default nextConnect<
iCustomReq<iMonetaryAdjustmentNewCategoryReq>,
NextApiResponse<iCustomResponse>
>()
  .use(Cors())
  .use(validateToken)
  .post(async (req, res) => {
    
    try {
      const token = req.headers["x-token"]?.toString();
      const url = process.env.ADMINISTRATION_URL;
      const apires = await customApiFetch<iMonetaryAdjustmentNewCategoryReq, iCustomResponse>(
        `${
            url || "http://192.168.18.90:8081"
        }/api/v1/smart/service-portal/monetary-adjustment/create-type`,
        req.body,
        token
      );
      return res.status(200).json(apires);
    } catch (err) {
      console.log("Error Renew", err);
      return res.status(200).send(err as iCustomResponse);
    }
  });