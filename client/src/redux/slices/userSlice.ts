import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { axiosInstance, axiosPrivateInstance } from "../../lib/axiosInstance";
import {
  setLoggedIn,
  setAccessToken,
  setLoading,
} from "@/redux/slices/authSlice";
import { RootState } from "../store/store";

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
  async (userData: LoginUserData, { rejectWithValue, dispatch }) => {
    dispatch(setLoading(true));
    try {
      const response = await axiosInstance.post("/api/auth/login", userData);
      dispatch(setAccessToken(response.data.accessToken));
      dispatch(setLoggedIn());
      return response.data;
    } catch (error: any) {
      if (error.response && error.response.data) {
        return rejectWithValue(error.response.data);
      } else {
        return rejectWithValue({ error: "Network Error" });
      }
    } finally {
      dispatch(setLoading(false));
    }
  }
);
export const getCurrentUser = createAsyncThunk(
  "user/getCurrentUser",
  async (_, { getState, rejectWithValue }) => {
    try {
      const state = getState() as RootState;
      const accessToken = state.auth.accessToken;

      if (!accessToken) {
        throw new Error("No access token found");
      }

      const response = await axiosPrivateInstance.get("/api/user/", {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

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
      })
      .addCase(
        getCurrentUser.fulfilled,
        (state, action: PayloadAction<UserState>) => {
          const { _id, username, email, avatarURL } = action.payload;
          state._id = _id;
          state.username = username;
          state.email = email;
          state.avatarURL = avatarURL;
          state.error = null;
        }
      )
      .addCase(getCurrentUser.rejected, (state, action: PayloadAction<any>) => {
        state.error = action.payload.error;
      });
  },
});

export const { setUserError } = userSlice.actions;
export default userSlice.reducer;
