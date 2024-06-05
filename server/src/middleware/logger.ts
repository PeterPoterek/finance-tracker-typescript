import { Request, Response, NextFunction } from 'express';
import 'colors';

export const logEvent = (req: Request, res: Response, next: NextFunction) => {
  const method = req.method.blue;
  const path = req.path.green;

  console.log(`${method} ${path}`);
  next();
};
