import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";

const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET || "ACCESS_TOKEN_SECRET";

interface User {
  userId: string;
  username: string;
  email: string;
}

declare global {
  namespace Express {
    interface Request {
      user?: User;
    }
  }
}

export const verifyJWT = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) return res.sendStatus(401);

  jwt.verify(token, ACCESS_TOKEN_SECRET, (err: any, user: any) => {
    if (err) return res.sendStatus(403);
    req.user = user;
    next();
  });
};
