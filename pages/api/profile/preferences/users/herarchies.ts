import nextConnect from "next-connect";
import { NextApiRequest, NextApiResponse } from "next";
import Cors from "cors";
import {
  iCustomResponse,
  iUserGetHerarchiesRes,
} from "../../../../../@types/api/res";
import validateToken from "../../../../../middlewares/validate-token";
import customApiFetch from "../../../../../helpers/customApiFetch";

export default nextConnect<
  NextApiRequest,
  NextApiResponse<iCustomResponse<iUserGetHerarchiesRes>>
>()
  .use(Cors())
  .use(validateToken)
  .get(async (req, res) => {
    try {
      const token = req.headers["x-token"]?.toString();
      const url = process.env.ADMINISTRATION_URL;
      const apires = await customApiFetch<
        {},
        iCustomResponse<iUserGetHerarchiesRes>
      >(
        `${
          url || "http://localhost:9095"
        }/api/v1/smart/e-commerce/administration/user/getAllHierarchies`,
        {},
        token
      );
      return res.status(200).json(apires);
    } catch (err) {
      console.log("Error Renew", err);
      return res
        .status(500)
        .send(err as iCustomResponse<iUserGetHerarchiesRes>);
    }
  });
