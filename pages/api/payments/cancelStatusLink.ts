import nextConnect from "next-connect";
import { NextApiResponse } from "next";
import Cors from "cors";
import {iCancelStatusLinkReq, iCustomReq} from "../../../@types/api/req";
import {
    iCancelStatusLinkRes,
    iCustomResponse,
} from "../../../@types/api/res";
import customApiFetch from "../../../helpers/customApiFetch";
import validateToken from "../../../middlewares/validate-token";

export default nextConnect<
    iCustomReq<undefined>,
    NextApiResponse<iCustomResponse<iCancelStatusLinkRes>>
    >()
    .use(Cors())
    .use(validateToken)
    .post(async (req, res) => {
        try {
            const token = req.headers["x-token"]?.toString();
            const url = process.env.CHECKOUT_PAYMENT_URL;
            const apires = await customApiFetch<
                iCancelStatusLinkReq,
                iCustomResponse<iCancelStatusLinkRes>
                >(
                `${
                    url || "http://localhost:9094"
                }/api/v1/smart/e-commerce/checkoutPayment/checkout/cancelLink`,
                req.body,
                token
            );
            return res.status(200).json(apires);
        } catch (err) {
            console.log("Error Request", err);
            return res
                .status(500)
                .send(err as iCustomResponse<iCancelStatusLinkRes>);
        }
    });
