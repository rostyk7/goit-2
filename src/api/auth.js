import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3000/api'
});


export const createUser = form => api.post('/create_user', form);

export const login = form => api.post('/login', form);

export const refreshToken = (token, refreshToken) => api.post('/refresh_token', { refreshToken }, {
  headers: {
    'Authorization': token
  }
});

export const getProfile = token => api.get('/profile', {
  headers: {
    'Authorization': token
  }
});