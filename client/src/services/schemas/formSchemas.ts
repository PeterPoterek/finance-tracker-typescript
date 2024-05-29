import { z } from "zod";

export const formSchema = z.object({
  description: z.string().min(1, "Required"),
  amount: z.number().min(1, "Required"),

  transactionCategory: z.enum(["income", "expense"]),
});

export type FormSchemaType = z.infer<typeof formSchema>;
