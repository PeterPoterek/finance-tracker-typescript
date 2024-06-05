import express, { Express, Request, Response, NextFunction } from 'express';
import path from 'path';
import cors from 'cors';
import { logEvent } from './middleware/logger';

const app: Express = express();

app.use(cors());
app.use(express.json());

app.use(logEvent);

// app.use((req, res, next) => {
//   res.status(404).json({ message: `Not found - ${req.path}` });
// });

// app.use((err, req, res, next) => {
//   console.error(err.stack);
//   res.status(500).json({ message: 'Internal Server Error' });
// });

app.get('/', (req, res) => {
  res.send('Hello World!');
});

export default app;
