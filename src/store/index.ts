import Vue from "vue";
import Vuex from "vuex";
import user from "./modules/user";
import snackbar from "./modules/snackbar";
import chat from "./modules/chat";
import ongkir from "./modules/ongkir";
import category from "./modules/category";
import profile from "./modules/profile";
import order from "./modules/order";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {},
  mutations: {},
  actions: {},
  modules: {
    user,
    snackbar,
    chat,
    ongkir,
    category,
    profile,
    order
  },
});
