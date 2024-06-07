import express, { Express, Request, Response } from "express";
import path from "path";
import cors from "cors";
import cookieParser from "cookie-parser";

import { logEvent } from "./middleware/logger";

import authRouter from "./routes/api/authRouter";
import refreshRouter from "./routes/api/refreshRouter";
import credentials from "./middleware/credentials";
import { allowedOrigins } from "./config/allowedOrigins";
import userRouter from "./routes/api/userRouter";

const app: Express = express();

app.use(credentials);
app.use(
  cors({
    origin: allowedOrigins,
    credentials: true,
  })
);
app.use(express.json());
app.use(cookieParser());

app.use(logEvent);

// Routes
app.use("/api/auth", authRouter);
app.use("/api/refresh", refreshRouter);
app.use("/api/user", userRouter);

app.use((req, res) => {
  res.status(404).json({ message: `Not found - ${req.path}` });
});

app.use((err: Error, req: Request, res: Response) => {
  console.error(err.stack);
  res.status(500).json({ message: "Internal Server Error" });
});

export default app;
