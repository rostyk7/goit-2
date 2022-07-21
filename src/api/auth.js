import axios from 'axios';
import { getAccessToken, getRefreshToken } from '../store/modules/auth/selectors';
import { setNewCredentials } from '../store/modules/auth/slice';

const api = axios.create({
  baseURL: 'http://localhost:3000/api'
});

let store;

export function setStore(appStore) {
  store = appStore;
}

api.interceptors.request.use(config => {
  const acessToken = getAccessToken(store.getState());
  config.headers['Authorization'] = acessToken;
  return config;
});

api.interceptors.response.use(response => response, async error => {
  if (error.response.status === 401 && (
    error.response.config.url !== '/refresh_token' && error.response.config.url !== '/login' && error.response.config.url !== '/create_user')
  ) {
    const tokenToRefresh = getRefreshToken(store.getState());
    const { data } = await refreshToken(tokenToRefresh);
    store.dispatch(setNewCredentials({
      accessToken: data.accessToken,
      refreshToken: data.refreshToken
    }));
    error.response.config.headers = {
      ...error.response.config.headers,
      'Authorization': data.accessToken
    }
    return axios(error.response.config);
  }
  return Promise.reject(error);
});

export const createUser = form => api.post('/create_user', form);

export const login = form => api.post('/login', form);

export const refreshToken = (refreshToken) => api.post('/refresh_token', { refreshToken });

export const getProfile = () => api.get('/profile');

export const logout = () => api.post('/logout');