import nextConnect from "next-connect";
import Cors from "cors";

import { NextApiResponse } from "next";
import { iCustomReq } from "../../../@types/api/req";
import customApiFetch from "../../../helpers/customApiFetch";
import { iCustomResponse } from "../../../@types/api/res";

export default nextConnect<iCustomReq<any>, NextApiResponse<iCustomResponse>>()
  .use(Cors())
  .post(async (req, res) => {
    console.log(req.body);
    try {
      const token = req.headers["x-token"]?.toString();
      const url = process.env.ACQUIRER_PROCESS_CONFIGURATION;
      const apires = await customApiFetch<any, iCustomResponse>(
        `${
          url || "http://localhost:9530"
        }/ReleaseToPaymentDispersionController/releaseToPayment/`,
        req.body,
        token
      );
      console.log(apires);
      return res.status(200).json(apires);
    } catch (err: any) {
      return res.status(200).json(err);
    }
  });
