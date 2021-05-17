export default {
  state: {
    show: false,
  },
  mutations: {
    TOGGLE_ONGKIR(state: { show: boolean }) {
      state.show = !state.show;
    }
  },
  actions: {
    TOGGLE_ONGKIR({ commit }: any) {
      commit("TOGGLE_ONGKIR");
    },
  },
};
