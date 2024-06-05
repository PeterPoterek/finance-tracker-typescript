import { Router, Request, Response } from 'express';

const authRouter = Router();

authRouter.post('/login', (req: Request, res: Response) => {
  res.status(200).json({ message: 'Login route' });
});

authRouter.post('/register', (req: Request, res: Response) => {
  res.status(200).json({ message: 'Register route' });
});

export default authRouter;
