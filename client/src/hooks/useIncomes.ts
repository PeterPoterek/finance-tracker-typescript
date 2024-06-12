import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../redux/store/store";
import {
  addIncome,
  fetchIncomes,
  updateIncome,
  deleteIncome,
} from "@/redux/slices/incomesSlice";

interface Income {
  id: string;
  description: string;
  value: number;
  category: string;
  type: string;
  createdAt: Date;
}

interface AddIncomeRequest {
  description: string;
  value: number;
  category: string;
}

interface UpdateIncomeRequest {
  id: string;
  description?: string;
  value?: number;
  category?: string;
}

const useIncomes = () => {
  const incomes: Income[] = useSelector(
    (state: RootState) => state.incomes.incomes
  );
  const dispatch = useDispatch<AppDispatch>();

  const fetchIncomesData = () => {
    dispatch(fetchIncomes());
  };

  const addIncomeData = (incomeData: AddIncomeRequest) => {
    dispatch(addIncome(incomeData));
  };

  const updateIncomeData = (
    id: string,
    updatedIncomeData: Partial<UpdateIncomeRequest>
  ) => {
    dispatch(updateIncome({ id, ...updatedIncomeData }));
  };

  const deleteIncomeData = async (id: string) => {
    try {
      await dispatch(deleteIncome(id));
    } catch (error) {
      console.error("Error deleting income:", error);
    }
  };

  return {
    incomes,
    fetchIncomesData,
    addIncomeData,
    updateIncomeData,
    deleteIncomeData,
  };
};

export default useIncomes;
