import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../slices/userSlice";
import authReducer from "../slices/authSlice";
import expensesReducer from "../slices/expensesSlice";
import incomesReducer from "../slices/incomesSlice";
import categoriesReducer from "../slices/categoriesSlice";

const rootReducer = {
  user: userReducer,
  auth: authReducer,
  expenses: expensesReducer,
  incomes: incomesReducer,
  categories: categoriesReducer,
};

export const store = configureStore({
  reducer: rootReducer,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
