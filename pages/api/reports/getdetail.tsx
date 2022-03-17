import nextConnect from "next-connect";
import { NextApiResponse } from "next";
import Cors from "cors";
import { iCustomReq, iGetTransactionDetailReq } from "../../../@types/api/req";
import {
  iCustomResponse,
  iGetTransactionDetailRes,
} from "../../../@types/api/res";
import customApiFetch from "../../../helpers/customApiFetch";
import validateToken from "../../../middlewares/validate-token";

export default nextConnect<
  iCustomReq<undefined>,
  NextApiResponse<iCustomResponse<iGetTransactionDetailRes>>
>()
  .use(Cors())
  .use(validateToken)
  .post(async (req, res) => {
    try {
      const token = req.headers["x-token"]?.toString();
      const url = process.env.QUERIES_REPORTS_URL;
      const apires = await customApiFetch<
        iGetTransactionDetailReq,
        iCustomResponse<iGetTransactionDetailRes>
      >(
        `${
          url || "http://localhost:8086"
        }/api/v1/smart/e-commerce/queries/TransactionsServPtalController/getTransactionsDetailServPta`,
        req.body,
        token
      );
      return res.status(200).json(apires);
    } catch (err) {
      console.log("Error Request", err);
      return res
        .status(500)
        .send(err as iCustomResponse<iGetTransactionDetailRes>);
    }
  });
