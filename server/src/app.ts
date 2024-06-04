import express, { Express } from 'express';
import path from 'path';
import cors from 'cors';

const app: Express = express();

app.use(cors());
app.use(express.json());

// app.use((req, res, next) => {
//   res.status(404).json({ message: `Not found - ${req.path}` });
// });

// app.use((err, req, res, next) => {
//   console.error(err.stack);
//   res.status(500).json({ message: 'Internal Server Error' });
// });

export default app;
