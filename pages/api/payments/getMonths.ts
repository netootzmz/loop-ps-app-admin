import nextConnect from "next-connect";
import Cors from "cors";
import {
  iCustomReq,
  iGetMonthsWithoutInterestReq
} from "../../../@types/api/req";
import customApiFetch from "../../../helpers/customApiFetch";
import { iCustomResponse, iGetMonthsWithoutInterestRes } from '../../../@types/api/res';
import { NextApiResponse } from "next";

export default nextConnect<
    iCustomReq<iGetMonthsWithoutInterestReq>, 
    NextApiResponse<iCustomResponse<iGetMonthsWithoutInterestRes>>>()
  .use(Cors())
  .post(async (req, res) => {
    try {
      const url = process.env.CHECKOUT_PAYMENT_URL;
      const apires = await customApiFetch<
        iGetMonthsWithoutInterestReq, 
        iCustomResponse<iGetMonthsWithoutInterestRes>
      >(
        `${
          url || "http://localhost:9094"
        }/api/v1/smart/e-commerce/checkoutPayment/CheckoutPaymentsLink/getMonthsMSI`,
        req.body
      );
      return res.status(200).json(apires);
    } catch (err) {
      console.log("Error data", err);
      return res.status(500).send(err as iCustomResponse<iGetMonthsWithoutInterestRes>);
    }
  });
