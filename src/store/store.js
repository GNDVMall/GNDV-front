import { reactive, provide, inject } from 'vue';

export const store = reactive({
  user: {
    memberId: null,
    email: null
  },
  token: null
});

export const setUser = (user) => {
  store.user = user;
};

export const setToken = (token) => {
  store.token = token;
};

export const provideStore = () => {
  provide('store', store);
};

export const useStore = () => {
  return inject('store');
};
