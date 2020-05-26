import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";
import router from "../router/index.js";
import SecureLS from "secure-ls";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    singInUrl: process.env.VUE_APP_SIGN_IN_URL,
    idToken: null,
    user: null,
    permissions: null,
  },

  getters: {
    user(state) {
      return state.user;
    },

    isAuthenticated(state) {
      return state.idToken !== null;
    },
  },

  actions: {
    async login({ state, commit }, authData) {
      var ls = new SecureLS();

      await axios
        .post(state.singInUrl, {
          email: authData.email,
          password: authData.password,
          headers: {
            Accept: "*/*",
            "Content-Type": "application/json",
          },
        })
        .then((res) => {
          console.log(res);

          commit("authUser", {
            token: res.data,
          });

          ls.set("token", res.data);

          router.push("/dashboard");
        })
        .catch((error) => console.log(error));

      axios
        .get("http://localhost:8000/api/me", {
          headers: {
            Authorization: `Bearer ${state.idToken}`,
            Accept: "*/*",
            "Content-Type": "application/json",
          },
        })
        .then((res) => {
          console.log(res);

          commit("setUserAndPermissions", {
            user: res.data.user,
            permissions: res.data.permissions,
          });

          ls.set("user", JSON.stringify(res.data.user));
          ls.set("permissions", JSON.stringify(res.data.permissions));
        })
        .catch((error) => {
          console.log(error);
        });
    },

    logout({ commit }) {
      var ls = new SecureLS();
      ls.removeAll();

      commit("clearData");

      router.push("/");
    },

    autoLogin({ commit }) {
      const token = localStorage.getItem("token");
      if (!token) {
        return;
      }

      commit("authUser", {
        token: token,
      });

      router.push("/dashboard");
    },
  },

  mutations: {
    authUser(state, userData) {
      state.idToken = userData.token;
    },

    setUserAndPermissions(state, userAndPermissionsData) {
      state.user = userAndPermissionsData.user;
      state.permissoios = userAndPermissionsData.permissions;
    },

    clearData(state) {
      state.idToken = null;
      state.user = null;
      state.permissions = null;
    },
  },

  modules: {},
});
