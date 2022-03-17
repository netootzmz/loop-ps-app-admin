import { validationResult } from "express-validator";
import { NextApiRequest, NextApiResponse } from "next";
import { NextHandler } from "next-connect";
import { iCustomResponse } from "../@types/api/res";

const validateFields = (
  req: NextApiRequest,
  res: NextApiResponse<iCustomResponse>,
  next: NextHandler
) => {
  const err = validationResult(req);

  if (!err.isEmpty()) {
    return res.status(400).json({
      codeStatus: "00",
      err: err.mapped(),
      message: "Algunos campos fallaron la validación",
    });
  }
  next();
};

export default validateFields;
