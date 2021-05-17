<template>
  <div class="chat__body" ref="container">
    <div v-if="$store.state.chat.loadingChat" class="d-flex justify-center">
      <v-progress-circular color="primary" indeterminate />
    </div>
    <div v-else>
      <div
        class="first__time_chat"
        v-if="$store.state.chat.chatMessages.length === 0"
      >
        <p>
          You have no conversation with
          {{ $store.state.chat.currentChat.name }}. Initiate the conversation by
          sending a message.
        </p>
      </div>
      <div
        v-for="(message, index) in $store.state.chat.chatMessages"
        :key="index"
        :class="{
          chat__message: true,
          chat__sender: message.fromMe,
          chat__reciever: !message.fromMe,
        }"
      >
        <p class="chat__content">
          <Media v-if="message.type == 'media'" :message-id="message.id" />
          {{ message.body }}
        </p>
        <span class="chat__timestamp">
          {{ getTime(message.timestamp) }}
          <Ack v-if="message.fromMe" :ack="message.ack" />
        </span>
      </div>
    </div>
  </div>
</template>

<script>
import Ack from "@/components/Chat/Ack";
import Media from "@/components/Chat/Media";
import dateHelpers from "@/helpers/date_helpers";

export default {
  components: {
    Ack,
    Media,
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
    ...dateHelpers,
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
  background-image: url("https://github-production-user-asset-6210df.s3.amazonaws.com/15075759/28719144-86dc0f70-73b1-11e7-911d-60d70fcded21.png");
  background-position: center;
  background-repeat: repeat;
  padding: 30px;
  padding-bottom: 0;
  overflow: auto;
  position: relative;
}

.chat__message {
  position: relative;
  font-size: 16px;
  padding: 10px;
  border-radius: 10px;
  background-color: #ffffff;
  min-width: 70px;
  width: fit-content;
  margin-bottom: 30px;
  white-space: pre-line;
}

.chat__message .chat__content {
  margin-bottom: 0.75rem;
}

.chat__sender:after {
  content: "";
  position: absolute;
  margin-top: -6px;
  margin-left: -5px;
  border-left: 12px solid transparent;
  border-right: 12px solid transparent;
  border-bottom: 12px solid #dcf8c6 !important;
  transform: rotate(-42deg);
  right: -10px;
  top: 4px;
}

.chat__reciever:after {
  content: "";
  position: absolute;
  margin-top: -6px;
  margin-left: -5px;
  border-left: 12px solid transparent;
  border-right: 12px solid transparent;
  border-bottom: 12px solid #ffffff !important;
  transform: rotate(42deg);
  left: -6px;
  top: 4px;
}

.chat__sender {
  margin-left: auto;
  background-color: #dcf8c6;
}

.chat__timestamp {
  margin-left: 10px;
  font-size: xx-small;
  position: absolute;
  right: 0;
  bottom: 0;
  padding: 0.25rem 0.3rem;
  opacity: 0.7;
}
</style>