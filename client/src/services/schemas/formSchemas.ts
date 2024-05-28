import { z } from "zod";

export const formSchema = z.object({
  description: z.string().min(1, "Description is required"),
  // amount: z.number().min(1, "Amount must be greater than zero"),
  // type: z.enum(["income", "expense"]),
});

export type FormSchemaType = z.infer<typeof formSchema>;
