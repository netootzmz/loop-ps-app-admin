import nextConnect from "next-connect";
import Cors from "cors";
import validateToken from "../../../middlewares/validate-token";
import {
  iCustomReq,
  iDeployDetailTransactionReq,
} from "../../../@types/api/req";
import customApiFetch from "../../../helpers/customApiFetch";
import { NextApiResponse } from "next";
import { iCustomResponse, iTransactionsTableRes } from '../../../@types/api/res';

export default nextConnect<
  iCustomReq<iDeployDetailTransactionReq>, 
  NextApiResponse<iCustomResponse<iTransactionsTableRes>>
>()
  .use(Cors())
  .use(validateToken)
  .post(async (req, res) => {
    try {
      const token = req.headers["x-token"]?.toString();
      const url = process.env.QUERIES_REPORTS_URL;
      const apires = await customApiFetch<
        iDeployDetailTransactionReq,
        iCustomResponse<iTransactionsTableRes>
      >(
        `${
          url || "http://localhost:8086"
        }/api/v1/smart/e-commerce/queries/TransactionsServPtalController/getTransactionsServPtal`,
        req.body,
        token || ""
      );
      return res.status(200).json(apires);
    } catch (err) {
      console.log("Error data", err);
      return res.status(500).send(err as iCustomResponse<iTransactionsTableRes>);
    }
  });
