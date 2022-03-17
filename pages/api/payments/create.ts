import nextConnect from "next-connect";
import { NextApiResponse } from "next";
import Cors from "cors";
import { body } from "express-validator";
import { iCreatePaymentLeagueReq, iCustomReq } from "../../../@types/api/req";
import {
  iCreatePaymentLeagueRes,
  iCustomResponse,
} from "../../../@types/api/res";
import validateFields from "../../../middlewares/validateFields";
import customApiFetch from "../../../helpers/customApiFetch";

export default nextConnect<
  iCustomReq<iCreatePaymentLeagueReq>,
  NextApiResponse<iCustomResponse<iCreatePaymentLeagueRes>>
>()
  .use(Cors())
  .use(body("amount", "Amount is not valid...").isNumeric())
  .use(body("apiKey", "API Key is missing...").not().isEmpty())
  .use(
    body("durationTimeLink", "Duration time link is not valid...").isNumeric()
  )
  .use(body("reference", "Reference is missing...").not().isEmpty())
  .use(body("typeSmartlink", "Link type is not valid...").isNumeric())
  .use(body("validUntil", "Valid until is missing...").not().isEmpty())
  .use(validateFields)
  .post(async (req, res) => {
    try {
      const token = req.headers["x-token"]?.toString();
      const url = process.env.CHECKOUT_PAYMENT_URL;
      const apires = await customApiFetch<
        iCreatePaymentLeagueReq,
        iCustomResponse<iCreatePaymentLeagueRes>
      >(
        `${
          url || "http://localhost:9094"
        }/api/v1/smart/e-commerce/checkoutPayment/link-payment-checkout/getLinkPaymentCheckOut`,
        req.body,
        token
      );
      return res.status(200).json(apires);
    } catch (err) {
      console.log("Error Request", err);
      return res
        .status(500)
        .send(err as iCustomResponse<iCreatePaymentLeagueRes>);
    }
  });
