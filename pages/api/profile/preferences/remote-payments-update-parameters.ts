import nextConnect from "next-connect";
import { NextApiResponse } from "next";
import Cors from "cors";
import { iCustomResponse } from "../../../../@types/api/res";
import validateToken from "../../../../middlewares/validate-token";
import customApiFetch from "../../../../helpers/customApiFetch";
import { iCustomReq, iRemotePaymentParametersReq } from "../../../../@types/api/req";

export default nextConnect<
iCustomReq<iRemotePaymentParametersReq>,
NextApiResponse<iCustomResponse<null>>
>()
  .use(Cors())
  .use(validateToken)
  .post(async (req, res) => {
    
    try {
      const token = req.headers["x-token"]?.toString();
      const url = process.env.CHECKOUT_PAYMENT_URL;
      const apires = await customApiFetch<iRemotePaymentParametersReq, iCustomResponse<null>>(
        `${
            url || "http://localhost:9094"
        }/api/v1/smart/e-commerce/checkoutPayment/CheckoutPaymentsLink/addCoreAcquireSolutionMsiBin`,
        req.body,
        token
      );
      return res.status(200).json(apires);
    } catch (err) {
      console.log("Error Renew", err);
      return res.status(500).send(err as iCustomResponse<null>);
    }
  });
