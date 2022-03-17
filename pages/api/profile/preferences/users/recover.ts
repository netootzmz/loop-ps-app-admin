import nextConnect from "next-connect";
import { NextApiResponse } from "next";
import Cors from "cors";
import { body } from "express-validator";
import { iCustomResponse } from "../../../../../@types/api/res";
import { iCustomReq } from "../../../../../@types/api/req";
import validateFields from "../../../../../middlewares/validateFields";
import customApiFetch from "../../../../../helpers/customApiFetch";

export default nextConnect<
  iCustomReq<{ email: string }>,
  NextApiResponse<iCustomResponse<null>>
>()
  .use(Cors())
  .use(body("email", "Email is not valid").isEmail())
  .use(validateFields)
  .post(async (req, res) => {
    try {
      const url = process.env.ADMINISTRATION_URL;
      const apires = await customApiFetch<undefined, iCustomResponse<null>>(
        `${
          url || "http://localhost:9095"
        }/api/v1/smart/e-commerce/administration/restorePassword/requestRestorePassUserReg?email=${
          req.body.email
        }&typeContact=1`
      );
      return res.status(200).json(apires);
    } catch (err) {
      console.log("Error Request", err);
      return res.status(500).send(err as iCustomResponse<null>);
    }
  });
