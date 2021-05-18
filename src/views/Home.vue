<template>
  <div class="app v-application" data-app>
    <Snackbar />
    <CekOngkir />
    <AddCategory />
    <Header />
    <v-dialog
      max-width="80vw"
      v-model="$store.state.chat.fullscreenMedia.showing"
      transition="dialog-bottom-transition"
    >
      <v-img :src="$store.state.chat.fullscreenMedia.src" />
    </v-dialog>
    <div class="app__body" v-if="isLoggedIn">
      <SideBar />
      <Chat />
      <Profile v-if="$store.state.profile.show" />
    </div>
    <Login v-else />
  </div>
</template>

<script>
import Vue from "vue";
import Header from "@/components/Header.vue";
import SideBar from "@/components/SideBar.vue";
import Profile from "@/components/Profile/Profile.vue";
import CekOngkir from "@/components/CekOngkir/CekOngkir.vue";
import AddCategory from "@/components/Category/AddCategory.vue";
import Chat from "@/components/Chat/Chat.vue";
import Login from "@/components/Auth/SSO.vue";
import { mapState } from "vuex";
import Snackbar from "@/components/Snackbar.vue";

export default Vue.extend({
  name: "Home",
  computed: {
    ...mapState({ isLoggedIn: (state) => state.user.isLoggedIn }),
  },
  components: {
    SideBar,
    Profile,
    Chat,
    Login,
    Header,
    Snackbar,
    CekOngkir,
    AddCategory,
  },
});
</script>
<style scoped>
.app {
  display: grid !important;
  place-items: center !important;
  background-color: #dadbd3 !important;
  min-height: 100vh;
}

.app__body {
  display: flex;
  background-color: #ededed !important;
  width: 90vw !important;
  height: 80vh !important;
  box-shadow: -1px 4px 20px -6px rgba(0, 0, 0, 0.2);
}
</style>
