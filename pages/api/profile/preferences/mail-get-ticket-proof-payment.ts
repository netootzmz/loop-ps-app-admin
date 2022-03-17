import nextConnect from "next-connect";
import Cors from "cors";

import { NextApiResponse} from 'next';
import { iCustomResponse, iGetTicketProofPaymentRes } from '../../../../@types/api/res';
import customApiFetch from "../../../../helpers/customApiFetch";
import { iCustomReq, iGetTicketProofPaymentReq } from '../../../../@types/api/req';

export default nextConnect<
  iCustomReq<iGetTicketProofPaymentReq>, 
  NextApiResponse<iCustomResponse<iGetTicketProofPaymentRes>>
>()
  .use(Cors())
  .post(async (req, res) => {
      try {        
      const token = req.headers["x-token"]?.toString();
      const url = process.env.ADMINISTRATION_URL;
      const apires = await customApiFetch<
      iGetTicketProofPaymentReq, 
        iCustomResponse<iGetTicketProofPaymentRes>
      >(
        `${
          url || "http://localhost:9095"
        }/api/v1/smart/e-commerce/administration/mail_payment_template/getPaymentProof`,
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