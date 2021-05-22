// import firebase from "firebase";
import { ShortUser } from "@/models/short_user";
import { Chat } from "@/models/chat";
import axios from "../../plugins/axios";
import { FullscrenMedia } from "@/models/fullscreen_media";

export default {
  state: {
    activeChatUsers: [],
    pendingChatUsers: [],
    chatMessages: [],
    currentChat: null,
    currentNumber: null,
    loadingChat: false,
    fullscreenMedia: {},
    autoText: []
  },
  mutations: {
    SET_ACTIVE_CHAT_USERS(state: { activeChatUsers: [] }, payload: []) {
      state.activeChatUsers = payload.reverse() as any;
    },
    SET_PENDING_CHAT_USERS(state: { pendingChatUsers: [] }, payload: []) {
      state.pendingChatUsers = payload.reverse() as any;
    },
    SET_CURRENT_CHAT(state: { currentChat: ShortUser; activeChatUsers: []; pendingChatUsers: [] }, payload: ShortUser) {
      state.currentChat = payload;
      const activeUser = state.activeChatUsers.find(function (user: any) {
        return user.id == payload.id;
      }) as any;
      if (activeUser) activeUser.unread = '0';
      const pendingUser = state.pendingChatUsers.find(function (user: any) {
        return user.id == payload.id;
      }) as any;
      if (pendingUser) pendingUser.unread = '0';
    },
    SET_CHAT_MESSAGES(
      state: { chatMessages: []; currentNumber: string },
      payload: { chatMessages: []; currentNumber: string }
    ) {
      state.chatMessages = payload.chatMessages;
      state.currentNumber = payload.currentNumber;
    },
    UPDATE_CHAT_MESSAGES(state: { chatMessages: any }, payload: Chat) {
      state.chatMessages = [
        ...state.chatMessages,
        payload
      ];
    },
    REMOVE_CHAT_MESSAGES(state: { chatMessages: any }, payload: string) {
      state.chatMessages = state.chatMessages.filter(function (chat: Chat) {
        return chat.id != payload;
      });
    },
    UPDATE_ACK_MESSAGE(state: { chatMessages: any }, payload: string) {
      const targetIndex = state.chatMessages.findIndex(function (item: Chat) {
        return item.id == payload;
      });
      state.chatMessages[targetIndex].ack = "2";
    },
    SET_LOADING(state: { loadingChat: boolean }) {
      state.loadingChat = true;
    },
    STOP_LOADING(state: { loadingChat: boolean }) {
      state.loadingChat = false;
    },
    SET_FULLSCREEN_MEDIA(state: { fullscreenMedia: any }, payload: FullscrenMedia) {
      state.fullscreenMedia = payload;
    },
    REMOVE_PENDING_CHAT(state: { pendingChatUsers: any }, payload: ShortUser) {
      state.pendingChatUsers = state.pendingChatUsers.filter(function (user: ShortUser) {
        return user.id != payload.id;
      });
    },
    APPEND_ACTIVE_CHAT(state: { activeChatUsers: any }, payload: ShortUser) {
      state.activeChatUsers = [
        payload,
        ...state.activeChatUsers,
      ];
    },
    REMOVE_ACTIVE_CHAT(state: { activeChatUsers: any }, payload: ShortUser) {
      state.activeChatUsers = state.activeChatUsers.filter(function (user: ShortUser) {
        return user.id != payload.id;
      });
    },
    SET_AUTO_TEXT(state: { autoText: [] }, payload: []) {
      state.autoText = payload;
    },
    REMOVE_AUTO_TEXT(state: { autoText: [] }) {
      state.autoText = [];
    },
    CHANGE_CURRENT_CHAT_NAME(state: { currentChat: any }, payload: string) {
      state.currentChat.name = payload;
    },
    CHANGE_CURRENT_CHAT_KATEGORI(state: { currentChat: any }, payload: string) {
      state.currentChat['kategori_id'] = payload;
    },
  },
  actions: {
    SET_ACTIVE_CHAT_USERS({ commit }: any) {
      axios("cs/chat_list?status=active")
        .then(response => response.data.data)
        .then(result => {
          commit("SET_ACTIVE_CHAT_USERS", result);
        })
        .catch(e => console.error(e));
    },
    SET_PENDING_CHAT_USERS({ commit }: any) {
      axios("cs/chat_list?status=pending")
        .then(response => response.data.data)
        .then(result => {
          commit("SET_PENDING_CHAT_USERS", result);
        })
        .catch(e => console.error(e));
    },
    SET_CURRENT_CHAT({ commit }: any, payload: ShortUser) {
      payload.note = [];
      commit("SET_CURRENT_CHAT", payload);
      axios("cs/note", { params: { number: payload.number } })
        .then(response => response.data)
        .then(result => {
          if (!result.status) {
            throw "Gagal mendapatkan catatan";
          }
          if (result.data.every(function (item: any) {
            return item != null && item != 'null'
          })) {
            payload.note = result.data;
          }
          commit("SET_CURRENT_CHAT", payload);
        })
        .catch(e => {
          console.error(e);
        })
      commit("CLOSE_PROFILE");
    },
    SET_CHAT_MESSAGES({ commit }: any, payload: string) {
      commit("SET_LOADING");
      axios("cs/chat_detail", {
        params: {
          number: payload
        }
      }).then(response => response.data.data)
        .then(result => {
          commit("STOP_LOADING");
          commit("SET_CHAT_MESSAGES", {
            chatMessages: result,
            currentNumber: payload
          })
        })
        .catch(e => {
          commit("STOP_LOADING");
          console.error(e);
        })
    },
    SEND_CHAT_MESSAGE({ commit }: any, payload: { message: Chat; number: string; file: File }) {
      const formData = new FormData();
      formData.append('number', payload.number);
      formData.append('text', payload.message.body);
      if (payload.file) formData.append('file', payload.file);
      axios.post("cs/send", formData)
        .then(response => response.data)
        .then(result => {
          if (result.status) {
            commit("UPDATE_ACK_MESSAGE", payload.message.id);
          } else {
            throw result.msg;
          }
        }).catch(e => {
          commit("REMOVE_CHAT_MESSAGES", payload.message.id);
          commit("SET_SNACKBAR", { showing: true, text: e });
          console.error(e);
        });
      commit("UPDATE_CHAT_MESSAGES", payload.message);
    },
    SET_FULLSCREEN_MEDIA({ commit }: any, payload: FullscrenMedia) {
      commit("SET_FULLSCREEN_MEDIA", payload)
    },
    ACCEPT_CHAT({ commit }: any, payload: ShortUser) {
      const formData = new FormData();
      formData.append('id', payload.id);
      axios.post("cs/terima", formData)
        .then(response => response.data)
        .then(result => {
          if (result.status) {
            commit("REMOVE_PENDING_CHAT", payload);
            commit("APPEND_ACTIVE_CHAT", payload);
          } else {
            throw result.message;
          }
        })
        .catch(e => commit("SET_SNACKBAR", { showing: true, text: e }));
    },
    END_CHAT({ commit }: any, payload: ShortUser) {
      const formData = new FormData();
      formData.append('id', payload.id);
      axios.post("cs/selesai", formData)
        .then(response => response.data)
        .then(result => {
          if (result.status) {
            commit("REMOVE_ACTIVE_CHAT", payload);
            commit("SET_CURRENT_CHAT", null);
          } else {
            throw result.message;
          }
        })
        .catch(e => commit("SET_SNACKBAR", { showing: true, text: e }));
    },
    SET_AUTO_TEXT({ commit }: any, payload: string) {
      return new Promise((resolve, reject) => {
        axios("cs/autotext", { params: { q: payload } })
          .then(response => response.data.data)
          .then(result => {
            commit("SET_AUTO_TEXT", result);
            resolve(true);
          })
          .catch(e => {
            console.error(e);
            reject(e);
          })
      })
    },
  },
};
