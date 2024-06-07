import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axiosInstance from "../../lib/axiosInstance";

interface UserState {
  _id: string;
  username: string;
  email: string;
  avatarURL: string;
  isLoggedIn: boolean;
  loading: boolean;
  error: string | null;
}

interface RegisterUserData {
  username: string;
  email: string;
  password: string;
}

interface LoginUserData {
  email: string;
  password: string;
}

const initialState: UserState = {
  _id: "",
  username: "",
  email: "",
  avatarURL: "",
  isLoggedIn: false,
  loading: false,
  error: null,
};

export const registerUser = createAsyncThunk(
  "user/register",
  async (userData: RegisterUserData, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post("/api/auth/register", userData);
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

export const loginUser = createAsyncThunk(
  "user/login",
  async (userData: LoginUserData, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post("/api/auth/login", userData);
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

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    logoutUser: state => {
      return { ...initialState };
    },
    userLoggedIn: state => {
      state.isLoggedIn = true;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(registerUser.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        registerUser.fulfilled,
        (
          state,
          action: PayloadAction<{
            message: string;
            user: UserState;
          }>
        ) => {
          state.loading = false;
          state._id = action.payload.user._id;
          state.username = action.payload.user.username;
          state.email = action.payload.user.email;
          state.avatarURL = action.payload.user.avatarURL;
          state.isLoggedIn = true;
          state.error = null;
        }
      )
      .addCase(registerUser.rejected, (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.error = action.payload.error;
      })
      .addCase(loginUser.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        loginUser.fulfilled,
        (
          state,
          action: PayloadAction<{
            user: UserState;
          }>
        ) => {
          state.loading = false;
          state._id = action.payload.user._id;
          state.username = action.payload.user.username;
          state.email = action.payload.user.email;
          state.avatarURL = action.payload.user.avatarURL;
          state.isLoggedIn = true;
          state.error = null;
        }
      )
      .addCase(loginUser.rejected, (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.error = action.payload.error;
      });
  },
});

export const { logoutUser, userLoggedIn } = userSlice.actions;
export default userSlice.reducer;
