<template>
  <div>
    <auto-text
      v-if="autoText.length || loadingAutoText"
      :auto-text="autoText"
      v-on:update-message="updateMessage"
      :loading="loadingAutoText"
    />
    <file-container v-if="file" :file="file" v-on:remove-file="removeFile" />
    <div class="chat__footer">
      <emoji-picker @emoji="append" :search="search">
        <v-btn
          icon
          class="emoji-invoker"
          slot="emoji-invoker"
          slot-scope="{ events: { click: clickEvent } }"
          @click.stop="clickEvent"
        >
          <v-icon>mdi-emoticon-happy-outline</v-icon>
        </v-btn>
        <div slot="emoji-picker" slot-scope="{ emojis, insert, display }">
          <div
            class="emoji-picker px-3"
            :style="{ top: '61%', left: display.x + 'px' }"
          >
            <div class="emoji-picker__search">
              <v-text-field
                class="mb-2"
                hide-details
                outlined
                dense
                type="text"
                v-model="search"
                v-focus
              ></v-text-field>
            </div>
            <div>
              <div v-for="(emojiGroup, category) in emojis" :key="category">
                <h5>{{ category }}</h5>
                <div class="emojis">
                  <span
                    v-for="(emoji, emojiName) in emojiGroup"
                    :key="emojiName"
                    @click="insert(emoji)"
                    :title="emojiName"
                  >
                    {{ emoji }}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </emoji-picker>
      <div>
        <v-file-input
          v-model="file"
          hide-input
          hide-details
          class="mt-0 pt-0 px-1"
        />
      </div>
      <ChatInput :submit="submit" v-model="message" />
    </div>
  </div>
</template>

<script>
import EmojiPicker from "vue-emoji-picker";
import ChatInput from "@/components/Chat/ChatInput";
import AutoText from "./AutoText.vue";
import FileContainer from "./FileContainer.vue";
import { mapState } from "vuex";

export default {
  props: ["currentChat"],
  components: {
    EmojiPicker,
    ChatInput,
    AutoText,
    FileContainer,
  },
  data: () => ({
    message: "",
    search: "",
    file: null,
    loadingAutoText: false,
  }),
  computed: {
    ...mapState({ autoText: (state) => state.chat.autoText }),
  },
  methods: {
    append(emoji) {
      this.message += emoji;
    },
    submit() {
      if (this.message === null || this.message === " ") {
        return;
      }
      const newMessage = {
        id: new Date().getTime().toString(),
        fromMe: true,
        body: this.message,
        ack: "0",
        type: this.file ? "media" : "chat",
        timestamp: new Date().getTime(),
      };
      const message = {
        message: newMessage,
        number: this.currentChat.number,
        file: this.file,
      };
      this.$store.dispatch("SEND_CHAT_MESSAGE", message);
      this.message = "";
      this.file = null;
    },
    updateMessage(message) {
      this.message = message;
    },
    removeFile() {
      this.file = "";
    },
  },
  directives: {
    focus: {
      inserted(el) {
        el.focus();
      },
    },
  },
  watch: {
    message(value) {
      if (value.charAt(0) == "/") {
        const query = value.substring(1);
        if (query) {
          this.loadingAutoText = true;
          this.$store.dispatch("SET_AUTO_TEXT", query).then(() => {
            this.loadingAutoText = false;
          });
        } else {
          this.$store.commit("REMOVE_AUTO_TEXT");
        }
      } else {
        this.$store.commit("REMOVE_AUTO_TEXT");
      }
    },
  },
};
</script>

<style>
.chat__footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  min-height: 62px;
  border-top: 1px solid lightgrey;
}

.chat__footer > form {
  flex: 1;
  display: flex;
}

.chat__footer > form > input {
  flex: 1;
  border-radius: 30px;
  padding: 10px;
  border: none;
}

.emoji-invoker {
  width: 1.5rem;
  height: 1.5rem;
  border-radius: 50%;
  cursor: pointer;
  transition: all 0.2s;
}

.emoji-invoker:hover {
  transform: scale(1.1);
}

.emoji-picker {
  position: absolute;
  z-index: 1;
  font-family: Montserrat;
  border: 1px solid #ccc;
  width: 15rem;
  height: 20rem;
  overflow: auto;
  padding-left: 30px;
  box-sizing: border-box;
  border-radius: 0.5rem;
  background: #fff;
  box-shadow: 1px 1px 8px #c7dbe6;
  padding-top: 10px;
}

.emoji-picker__search {
  display: flex;
}

.emoji-picker__search > input {
  flex: 1;
  border-radius: 10rem;
  border: 1px solid #ccc;
  padding: 0.5rem 1rem;
  outline: none;
}

.emoji-picker h5 {
  margin-bottom: 0;
  color: #b1b1b1;
  text-transform: uppercase;
  font-size: 0.8rem;
  cursor: default;
}

.emoji-picker .emojis {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
}

.emoji-picker .emojis:after {
  content: "";
  flex: auto;
}

.emoji-picker .emojis span {
  padding: 0.2rem;
  cursor: pointer;
  border-radius: 5px;
}

.emoji-picker .emojis span:hover {
  background: #ececec;
  cursor: pointer;
}
</style>