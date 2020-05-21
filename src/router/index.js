import Vue from "vue";
import VueRouter from "vue-router";
Vue.use(VueRouter);
const routes = [
  {
    path: "/",
    redirect: "Login"
  },
  {
    path: "/login",
    name: "Login",
    component: () => import("../views/Login/index.vue")
  },
  {
    path: "/home",
    name: "Home",
    component: () => import("../views/Layout/index.vue")
  }
];

const router = new VueRouter({
  routes
});

export default router;
