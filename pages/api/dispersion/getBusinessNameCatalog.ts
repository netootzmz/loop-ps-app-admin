import nextConnect from "next-connect";
import Cors from "cors";
import { NextApiResponse, NextApiRequest } from 'next';
import customApiFetch from "../../../helpers/customApiFetch";
import { iGetBusinessNameRes } from '../../../@types/api/res';

export default nextConnect<
  NextApiRequest, 
  NextApiResponse<iGetBusinessNameRes>
>()
  .use(Cors())
  .post(async (req, res) => {
      try {        
      const token = req.headers["x-token"]?.toString();
      const url = process.env.AGGREGATION_TABLE_URL;
      const apires = await customApiFetch<
        {}, 
        iGetBusinessNameRes
      >(
        `${
          url || "http://localhost:8001"
        }/api/v1/smart/e-commerce/aggregation/DispersionPendingPaymentsController/getRazonSocialByAgrupador/${req.body.group_id}`,
        {},
        token
      );
      console.log(apires);
      return res.status(200).json(apires);
    } catch (err) {
      console.log("Error data", err);
      return res.status(500).json(err as iGetBusinessNameRes);
    }
  });