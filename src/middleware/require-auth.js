import jwt from "jsonwebtoken";
import "dotenv/config";

const config = process.env;

export const requireAuth = (req, res, next) => {
  let token = "";

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
  }

  if (!token) {
    return res.status(401).json({ msg: "Unauthorized, Please login" });
  }

  try {
    const payload = jwt.verify(token, config.TOKEN_SECRET);
    req.user = payload;
    return next();
  } catch (err) {
    return res.status(401).json({ msg: "Unauthorized" });
  }
};
