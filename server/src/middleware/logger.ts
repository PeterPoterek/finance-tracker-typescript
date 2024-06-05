import { Request, Response, NextFunction } from 'express';
import 'colors';

export const logEvent = (req: Request, res: Response, next: NextFunction) => {
  const method = req.method.blue.italic;
  const path = req.path.yellow;

  console.log(`${method} ${path}`);
  next();
};
