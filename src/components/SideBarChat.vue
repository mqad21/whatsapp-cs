<template>
  <div class="sidebar__chat" @click="getCurrentChat(user)" v-if="!noChat">
    <v-row>
      <v-col cols="auto">
        <v-avatar icon><v-img :src="user.profile"></v-img></v-avatar>
      </v-col>
      <v-col :cols="pending ? 6 : 8" class="pl-0 sidebar__chat_info">
        <v-row justify="space-between">
          <v-col>
            <h2>{{ user.name }}</h2>
            <p class="mb-0 text-truncate">
              {{ user.last_chat }}
            </p>
          </v-col>
        </v-row>
      </v-col>
      <v-col cols="auto">
        <v-row>
          <v-col cols="auto">
            <v-btn
              v-if="pending"
              @click.stop="$store.dispatch('ACCEPT_CHAT', user)"
              small
              color="primary"
            >
              Terima
            </v-btn>
          </v-col>
        </v-row>
        <v-row>
          <v-col>
            <v-badge v-if="user.unread != 0" color="success" inline :content="user.unread"></v-badge>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
  </div>
  <div v-else>
    <p class="text-center pa-4 mt-4 font-italic">Tidak ada chat</p>
  </div>
</template>

<script>
export default {
  name: "SideBarChat",
  props: {
    user: Object,
    pending: {
      type: Boolean,
      default: false,
    },
    noChat: {
      type: Boolean,
      default: false,
    },
  },
  methods: {
    async getCurrentChat(user) {
      this.$store.dispatch("SET_CURRENT_CHAT", user);
      this.$store.dispatch("SET_CHAT_MESSAGES", {
        number: user.number,
        withLoading: true,
      });
    },
  },
};
</script>

<style scoped>
.sidebar__chat {
  display: flex;
  padding: 15px 20px;
  cursor: pointer;
  border-bottom: 1px solid #f6f6f6;
  width: 100%;
}

.timestamp {
  opacity: 0.7;
}

.sidebar__chat:hover {
  background-color: #ebebeb;
}

.sidebar__chat_info h2 {
  font-size: 16px;
  margin-bottom: 8px;
  width: 100%;
}

.sidebar__chat_info {
  margin-left: 15px;
}

.w-100 {
  max-width: 100%;
}
</style>