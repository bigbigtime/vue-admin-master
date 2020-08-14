import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
// 守卫路由
import "./router/permit";
// svgIcon
import "./icon";
// 导入elementui
import "./plugins/elementui";
// 导入Composition API模块
import "./plugins/compositionApi";
// 全局方法
import globalUI from "@/utils/globalUI";
Vue.use(globalUI);
Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
