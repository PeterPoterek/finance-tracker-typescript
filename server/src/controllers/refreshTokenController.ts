import jwt from "jsonwebtoken";
import { Request, Response } from "express";
import { UserModel } from "../models/userModel";

const REFRESH_TOKEN_SECRET = process.env.REFRESH_TOKEN_SECRET || "REFRESH_TOKEN_SECRET";
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

export const handleRefreshToken = async (req: Request, res: Response) => {
  const refreshToken = req.cookies.jwt;

  if (!refreshToken) {
    return res.sendStatus(401);
  }

  jwt.verify(refreshToken, REFRESH_TOKEN_SECRET, async (err: any, decodedToken: any) => {
    if (err || !decodedToken || !decodedToken.userId) {
      return res.sendStatus(403);
    }

    try {
      const currUser = await UserModel.findById(decodedToken.userId);
      if (!currUser) {
        return res.sendStatus(403);
      }

      const accessToken = jwt.sign(
        { userId: currUser._id, username: currUser.username },
        ACCESS_TOKEN_SECRET,
        { expiresIn: "15m" }
      );

      res.json({ accessToken });
    } catch (error) {
      console.error("Error finding user:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  });
};
