import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../redux/store/store";
import { fetchIncomes } from "@/redux/slices/incomesSlice";

const useIncomes = () => {
  const incomes = useSelector((state: RootState) => state.incomes.incomes);
  const dispatch = useDispatch<AppDispatch>();

  const fetchIncomesData = () => {
    dispatch(fetchIncomes());
  };

  return { incomes, fetchIncomesData };
};

export default useIncomes;
