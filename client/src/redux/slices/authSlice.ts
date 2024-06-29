import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { axiosInstance, axiosPrivateInstance } from "../../lib/axiosInstance";
import { RootState } from "../store/store";
import { clearExpenses } from "./expensesSlice";
import { clearIncomes } from "./incomesSlice";

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

export const getRefreshAccessToken = createAsyncThunk(
  "auth/refreshToken",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosPrivateInstance.get("/api/refresh");
      const { accessToken } = response.data;
      return accessToken;
    } catch (error: any) {
      console.log(error.request.status, "error.request.status");

      if (error.request.status === 403 || error.request.status === 401) {
        const response = await axiosPrivateInstance.get("/api/refresh");
        const { accessToken } = response.data;
        return accessToken;
      }

      console.error("Error refreshing access token:", error);
      return rejectWithValue({ error: "Failed to refresh access token" });
    }
  }
);

export const logoutUser = createAsyncThunk(
  "auth/logout",
  async (_, { getState, dispatch, rejectWithValue }) => {
    try {
      const state = getState() as RootState;
      const accessToken = state.auth.accessToken;

      if (!accessToken) {
        throw new Error("No access token available for logout");
      }

      const response = await axiosInstance.post("/api/auth/logout", null, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      dispatch(clearExpenses());
      dispatch(clearIncomes());

      return response.data;
    } catch (error: any) {
      if (error.response && error.response.data) {
        return rejectWithValue(error.response.data);
      } else {
        return rejectWithValue({ error: "Network Error" });
      }
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
    setAccessToken: (state, action: PayloadAction<string>) => {
      state.accessToken = action.payload;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(
        getRefreshAccessToken.fulfilled,
        (state, action: PayloadAction<string | null>) => {
          state.accessToken = action.payload;
        }
      )
      .addCase(getRefreshAccessToken.rejected, state => {
        state.accessToken = null;
        state.isLoggedIn = false;
      })
      .addCase(logoutUser.fulfilled, state => {
        state.isLoggedIn = false;
        state.accessToken = null;
      });
  },
});

export const { setLoggedIn, setLoggedOut, setAccessToken, setLoading } =
  authSlice.actions;
export default authSlice.reducer;
