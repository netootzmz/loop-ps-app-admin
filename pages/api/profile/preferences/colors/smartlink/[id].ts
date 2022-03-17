import nextConnect from "next-connect";
import { NextApiRequest, NextApiResponse } from "next";
import Cors from "cors";
import {
  iCustomResponse,
  iGetSmartLinkColors,
} from "../../../../../../@types/api/res";
import validateToken from "../../../../../../middlewares/validate-token";
import customApiFetch from "../../../../../../helpers/customApiFetch";

export default nextConnect<
  NextApiRequest,
  NextApiResponse<iCustomResponse<iGetSmartLinkColors>>
>()
  .use(Cors())
  .use(validateToken)
  .get(async (req, res) => {
    try {
      const token = req.headers["x-token"]?.toString();
      const url = process.env.CONFIGURATION_URL;
      const apires = await customApiFetch<
        {},
        iCustomResponse<iGetSmartLinkColors>
      >(
        `${
          url || "http://localhost:8085"
        }/api/v1/smart/e-commerce/configuration/ServicesPortalController/getRemotePaymentsCustomerDetailStyleSettings?clientId=${
          req.query.id
        }`,
        {},
        token
      );
      return res.status(200).json(apires);
    } catch (err) {
      console.log("Error getting colors", err);
      return res.status(500).send(err as iCustomResponse);
    }
  });
