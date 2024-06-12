import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { axiosPrivateInstance } from "../../lib/axiosInstance";
import { RootState } from "../store/store";

interface Expense {
  id: string;
  description: string;
  value: number;
  category: string;
  type: string;
  createdAt: Date;
}

interface AddExpenseRequest {
  description: string;
  value: number;
  category: string;
}

interface ExpensesState {
  expenses: Expense[];
  loading: boolean;
  error: string | null;
}

const initialExpensesState: ExpensesState = {
  expenses: [],
  loading: false,
  error: null,
};

export const fetchExpenses = createAsyncThunk(
  "expenses/fetchExpenses",
  async (_, { getState, rejectWithValue }) => {
    try {
      const state = getState() as RootState;
      const accessToken = state.auth.accessToken;

      if (!accessToken) {
        throw new Error("No access token available");
      }

      const response = await axiosPrivateInstance.get("/api/expenses/", {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      return response.data.expenses;
    } catch (error: any) {
      console.error("Error fetching expenses:", error);
      if (error.response && error.response.data) {
        console.error(error.response);

        return rejectWithValue(error.response.data);
      } else {
        return rejectWithValue({ error: "Network Error" });
      }
    }
  }
);

export const addExpense = createAsyncThunk(
  "expenses/addExpense",
  async (expenseData: AddExpenseRequest, { getState, rejectWithValue }) => {
    try {
      const state = getState() as RootState;
      const accessToken = state.auth.accessToken;

      if (!accessToken) {
        throw new Error("No access token available");
      }

      const response = await axiosPrivateInstance.post(
        "/api/expenses/",
        expenseData,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      return response.data.expense;
    } catch (error: any) {
      console.error("Error adding expense:", error);
      if (error.response && error.response.data) {
        console.error(error.response);

        return rejectWithValue(error.response.data);
      } else {
        return rejectWithValue({ error: "Network Error" });
      }
    }
  }
);

export const updateExpense = createAsyncThunk(
  "expenses/updateExpense",
  async (
    {
      id,
      updatedExpenseData,
    }: { id: string; updatedExpenseData: Partial<AddExpenseRequest> },
    { getState, rejectWithValue }
  ) => {
    try {
      const state = getState() as RootState;
      const accessToken = state.auth.accessToken;

      if (!accessToken) {
        throw new Error("No access token available");
      }

      const response = await axiosPrivateInstance.put(
        `/api/expenses/${id}`,
        updatedExpenseData,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      return response.data.expense;
    } catch (error: any) {
      console.error("Error updating expense:", error);
      if (error.response && error.response.data) {
        return rejectWithValue(error.response.data);
      } else {
        return rejectWithValue({ error: "Network Error" });
      }
    }
  }
);

export const deleteExpense = createAsyncThunk(
  "expenses/deleteExpense",
  async (id: string, { getState, rejectWithValue }) => {
    try {
      const state = getState() as RootState;
      const accessToken = state.auth.accessToken;

      if (!accessToken) {
        throw new Error("No access token available");
      }

      await axiosPrivateInstance.delete(`/api/expenses/${id}`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      return id;
    } catch (error: any) {
      console.error("Error deleting expense:", error);
      if (error.response && error.response.data) {
        return rejectWithValue(error.response.data);
      } else {
        return rejectWithValue({ error: "Network Error" });
      }
    }
  }
);

const expensesSlice = createSlice({
  name: "expenses",
  initialState: initialExpensesState,
  reducers: {
    clearExpenses: state => {
      state.expenses = [];
      state.error = null;
      state.loading = false;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(fetchExpenses.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        fetchExpenses.fulfilled,
        (state, action: PayloadAction<Expense[]>) => {
          state.loading = false;
          state.expenses = action.payload;
          state.error = null;
        }
      )
      .addCase(fetchExpenses.rejected, (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.error = action.payload.error;
      })
      .addCase(updateExpense.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        updateExpense.fulfilled,
        (state, action: PayloadAction<Expense>) => {
          state.loading = false;
          const updatedExpenseIndex = state.expenses.findIndex(
            expense => expense.id === action.payload.id
          );
          if (updatedExpenseIndex !== -1) {
            state.expenses[updatedExpenseIndex] = action.payload;
          }
          state.error = null;
        }
      )
      .addCase(updateExpense.rejected, (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.error = action.payload.error;
      })
      .addCase(deleteExpense.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        deleteExpense.fulfilled,
        (state, action: PayloadAction<string>) => {
          state.loading = false;
          const deletedExpenseId = action.payload;
          state.expenses = state.expenses.filter(
            expense => expense.id !== deletedExpenseId
          );
          state.error = null;
        }
      )
      .addCase(deleteExpense.rejected, (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.error = action.payload.error;
      });
  },
});

export const { clearExpenses } = expensesSlice.actions;
export default expensesSlice.reducer;
