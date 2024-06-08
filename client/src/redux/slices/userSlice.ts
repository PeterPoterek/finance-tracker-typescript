import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axiosInstance from "../../lib/axiosInstance";
import { setLoggedIn } from "@/redux/slices/authSlice";

interface UserState {
  _id: string;
  username: string;
  email: string;
  avatarURL: string;
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
  error: null,
};

export const registerUser = createAsyncThunk(
  "user/register",
  async (userData: RegisterUserData, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post("/api/auth/register", userData);
      console.log(response.data);

      return response.data;
    } catch (error: any) {
      if (error.response && error.response.data) {
        console.error(error.response.data);

        return rejectWithValue(error.response.data);
      } else {
        return rejectWithValue({ error: "Network Error" });
      }
    }
  }
);

export const loginUser = createAsyncThunk(
  "user/login",
  async (userData: LoginUserData, { rejectWithValue, dispatch }) => {
    try {
      dispatch(setLoggedIn());
      const response = await axiosInstance.post("/api/auth/login", userData);
      console.log(response.data);

      return response.data;
    } catch (error: any) {
      if (error.response && error.response.data) {
        console.error(error.response.data);

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
    setUserError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(
        registerUser.fulfilled,
        (
          state,
          action: PayloadAction<{ message: string; user?: UserState }>
        ) => {
          if (action.payload.user) {
            const { _id, username, email, avatarURL } = action.payload.user;
            state._id = _id;
            state.username = username;
            state.email = email;
            state.avatarURL = avatarURL;
            state.error = null;
          }
        }
      )
      .addCase(registerUser.rejected, (state, action: PayloadAction<any>) => {
        state.error = action.payload.error;
      })
      .addCase(
        loginUser.fulfilled,
        (state, action: PayloadAction<{ user: UserState }>) => {
          const { _id, username, email, avatarURL } = action.payload.user;
          state._id = _id;
          state.username = username;
          state.email = email;
          state.avatarURL = avatarURL;
          state.error = null;
        }
      )
      .addCase(loginUser.rejected, (state, action: PayloadAction<any>) => {
        state.error = action.payload.error;
      });
  },
});

export const { setUserError } = userSlice.actions;
export default userSlice.reducer;
