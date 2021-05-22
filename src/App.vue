<template>
  <div>
    <router-view></router-view>
  </div>
</template>

<script lang="ts">
import Vue from "vue";

const token = "66650bb33e295bc5d621351e6ed53d3a";

export default Vue.extend({
  name: "App",
  created() {
    this.sockets.subscribe(token, (data) => {
      if (this.$store.state.chat.currentChat.number == data.number) {
        const newMessage = {
          id: data.message_id,
          fromMe: false,
          body: data.message,
          ack: "2",
          type: data.media ? "media" : "chat",
          timestamp: new Date().getTime(),
        };
        this.$store.commit("UPDATE_CHAT_MESSAGES", newMessage);
      }
      this.$store.dispatch("SET_ACTIVE_CHAT_USERS");
      this.$store.dispatch("SET_PENDING_CHAT_USERS");
    });
  },
});
</script>

<style >
input:focus,
textarea:focus,
select:focus {
  outline: none;
}
</style>
