import nextConnect from "next-connect";
import { NextApiResponse } from "next";
import Cors from "cors";
import { iCustomReq } from "../../../../@types/api/req";
import { iCustomResponse, iHasManyCLABEs } from "../../../../@types/api/res";
import customApiFetch from "helpers/customApiFetch";
import validateToken from "middlewares/validate-token";

export default nextConnect<
  iCustomReq<undefined>,
  NextApiResponse<iCustomResponse<iHasManyCLABEs>>
>()
  .use(Cors())
  .use(validateToken)
  .post(async (req, res) => {
    try {
      const token = req.headers["x-token"]?.toString();
      const url = process.env.CONFIGURATION_URL;

      const data = await customApiFetch<{}, iCustomResponse<iHasManyCLABEs>>(
        `${
          url || "http://localhost:8085"
        }/api/v1/smart/e-commerce/configuration/UserInformationController/hasManyCLABEs`,
        req.body,
        token
      );
      return res.status(200).json(data);
    } catch (err) {
      console.log(
        "[ configuration/UserInformationController/hasManyCLABEs ] Error Request",
        err
      );
      return res.status(200).send(err as iCustomResponse<iHasManyCLABEs>);
    }
  });
