import axios from "../../plugins/axios";

export default {
  state: {
    category: 0,
    categories: [],
    show: false,
  },
  mutations: {
    SET_CATEGORIES(state: { categories: [] }, payload: []) {
      state.categories = payload;
    },
    TOGGLE_CATEGORY(state: { show: boolean }) {
      state.show = !state.show;
    }
  },
  actions: {
    SET_CATEGORIES({ commit }: any) {
      axios('cs/kategori')
        .then(response => response.data.data)
        .then(result => {
          result = result.map(function (item: any) {
            return {
              ...item,
              id: item.id.toString(),
            }
          });
          commit("SET_CATEGORIES", result);
        })
        .catch(e => console.error(e));
    },
    ADD_CATEGORY({ commit }: any, payload: string) {
      const formData = new FormData();
      formData.append('name', payload);
      axios.post('cs/kategori', formData)
        .then(response => response.data.data)
        .then(result => {
          commit("SET_CATEGORIES", result);
        })
        .catch(e => console.error(e));
    },
    TOGGLE_CATEGORY({ commit }: any) {
      commit("TOGGLE_CATEGORY");
    },
  },
};
