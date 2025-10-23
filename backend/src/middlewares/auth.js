import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../jwt-secret.js";

export const auth = (req, res, next) => {
  const token = req.cookies.token;

  try {
    const verifyResult = jwt.verify(token, JWT_SECRET);
    // req.user = verifyResult;
    next();
  } catch (error) {
    return res.status(401).json({ message: "Not authorized" });
  }
};
