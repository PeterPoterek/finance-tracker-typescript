import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../redux/store/store";
import { fetchExpenses } from "@/redux/slices/expensesSlice";

interface Expense {
  id: string;
  description: string;
  value: number;
  category: string;
  type: string;
  createdAt: Date;
}

const useExpenses = () => {
  const expenses: Expense[] = useSelector(
    (state: RootState) => state.expenses.expenses
  );
  const dispatch = useDispatch<AppDispatch>();

  const fetchExpensesData = () => {
    dispatch(fetchExpenses());
  };

  return { expenses, fetchExpensesData };
};

export default useExpenses;
