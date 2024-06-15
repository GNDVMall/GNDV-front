// store.js
import { reactive, provide, inject } from 'vue';

export const store = reactive({
  user: {
    memberId: null,
    email: null
  },
  accessToken: null,
  refreshToken: localStorage.getItem('refreshToken') || null,
  selectedThemes: []
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

export const setCheckedThemes = (themes)=>{
  store.selectedThemes = themes
}

export const addCheckedThemes = (theme_id) => {
  store.selectedThemes = [...store.selectedThemes, theme_id]
  return store.selectedThemes
}

export const deleteCheckedThemes = (theme_id) => {
  const idx = store.selectedThemes.findIndex(id => Number(id) === Number(theme_id))
  if(idx !== -1)  store.selectedThemes.splice(idx, 1)
    return store.selectedThemes
}

export const logout = () => {
  store.user = { memberId: null, email: null };
  store.accessToken = null;
  store.refreshToken = null;
  localStorage.removeItem('refreshToken');
};

export const provideStore = () => {
  provide('store', store);
};

export const useStore = () => {
  return inject('store');
};
export const isAuthenticated = () => !!store.accessToken;