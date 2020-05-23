import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
// svgIcon
import "./icon";
// 导入elementui
import "./plugins/elementui";
// 导入Composition API模块
import "./plugins/compositionApi";
Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
