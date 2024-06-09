import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../redux/store/store";
import { fetchExpenses } from "@/redux/slices/expensesSlice";

const useExpenses = () => {
  const expenses = useSelector((state: RootState) => state.expenses.expenses);
  const dispatch = useDispatch<AppDispatch>();

  const fetchExpensesData = () => {
    dispatch(fetchExpenses());
  };

  return { expenses, fetchExpensesData };
};

export default useExpenses;
