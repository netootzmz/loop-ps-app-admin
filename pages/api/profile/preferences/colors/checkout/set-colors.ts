import nextConnect from "next-connect";
import { NextApiRequest, NextApiResponse } from "next";
import Cors from "cors";
import { iCustomResponse } from "../../../../../../@types/api/res";
import validateToken from "../../../../../../middlewares/validate-token";
import customApiFetch from "../../../../../../helpers/customApiFetch";

export default nextConnect<
  NextApiRequest,
  NextApiResponse<iCustomResponse<unknown>>
>()
  .use(Cors())
  .use(validateToken)
  .post(async (req, res) => {
    try {
      const token = req.headers["x-token"]?.toString();
      const url = process.env.CONFIGURATION_URL;
      const apires = await customApiFetch<{}, iCustomResponse<unknown>>(
        `${
          url || "http://localhost:8085"
        }/api/v1/smart/e-commerce/configuration/ServicesPortalCatalogsController/setCheckOutStyleSetting`,
        req.body,
        token
      );
      return res.status(200).json(apires);
    } catch (err) {
      console.log("Error setting colors", err);
      return res.status(500).send(err as iCustomResponse<unknown>);
    }
  });
