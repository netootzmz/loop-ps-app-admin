import nextConnect from "next-connect";
import { NextApiResponse } from "next";
import Cors from "cors";
import {iCustomReq, iGetStatusLinkDetailReq} from "../../../@types/api/req";
import {
    iCustomResponse, iGetStatusLinkDetailRes,
} from "../../../@types/api/res";
import customApiFetch from "../../../helpers/customApiFetch";
import validateToken from "../../../middlewares/validate-token";

export default nextConnect<
    iCustomReq<undefined>,
    NextApiResponse<iCustomResponse<iGetStatusLinkDetailRes>>
    >()
    .use(Cors())
    .use(validateToken)
    .post(async (req, res) => {
        try {
            const token = req.headers["x-token"]?.toString();
            const url = process.env.CHECKOUT_PAYMENT_URL;
            const apires = await customApiFetch<
                iGetStatusLinkDetailReq,
                iCustomResponse<iGetStatusLinkDetailRes>
                >(
                `${
                    url || "http://localhost:9094"
                }/api/v1/smart/e-commerce/checkoutPayment/linkconfigReport/getLinkConfigReportDetail`,
                req.body,
                token
            );
            return res.status(200).json(apires);
        } catch (err) {
            console.log("Error Request", err);
            return res
                .status(500)
                .send(err as iCustomResponse<iGetStatusLinkDetailRes>);
        }
    });
