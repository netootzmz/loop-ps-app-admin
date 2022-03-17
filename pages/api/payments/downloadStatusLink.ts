import nextConnect from "next-connect";
import Cors from "cors";
import validateToken from "../../../middlewares/validate-token";
import {
    iCustomReq,
    iDownloadStatusLinkTableDataReq,
} from "../../../@types/api/req";
import customApiFetch from "../../../helpers/customApiFetch";

export default nextConnect<iCustomReq<iDownloadStatusLinkTableDataReq>, any>()
    .use(Cors())
    .use(validateToken)
    .post(async (req, res) => {
        console.log(req.body);
        try {
            const token = req.headers["x-token"]?.toString();
            const url = process.env.CHECKOUT_PAYMENT_URL;
            const apires = await customApiFetch<iDownloadStatusLinkTableDataReq, any>(
                `${
                    url || "http://localhost:9094"
                }/api/v1/smart/e-commerce/checkoutPayment/linkconfigReport/getLinkConfigReportFile`,
                req.body,
                token || ""
            );
            console.log(apires);
            return res.status(200).json(apires);
        } catch (err) {
            console.log("Error data", err);
            return res.status(500).send(err as iCustomReq<null>);
        }
    });
