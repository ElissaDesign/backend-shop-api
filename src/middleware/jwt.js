import jwt from "jsonwebtoken";
import "dotenv/config";

export const signToken = async (user) => {
  return jwt.sign({ id: user._id }, process.env.TOKEN_SECRET);
};

export const verifyToken = async (Token) => {
  return jwt.verify(Token, process.env.TOKEN_SECRET);
};
