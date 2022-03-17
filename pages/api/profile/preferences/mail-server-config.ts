import nextConnect from "next-connect";
import Cors from "cors";

import { NextApiResponse } from "next";
import { iCustomReq, iSetMailServerConfigReq } from '../../../../@types/api/req';
import { iCustomResponse, iSetMailServerConfigRes } from '../../../../@types/api/res';
import customApiFetch from "../../../../helpers/customApiFetch";

export default nextConnect<
  iCustomReq<iSetMailServerConfigReq>, 
  NextApiResponse<iCustomResponse<iSetMailServerConfigRes>>
>()
  .use(Cors())
  .post(async (req, res) => {
    try {
        const token = req.headers["x-token"]?.toString();
      const url = process.env.ADMINISTRATION_URL;
      const apires = await customApiFetch<
        iSetMailServerConfigReq, 
        iCustomResponse<iSetMailServerConfigRes>
      >(
        `${
          url || "http://localhost:9095"
        }/api/v1/smart/e-commerce/administration/MailConfigurationController/addMailConfiguration`,
        req.body,
        token
      );
      console.log(apires);
      return res.status(200).json(apires);
    } catch (err) {
      console.log("Error data", err);
      return res.status(200).json(err as any);
    }
  });
