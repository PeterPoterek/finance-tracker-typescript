import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

//#region shadcn imports
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
//#endregion

import {
  financialSchema,
  FinancialEntry,
} from "@/services/schemas/formSchemas";

//#region Datepicker imports
import { CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import useCategories from "@/hooks/useCategories";
//#endregion

interface FinancialFormProps {
  view: "expense" | "income";
}

const FinancialForm: React.FC<FinancialFormProps> = ({ view }) => {
  const { expenseCategories, incomeCategories } = useCategories();

  const defaultValues = {
    description: "",
    value: 0,
    category: "",
    createdAt: undefined,
    type: "",
  };

  const form = useForm<z.infer<typeof financialSchema>>({
    resolver: zodResolver(financialSchema),
    defaultValues,
  });

  const onSubmit = (values: FinancialEntry) => {
    values.type = view;

    console.log(values);

    form.reset(defaultValues);
  };

  return (
    <div className="pt-[1rem] pb-[3.5rem]">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="grid grid-cols-2 gap-6"
        >
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem className="col-span-1">
                <FormLabel>Description</FormLabel>
                <FormControl>
                  <Input
                    className="w-full"
                    placeholder={`Enter ${view} description details`}
                    {...field}
                  />
                </FormControl>
                <FormDescription>
                  Please enter description details of your {view}.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="value"
            render={({ field }) => (
              <FormItem className="col-span-1">
                <FormLabel>Value</FormLabel>
                <FormControl>
                  <Input
                    type="text"
                    inputMode="numeric"
                    pattern="[0-9]*"
                    placeholder="Enter value"
                    className="w-full"
                    {...field}
                    min={0}
                    value={field.value || ""}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                      let value = e.target.value;
                      value = value.replace(/e/gi, "");
                      const numericValue = value.replace(/[^0-9.]/g, "");
                      field.onChange(Number(numericValue));
                    }}
                  />
                </FormControl>
                <FormDescription>
                  Please enter value of your {view}.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="category"
            render={({ field }) => (
              <FormItem className="col-span-1">
                <FormLabel>Transaction Category</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  value={field.value}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select a transaction category" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {view === "expense"
                      ? expenseCategories.map((category, index) => (
                          <SelectItem key={index} value={category}>
                            {category}
                          </SelectItem>
                        ))
                      : incomeCategories.map((category, index) => (
                          <SelectItem key={index} value={category}>
                            {category}
                          </SelectItem>
                        ))}
                  </SelectContent>
                </Select>
                <FormDescription>
                  Choose a category to classify this transaction.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="createdAt"
            render={({ field }) => (
              <FormItem className="col-span-1">
                <FormLabel>Date of Transaction</FormLabel>
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant={"outline"}
                        className={cn(
                          "w-full text-left font-normal",
                          !field.value && "text-muted-foreground"
                        )}
                      >
                        {field.value ? (
                          format(field.value, "PPP")
                        ) : (
                          <span>Pick a date</span>
                        )}
                        <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={field.value}
                      onSelect={field.onChange}
                      disabled={date =>
                        date > new Date() || date < new Date("1900-01-01")
                      }
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
                <FormDescription>
                  The date when this transaction was made.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="col-span-2 flex justify-center pt-5">
            <Button type="submit" className="w-full max-w-32 ">
              Submit
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default FinancialForm;
