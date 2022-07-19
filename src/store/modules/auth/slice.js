import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { createUser, login, getProfile, refreshToken } from "../../../api/auth";
import { getAccessToken, getRefreshToken} from './selectors';

export const createUserThunk = createAsyncThunk('create_user', async (form) => {
  const { data } = await createUser(form);
  return true;
});

export const loginThunk = createAsyncThunk('login', async (form) => {
  const { data } = await login(form);
  return data;
});

export const getProfileThunk = createAsyncThunk('profile', async (_, store) => {
  const token = getAccessToken(store.getState());
  let response;
  try {
    const { data } = await getProfile(token);
    response = data;
  } catch(e) {
    if (e.response.status === 401) {
      const tokenToRefresh = getRefreshToken(store.getState());
      const { data } = await refreshToken(token, tokenToRefresh);
      store.dispatch(setNewCredentials({
        accessToken: data.accessToken,
        refreshToken: data.refreshToken
      }));
      store.dispatch(getProfileThunk());
    }
  }
  return response;
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
        state.error = null;
      })
      .addCase(loginThunk.rejected, (state, { payload }) => {
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
  }
});

const { setNewCredentials } = authSlice.actions;

export default authSlice.reducer;
