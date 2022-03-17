import { NextHandler } from "next-connect";
import { NextApiRequest, NextApiResponse } from "next";
import validator from "validator";

const validateToken = (
  req: NextApiRequest,
  res: NextApiResponse,
  next: NextHandler
) => {
  const token = req.headers["x-token"]?.toString();
  if (!validator.isJWT(token || "")) {
    return res.status(400).json({
      status: "error",
      err: "No hay token en la petición",
    });
  }
  next();
};

export default validateToken;
