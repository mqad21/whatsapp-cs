<template>
  <NoChat v-if="currentChat === null" />
  <div class="chat" v-else>
    <ChatHeader :current-chat="currentChat" />
    <ChatBody />
    <ChatFooter :current-chat="currentChat" />
  </div>
</template>

<script>
import { mapState } from "vuex";
import NoChat from "@/components/Chat/NoChat";
import ChatHeader from "@/components/Chat/ChatHeader";
import ChatBody from "@/components/Chat/ChatBody";
import ChatFooter from "@/components/Chat/ChatFooter";

export default {
  name: "Chat",
  components: {
    NoChat,
    ChatHeader,
    ChatBody,
    ChatFooter,
  },
  computed: {
    ...mapState({ currentChat: (state) => state.chat.currentChat }),
  },
};
</script>

<style scoped>
.chat {
  flex: 0.65;
  display: flex;
  flex-direction: column;
}
</style>
