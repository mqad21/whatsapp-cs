<template>
  <div class="chat__body" ref="container">
    <div v-if="$store.state.chat.loadingChat" class="d-flex justify-center">
      <v-progress-circular color="primary" indeterminate />
    </div>
    <div v-else>
      <div
        class="first__time_chat"
        v-if="$store.state.chat.loadingChat.length === 0"
      >
        <p>
          You have no conversation with
          {{ $store.state.chat.currentChat.name }}. Initiate the conversation by
          sending a message.
        </p>
      </div>
      <chat-message
        v-for="(message, index) in $store.state.chat.chatMessages"
        :key="index"
        :message="message"        
      />
    </div>
  </div>
</template>

<script>
import ChatMessage from "@/components/Chat/ChatMessage";

export default {
  components: {
    ChatMessage
  },
  methods: {
    scrollToEnd() {
      const content = this.$refs.container;
      this.$nextTick(() => {
        this.$vuetify.goTo(content.scrollHeight, {
          container: content,
          duration: 100,
        });
      });
    },
    showAction(message) {
      message.showAction = true;
    },
  },
  watch: {
    "$store.state.chat.chatMessages": function () {
      this.scrollToEnd();
    },
  },
};
</script>

<style>
.first__time_chat {
  padding: 8px;
  text-align: center;
  height: 50px;
  background-color: #fdf3c5;
  border-radius: 10px;
  color: #525252;
}

.chat__body {
  flex: 1;
  background-image: url("~@/assets/images/chat-background.png");
  background-position: center;
  background-repeat: repeat;
  padding: 30px;
  padding-bottom: 0;
  overflow: auto;
  position: relative;
}
</style>