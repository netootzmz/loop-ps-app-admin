import nextConnect from "next-connect";
import Cors from "cors";
import { NextApiResponse, NextApiRequest } from 'next';
import customApiFetch from "../../../helpers/customApiFetch";
import { iGetSubsidiaryCatalogRes } from '../../../@types/api/res';

export default nextConnect<
  NextApiRequest, 
  NextApiResponse<iGetSubsidiaryCatalogRes>
>()
  .use(Cors())
  .post(async (req, res) => {
      try {        
      const token = req.headers["x-token"]?.toString();
      const url = process.env.AGGREGATION_TABLE_URL;
      const apires = await customApiFetch<
        {}, 
        iGetSubsidiaryCatalogRes
      >(
        `${
          url || "http://localhost:8001"
        }/api/v1/smart/e-commerce/aggregation/DispersionPendingPaymentsController/getSucursalByRazonSocial/${req.body.group_id}`,
        {},
        token
      );
      console.log(apires);
      return res.status(200).json(apires);
    } catch (err) {
      console.log("Error data", err);
      return res.status(500).json(err as iGetSubsidiaryCatalogRes);
    }
  });