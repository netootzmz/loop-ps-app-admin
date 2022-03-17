import nextConnect from "next-connect";
// import { NextApiResponse } from "next";
import Cors from "cors";
import { iCustomReq } from "../../../@types/api/req";
import { iCustomResponse } from "../../../@types/api/res";
import customApiFetch from "../../../helpers/customApiFetch";

export default nextConnect<iCustomReq<any>, any>()
  .use(Cors())
  .post(async (req, res) => {
    try {
      const url = process.env.CHECKOUT_PAYMENT_URL;
      const apires = await customApiFetch<any, iCustomResponse<any>>(
        `${
          url || "http://localhost:9094"
        }/api/v1/smart/e-commerce/checkoutPayment/linkconfigReport/getStatusTxn`,
        req.body
      );
      return res.status(200).json(apires);
    } catch (err) {
      console.log("Error Request", err);
      return res.status(500).send(err as iCustomResponse<any>);
    }
  });
