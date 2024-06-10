import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../redux/store/store";
import { addIncome, fetchIncomes } from "@/redux/slices/incomesSlice";

interface Income {
  id: string;
  description: string;
  value: number;
  category: string;
  type: string;
  createdAt: Date;
}

interface AddIncomesRequest {
  description: string;
  value: number;
  category: string;
}

const useIncomes = () => {
  const incomes: Income[] = useSelector(
    (state: RootState) => state.incomes.incomes
  );
  const dispatch = useDispatch<AppDispatch>();

  const fetchIncomesData = () => {
    dispatch(fetchIncomes());
  };

  const addIncomeData = (incomeData: AddIncomesRequest) => {
    dispatch(addIncome(incomeData));
  };

  return { incomes, fetchIncomesData, addIncomeData };
};

export default useIncomes;
