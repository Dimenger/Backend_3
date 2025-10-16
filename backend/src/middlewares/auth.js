import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../constant/constants.js";

export const auth = (req, res, next) => {
  const token = req.cookies.token;

  if (!token) {
    return res.status(401).json({ message: "Не авторизован" });
  }

  try {
    const verifyResult = jwt.verify(token, JWT_SECRET);
    req.staff = { email: verifyResult.email };
    next();
  } catch (e) {
    return res.status(401).json({ message: "Недействительный токен" });
  }
};
