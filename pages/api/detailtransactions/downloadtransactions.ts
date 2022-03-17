import nextConnect from "next-connect";
import Cors from "cors";
import validateToken from "../../../middlewares/validate-token";
import {
  iCustomReq,
  iDownloadDetailTransactionReq,
} from "../../../@types/api/req";
import customApiFetch from "../../../helpers/customApiFetch";
import { NextApiResponse } from "next";
import { iCustomResponse, iDownloadStatusLinkTableDataRes } from '../../../@types/api/res';

export default nextConnect<
  iCustomReq<iDownloadDetailTransactionReq>, 
  NextApiResponse<iCustomResponse<iDownloadStatusLinkTableDataRes>>
>()
  .use(Cors())
  .use(validateToken)
  .post(async (req, res) => {
    console.log(req.body);
    try {
      const token = req.headers["x-token"]?.toString();
      const url = process.env.AGGREGATION_TABLE_URL;
      const apires = await customApiFetch<
      iDownloadDetailTransactionReq, 
      iCustomResponse<iDownloadStatusLinkTableDataRes>
    >(
        `${
          url || "http://localhost:8001"
        }/api/v1/smart/e-commerce/aggregation/file-manager-transactions-excel/export-file-manager-transactions-excel/transaction-detail-report`,
        req.body,
        token || ""
      );
      console.log(apires);
      return res.status(200).json(apires);
    } catch (err) {
      console.log("Error data", err);
      return res.status(500).send(err as iCustomResponse<iDownloadStatusLinkTableDataRes>);
    }
  });
