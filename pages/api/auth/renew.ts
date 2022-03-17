import nextConnect from "next-connect";
import { NextApiResponse, NextApiRequest } from "next";
import Cors from "cors";
import { iCustomResponse, iLoginRes } from "../../../@types/api/res";
import customApiFetch from "../../../helpers/customApiFetch";
import validateToken from "../../../middlewares/validate-token";

export default nextConnect<
  NextApiRequest,
  NextApiResponse<iCustomResponse<iLoginRes>>
>()
  .use(Cors())
  .use(validateToken)
  .get(async (req, res) => {
    try {
      const token = req.headers["x-token"]?.toString();
      const url = process.env.SECURITY_URL;
      const apires = await customApiFetch<{}, iCustomResponse<iLoginRes>>(
        `${
          url || "http://localhost:9097"
        }/api/v1/smart/e-commerce/security-authentication/refreshSession/refreshSession`,
        {},
        token
      );
      return res.status(200).json(apires);
    } catch (err) {
      console.log("Error Renew", err);
      return res.status(500).send(err as iCustomResponse<iLoginRes>);
    }
  });
