import nextConnect from "next-connect";
import Cors from "cors";
import customApiFetch from "../../../helpers/customApiFetch";
import { NextApiResponse } from "next";
import { iCustomReq, iSendPaymentReq } from '../../../@types/api/req';
import { iCustomResponse, iSendPaymentRes } from '../../../@types/api/res';

export default nextConnect<
  iCustomReq<iSendPaymentReq>, 
  NextApiResponse<iCustomResponse<iSendPaymentRes>>
>()
  .use(Cors())
  .post(async (req, res) => {
    try {
      const url = process.env.CHECKOUT_PAYMENT_URL;
      const apires = await customApiFetch<
        iSendPaymentReq, 
        iCustomResponse<iSendPaymentRes>
      >(
        `${
          url || "http://localhost:9094"
        }/api/v1/smart/e-commerce/checkoutPayment/checkout/makeCharge`,
        req.body
      );
      console.log(apires);
      return res.status(200).json(apires);
    } catch (err) {
      console.log("Error data", err);
      return res.status(200).json(err as any);
    }
  });
