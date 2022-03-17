import nextConnect from "next-connect";
import { NextApiResponse } from "next";
import Cors from "cors";
import { iCustomResponse } from "../../../../../@types/api/res";
import validateToken from "../../../../../middlewares/validate-token";
import customApiFetch from "../../../../../helpers/customApiFetch";
import { iCustomReq, iUserSaveUpdateReq } from "../../../../../@types/api/req";
import { body } from "express-validator";
import validateFields from "../../../../../middlewares/validateFields";

export default nextConnect<
  iCustomReq<iUserSaveUpdateReq>,
  NextApiResponse<iCustomResponse<null>>
>()
  .use(Cors())
  .use(validateToken)
  .post(async (req, res) => {
    try {
      const token = req.headers["x-token"]?.toString();
      const url = process.env.ADMINISTRATION_URL;
      const apires = await customApiFetch<
        iUserSaveUpdateReq,
        iCustomResponse<null>
      >(
        `${
          url || "http://localhost:9095"
        }/api/v1/smart/e-commerce/administration/user/saveUpdatePtlSrv`,
        req.body,
        token
      );
      return res.status(200).json(apires);
    } catch (err) {
      console.log("Error Renew", err);
      return res.status(500).send(err as iCustomResponse<null>);
    }
  })
  .use(body("user_id", "User ID is missing...").notEmpty())
  .use(validateFields)
  .put(async (req, res) => {
    try {
      const token = req.headers["x-token"]?.toString();
      const url = process.env.ADMINISTRATION_URL;
      const apires = await customApiFetch<
        iUserSaveUpdateReq,
        iCustomResponse<null>
      >(
        `${
          url || "http://localhost:9095"
        }/api/v1/smart/e-commerce/administration/user/saveUpdatePtlSrv`,
        req.body,
        token
      );
      return res.status(200).json(apires);
    } catch (err) {
      console.log("Error Renew", err);
      return res.status(500).send(err as iCustomResponse<null>);
    }
  });
