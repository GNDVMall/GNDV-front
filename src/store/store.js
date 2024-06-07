import { reactive } from 'vue';

export const store = reactive({
  user: {
    memberId: null,
    // other user info
  },
  token: null
});

export const setUser = (user) => {
  store.user = user;
};

export const setToken = (token) => {
  store.token = token;
};
