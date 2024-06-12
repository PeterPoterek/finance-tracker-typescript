import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../redux/store/store";
import {
  addExpense,
  fetchExpenses,
  updateExpense,
  deleteExpense,
} from "@/redux/slices/expensesSlice";

interface Expense {
  id: string;
  description: string;
  value: number;
  category: string;
  type: string;
  createdAt: Date;
}

interface AddExpenseRequest {
  description: string;
  value: number;
  category: string;
}

const useExpenses = () => {
  const expenses: Expense[] = useSelector(
    (state: RootState) => state.expenses.expenses
  );
  const dispatch = useDispatch<AppDispatch>();

  const fetchExpensesData = () => {
    dispatch(fetchExpenses());
  };

  const addExpenseData = (expenseData: AddExpenseRequest) => {
    dispatch(addExpense(expenseData));
  };

  const updateExpenseData = (
    id: string,
    updatedExpenseData: Partial<AddExpenseRequest>
  ) => {
    dispatch(updateExpense({ id, updatedExpenseData }));
  };

  const deleteExpenseData = async (id: string) => {
    try {
      await dispatch(deleteExpense(id));
    } catch (error) {
      console.error("Error deleting expense:", error);
    }
  };

  return {
    expenses,
    fetchExpensesData,
    addExpenseData,
    updateExpenseData,
    deleteExpenseData,
  };
};

export default useExpenses;
