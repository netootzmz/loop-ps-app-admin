import nextConnect from "next-connect";
import { NextApiResponse } from "next";
import Cors from "cors";
import { body } from "express-validator";
import { iCustomReq, iSendPaymentLeagueReq } from "../../../@types/api/req";
import {
  iSendPaymentLeagueRes,
  iCustomResponse,
} from "../../../@types/api/res";
import validateFields from "../../../middlewares/validateFields";
import customApiFetch from "../../../helpers/customApiFetch";

export default nextConnect<
  iCustomReq<iSendPaymentLeagueReq>,
  NextApiResponse<iCustomResponse<iSendPaymentLeagueRes>>
>()
  .use(Cors())
  .use(body("addressee", "Email is not valid...").isEmail())
  .use(body("folioTxn", "Folio is missing...").not().isEmpty())
  .use(body("typeTemplate", "Template is missing...").not().isEmpty())
  .use(validateFields)
  .post(async (req, res) => {
    try {
      const url = process.env.CHECKOUT_PAYMENT_URL;
      const apires = await customApiFetch<
        iSendPaymentLeagueReq,
        iCustomResponse<iSendPaymentLeagueRes>
      >(
        `${
          url || "http://localhost:9094"
        }/api/v1/smart/e-commerce/checkoutPayment/link-payment-checkout/sendNotification`,
        req.body
      );
      return res.status(200).json(apires);
    } catch (err) {
      console.log("Error Request", err);
      return res
        .status(500)
        .send(err as iCustomResponse<iSendPaymentLeagueRes>);
    }
  });
