import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/redux/store/store";
import { fetchCategories } from "@/redux/slices/categoriesSlice";

const useCategories = () => {
  const dispatch: AppDispatch = useDispatch();
  const { expenseCategories, incomeCategories } = useSelector(
    (state: RootState) => state.categories
  );

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  return { expenseCategories, incomeCategories };
};

export default useCategories;
