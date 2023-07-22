import { Request, Response, NextFunction } from "express";
import { SECRET_KEY } from "./secrets";
import { UserModel } from "../lib/models/UserModel";

// authMiddleware.js
const jwt = require("jsonwebtoken");

export const authenticateToken = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader;
  if (!token) return res.status(401).json({ error: "Unauthorized" });

  jwt.verify(token, SECRET_KEY, (err: any, user: Record<string, any>) => {
    if (err) return res.status(403).json({ error: "Forbidden" });
    req.body.user = user;
    next();
  });
};

export const authorizeRole = (role: string) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      const user = await UserModel.findById(req.body.user._id).lean().exec();
      if (!user?.roles.some((userRole: any) => userRole === role)) {
        return res.status(403).json({ error: "Forbidden" });
      }
      next();
    } catch (err) {
      res.status(500).json({ error: "Error authorizing role" });
    }
  };
};
