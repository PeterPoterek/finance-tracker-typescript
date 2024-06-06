import { Request, Response } from "express";
import { UserModel } from "../models/userModel";
import bcrypt from "bcrypt";
import gravatar from "gravatar";
import jwt from "jsonwebtoken";

const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET || "ACCESS_TOKEN_SECRET";

const REFRESH_TOKEN_SECRET = process.env.REFRESH_TOKEN_SECRET || "REFRESH_TOKEN_SECRET";

interface MongoDBError extends Error {
  code?: number;
  keyValue?: {
    [key: string]: string;
  };
}

export const handleLogin = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    if (!email) {
      return res.status(400).json({ error: "Email is required" });
    }
    if (!password) {
      return res.status(400).json({ error: "Password is required" });
    }

    const user = await UserModel.findOne({ email });
    if (!user) {
      return res.status(400).json({ error: `User with email ${email} doesn't exist` });
    }

    const isMatch = await bcrypt.compare(password.trim(), user.password);

    if (!isMatch) {
      return res.status(401).json({ error: "Invalid email or password" });
    }

    const accessToken = jwt.sign(
      { userId: user._id, username: user.username },
      ACCESS_TOKEN_SECRET,
      {
        expiresIn: "1m",
      }
    );

    const refreshToken = jwt.sign(
      { userId: user._id, username: user.username },
      REFRESH_TOKEN_SECRET,
      { expiresIn: "1d" }
    );

    const maxAge = 24 * 60 * 60 * 1000;

    res.cookie("jwt", refreshToken, { httpOnly: true, maxAge });
    res.status(200).json({ message: "Login successful", user, accessToken });
  } catch (error) {
    console.error("Error logging in:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const handleRegister = async (req: Request, res: Response) => {
  try {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
      return res.status(400).json({ error: "All fields are required" });
    }

    const existingUserByEmail = await UserModel.findOne({ email });
    if (existingUserByEmail) {
      return res.status(400).json({ error: `${email} is already taken` });
    }

    const existingUserByUsername = await UserModel.findOne({ username });
    if (existingUserByUsername) {
      return res.status(400).json({ error: `${username} is already taken` });
    }

    const avatarURL = gravatar.url(email, { s: "200", d: "retro" });

    const newUser = new UserModel({
      username,
      email,
      password: password.trim(),
      avatarURL,
    });

    await newUser.save();

    res.status(201).json({ message: "User registered successfully", newUser });
  } catch (error) {
    const err = error as MongoDBError;

    if (err.code === 11000 && err.keyValue) {
      const duplicateKey = Object.keys(err.keyValue)[0];
      const duplicateValue = err.keyValue[duplicateKey];
      return res.status(400).json({
        error: `${duplicateKey} '${duplicateValue}' is already in use`,
      });
    }

    console.error("Error registering user:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const handleLogout = async (req: Request, res: Response) => {
  res.status(200).json({ message: "logout route" });
};
