import { z } from "zod";

export const formSchema = z.object({
  description: z.string(),
  amount: z.number(),
});

export type FormSchemaType = z.infer<typeof formSchema>;
