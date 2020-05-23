import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import store from "../store/index"

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/signin",
    name: "SignIn",
    component: () =>
      import(/* webpackChunkName: "SignIn" */ "../views/SignIn.vue"),
  },
  {
    path: "/signup",
    name: "SignUp",
    component: () =>
      import(/* webpackChunkName: "SignUp" */ "../views/SignUp.vue"),
  },
  {
    path: "/dashboard",
    name: "Dashboard",
    component: () => import(/* webpackChunkName: "Dashboard" */ "../views/Dashboard.vue"),
    beforeEnter: (to, from, next) => {
      if(store.state.idToken) {
        next();
      } else {
        next("/signin")
      }
    }
  }
];

const router = new VueRouter({
  mode: "history",
  routes,
});

export default router;
