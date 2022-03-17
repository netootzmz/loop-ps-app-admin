import nextConnect from "next-connect";
import { iCustomReq, iCookieReq } from "../../../../@types/api/req";
import { NextApiResponse } from "next";
import { iCustomResponse, iCookieRes } from "../../../../@types/api/res";
import Cors from "cors";
import { body } from "express-validator";
import validateFields from "../../../../middlewares/validateFields";
import customApiFetch from "../../../../helpers/customApiFetch";

export default nextConnect<
  iCustomReq<iCookieReq>,
  NextApiResponse<iCustomResponse<iCookieRes>>
>()
  .use(Cors())
  .get(async (req, res) => {
    try {
      const url = process.env.ADMINISTRATION_URL;
      const apires = await customApiFetch<
        iCookieReq,
        iCustomResponse<iCookieRes>
      >(
        `${
          url || "http://localhost:9095"
        }/api/v1/smart/e-commerce/administration/bitacoraCookie/getByIp`,
        {
          ip: req.query.ip as string,
        }
      );
      return res.status(200).json(apires);
    } catch (err) {
      console.log("Error Get cookies", err);
      return res.status(500).send(err as iCustomResponse<iCookieRes>);
    }
  })
  .use(body("cookieAccept", "Cookie response is missing...").not().isEmpty())
  .use(validateFields)
  .post(async (req, res) => {
    try {
      const url = process.env.ADMINISTRATION_URL;
      const apires = await customApiFetch<
        iCookieReq,
        iCustomResponse<iCookieRes>
      >(
        `${
          url || "http://localhost:9095"
        }/api/v1/smart/e-commerce/administration/bitacoraCookie/add`,
        {
          ip: req.query.ip as string,
          cookieAccept: req.body.cookieAccept,
        }
      );
      return res.status(200).json(apires);
    } catch (err) {
      console.log("Error Cookies Response", err);
      return res.status(500).send(err as iCustomResponse<iCookieRes>);
    }
  });
