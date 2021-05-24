import axios from "../../plugins/axios";

export default {
  state: {
    show: false,
    loading: false,
    data: {}
  },
  mutations: {
    TOGGLE_ORDER(state: { show: boolean; data: any }, payload: any) {
      state.show = !state.show;
      state.data = payload;
    },
  },
  actions: {
    SUBMIT_ORDER({ commit, state }: any) {
      state.loading = true;
      axios.post('cs/orderform', state.data)
        .then(response => response.data)
        .then(result => {
          if (!result.status) throw result.message
          commit("SET_SNACKBAR", { showing: true, text: result.message });
          state.loading = false;
        })
        .catch(e => {
          console.error(e);
          commit("SET_SNACKBAR", { showing: true, text: e });
          state.loading = false;
        });
    },
  },
};
