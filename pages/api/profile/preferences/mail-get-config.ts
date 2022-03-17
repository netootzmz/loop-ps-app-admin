import nextConnect from "next-connect";
import Cors from "cors";

import { NextApiResponse, NextApiRequest } from 'next';
import { iCustomResponse, iGetMailServerInitDataRes } from '../../../../@types/api/res';
import customApiFetch from "../../../../helpers/customApiFetch";

export default nextConnect<
  NextApiRequest, 
  NextApiResponse<iCustomResponse<iGetMailServerInitDataRes>>
>()
  .use(Cors())
  .post(async (req, res) => {
      try {        
      const token = req.headers["x-token"]?.toString();
      const url = process.env.ADMINISTRATION_URL;
      const apires = await customApiFetch<
        {}, 
        iCustomResponse<iGetMailServerInitDataRes>
      >(
        `${
          url || "http://localhost:9095"
        }/api/v1/smart/e-commerce/administration/MailConfigurationController/getMailConfiguration/${req.body.clientId}`,
        {},
        token
      );
      console.log(apires);
      return res.status(200).json(apires);
    } catch (err) {
      console.log("Error data", err);
      return res.status(500).json(err as any);
    }
  });