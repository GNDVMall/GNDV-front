// store.js
import { createStore } from 'vuex';

export default createStore({
  state: {
    user: {
      memberId: null,
      // other user info
    }
  },
  mutations: {
    setUser(state, user) {
      state.user = user;
    }
  },
  actions: {
    fetchUser({ commit }) {
      // Fetch user info from API and commit the mutation
    }
  },
  getters: {
    user: state => state.user
  }
});
