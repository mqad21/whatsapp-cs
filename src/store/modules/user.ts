import { ShortUser } from "@/models/short_user";
import axios from "@/plugins/axios";
import router from "@/router";

export default {
  state: {
    currentUser: null,
    isLoggedIn: false,
    isInvalid: false,
    invalidMessage: ""
  },
  mutations: {
    SET_USER(
      state: { currentUser: ShortUser | null },
      payload: ShortUser | null
    ) {
      state.currentUser = payload;
    },
    SET_LOGGED_IN(state: { isLoggedIn: boolean }, payload: boolean) {
      state.isLoggedIn = payload;
    },
    SET_INVALID(state: { isInvalid: boolean }) {
      state.isInvalid = true;
    },
    SET_INVALID_MESSAGE(state: { invalidMessage: string }, payload: string) {
      state.invalidMessage = payload;
    },
  },
  actions: {
    CHECK_TOKEN({ commit, dispatch }: any) {
      const token = router.currentRoute.query.token || localStorage.getItem('token');
      axios.post("cs/check_token", { token })
        .then(response => response.data)
        .then(result => {
          if (!result.status) {
            throw result.message;
          }
          localStorage.setItem('token', token as string);
          commit("SET_LOGGED_IN", true);
          dispatch("SET_ACTIVE_CHAT_USERS");
          dispatch("SET_PENDING_CHAT_USERS");
          dispatch("SET_CATEGORIES");
          dispatch("SET_CS");
        })
        .catch(e => {
          console.error(e);
          commit("SET_LOGGED_IN", false);
          commit("SET_INVALID");
          commit("SET_INVALID_MESSAGE", e);
        });
    },
  },
};
