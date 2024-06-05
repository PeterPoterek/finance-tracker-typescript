import express, { Express, Request, Response } from 'express';
import path from 'path';
import cors from 'cors';
import { logEvent } from './middleware/logger';

import authRouter from './routes/api/authRouter';

const app: Express = express();

app.use(cors());

app.use(express.json());

app.use(logEvent);

app.use('/api/auth', authRouter);

app.use((req, res) => {
  res.status(404).json({ message: `Not found - ${req.path}` });
});

app.use((err: Error, req: Request, res: Response) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Internal Server Error' });
});

export default app;
