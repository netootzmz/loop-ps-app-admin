import nextConnect from "next-connect";
import { NextApiResponse } from "next";
import Cors from "cors";
import { body } from "express-validator";
import { iCustomReq, iNewPasswordReq } from "../../../@types/api/req";
import { iCustomResponse } from "../../../@types/api/res";
import validateFields from "../../../middlewares/validateFields";
import customApiFetch from "../../../helpers/customApiFetch";

export default nextConnect<
  iCustomReq<iNewPasswordReq>,
  NextApiResponse<iCustomResponse<null>>
>()
  .use(Cors())
  .use(body("email", "Email is missing").isEmail())
  .use(body("newPassword", "New password is missing...").not().isEmpty())
  .use(
    body("newPasswordConfirm", "New password confirmation is missing...")
      .not()
      .isEmpty()
  )
  .use(body("password", "Password is missing...").not().isEmpty())
  .use(validateFields)
  .put(async (req, res) => {
    try {
      const url = process.env.ADMINISTRATION_URL;
      const apires = await customApiFetch<
        iNewPasswordReq,
        iCustomResponse<null>
      >(
        `${
          url || "http://localhost:9095"
        }/api/v1/smart/e-commerce/administration/restorePassword/setPass`,
        req.body
      );
      return res.status(200).json(apires);
    } catch (err) {
      console.log("Error Password", err);
      return res.status(500).send(err as iCustomResponse<null>);
    }
  });
