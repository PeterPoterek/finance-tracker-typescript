import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axiosInstance from "../../lib/axiosInstance";

interface AuthState {
  isLoggedIn: boolean;
  loading: boolean;
  accessToken: string | null;
}

const initialAuthState: AuthState = {
  isLoggedIn: false,
  loading: false,
  accessToken: null,
};

export const refreshAccessToken = createAsyncThunk(
  "auth/refreshToken",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get("/api/auth/refresh");
      const { accessToken } = response.data;
      console.log(response.data);

      return accessToken;
    } catch (error: any) {
      console.error("Error refreshing access token:", error);
      return rejectWithValue({ error: "Failed to refresh access token" });
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState: initialAuthState,
  reducers: {
    setLoggedIn: state => {
      state.isLoggedIn = true;
    },
    setLoggedOut: state => {
      state.isLoggedIn = false;
      state.accessToken = null;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(
        refreshAccessToken.fulfilled,
        (state, action: PayloadAction<string | null>) => {
          state.accessToken = action.payload;
        }
      )
      .addCase(refreshAccessToken.rejected, state => {
        state.accessToken = null;
      });
  },
});

export const { setLoggedIn, setLoggedOut } = authSlice.actions;
export default authSlice.reducer;
