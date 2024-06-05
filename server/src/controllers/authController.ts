import { Request, Response } from 'express';
import { UserModel } from '../models/userModel';
import bcrypt from 'bcrypt';
import gravatar from 'gravatar';

export const handleLogin = (req: Request, res: Response) => {
  res.status(200).json({ message: 'Login route' });
};

export const handleRegister = async (req: Request, res: Response) => {
  try {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
      return res.status(400).json({ error: 'All fields are required' });
    }

    const existingUser = await UserModel.findOne({ email });
    if (existingUser) {
      return res
        .status(400)
        .json({ error: 'User with this email already exists' });
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
    console.error('Error registering user:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
