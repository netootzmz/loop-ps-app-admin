import nextConnect from "next-connect";
import Cors from "cors";

import { NextApiResponse} from 'next';
import { iCustomReq, iGetDispersionDataReq } from '../../../@types/api/req';
import customApiFetch from "../../../helpers/customApiFetch";
import { iCustomResponse, iGetDispersionDataRes } from '../../../@types/api/res';

export default nextConnect<
  iCustomReq<iGetDispersionDataReq>, 
  NextApiResponse<iCustomResponse<iGetDispersionDataRes>>
>()
  .use(Cors())
  .post(async (req, res) => {
      try {        
      const token = req.headers["x-token"]?.toString();
      const url = process.env.AGGREGATION_TABLE_URL;
      const apires = await customApiFetch<
      iGetDispersionDataReq, 
      iCustomResponse<iGetDispersionDataRes>
      >(
        `${
          url || "http://localhost:8001"
        }/api/v1/smart/e-commerce/aggregation/transactions-management/conciliate/dispersion-data`,
        req.body,
        token
      );
      console.log(apires);
      return res.status(200).json(apires);
    } catch (err: any) {
      return res.status(200).json(err);
    }
  });