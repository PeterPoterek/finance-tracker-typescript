import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import { UserModel } from "../models/userModel";

const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET || "ACCESS_TOKEN_SECRET";

export const getUser = async (req: Request, res: Response) => {
  try {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];

    if (!token) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    jwt.verify(token, ACCESS_TOKEN_SECRET, async (err: any, decoded: any) => {
      if (err) {
        return res.status(403).json({ error: "Forbidden" });
      }

      const { userId } = decoded;

      const user = await UserModel.findOne({ _id: userId });

      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }

      return res.status(200).json(user);
    });
  } catch (error) {
    console.error("Error getting user:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};
