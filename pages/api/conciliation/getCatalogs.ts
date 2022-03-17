import nextConnect from "next-connect";
import Cors from "cors";

import { NextApiResponse} from 'next';
import { iCustomReq, iGetCatalogReq } from '../../../@types/api/req';
import customApiFetch from "../../../helpers/customApiFetch";
import { iCustomResponse, iGetCatalogRes } from '../../../@types/api/res';

export default nextConnect<
  iCustomReq<iGetCatalogReq>, 
  NextApiResponse<iCustomResponse<iGetCatalogRes>>
>()
  .use(Cors())
  .post(async (req, res) => {
      try {        
      const token = req.headers["x-token"]?.toString();
      const url = process.env.ADMINISTRATION_URL;
      const apires = await customApiFetch<
        iGetCatalogReq, 
        iCustomResponse<iGetCatalogRes>
      >(
        `${
          url || "http://localhost:9095"
        }/api/v1/smart/e-commerce/administration/catalogs/getByName`,
        req.body,
        token
      );
      console.log(apires);
      return res.status(200).json(apires);
    } catch (err) {
      console.log("Error data", err);
      return res.status(500).json(err as iCustomResponse<iGetCatalogRes>);
    }
  });