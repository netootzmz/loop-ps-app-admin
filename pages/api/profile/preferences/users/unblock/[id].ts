import { NextApiRequest, NextApiResponse } from "next";
import nextConnect from "next-connect";
import Cors from "cors";
import { query } from "express-validator";
import { iCustomResponse } from "../../../../../../@types/api/res";
import validateToken from "../../../../../../middlewares/validate-token";
import validateFields from "../../../../../../middlewares/validateFields";
import customApiFetch from "../../../../../../helpers/customApiFetch";

export default nextConnect<
  NextApiRequest,
  NextApiResponse<iCustomResponse<null>>
>()
  .use(Cors())
  .use(validateToken)
  .use(query("id", "User ID is missing...").notEmpty())
  .use(validateFields)
  .put(async (req, res) => {
    try {
      const token = req.headers["x-token"]?.toString();
      const url = process.env.ADMINISTRATION_URL;
      const apires = await customApiFetch<{}, iCustomResponse<null>>(
        `${
          url || "http://localhost:9095"
        }/api/v1/smart/e-commerce/administration/user/unblockPrtlSrv?id=${
          req.query.id
        }`,
        {},
        token
      );
      return res.status(200).json(apires);
    } catch (err) {
      console.log("Error Block user", err);
      return res.status(500).send(err as iCustomResponse<null>);
    }
  });
