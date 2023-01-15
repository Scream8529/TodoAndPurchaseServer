import { secretHashKey } from "../config";
import { Request, Response, NextFunction } from "express";
import userService from "../services/user.service";
const jwt = require("jsonwebtoken");

interface MiddleWareRequest extends Request {
  user?: any;
}

module.exports = async (
  req: MiddleWareRequest,
  res: Response,
  next: NextFunction
) => {
  if (req.method === "OPTIONS") {
    return next();
  }

  try {
    if (!req.headers.authorization) {
      return res.status(401).send({ message: "Not authorized!" });
    }
    const token = req.headers.authorization.split(" ")[1];
    if (!token) {
      return res.status(401).json({ message: "Auth error" });
    }
    const decoded = jwt.verify(token, secretHashKey);
    console.log(decoded);
    req.user = decoded;

    next();
  } catch (error) {
    res.status(401).send({ message: "Not authorized!" });
  }
};
