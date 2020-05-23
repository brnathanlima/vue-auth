import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";
import router from "../router/index.js";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    signUpUrl:
      "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=" +
      process.env.VUE_APP_API_KEY,
    signInUrl:
      "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=" +
      process.env.VUE_APP_API_KEY,
    idToken: null,
    userId: null,
    user: null,
  },

  getters: {
    user(state) {
      return state.user;
    },

    isAuthenticated(state) {
      return state.idToken !== null;
    },
  },

  mutations: {
    authUser(state, userData) {
      state.idToken = userData.token;
      state.userId = userData.userId;
    },

    clearData(state) {
      state.idToken = null;
      state.userId = null;
    }
  },

  actions: {
    signup({ state, commit }, authData) {
      axios
        .post(state.signUpUrl, {
          email: authData.email,
          password: authData.password,
          returnSecureToken: true,
        })
        .then((res) => {
          console.log(res);
          localStorage.setItem("idToken", res.data.idToken);
          localStorage.setItem("userId", res.data.userId);
          commit("authUser", {
            token: res.data.idToken,
            userId: res.data.userId,
          });
          router.push("/dashboard");
        })
        .catch((error) => console.log(error));
    },

    login({ state, commit }, authData) {
      axios
        .post(state.signInUrl, {
          email: authData.email,
          password: authData.password,
          returnSecureToken: true,
        })
        .then((res) => {
          console.log(res);
          commit("authUser", {
            token: res.data.idToken,
            userId: res.data.localId,
          });
          localStorage.setItem("token", res.data.idToken);
          localStorage.setItem("userId", res.data.localId);
          router.push("/dashboard");
        })
        .catch((error) => console.log(error));
    },

    logout({commit}) {
      localStorage.removeItem("idToken");
      localStorage.removeItem("userId");
      commit("clearData");

      router.push("/")
    }
  },

  modules: {},
});
