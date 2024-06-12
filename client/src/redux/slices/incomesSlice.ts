import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { axiosPrivateInstance } from "../../lib/axiosInstance";
import { RootState } from "../store/store";

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

interface IncomesState {
  incomes: Income[];
  loading: boolean;
  error: string | null;
}

const initialIncomesState: IncomesState = {
  incomes: [],
  loading: false,
  error: null,
};

export const fetchIncomes = createAsyncThunk(
  "incomes/fetchIncomes",
  async (_, { getState, rejectWithValue }) => {
    try {
      const state = getState() as RootState;
      const accessToken = state.auth.accessToken;

      if (!accessToken) {
        throw new Error("No access token available");
      }

      const response = await axiosPrivateInstance.get("/api/incomes/", {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      return response.data.incomes;
    } catch (error: any) {
      console.error("Error fetching incomes:", error);
      if (error.response && error.response.data) {
        console.error(error.response);

        return rejectWithValue(error.response.data);
      } else {
        return rejectWithValue({ error: "Network Error" });
      }
    }
  }
);

export const addIncome = createAsyncThunk(
  "incomes/addIncome",
  async (incomeData: AddIncomeRequest, { getState, rejectWithValue }) => {
    try {
      const state = getState() as RootState;
      const accessToken = state.auth.accessToken;

      if (!accessToken) {
        throw new Error("No access token available");
      }

      const response = await axiosPrivateInstance.post(
        "/api/incomes/",
        incomeData,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      return response.data.income;
    } catch (error: any) {
      console.error("Error adding income:", error);
      if (error.response && error.response.data) {
        console.error(error.response);

        return rejectWithValue(error.response.data);
      } else {
        return rejectWithValue({ error: "Network Error" });
      }
    }
  }
);

export const getIncomeById = createAsyncThunk(
  "incomes/getIncomeById",
  async (id: string, { getState, rejectWithValue }) => {
    try {
      const state = getState() as RootState;
      const accessToken = state.auth.accessToken;

      if (!accessToken) {
        throw new Error("No access token available");
      }

      const response = await axiosPrivateInstance.get(`/api/incomes/${id}`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      return response.data.income;
    } catch (error: any) {
      console.error("Error fetching income:", error);
      if (error.response && error.response.data) {
        console.error(error.response);

        return rejectWithValue(error.response.data);
      } else {
        return rejectWithValue({ error: "Network Error" });
      }
    }
  }
);

export const updateIncome = createAsyncThunk(
  "incomes/updateIncome",
  async (incomeData: UpdateIncomeRequest, { getState, rejectWithValue }) => {
    try {
      const state = getState() as RootState;
      const accessToken = state.auth.accessToken;

      if (!accessToken) {
        throw new Error("No access token available");
      }

      const response = await axiosPrivateInstance.put(
        `/api/incomes/${incomeData.id}`,
        incomeData,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      return response.data.income;
    } catch (error: any) {
      console.error("Error updating income:", error);
      if (error.response && error.response.data) {
        console.error(error.response);

        return rejectWithValue(error.response.data);
      } else {
        return rejectWithValue({ error: "Network Error" });
      }
    }
  }
);

export const deleteIncome = createAsyncThunk(
  "incomes/deleteIncome",
  async (id: string, { getState, rejectWithValue }) => {
    try {
      const state = getState() as RootState;
      const accessToken = state.auth.accessToken;

      if (!accessToken) {
        throw new Error("No access token available");
      }

      await axiosPrivateInstance.delete(`/api/incomes/${id}`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      return id;
    } catch (error: any) {
      console.error("Error deleting income:", error);
      if (error.response && error.response.data) {
        console.error(error.response);

        return rejectWithValue(error.response.data);
      } else {
        return rejectWithValue({ error: "Network Error" });
      }
    }
  }
);

const incomesSlice = createSlice({
  name: "incomes",
  initialState: initialIncomesState,
  reducers: {
    clearIncomes: state => {
      state.incomes = [];
      state.error = null;
      state.loading = false;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(fetchIncomes.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        fetchIncomes.fulfilled,
        (state, action: PayloadAction<Income[]>) => {
          state.loading = false;
          state.incomes = action.payload;
          state.error = null;
        }
      )
      .addCase(fetchIncomes.rejected, (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.error = action.payload.error;
      })
      .addCase(addIncome.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addIncome.fulfilled, (state, action: PayloadAction<Income>) => {
        state.loading = false;
        state.incomes.push(action.payload);
        state.error = null;
      })
      .addCase(addIncome.rejected, (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.error = action.payload.error;
      })
      .addCase(getIncomeById.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        getIncomeById.fulfilled,
        (state, action: PayloadAction<Income>) => {
          state.loading = false;
          const index = state.incomes.findIndex(
            inc => inc.id === action.payload.id
          );
          if (index !== -1) {
            state.incomes[index] = action.payload;
          } else {
            state.incomes.push(action.payload);
          }
          state.error = null;
        }
      )
      .addCase(getIncomeById.rejected, (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.error = action.payload.error;
      })
      .addCase(updateIncome.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        updateIncome.fulfilled,
        (state, action: PayloadAction<Income>) => {
          state.loading = false;
          const index = state.incomes.findIndex(
            inc => inc.id === action.payload.id
          );
          if (index !== -1) {
            state.incomes[index] = action.payload;
          }
          state.error = null;
        }
      )
      .addCase(updateIncome.rejected, (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.error = action.payload.error;
      })
      .addCase(deleteIncome.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        deleteIncome.fulfilled,
        (state, action: PayloadAction<string>) => {
          state.loading = false;
          state.incomes = state.incomes.filter(
            inc => inc.id !== action.payload
          );
          state.error = null;
        }
      )
      .addCase(deleteIncome.rejected, (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.error = action.payload.error;
      });
  },
});

export const { clearIncomes } = incomesSlice.actions;
export default incomesSlice.reducer;
