import Vue from "vue";
import Vuex from "vuex";
Vue.use(Vuex);

import app from "./modules/app";
import news from "./modules/news";
export default new Vuex.Store({
  modules: {
    app,
    news
  }
});
