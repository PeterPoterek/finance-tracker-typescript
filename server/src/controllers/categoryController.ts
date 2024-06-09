import { Request, Response } from "express";
import { expenseCategories, incomeCategories } from "../utils/categories";

export const getCategories = (req: Request, res: Response) => {
  res.status(200).json({
    expenseCategories,
    incomeCategories,
  });
};
