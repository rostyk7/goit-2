import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { createUser, login, getProfile, logout } from "../../../api/auth";

export const createUserThunk = createAsyncThunk('create_user', async (form) => {
  const { data } = await createUser(form);
  return true;
});

export const loginThunk = createAsyncThunk('login', async (form) => {
  const { data } = await login(form);
  return data;
});

export const getProfileThunk = createAsyncThunk('profile', async (_, store) => {
  const { data } = await getProfile();
  return data;
});

export const logoutThunk = createAsyncThunk('logout', async () => {
  await logout();
});

const initialState = {
  isLoginLoading: false,
  accessToken: null,
  refreshToken: null,
  profile: null,
  isProfileLoading: false
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setNewCredentials(state, { payload }) {
      state.accessToken = payload.accessToken;
      state.refreshToken = payload.refreshToken;
    }
  },
  extraReducers: builder => {
    builder
      .addCase(loginThunk.pending, (state) => {
        state.isLoginLoading = true;
      })
      .addCase(loginThunk.fulfilled, (state, { payload }) => {
        state.accessToken = payload.accessToken;
        state.refreshToken = payload.refreshToken;
        state.isLoginLoading = false;
        state.loginError = null;
      })
      .addCase(loginThunk.rejected, (state, action) => {
        state.loginError = action.error.message === 'Request failed with status code 401' ? 'Invalid username or password' : 'Something went wrong!';
        state.isLoginLoading = false;
      })
      .addCase(getProfileThunk.pending, (state) => {
        state.isProfileLoading = true;
      })
      .addCase(getProfileThunk.fulfilled, (state, { payload }) => {
        state.profile = payload;
        state.isProfileLoading = false;
        state.error = null;
      })
      .addCase(getProfileThunk.rejected, (state, { payload }) => {
        state.isProfileLoading = false;
      })
      .addCase(logoutThunk.fulfilled, (state) => {
        state.accessToken = null;
        state.refreshToken = null;
      });
  }
});

export const { setNewCredentials } = authSlice.actions;

export default authSlice.reducer;
