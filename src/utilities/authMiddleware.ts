import { Request, Response, NextFunction } from "express";
import { SECRET_KEY } from "./secrets";
import { UserModel } from "../lib/models/UserModel";
import * as jwt from "jsonwebtoken";

// authMiddleware.js
export const authenticateToken = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader;
  if (!token) return res.status(401).json({ error: "Unauthorized" });

  jwt.verify(token, SECRET_KEY, (err, user) => {
    if (err) return res.status(403).json({ error: "Forbidden" });
    req.body.user = user;
    next();
  });
};

export const authorizeRole = (role: string) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      const user = await UserModel.findById(req.body.user._id).lean().exec();
      if (!user?.roles.some((userRole) => userRole === role)) {
        return res.status(403).json({ error: "Forbidden" });
      }
      next();
    } catch (err) {
      res.status(500).json({ error: "Error authorizing role" });
    }
  };
};
