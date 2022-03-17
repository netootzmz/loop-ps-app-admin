import nextConnect from "next-connect";
import { NextApiResponse } from "next";
import Cors from "cors";
import { iCustomReq } from "../../../../@types/api/req";
import {
  IDepositsAndMovementsServPtalRes,
  IFilters,
} from "../../../../@types/api/queries/DepositsAndMovementsServPtalController/getDepositsAndMovementsServPtal";
import customApiFetch from "helpers/customApiFetch";
import validateToken from "middlewares/validate-token";

export default nextConnect<
  iCustomReq<IFilters>,
  NextApiResponse<IDepositsAndMovementsServPtalRes>
>()
  .use(Cors())
  .use(validateToken)
  .post(async (req, res) => {
    try {
      const token = req.headers["x-token"]?.toString();
      const url = process.env.QUERIES_REPORTS_URL;

      console.log("body", req.body);

      // return res.status(200).json(dataDummy);
      const data = await customApiFetch<
        IFilters,
        IDepositsAndMovementsServPtalRes
      >(
        `${
          url || "http://localhost:8086"
        }/api/v1/smart/e-commerce/queries/DepositsAndMovementsServPtalController/getDepositsAndMovementsServPtal`,
        req.body,
        token
      );
      return res.status(200).json(data);
    } catch (err) {
      console.log(
        "[ queries/DepositsAndMovementsServPtalController/getDepositsAndMovementsServPtal ] Error Request",
        err
      );
      return res.status(200).send(err as IDepositsAndMovementsServPtalRes);
    }
  });

// const dataDummy = {
//   codeStatus: "00",
//   message: "Información procesada correctamente",
//   information: {
//     results: [
//       {
//         referencePaymentDispersionId: 1,
//         dispersionTrackingId: 2,
//         dispersionStatusId: 4,
//         dispersionStatusCve: "RECHPAG",
//         paymentReference: "0000001",
//         description: "pago a cinemex",
//         commerce: "8611927",
//         clabe: "0123456789123456",
//         amount: 5,
//         dispersion_date: "2021-10-01",
//         payment_code: "58596",
//         payment_detail: '{"motivo_devolucion":"Cuenta Bloqueada"}',
//         statusId: 1,
//         userByRegister: "1",
//         createdAt: {
//           month: "OCTOBER",
//           year: 2021,
//           dayOfMonth: 5,
//           hour: 16,
//           minute: 23,
//           monthValue: 10,
//           nano: 0,
//           second: 57,
//           dayOfWeek: "TUESDAY",
//           dayOfYear: 278,
//           chronology: {
//             id: "ISO",
//             calendarType: "iso8601",
//           },
//         },
//       },
//       {
//         referencePaymentDispersionId: 2,
//         dispersionTrackingId: 2,
//         dispersionStatusId: 1,
//         dispersionStatusCve: "PAG",
//         paymentReference: "0000002",
//         description: "pago 2 a cinemex",
//         commerce: "8611927",
//         clabe: "0123456789123456",
//         amount: 5,
//         dispersion_date: "2021-10-05",
//         payment_code: "01015",
//         payment_detail: '{"motivo_devolucion":"Cuenta Bloqueada"}',
//         statusId: 1,
//         userByRegister: "1",
//         createdAt: {
//           month: "OCTOBER",
//           year: 2021,
//           dayOfMonth: 5,
//           hour: 16,
//           minute: 23,
//           monthValue: 10,
//           nano: 0,
//           second: 57,
//           dayOfWeek: "TUESDAY",
//           dayOfYear: 278,
//           chronology: {
//             id: "ISO",
//             calendarType: "iso8601",
//           },
//         },
//       },
//     ],
//   },
// };
