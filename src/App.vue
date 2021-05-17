<template>
  <div>
    <router-view></router-view>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
// import firebase from "firebase";

export default Vue.extend({
  name: "App",

  components: {},
  created() {
    // firebase.auth().onAuthStateChanged((user) => {
    // if (user) {
    // const currentUser = {
    //   uid: user.uid,
    //   displayName: user.displayName,
    //   email: user.email,
    //   photoURL: user.photoURL,
    //   phoneNumber: user.phoneNumber,
    // };
    const currentUser = {
      uid: "wkwk",
      displayName: "mqad21",
      email: "mqad21@gmail.com",
      photoURL: "",
      phoneNumber: "+6281260743660",
    };
    this.$store.commit("SET_USER", currentUser);
    this.$store.commit("SET_LOGGED_IN", true);
    this.$store.dispatch("SET_ACTIVE_CHAT_USERS");
    this.$store.dispatch("SET_PENDING_CHAT_USERS");
    this.$store.dispatch("SET_CATEGORIES");
    // }
    // });
  },
  data: () => ({}),
});
</script>

<style >
input:focus,
textarea:focus,
select:focus {
  outline: none;
}
</style>
