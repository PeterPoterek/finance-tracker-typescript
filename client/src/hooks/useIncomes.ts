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
  const dispatch = useDispatch<AppDispatch>();
  const incomes: Income[] = useSelector(
    (state: RootState) => state.incomes.incomes
  );

  const fetchIncomesData = () => {
    dispatch(fetchIncomes());
  };

  const addIncomeData = async (incomeData: AddIncomeRequest) => {
    await dispatch(addIncome(incomeData));
    fetchIncomesData();
  };

  const updateIncomeData = async (
    id: string,
    updatedIncomeData: Partial<UpdateIncomeRequest>
  ) => {
    await dispatch(updateIncome({ id, ...updatedIncomeData }));
    fetchIncomesData();
  };

  const deleteIncomeData = async (id: string) => {
    try {
      await dispatch(deleteIncome(id));
      fetchIncomesData();
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
