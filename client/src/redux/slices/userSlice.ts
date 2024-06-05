import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';

const apiUrl = import.meta.env.VITE_API_URL;

interface UserState {
  user: {
    username: string;
    email: string;
    avatarURL: string;
  } | null;
  isLoggedIn: boolean;
  loading: boolean;
  error: string | null;
}

const initialState: UserState = {
  user: null,
  isLoggedIn: false,
  loading: false,
  error: null,
};

export const registerUser = createAsyncThunk(
  'user/register',
  async (
    userData: { username: string; email: string; password: string },
    { rejectWithValue }
  ) => {
    try {
      const response = await axios.post(
        `${apiUrl}/auth/api/register`,
        userData
      );
      return response.data;
    } catch (error: any) {
      if (error.response && error.response.data) {
        return rejectWithValue(error.response.data);
      } else {
        return rejectWithValue({ error: 'Network Error' });
      }
    }
  }
);

export const loginUser = createAsyncThunk(
  'user/login',
  async (
    userData: { email: string; password: string },
    { rejectWithValue }
  ) => {
    try {
      const response = await axios.post(`${apiUrl}/auth/api/login`, userData);
      return response.data;
    } catch (error: any) {
      if (error.response && error.response.data) {
        return rejectWithValue(error.response.data);
      } else {
        return rejectWithValue({ error: 'Network Error' });
      }
    }
  }
);

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    logoutUser: state => {
      state.user = null;
      state.isLoggedIn = false;
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
            user: { username: string; email: string; avatarURL: string };
          }>
        ) => {
          state.loading = false;
          state.user = action.payload.user;
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
            user: { username: string; email: string; avatarURL: string };
          }>
        ) => {
          state.loading = false;
          state.user = action.payload.user;
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

export const { logoutUser } = userSlice.actions;
export default userSlice.reducer;
