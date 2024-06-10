import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { axiosInstance } from "@/lib/axiosInstance";

interface CategoriesResponse {
  expenseCategories: string[];
  incomeCategories: string[];
}

export const fetchCategories = createAsyncThunk(
  "categories/fetchCategories",
  async () => {
    const response = await axiosInstance.get<CategoriesResponse>(
      "/api/categories/"
    );
    return response.data;
  }
);

interface CategoriesState {
  expenseCategories: string[];
  incomeCategories: string[];
  loading: boolean;
  error: string | null;
}

const initialState: CategoriesState = {
  expenseCategories: [],
  incomeCategories: [],
  loading: false,
  error: null,
};

const categoriesSlice = createSlice({
  name: "categories",
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchCategories.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCategories.fulfilled, (state, action) => {
        state.loading = false;
        state.expenseCategories = action.payload.expenseCategories;
        state.incomeCategories = action.payload.incomeCategories;
        state.error = null;
      })
      .addCase(fetchCategories.rejected, state => {
        state.loading = false;
        state.error = "Failed to fetch categories";
      });
  },
});

export default categoriesSlice.reducer;
