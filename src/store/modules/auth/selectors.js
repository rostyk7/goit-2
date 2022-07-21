export const getAccessToken = state => state.auth.accessToken;

export const getRefreshToken = state => state.auth.refreshToken;

export const getProfile = state => state.auth.profile;

export const getProfileLoading = state => state.auth.isProfileLoading;

export const isAuthenticated = state => state.auth.accessToken;

export const getLoginError = state => state.auth.loginError;