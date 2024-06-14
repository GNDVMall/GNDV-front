// store.js
import { reactive, provide, inject } from 'vue';

export const store = reactive({
  user: {
    memberId: null,
    email: null
  },
  accessToken: null,
  refreshToken: localStorage.getItem('refreshToken') || null // Load refresh token from localStorage
});

export const setUser = (user) => {
  store.user = user;
};

export const setAccessToken = (token) => {
  store.accessToken = token;
};

export const setRefreshToken = (token) => {
  store.refreshToken = token;
  localStorage.setItem('refreshToken', token); // Save to localStorage
};

export const logout = () => {
  store.user = { memberId: null, email: null };
  store.accessToken = null;
  store.refreshToken = null;
  localStorage.removeItem('refreshToken'); // Clear from localStorage
};

export const provideStore = () => {
  provide('store', store);
};

export const useStore = () => {
  return inject('store');
};
