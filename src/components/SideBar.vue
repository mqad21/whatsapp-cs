<template>
  <div class="sidebar">
    <div class="sidebar__header">
      <v-list-item>
        <v-list-item-avatar class="mr-3">
          <v-img src="https://thispersondoesnotexist.com/image" />
        </v-list-item-avatar>

        <v-list-item-content>
          <v-list-item-title>John Doe</v-list-item-title>
          <v-list-item-subtitle>Admin 1</v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>
      <div class="sidebar__header_right">
        <div class="dropdown">
          <v-btn icon><v-icon>mdi-dots-vertical</v-icon></v-btn>
          <div class="dropdown-content">
            <p class="mb-0" @click="logout">Logout</p>
          </div>
        </div>
      </div>
    </div>
    <!-- <div class="sidebar__search">
      <div class="sidebar__search_container">
        <v-btn icon><v-icon>mdi-magnify</v-icon></v-btn>
        <input type="text" placeholder="Search or start a new chat" />
      </div>
    </div> -->
    <div class="sidebar__chats">
      <v-tabs v-model="tab" background-color="transparent" color="basil" grow>
        <v-tab v-for="status in statuses" :key="status.title">
          <v-badge
            color="success"
            v-if="status.count"
            :content="status.count"
            inline
            >{{ status.title }}</v-badge
          >
          <span v-else>{{ status.title }}</span>
        </v-tab>
      </v-tabs>

      <v-tabs-items v-model="tab">
        <v-tab-item v-for="status in statuses" :key="status.title">
          <SideBarChat
            v-for="(user, index) in status.users"
            :key="index"
            :user="user"
          />
        </v-tab-item>
      </v-tabs-items>
    </div>
  </div>
</template>

<script>
import SideBarChat from "./SideBarChat.vue";
import { mapState } from "vuex";

export default {
  name: "SideBar",
  components: {
    SideBarChat,
  },
  data() {
    return {
      tab: 0,
    };
  },
  computed: {
    ...mapState({ currentUser: (state) => state.user.currentUser }),
    statuses() {
      return [
        {
          title: "Aktif",
          count: this.$store.state.chat.activeChatUsers.length,
          users: this.$store.state.chat.activeChatUsers,
        },
        {
          title: "Pending",
          count: this.$store.state.chat.pendingChatUsers.length,
          users: this.$store.state.chat.pendingChatUsers,
        },
      ];
    },
  },
  methods: {
    logout() {
      this.$store.dispatch("LOGOUT");
    },
  },
};
</script>

<style scoped>
.sidebar {
  flex: 0.35;
}

.sidebar__header {
  display: flex;
  justify-content: space-between;
  padding: 10px 20px;
  border-right: 1px solid #fff;
  height: 80px;
}

.sidebar__header_right {
  display: flex;
  align-items: center;
  justify-content: end;
}

.sidebar__search {
  display: flex;
  align-items: center;
  background-color: #f6f6f6 !important;
  height: 39px;
  padding: 10px;
}

.sidebar__search_container {
  display: flex;
  align-items: center;
  background-color: white;
  width: 100%;
  height: 35px;
  border-radius: 20px;
}

.sidebar__search_container > input {
  border: none;
  margin-left: 10px;
}

.sidebar__chats {
  flex: 1;
  overflow-y: auto;
  background-color: white;
  height: calc(100% - 139px);
}

.dropdown {
  position: relative;
  display: inline-block;
}

.dropdown-content {
  display: none;
  position: absolute;
  background-color: #f9f9f9;
  min-width: 100px;
  box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);
  padding: 12px 16px;
  z-index: 1;
}

.dropdown:hover .dropdown-content {
  display: block;
}

.dropdown-content > p {
  cursor: pointer;
}
</style>