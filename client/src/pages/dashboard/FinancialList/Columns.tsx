import { ColumnDef } from "@tanstack/react-table";
import { FinancialEntry } from "../../../services/schemas/formSchemas";
import { ArrowUpDown, MoreHorizontal } from "lucide-react";

//#region  shadcn imports
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Toaster } from "@/components/ui/toaster";
//#endregion

import { useToast } from "@/components/ui/use-toast";
import { useState } from "react";
import useCategories from "@/hooks/useCategories";

export const Columns: ColumnDef<FinancialEntry>[] = [
  {
    accessorKey: "description",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Description
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },

  {
    accessorKey: "value",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Value
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const transactionValue = row.original.value;
      const transactionType = row.original.type;

      let textColor = "";
      let symbol = "";

      if (transactionType === "expense") {
        textColor = "text-red-600";
        symbol = "-";
      } else if (transactionType === "income") {
        textColor = "text-green-600";
        symbol = "+";
      }

      const transactionValueWithCurrency = `${symbol}${transactionValue} $`;
      return (
        <div className={`font-medium ${textColor}`}>
          {transactionValueWithCurrency}
        </div>
      );
    },
  },
  {
    accessorKey: "category",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Category
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },

  {
    accessorKey: "type",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Type
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    accessorKey: "createdAt",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Created At
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const date = new Date(row.original.createdAt);
      const dateFormatted = date.toLocaleDateString();
      return <div className="font-medium">{dateFormatted}</div>;
    },
  },

  {
    id: "actions",
    cell: ({ row }) => {
      const transaction = row.original;
      const [isDialogOpen, setIsDialogOpen] = useState(false);

      const [transactionDescription, setTransactionDescription] = useState(
        transaction.description
      );
      const [transactionValue, setTransactionValue] = useState(
        transaction.value
      );
      const [transactionCategory, setTransactionCategory] = useState(
        transaction.category
      );

      const { toast } = useToast();

      const { expenseCategories, incomeCategories } = useCategories();
      const [selectCategories, setSelectCategories] = useState<string[]>([]);

      const [action, setAction] = useState<"edit" | "delete" | null>(null);

      const handleEdit = async () => {
        try {
          console.log(transaction);

          toast({
            title: `Edited transaction 📝`,
            description: `Sucesfully edited ${transaction.description}`,
          });
        } catch (error) {
          console.error("Error updating transaction:", error);
        } finally {
          setIsDialogOpen(false);
        }
      };

      const handleDelete = async (transaction: FinancialEntry) => {
        console.log(`Deleted : ${transaction.description}`);

        toast({
          title: `Deleted transaction 🗑️`,
          description: `Sucesfully deleted ${transaction.description}`,
        });

        setIsDialogOpen(false);
      };

      const openDialog = (selectedAction: "edit" | "delete") => {
        setTransactionCategory(transaction.category);

        console.log(transactionCategory);

        transaction.type === "expense"
          ? setSelectCategories(expenseCategories)
          : setSelectCategories(incomeCategories);

        setAction(selectedAction);
        setIsDialogOpen(true);
      };

      let dialogContent = null;
      if (action === "edit") {
        dialogContent = (
          <>
            <DialogHeader>
              <DialogTitle>Edit transaction</DialogTitle>
              <DialogDescription>
                Here you can edit the transaction details.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="description" className="text-right">
                  Description
                </Label>
                <Input
                  id="description"
                  value={transactionDescription}
                  onChange={e => setTransactionDescription(e.target.value)}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="transactionValue" className="text-right">
                  Value
                </Label>
                <Input
                  type="number"
                  inputMode="numeric"
                  pattern="[0-9]*"
                  id="transactionValue"
                  value={transactionValue}
                  onChange={e => setTransactionValue(Number(e.target.value))}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="transactionCategory" className="text-right">
                  Category
                </Label>
                <Select>
                  <SelectTrigger className="w-[277.25px]">
                    <SelectValue placeholder={transactionCategory} />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      {selectCategories.map(category => {
                        return (
                          <SelectItem value={category} key={category}>
                            {category}
                          </SelectItem>
                        );
                      })}
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <DialogFooter>
              <Button onClick={() => handleEdit()}>Save</Button>
            </DialogFooter>
          </>
        );
      } else if (action === "delete") {
        dialogContent = (
          <>
            <DialogHeader>
              <DialogTitle>Delete transaction</DialogTitle>
              <DialogDescription>
                Are you sure you want to delete this transaction?
              </DialogDescription>
            </DialogHeader>
            <DialogFooter>
              <Button onClick={() => setIsDialogOpen(false)}>Cancel</Button>
              <Button onClick={() => handleDelete(transaction)}>Confirm</Button>
            </DialogFooter>
          </>
        );
      }

      return (
        <>
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogContent className="sm:max-w-[425px]">
              {dialogContent}
            </DialogContent>

            <Toaster />
          </Dialog>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <span className="sr-only">Open menu</span>
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Actions</DropdownMenuLabel>
              <DropdownMenuItem onSelect={() => openDialog("edit")}>
                Edit
              </DropdownMenuItem>
              <DropdownMenuItem onSelect={() => openDialog("delete")}>
                Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </>
      );
    },
  },
];
