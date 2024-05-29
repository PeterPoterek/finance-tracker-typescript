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
    cell: ({ row }) => {
      const amount = row.getValue("amount");
      const amountWithCurrency = `${amount} USD`;
      return <div className="font-medium">{amountWithCurrency}</div>;
    },
  },
  {
    accessorKey: "transactionCategory",
    header: "Category",
  },
];
