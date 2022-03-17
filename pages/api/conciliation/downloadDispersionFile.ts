import nextConnect from "next-connect";
import Cors from "cors";
import validateToken from "../../../middlewares/validate-token";
import {
    iCustomReq,
    iDownloadDispersionFileReq,
  } from "../../../@types/api/req";
  import customApiFetch from "../../../helpers/customApiFetch";
  import { NextApiResponse } from "next";
  import { iDownloadDispersionFileRes } from '../../../@types/api/res';
  
  export default nextConnect<
    iCustomReq<iDownloadDispersionFileReq>, 
    NextApiResponse<iDownloadDispersionFileRes>
  >()
    .use(Cors())
    .use(validateToken)
    .post(async (req, res) => {
      console.log(req.body);
      try {
        const token = req.headers["x-token"]?.toString();
        const url = process.env.AGGREGATION_TABLE_URL;
        const apires = await customApiFetch<
          iDownloadDispersionFileReq, 
          iDownloadDispersionFileRes
        >(
          `${
            url || "http://localhost:8001"
          }/api/v1/smart/e-commerce/aggregation/transactions-management/conciliate/export-format-dispersion/banorte`,
          req.body,
          token || ""
        );
        console.log(apires);
        return res.status(200).json(apires as iDownloadDispersionFileRes);
      } catch (err) {
        console.log("Error data", err);
        return res.status(200).send(err as iDownloadDispersionFileRes);
      }
    });