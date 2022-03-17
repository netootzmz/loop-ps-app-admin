import nextConnect from "next-connect";
import { NextApiResponse } from "next";
import Cors from "cors";
import { body } from "express-validator";
import { iCustomReq, iLoginReq } from "../../../@types/api/req";
import { iCustomResponse, iLoginRes } from "../../../@types/api/res";
import validateFields from "../../../middlewares/validateFields";
import customApiFetch from "../../../helpers/customApiFetch";

export default nextConnect<
  iCustomReq<iLoginReq>,
  NextApiResponse<iCustomResponse<iLoginRes>>
>()
  .use(Cors())
  .use(body("email", "Email is missing...").isEmail())
  .use(body("password", "Password is missing...").not().isEmpty())
  .use(validateFields)
  .post(async (req, res) => {
    try {
      const url = process.env.SECURITY_URL;
      const apires = await customApiFetch<
        iLoginReq,
        iCustomResponse<iLoginRes>
      >(
        `${
          url || "http://localhost:9097"
        }/api/v1/smart/e-commerce/security-authentication/login/`,
        req.body
      );
      return res.status(200).json(apires);
    } catch (err) {
      console.log("Error Login", err);
      return res.status(500).send(err as iCustomResponse<iLoginRes>);
    }
  });
