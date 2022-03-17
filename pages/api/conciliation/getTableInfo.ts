import nextConnect from "next-connect";
import Cors from "cors";

import { NextApiResponse} from 'next';
import { iCustomReq, iGetConciliationTableInfoReq } from '../../../@types/api/req';
import customApiFetch from "../../../helpers/customApiFetch";
import { iGetConciliationTableInfoRes } from '../../../@types/api/res';

export default nextConnect<
  iCustomReq<iGetConciliationTableInfoReq>, 
  NextApiResponse<iGetConciliationTableInfoRes>
>()
  .use(Cors())
  .post(async (req, res) => {
    console.log(req.body);
      try {        
      const token = req.headers["x-token"]?.toString();
      const url = process.env.ACQUIRER_PROCESS_CONFIGURATION;
      const apires = await customApiFetch<
      iGetConciliationTableInfoReq, 
      iGetConciliationTableInfoRes
      >(
        `${
          url || "http://localhost:9530"
        }/api/v1/conciliation/acquirer/transactions/summary-query`,
        req.body,
        token
      );
      console.log(apires);
      return res.status(200).json(apires);
    } catch (err: any) {
      return res.status(200).json(err);
    }
  });