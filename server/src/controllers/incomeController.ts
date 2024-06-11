import { Request, Response } from "express";
import { IncomeModel, incomeSchemaDefinition } from "../models/incomeModel";
import { z } from "zod";

export const getAllIncomes = async (req: Request, res: Response) => {
  try {
    const userId = req.user?.userId;

    if (!userId) {
      return res.status(401).json({ error: "User ID not found" });
    }

    const incomes = await IncomeModel.find({ user: userId });

    res.status(200).json({ incomes });
  } catch (error) {
    console.error("Error fetching incomes:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const addIncome = async (req: Request, res: Response) => {
  try {
    const { description, value, category } = req.body;
    const userId = req.user?.userId;

    const incomeData = incomeSchemaDefinition.parse({
      description,
      value,
      category,
      type: "income",
    });

    if (!userId) {
      return res.status(401).json({ error: "User ID not found" });
    }

    const newIncome = new IncomeModel({
      user: userId,
      description: incomeData.description,
      value: incomeData.value,
      category: incomeData.category,
      type: "income",
    });

    await newIncome.save();

    res.status(201).json({ message: "Income added successfully", income: newIncome });
  } catch (error) {
    if (error instanceof z.ZodError) {
      console.error("Zod validation error:", error);
      return res.status(400).json({ error: "Validation Error", details: error.errors });
    }

    console.error("Error adding income:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const updateIncome = async (req: Request, res: Response) => {
  try {
    const userId = req.user?.userId;
    const { id } = req.params;
    const { description, value, category } = req.body;

    if (!userId) {
      return res.status(401).json({ error: "User ID not found" });
    }

    const income = await IncomeModel.findOneAndUpdate(
      { _id: id, user: userId },
      { description, value, category },
      { new: true }
    );

    if (!income) {
      return res.status(404).json({ error: "Income not found" });
    }

    res.status(200).json({ message: "Income updated successfully", income });
  } catch (error) {
    console.error("Error updating income:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const deleteIncome = async (req: Request, res: Response) => {
  try {
    const userId = req.user?.userId;
    const { id } = req.params;

    if (!userId) {
      return res.status(401).json({ error: "User ID not found" });
    }

    const income = await IncomeModel.findOneAndDelete({ _id: id, user: userId });

    if (!income) {
      return res.status(404).json({ error: "Income not found" });
    }

    res.status(200).json({ message: "Income deleted successfully" });
  } catch (error) {
    console.error("Error deleting income:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
