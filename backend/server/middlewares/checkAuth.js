import jwt from "jsonwebtoken";
import { secretWord } from "../config/config.js";

export default (req, res, next) => {
  const token = (req.headers.authorization || "").replace(/Bearer\s?/, "");

  if (token) {
    try {
      const decoded = jwt.verify(token, secretWord);
      req.userId = decoded._id;
      next();
    } catch (err) {
      return res.status(403).json({
        message: "No access!",
      });
    }
  } else {
    return res.status(403).json({
      message: "No access!",
    });
  }
};
