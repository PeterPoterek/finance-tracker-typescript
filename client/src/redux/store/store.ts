import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../slices/userSlice";
import authReducer from "../slices/authSlice";
import expensesReducer from "../slices/expensesSlice";
import incomesReducer from "../slices/incomesSlice";

const rootReducer = {
  user: userReducer,
  auth: authReducer,
  expenses: expensesReducer,
  incomes: incomesReducer,
};

export const store = configureStore({
  reducer: rootReducer,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
