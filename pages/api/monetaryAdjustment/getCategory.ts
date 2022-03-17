import nextConnect from "next-connect";
import Cors from "cors";
import { NextApiResponse, NextApiRequest } from 'next';
import customApiFetch from "../../../helpers/customApiFetch";
import { iGetCategoryOptionsRes } from '../../../@types/api/res';

export default nextConnect<
  NextApiRequest, 
  NextApiResponse<iGetCategoryOptionsRes>
>()
  .use(Cors())
  .post(async (req, res) => {
      try {        
      const token = req.headers["x-token"]?.toString();
      const url = process.env.ADMINISTRATION_URL;
      const apires = await customApiFetch<
        {}, 
        iGetCategoryOptionsRes
      >(
        `${
          url || "http://192.168.18.90:8081"
        }/api/v1/smart/service-portal/monetary-adjustment/type/find-category/ALL`,
        {},
        token
      );
      console.log(apires);
      return res.status(200).json(apires);
    } catch (err) {
      console.log("Error data", err);
      return res.status(300).json(err as iGetCategoryOptionsRes);
    }
  });