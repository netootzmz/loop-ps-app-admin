import nextConnect from "next-connect";
import Cors from "cors";

import { NextApiResponse} from 'next';
import { iCustomReq, iSetTreasuryAmountReq } from '../../../@types/api/req';
import customApiFetch from "../../../helpers/customApiFetch";
import { iCustomResponse } from '../../../@types/api/res';

export default nextConnect<
  iCustomReq<iSetTreasuryAmountReq>, 
  NextApiResponse<iCustomResponse>
>()
  .use(Cors())
  .post(async (req, res) => {
      try {        
      const token = req.headers["x-token"]?.toString();
      const url = process.env.AGGREGATION_TABLE_URL;
      const apires = await customApiFetch<
      iSetTreasuryAmountReq, 
      iCustomResponse
      >(
        `${
          url || "http://localhost:8001"
        }/api/v1/smart/e-commerce/aggregation/BitTreasuryConciliationController/addBitTreasuryConciliation`,
        req.body,
        token
      );
      console.log(apires);
      return res.status(200).json(apires);
    } catch (err: any) {
      return res.status(200).json(err);
    }
  });