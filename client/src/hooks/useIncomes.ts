import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../redux/store/store";
import { fetchIncomes } from "@/redux/slices/incomesSlice";

interface Income {
  id: string;
  description: string;
  value: number;
  category: string;
  type: string;
  createdAt: Date;
}

const useIncomes = () => {
  const incomes: Income[] = useSelector(
    (state: RootState) => state.incomes.incomes
  );
  const dispatch = useDispatch<AppDispatch>();

  const fetchIncomesData = () => {
    dispatch(fetchIncomes());
  };

  return { incomes, fetchIncomesData };
};

export default useIncomes;
