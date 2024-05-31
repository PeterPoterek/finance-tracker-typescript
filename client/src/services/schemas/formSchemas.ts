import { z } from "zod";

export const financialSchema = z.object({
  // id: z.string(),
  description: z.string().min(1, "Required"),
  transactionValue: z.number().min(1, "Required"),

  transactionCategory: z.string().min(1, "Required"),
  createdAt: z.date(),
});

export type FinancialEntry = z.infer<typeof financialSchema>;
