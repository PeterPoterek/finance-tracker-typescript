import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { axiosPrivateInstance } from "../../lib/axiosInstance";
import { RootState } from "../store/store";

interface Income {
  id: string;
  description: string;
  value: number;
  category: string;
  type: string;
  createdAt: string;
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
      });
  },
});

export const { clearIncomes } = incomesSlice.actions;
export default incomesSlice.reducer;
