import nextConnect from "next-connect";
import { NextApiResponse } from "next";
import Cors from "cors";
import { iCustomReq } from "../../../@types/api/req";
import { iCustomResponse, iGetPaymentsConfig } from "../../../@types/api/res";
import customApiFetch from "../../../helpers/customApiFetch";
import validateToken from "../../../middlewares/validate-token";

export default nextConnect<
  iCustomReq<undefined>,
  NextApiResponse<iCustomResponse<iGetPaymentsConfig>>
>()
  .use(Cors())
  .use(validateToken)
  .get(async (req, res) => {
    try {
      const token = req.headers["x-token"]?.toString();
      const url = process.env.ADMINISTRATION_URL;
      const apires = await customApiFetch<
        undefined,
        iCustomResponse<iGetPaymentsConfig>
      >(
        `${
          url || "http://localhost:9095"
        }/api/v1/smart/e-commerce/administration/ConfigurationScreenPaymentCheckOut/getConfigurationLinkPayScreenByUser`,
        undefined,
        token
      );
      return res.status(200).json(apires);
    } catch (err) {
      console.log("Error Request", err);
      return res.status(500).send(err as iCustomResponse<iGetPaymentsConfig>);
    }
  });
