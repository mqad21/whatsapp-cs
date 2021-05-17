import axios from "../../plugins/axios";

export default {
  state: {
    show: false,
    editable: false,
    loading: false,
  },
  mutations: {
    TOGGLE_PROFILE(state: { show: boolean }) {
      state.show = !state.show;
    },
    CLOSE_PROFILE(state: { show: boolean }) {
      state.show = false;
    },
    TOGGLE_EDITABLE(state: { editable: boolean }) {
      state.editable = !state.editable;
    },
    TOGGLE_LOADING(state: { loading: boolean }) {
      state.loading = !state.loading;
    },
    // SET_CATEGORIES(state: { categories: [] }, payload: []) {
    //   state.categories = payload;
    // },
  },
  actions: {
    CHANGE_NAME({ commit }: any, payload: { name: string; number: string }) {
      const formData = new FormData();
      formData.append('name', payload.name);
      formData.append('number', payload.number);
      commit("TOGGLE_LOADING");
      axios.post('cs/change_name', formData)
        .then(response => response.data)
        .then(result => {
          if (!result.status) {
            throw "Gagal mengubah nama.";
          }
          commit("TOGGLE_LOADING");
          commit("TOGGLE_EDITABLE");
          commit("CHANGE_CURRENT_CHAT_NAME", payload.name);
        })
        .catch(e => {
          console.error(e);
          commit("TOGGLE_LOADING");
          commit("SET_SNACKBAR", { showing: true, text: e });
        });
    },
    ASSIGN_KATEGORI({ commit }: any, payload: { kategori_id: string; number: string }) {
      const formData = new FormData();
      formData.append('kategori_id', payload.kategori_id);
      formData.append('number', payload.number);
      axios.post('cs/assign_kategori', formData)
        .then(response => response.data)
        .then(result => {
          if (!result.status) {
            throw "Gagal mengubah kategori.";
          }
          commit("CHANGE_CURRENT_CHAT_KATEGORI", payload.kategori_id);
        })
        .catch(e => {
          console.error(e);
          commit("SET_SNACKBAR", { showing: true, text: e });
        });
    },
  },
};
