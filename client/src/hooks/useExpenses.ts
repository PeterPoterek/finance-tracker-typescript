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
  const dispatch: AppDispatch = useDispatch();
  const expenses: Expense[] = useSelector(
    (state: RootState) => state.expenses.expenses
  );

  const fetchExpensesData = () => {
    dispatch(fetchExpenses());
  };

  const addExpenseData = async (expenseData: AddExpenseRequest) => {
    await dispatch(addExpense(expenseData));
    fetchExpensesData();
  };

  const updateExpenseData = async (
    id: string,
    updatedExpenseData: Partial<AddExpenseRequest>
  ) => {
    await dispatch(updateExpense({ id, updatedExpenseData }));
    fetchExpensesData();
  };

  const deleteExpenseData = async (id: string) => {
    try {
      await dispatch(deleteExpense(id));
      fetchExpensesData();
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
