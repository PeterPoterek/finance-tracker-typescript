import { Request, Response } from 'express';
import { UserModel } from '../models/userModel';
import bcrypt from 'bcrypt';
import gravatar from 'gravatar';

interface MongoDBError extends Error {
  code?: number;
  keyValue?: {
    [key: string]: string;
  };
}

export const handleLogin = (req: Request, res: Response) => {
  res.status(200).json({ message: 'Login route' });
};

export const handleRegister = async (req: Request, res: Response) => {
  try {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
      return res.status(400).json({ error: 'All fields are required' });
    }

    const existingUserByEmail = await UserModel.findOne({ email });
    if (existingUserByEmail) {
      return res
        .status(400)
        .json({ error: 'User with this email already exists' });
    }

    const existingUserByUsername = await UserModel.findOne({ username });
    if (existingUserByUsername) {
      return res.status(400).json({ error: 'Username is already taken' });
    }

    const avatarURL = gravatar.url(email, { s: '200', d: 'retro' });

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new UserModel({
      username,
      email,
      password: hashedPassword,
      avatarURL,
    });

    await newUser.save();

    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    const err = error as MongoDBError;

    if (err.code === 11000 && err.keyValue) {
      const duplicateKey = Object.keys(err.keyValue)[0];
      const duplicateValue = err.keyValue[duplicateKey];
      return res.status(400).json({
        error: `${duplicateKey} '${duplicateValue}' is already in use`,
      });
    }

    console.error('Error registering user:', err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
