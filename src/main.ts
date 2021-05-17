import Vue from "vue";
import App from "./App.vue";
import "./registerServiceWorker";
import router from "./router";
import store from "./store";
import vuetify from "./plugins/vuetify";
import axios from "./plugins/axios";
import axiosRo from "./plugins/axios_ro";


Vue.config.productionTip = false;

Vue.prototype.$axios = axios;
Vue.prototype.$axiosRo = axiosRo;

new Vue({
  router,
  store,
  vuetify,
  render: (h) => h(App),
}).$mount("#app");
