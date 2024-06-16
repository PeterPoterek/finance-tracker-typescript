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
    const { description, value, category, createdAt } = req.body;
    const userId = req.user?.userId;

    console.log(createdAt);
    console.log(typeof createdAt);

    const expenseData = expenseSchemaDefinition.parse({
      description,
      value,
      category,
      type: "expense",
      createdAt: new Date(createdAt),
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
      createdAt: expenseData.createdAt,
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

export const getExpenseById = async (req: Request, res: Response) => {
  try {
    const userId = req.user?.userId;
    const { id } = req.params;

    if (!userId) {
      return res.status(401).json({ error: "User ID not found" });
    }

    const expense = await ExpenseModel.findOne({ _id: id, user: userId });

    if (!expense) {
      return res.status(404).json({ error: "Expense not found" });
    }

    res.status(200).json({ expense });
  } catch (error) {
    console.error("Error fetching expense:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const updateExpense = async (req: Request, res: Response) => {
  try {
    const userId = req.user?.userId;
    const { id } = req.params;
    const { description, value, category } = req.body;

    const expenseData = expenseSchemaDefinition.parse({
      description,
      value,
      category,
      type: "expense",
    });

    if (!userId) {
      return res.status(401).json({ error: "User ID not found" });
    }

    const updatedExpense = await ExpenseModel.findOneAndUpdate(
      { _id: id, user: userId },
      {
        description: expenseData.description,
        value: expenseData.value,
        category: expenseData.category,
        type: "expense",
      },
      { new: true, runValidators: true }
    );

    if (!updatedExpense) {
      return res.status(404).json({ error: "Expense not found" });
    }

    res.status(200).json({ message: "Expense updated successfully", expense: updatedExpense });
  } catch (error) {
    if (error instanceof z.ZodError) {
      console.error("Zod validation error:", error);
      return res.status(400).json({ error: "Validation Error", details: error.errors });
    }

    console.error("Error updating expense:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const deleteExpense = async (req: Request, res: Response) => {
  try {
    const userId = req.user?.userId;
    const { id } = req.params;

    if (!userId) {
      return res.status(401).json({ error: "User ID not found" });
    }

    const deletedExpense = await ExpenseModel.findOneAndDelete({ _id: id, user: userId });

    if (!deletedExpense) {
      return res.status(404).json({ error: "Expense not found" });
    }

    res.status(200).json({ message: "Expense deleted successfully" });
  } catch (error) {
    console.error("Error deleting expense:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
