import { Request, Response, NextFunction } from "express";
import "colors";

export const logEvent = (req: Request, res: Response, next: NextFunction) => {
  const method = req.method.blue.italic;
  const path = req.path.yellow;
  const time = new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }).gray;

  console.log(`${time} - ${method} ${path}`);
  next();
};

export const logDatabaseConnectionSuccess = () => {
  console.clear();
  console.log(dividers(50).black);
  console.log("Database connection successful ✅".green.bold);
  console.log("");
};

export const logServerStart = (port: string) => {
  const url = `http://localhost:${port}`.cyan.dim.underline;
  console.log(`🐱 Server is up and running at ${url} 🐱`.magenta.bold);
  console.log(dividers(50).black);
};

const dividers = (length: number): string => {
  let dividersCount = "";
  for (let i = 0; i < length; i++) {
    dividersCount += "─";
  }
  return dividersCount;
};
