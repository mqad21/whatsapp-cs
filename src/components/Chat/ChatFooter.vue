<template>
  <div class="chat__footer">
    <emoji-picker @emoji="append" :search="search">
      <v-btn
        icon
        class="emoji-invoker"
        slot="emoji-invoker"
        slot-scope="{ events: { click: clickEvent } }"
        @click.stop="clickEvent"
        ><v-icon>mdi-emoticon-happy-outline</v-icon></v-btn
      >

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
                  >{{ emoji }}</span
                >
              </div>
            </div>
          </div>
        </div>
      </div>
    </emoji-picker>
    <v-form @submit.prevent="submit">
      <v-textarea
        class="ma-2"
        hide-details
        rows="1"
        placeholder="Masukkan pesan"
        v-model="message"
        solo
        flat
        auto-grow
      >
      </v-textarea>
      <v-btn class="mr-2 my-auto" icon @click="submit">
        <v-icon>mdi-send</v-icon>
      </v-btn>
    </v-form>
  </div>
</template>

<script>
import EmojiPicker from "vue-emoji-picker";

export default {
  components: {
    EmojiPicker,
  },
  data: () => ({
    message: "",
  }),
  methods: {
    append(emoji) {
      this.message += emoji;
    },
    submit() {
      if (this.message === null || this.message === " ") {
        return;
      }
      const now = new Date();
      let hours = now.getHours();
      let minutes = now.getMinutes();
      const ampm = hours >= 12 ? "pm" : "am";
      hours = hours % 12;
      hours = hours ? hours : 12; // the hour '0' should be '12'
      minutes = minutes < 10 ? "0" + minutes : minutes;
      const strTime = hours + ":" + minutes + " " + ampm;
      const chat = {
        id: +new Date(),
        date: now.toISOString().substr(0, 10),
        time: strTime,
        timestamp: +new Date(),
        message: this.message,
        senderId: this.$store.state.user.currentUser.uid,
        receiverId: this.$store.state.chat.currentChat.uid,
      };
      this.$store.dispatch("UPDATE_CHAT_MESSAGES", {
        chat: chat,
        id: this.$store.state.chat.conversationId,
      });
      this.message = "";
    },
  },
  directives: {
    focus: {
      inserted(el) {
        el.focus();
      },
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