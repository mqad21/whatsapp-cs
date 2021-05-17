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
    <v-tabs
      class="fixed-tabs-bar"
      v-model="tab"
      background-color="white"
      color="basil"
      grow
    >
      <v-tab v-for="status in statuses" :key="status.title">
        <v-badge
          color="success"
          v-if="status.users.length"
          :content="status.users.length"
          inline
          >{{ status.title }}</v-badge
        >
        <span v-else>{{ status.title }}</span>
      </v-tab>
    </v-tabs>
    <v-tabs-items class="sidebar__chats__container" v-model="tab">
      <div class="sidebar__chats">
        <v-tab-item v-for="status in statuses" :key="status.title">
          <template v-if="status.users.length">
            <SideBarChat
              v-for="(user, index) in status.users"
              :key="index"
              :user="user"
              :pending="status.title == 'Pending'"
            />
          </template>
          <template v-else>
            <SideBarChat no-chat />
          </template>
        </v-tab-item>
      </div>
    </v-tabs-items>
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
    ...mapState({
      currentUser: (state) => state.user.currentUser,
      category: (state) => state.category.category,
    }),
    statuses() {
      return [
        {
          title: "Aktif",
          users: this.$store.state.chat.activeChatUsers.filter((item) => {
            if (this.category && this.category != "0") {
              return item.kategori_id == this.category;
            }
            return item;
          }),
        },
        {
          title: "Pending",
          users: this.$store.state.chat.pendingChatUsers.filter((item) => {
            if (this.category && this.category != "0") {
              return item.kategori_id == this.category;
            }
            return item;
          }),
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
  min-width: 360px;
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

.sidebar__chats__container {
  overflow: auto;
  height: calc(100% - 128px);
  overflow: auto;
}

.sidebar__chats {
  flex: 1;
  background-color: white;
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
  z-index: 2;
}

.dropdown:hover .dropdown-content {
  display: block;
}

.dropdown-content > p {
  cursor: pointer;
}
</style>