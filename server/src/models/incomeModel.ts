import mongoose, { Schema, Document } from "mongoose";
import { z } from "zod";
import { incomeCategories } from "../utils/categories";

const incomeCategoriesEnum = z.enum(incomeCategories);

const incomeSchemaDefinition = z.object({
  description: z.string().min(1).max(255),
  value: z.number().positive(),
  category: incomeCategoriesEnum,
  type: z.literal("income"),
});

interface IncomeSchema extends Document {
  user: mongoose.Types.ObjectId;
  description: string;
  value: number;
  category: string;
  type: "income";
  createdAt: Date;
}

const incomeSchema = new Schema<IncomeSchema>({
  user: { type: Schema.Types.ObjectId, ref: "User", required: true },
  description: { type: String, required: true },
  value: { type: Number, required: true },
  category: { type: String, enum: incomeCategories, required: true },
  type: { type: String, enum: ["income"], default: "income" },
  createdAt: { type: Date, default: Date.now },
});

const IncomeModel = mongoose.model<IncomeSchema>("Income", incomeSchema);

export { IncomeModel, incomeSchemaDefinition };
