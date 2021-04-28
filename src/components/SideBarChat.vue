<template>
  <div
    class="sidebar__chat"
    @click="getCurrentChat(user)"
    v-if="user.number !== $store.state.user.currentUser.number"
  >
    <v-avatar icon><v-img :src="user.profile"></v-img></v-avatar>
    <div class="sidebar__chat_info">
      <h2>{{ user.name }}</h2>
      <p class="mb-0">{{ user.last_chat }}</p>
    </div>
  </div>
</template>

<script>
export default {
  name: "SideBarChat",
  props: ["user"],
  methods: {
    async getCurrentChat(user) {
      this.$store.dispatch("SET_CURRENT_CHAT", user);
      this.$store.dispatch("SET_CHAT_MESSAGES", user.number);
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
}

.sidebar__chat_info {
  margin-left: 15px;
}
</style>