import { z } from "zod";

export const financialSchema = z.object({
  _id: z.string().optional(),
  description: z.string().min(1, "Required").max(30, "Description is too long"),
  value: z.number().min(1, "Required"),

  category: z.string().min(1, "Required"),
  type: z.string(),
  createdAt: z.date(),
});

export type FinancialEntry = z.infer<typeof financialSchema>;
