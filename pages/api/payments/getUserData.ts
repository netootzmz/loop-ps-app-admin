import nextConnect from "next-connect";
import Cors from "cors";
import {
  iCustomReq,
  iGetUserPaymentDataReq,
} from "../../../@types/api/req";
import customApiFetch from "../../../helpers/customApiFetch";
import { NextApiResponse } from "next";
import { iCustomResponse, iGetUserPaymentDataRes } from '../../../@types/api/res';

export default nextConnect<
  iCustomReq<iGetUserPaymentDataReq>, 
  NextApiResponse<iCustomResponse<iGetUserPaymentDataRes>>
>()
  .use(Cors())
  .post(async (req, res) => {
    try {
      const url = process.env.CHECKOUT_PAYMENT_URL;
      const apires = await customApiFetch<iGetUserPaymentDataReq, iCustomResponse<iGetUserPaymentDataRes>>(
        `${
          url || "http://localhost:9094"
        }/api/v1/smart/e-commerce/checkoutPayment/link-payment-checkout/getLink`,
        req.body
      );
      return res.status(200).json(apires);
    } catch (err) {
      console.log("Error data", err);
      return res.status(500).send(err as iCustomResponse<iGetUserPaymentDataRes>);
    }
  });
