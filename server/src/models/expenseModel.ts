import mongoose, { Schema, Document } from "mongoose";
import { z } from "zod";
import { expenseCategories } from "../utils/categories";

const expenseCategoriesEnum = z.enum(expenseCategories);

const expenseSchemaDefinition = z.object({
  description: z.string().min(1).max(255),
  value: z.number().positive(),
  category: expenseCategoriesEnum,
  type: z.literal("expense"),
  createdAt: z.date().default(new Date()),
});

interface ExpenseSchema extends Document {
  user: mongoose.Types.ObjectId;
  description: string;
  value: number;
  category: string;
  type: "expense";
  createdAt: Date;
}

const expenseSchema = new Schema<ExpenseSchema>({
  user: { type: Schema.Types.ObjectId, ref: "User", required: true },
  description: { type: String, required: true },
  value: { type: Number, required: true },
  category: { type: String, enum: expenseCategories, required: true },
  type: { type: String, enum: ["expense"], default: "expense" },
  createdAt: { type: Date, default: Date.now },
});

const ExpenseModel = mongoose.model<ExpenseSchema>("Expense", expenseSchema);

export { ExpenseModel, expenseSchemaDefinition };
