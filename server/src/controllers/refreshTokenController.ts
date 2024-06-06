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

  jwt.verify(refreshToken, REFRESH_TOKEN_SECRET, async (err: any, user: any) => {
    if (err || !user) {
      return res.sendStatus(403);
    }

    try {
      const currUser = await UserModel.findOne({ username: user.username });

      if (!currUser) {
        return res.sendStatus(403);
      }

      const accessToken = jwt.sign(
        { userId: currUser._id, username: user.username },
        ACCESS_TOKEN_SECRET,
        {
          expiresIn: "1m",
        }
      );

      res.json({ accessToken });
    } catch (error) {
      console.error("Error finding user:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  });
};
