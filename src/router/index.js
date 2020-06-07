import Vue from "vue";
import VueRouter from "vue-router";
import Layout from "../views/Layout"
Vue.use(VueRouter);
const routes = [
  {
    path: "/",
    redirect: "Login",
    hidden: true
  },
  {
    path: "/login",
    name: "Login",
    hidden: true,
    component: () => import("../views/Login/index.vue")
  },
  {
    path: "/home",
    name: "Home",
    meta: {
      title: "控制台",
      icon: "console",
      iconClass: "icon_console"
    },
    component: Layout,
    children: [
      {
        path: "/consoleIndex",
        name: "ConsoleIndex",
        meta: {
          title: "首页"
        },
        component: () => import("../views/Console/index.vue"),
      }
    ]
  },
  {
    path: "/news",
    name: "News",
    meta: {
      title: "信息管理",
      icon: "news"
    },
    component: Layout,
    children: [
      {
        path: "/newsIndex",
        name: "NewsIndex",
        meta: {
          title: "信息列表"
        },
        component: () => import("../views/News/index.vue"),
      },
      {
        path: "/newsCategory",
        name: "NewsCategory",
        meta: {
          title: "信息分类"
        },
        component: () => import("../views/News/category.vue"),
      },
      {
        path: "/newsDetailed",
        name: "NewsDetailed",
        meta: {
          title: "信息详细页"
        },
        component: () => import("../views/News/detailed.vue"),
      }
    ]
  },
  {
    path: "/user",
    name: "User",
    meta: {
      title: "用户管理",
      icon: "user",
    },
    component: Layout,
    children: [
      {
        path: "/userIndex",
        name: "UserIndex",
        meta: {
          title: "用户列表"
        },
        component: () => import("../views/User/index.vue"),
      }
    ]
  }
];

const router = new VueRouter({
  routes
});

export default router;
