import nextConnect from "next-connect";
import { NextApiRequest, NextApiResponse } from "next";
import Cors from "cors";
import { iCustomResponse, iRemotePaymentParametersRes } from "../../../../@types/api/res";
import validateToken from "../../../../middlewares/validate-token";
import customApiFetch from "../../../../helpers/customApiFetch";

export default nextConnect<
  NextApiRequest,
  NextApiResponse<iCustomResponse<iRemotePaymentParametersRes>>
>()
  .use(Cors())
  .use(validateToken)
  .get(async (req, res) => {
    
    try {
      //console.log('entra')
      const token = req.headers["x-token"]?.toString();
      const url = process.env.CHECKOUT_PAYMENT_URL;
      const apires = await customApiFetch<{}, iCustomResponse<iRemotePaymentParametersRes>>(
        `${
          url || "http://localhost:9094"
        }/api/v1/smart/e-commerce/checkoutPayment/remote-payment-checkout-parameters/getMsiByIdUser`,
        {},
        token
      );
      return res.status(200).json(apires);
    } catch (err) {
      console.log("Error Renew", err);
      return res.status(500).send(err as iCustomResponse<iRemotePaymentParametersRes>);
    }
  });
