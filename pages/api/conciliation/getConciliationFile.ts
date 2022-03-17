import nextConnect from "next-connect";
import Cors from "cors";
import validateToken from "../../../middlewares/validate-token";
import {
    iCustomReq,
    iDownloadConciliationFileReq,
  } from "../../../@types/api/req";
  import customApiFetch from "../../../helpers/customApiFetch";
  import { NextApiResponse } from "next";
  import { iCustomResponse, iDownloadConciliationFileRes } from '../../../@types/api/res';
  
  export default nextConnect<
    iCustomReq<iDownloadConciliationFileReq>, 
    NextApiResponse<iCustomResponse<iDownloadConciliationFileRes>>
  >()
    .use(Cors())
    .use(validateToken)
    .post(async (req, res) => {
      console.log(req.body);
      try {
        const token = req.headers["x-token"]?.toString();
        const url = process.env.TRANSACTION_FILE_MANAGEMENT;
        const apires = await customApiFetch<
          iDownloadConciliationFileReq, 
          iCustomResponse<iDownloadConciliationFileRes>
        >(
          `${
            url || "http://localhost:9525"
          }/api/v1/downloadConciliationFileContent`,
          req.body,
          token || ""
        );
        console.log(apires);
        return res.status(200).json(apires);
      } catch (err) {
        console.log("Error data", err);
        return res.status(500).send(err as iCustomResponse<iDownloadConciliationFileRes>);
      }
    });