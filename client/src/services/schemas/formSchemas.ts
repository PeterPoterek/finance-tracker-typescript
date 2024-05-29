import { z } from "zod";

export const financialSchema = z.object({
  id: z.string(),
  description: z.string().min(1, "Required"),
  amount: z.number().min(1, "Required"),

  transactionCategory: z.enum(["income", "expense"]),
});

export type FinancialEntry = z.infer<typeof financialSchema>;
