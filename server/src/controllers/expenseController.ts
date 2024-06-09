import { Request, Response } from "express";
import { ExpenseModel, expenseSchemaDefinition } from "../models/expenseModel";
import { z } from "zod";

export const getAllExpenses = async (req: Request, res: Response) => {
  try {
    const userId = req.user?.userId;

    if (!userId) {
      return res.status(401).json({ error: "User ID not found" });
    }

    const expenses = await ExpenseModel.find({ user: userId });

    res.status(200).json({ expenses });
  } catch (error) {
    console.error("Error fetching expenses:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const addExpense = async (req: Request, res: Response) => {
  try {
    const { description, value, category } = req.body;
    const userId = req.user?.userId;

    const expenseData = expenseSchemaDefinition.parse({
      description,
      value,
      category,
      type: "expense",
    });

    if (!userId) {
      return res.status(401).json({ error: "User ID not found" });
    }

    const newExpense = new ExpenseModel({
      user: userId,
      description: expenseData.description,
      value: expenseData.value,
      category: expenseData.category,
      type: "expense",
    });

    await newExpense.save();

    res.status(201).json({ message: "Expense added successfully", expense: newExpense });
  } catch (error) {
    if (error instanceof z.ZodError) {
      console.error("Zod validation error:", error);
      return res.status(400).json({ error: "Validation Error", details: error.errors });
    }

    console.error("Error adding expense:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
