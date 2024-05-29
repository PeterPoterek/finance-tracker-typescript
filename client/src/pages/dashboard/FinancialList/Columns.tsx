import { ColumnDef } from "@tanstack/react-table";
import { FinancialEntry } from "../../../services/schemas/formSchemas";

export const Columns: ColumnDef<FinancialEntry>[] = [
  {
    accessorKey: "description",
    header: "Description",
  },
  {
    accessorKey: "amount",
    header: "Amount",
    cell: ({ row }) => {
      const amount = row.original.amount;
      const amountWithCurrency = `${amount} USD`;
      return <div className="font-medium">{amountWithCurrency}</div>;
    },
  },
  {
    accessorKey: "transactionCategory",
    header: "Category",
  },
  {
    accessorKey: "createdAt",
    header: "Created At",
    cell: ({ row }) => {
      const date = new Date(row.original.createdAt);
      const dateFormatted = date.toLocaleDateString();
      return <div className="font-medium">{dateFormatted}</div>;
    },
  },
];
