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
    meta: {
      title: "控制台",
      icon: "console"
    },
    component: () => import("../views/Layout/index.vue")
  },
  {
    path: "/news",
    name: "News",
    meta: {
      title: "信息管理",
      icon: "news"
    },
    component: () => import("../views/Layout/index.vue")
  },
  {
    path: "/user",
    name: "User",
    meta: {
      title: "用户管理",
      icon: "user"
    },
    component: () => import("../views/Layout/index.vue")
  }
];

const router = new VueRouter({
  routes
});

export default router;
