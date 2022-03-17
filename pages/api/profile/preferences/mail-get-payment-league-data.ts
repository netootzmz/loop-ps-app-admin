import nextConnect from "next-connect";
import Cors from "cors";

import { NextApiResponse} from 'next';
import { iCustomResponse, iGetMailPaymentLeagueDataRes } from '../../../../@types/api/res';
import customApiFetch from "../../../../helpers/customApiFetch";
import { iCustomReq, iGetMailPaymentLeagueDataReq } from '../../../../@types/api/req';

export default nextConnect<
  iCustomReq<iGetMailPaymentLeagueDataReq>, 
  NextApiResponse<iCustomResponse<iGetMailPaymentLeagueDataRes>>
>()
  .use(Cors())
  .post(async (req, res) => {
      try {        
      const token = req.headers["x-token"]?.toString();
      const url = process.env.ADMINISTRATION_URL;
      const apires = await customApiFetch<
      iGetMailPaymentLeagueDataReq, 
        iCustomResponse<iGetMailPaymentLeagueDataRes>
      >(
        `${
          url || "http://localhost:9095"
        }/api/v1/smart/e-commerce/administration/mail_payment_template/getPaymentBody`,
        req.body,
        token
      );
      console.log(apires);
      return res.status(200).json(apires);
    } catch (err) {
      console.log("Error data", err);
      return res.status(500).json(err as any);
    }
  });