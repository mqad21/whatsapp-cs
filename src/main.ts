import Vue from "vue";
import App from "./App.vue";
import "./registerServiceWorker";
import router from "./router";
import store from "./store";
import vuetify from "./plugins/vuetify";
import axios from "./plugins/axios";
import axiosRo from "./plugins/axios_ro";
import socketIo from "./plugins/socket_io";

Vue.config.productionTip = false;

Vue.prototype.$axios = axios;
Vue.prototype.$socketIo = axiosRo;
Vue.use(socketIo);

new Vue({
  router,
  store,
  vuetify,
  render: (h) => h(App),
}).$mount("#app");
