<template>
  <v-row
    class="my-10"
    align="end"
    @mouseover="show(true)"
    @mouseleave="show(false)"
  >
    <v-col :cols="!message.fromMe ? 'auto' : ''" class="pa-0">
      <div
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
    </v-col>
    <v-col cols="auto" class="px-4 py-0" v-if="showAction">
      <v-btn @click="showDialog" x-small color="primary" outlined>
        Input Order
      </v-btn>
    </v-col>
  </v-row>
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
  props: ["message"],
  data() {
    return {
      showAction: false,
      label: ["nama", "alamat", "produk"],
    };
  },
  computed: {
    form() {
      const form = {};
      const textLine = this.message.body.split(/\r?\n/);
      textLine.forEach((text) => {
        const data = this.getData(text);
        if (data) {
          form[data[0]] = data[1];
        }
      });
      return form;
    },
  },
  methods: {
    ...dateHelpers,
    show(value) {
      if (!this.message.fromMe) {
        this.showAction = value;
      }
    },
    showDialog() {
      this.$store.commit("TOGGLE_ORDER", this.form);
    },
    getData(text) {
      if (!text.includes(":")) return null;
      const label = text.substr(0, text.indexOf(":")).trim();
      const value = text.substr(text.indexOf(":") + 1).trim();
      return [label, value];
    },
  },
};
</script>

<style>
.chat__message {
  position: relative;
  font-size: 16px;
  padding: 10px;
  border-radius: 10px;
  background-color: #ffffff;
  min-width: 70px;
  width: fit-content;
  max-width: 30rem;
  /* max-width: 80%; */
  white-space: pre-line;
  word-wrap: break-word;
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