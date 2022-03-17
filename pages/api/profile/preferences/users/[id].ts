import nextConnect from "next-connect";
import { NextApiRequest, NextApiResponse } from "next";
import Cors from "cors";
import {
  iCustomResponse,
  iUserInformationRes,
} from "../../../../../@types/api/res";
import validateToken from "../../../../../middlewares/validate-token";
import customApiFetch from "../../../../../helpers/customApiFetch";
import { query } from "express-validator";
import validateFields from "../../../../../middlewares/validateFields";

export default nextConnect<
  NextApiRequest,
  NextApiResponse<iCustomResponse<iUserInformationRes | null>>
>()
  .use(Cors())
  .use(validateToken)
  .use(query("id", "User ID is missing...").notEmpty())
  .use(validateFields)
  .get(async (req, res) => {
    try {
      const token = req.headers["x-token"]?.toString();
      const url = process.env.ADMINISTRATION_URL;
      const apires = await customApiFetch<
        {},
        iCustomResponse<iUserInformationRes>
      >(
        `${
          url || "http://localhost:9095"
        }/api/v1/smart/e-commerce/administration/user/getByUserIdIncludingBlockedPrtlSrv?userId=${
          req.query.id
        }`,
        {},
        token
      );
      return res.status(200).json(apires);
    } catch (err) {
      console.log("Error Get user data", err);
      return res.status(500).send(err as iCustomResponse<iUserInformationRes>);
    }
  })
  .delete(async (req, res) => {
    try {
      const token = req.headers["x-token"]?.toString();
      const url = process.env.ADMINISTRATION_URL;
      const apires = await customApiFetch<{}, iCustomResponse<null>>(
        `${
          url || "http://localhost:9095"
        }/api/v1/smart/e-commerce/administration/user/deletePrtlSrv?id=${
          req.query.id
        }`,
        {},
        token
      );
      return res.status(200).json(apires);
    } catch (err) {
      console.log("Error Delete user", err);
      return res.status(500).send(err as iCustomResponse<null>);
    }
  })
  .put(async (req, res) => {
    try {
      const token = req.headers["x-token"]?.toString();
      const url = process.env.ADMINISTRATION_URL;
      const apires = await customApiFetch<{}, iCustomResponse<null>>(
        `${
          url || "http://localhost:9095"
        }/api/v1/smart/e-commerce/administration/user/blockPrtlSrv?id=${
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
