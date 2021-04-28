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
  },
  mutations: {
    SET_ACTIVE_CHAT_USERS(state: { activeChatUsers: [] }, payload: []) {
      state.activeChatUsers = payload;
    },
    SET_PENDING_CHAT_USERS(state: { pendingChatUsers: [] }, payload: []) {
      state.pendingChatUsers = payload;
    },
    SET_CURRENT_CHAT(state: { currentChat: ShortUser }, payload: ShortUser) {
      state.currentChat = payload;
    },
    SET_CHAT_MESSAGES(
      state: { chatMessages: []; currentNumber: string },
      payload: { chatMessages: []; currentNumber: string }
    ) {
      state.chatMessages = payload.chatMessages;
      state.currentNumber = payload.currentNumber;
    },
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    UPDATE_CHAT_MESSAGES(state: { chatMessages: any }, payload: Chat) {
      state.chatMessages = [];
      state.chatMessages = payload;
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
          console.log(result)
          commit("SET_PENDING_CHAT_USERS", result);
        })
        .catch(e => console.error(e));
    },
    SET_CURRENT_CHAT({ commit }: any, payload: ShortUser) {
      commit("SET_CURRENT_CHAT", payload);
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
          console.log(result);
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
    UPDATE_CHAT_MESSAGES({ commit }: any, payload: { chat: Chat; id: string }) {
      // firebase
      //   .firestore()
      //   .collection("chats")
      //   .doc(payload.id)
      //   .collection("messages")
      //   .add(payload.chat);
      // commit("UPDATE_CHAT_MESSAGES", payload.chat);
    },
    SET_FULLSCREEN_MEDIA({ commit }: any, payload: FullscrenMedia) {
      commit("SET_FULLSCREEN_MEDIA", payload)
    }
  },
};
