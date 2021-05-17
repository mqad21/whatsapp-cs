<template>
  <div class="sidebar__chat" @click="getCurrentChat(user)" v-if="!noChat">
    <v-avatar icon><v-img :src="user.profile"></v-img></v-avatar>
    <div class="sidebar__chat_info">
      <h2>{{ user.name }}</h2>
      <v-row v-if="pending" justify="space-between">
        <v-col>
          <p style="width: 220px" class="mb-0 text-truncate">
            {{ user.last_chat }}
          </p>
        </v-col>
        <v-col>
          <v-btn
            @click.stop="$store.dispatch('ACCEPT_CHAT', user)"
            small
            color="primary"
            >Terima</v-btn
          >
        </v-col>
      </v-row>
      <p v-else style="width: 260px" class="mb-0 text-truncate">
        {{ user.last_chat }}
      </p>
    </div>
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
}

.sidebar__chat:hover {
  background-color: #ebebeb;
}

.sidebar__chat_info > h2 {
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