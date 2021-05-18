import axios from "../../plugins/axios";

export default {
  state: {
    show: false,
    editable: false,
    transfer: false,
    loading: false,
    loadingTransfer: false,
    cs: []
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
    TOGGLE_LOADING_TRANSFER(state: { loadingTransfer: boolean }) {
      state.loadingTransfer = !state.loadingTransfer;
    },
    TOGGLE_TRANSFER(state: { transfer: boolean }) {
      state.transfer = !state.transfer;
    },
    SET_CS(state: { cs: [] }, payload: []) {
      state.cs = payload;
    }
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
            throw result.message;
          }
          commit("CHANGE_CURRENT_CHAT_KATEGORI", payload.kategori_id);
        })
        .catch(e => {
          console.error(e);
          commit("SET_SNACKBAR", { showing: true, text: e });
        });
    },
    TRANSFER_CHAT({ commit }: any, payload: { cs_id: string; number: string; keterangan: string }) {
      commit("TOGGLE_LOADING_TRANSFER");
      const formData = new FormData();
      formData.append('cs_id', payload.cs_id);
      formData.append('number', payload.number);
      formData.append('keterangan', payload.keterangan);
      axios.post("cs/cs_transfer", formData)
        .then(response => response.data)
        .then(result => {
          if (!result.status) {
            throw result.message;
          }
          commit("SET_SNACKBAR", { showing: true, text: result.message });
          commit("TOGGLE_TRANSFER");
          commit("TOGGLE_LOADING_TRANSFER");
        })
        .catch(e => {
          console.error(e);
          commit("SET_SNACKBAR", { showing: true, text: e });
          commit("TOGGLE_TRANSFER");
          commit("TOGGLE_LOADING_TRANSFER");
        });
    },
    SET_CS({ commit }: any) {
      axios('cs/cs_list')
        .then(response => response.data)
        .then(result => {
          if (!result.status) {
            throw "Gagal mendapatkan CS.";
          }
          commit("SET_CS", result.data);
        })
        .catch(e => {
          console.error(e);
          commit("SET_SNACKBAR", { showing: true, text: e });
        });
    }
  },
};
