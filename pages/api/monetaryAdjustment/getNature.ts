import nextConnect from "next-connect";
import Cors from "cors";
import { NextApiResponse, NextApiRequest } from 'next';
import customApiFetch from "../../../helpers/customApiFetch";
import { iGetNatureOptionsRes } from '../../../@types/api/res';

export default nextConnect<
  NextApiRequest, 
  NextApiResponse<iGetNatureOptionsRes>
>()
  .use(Cors())
  .post(async (req, res) => {
      try {        
      const token = req.headers["x-token"]?.toString();
      const url = process.env.ADMINISTRATION_URL;
      const apires = await customApiFetch<
        {}, 
        iGetNatureOptionsRes
      >(
        `${
          url || "http://192.168.18.90:8081"
        }/api/v1/smart/service-portal/monetary-adjustment/retrieve-nature-type`,
        {},
        token
      );
      console.log(apires);
      return res.status(200).json(apires);
    } catch (err) {
      console.log("Error data", err);
      return res.status(300).json(err as iGetNatureOptionsRes);
    }
  });