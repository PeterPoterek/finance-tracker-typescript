import { ColumnDef } from "@tanstack/react-table";
import { FinancialEntry } from "../../../services/schemas/formSchemas.ts";

export const Columns: ColumnDef<FinancialEntry>[] = [
  {
    accessorKey: "description",
    header: "Description",
  },
  {
    accessorKey: "amount",
    header: "Amount",
  },
  {
    accessorKey: "transactionCategory",
    header: "Category",
  },
];
