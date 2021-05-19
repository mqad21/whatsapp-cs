<template>
  <div class="login">
    <div class="login__container pa-7 pt-10">
      <template v-if="!$store.state.user.isInvalid">
        <v-progress-circular size="50" width="5" color="primary" indeterminate>
        </v-progress-circular>
        <p class="text-body-1 mt-4 mb-0">Sedang memverifikasi...</p>
      </template>
      <template v-else>
        <v-icon large color="warning">mdi-alert</v-icon>
        <p class="text-body-1 mt-4 mb-0">
          {{ $store.state.user.invalidMessage }}
        </p>
      </template>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
export default Vue.extend({
  name: "Login",
  props: {
    invalid: {
      type: Boolean,
      default: false,
    },
  },
  methods: {
    checkToken() {
      this.$store.dispatch("CHECK_TOKEN");
    },
  },
  beforeMount() {
    this.checkToken();
  },
});
</script>

<style scoped>
.login {
  background-color: #f8f8f8;
  display: grid;
  place-items: center;
  border-radius: 10px;
}

.login__container {
  text-align: center;
  background: white;
  border-radius: 10px;
  box-shadow: -1px 4px 20px -6px rgba(0, 0, 0, 0.2);
}

.login__container > img {
  object-fit: contain;
  height: 150px;
  margin-bottom: 40px;
}

.login__container > button {
  margin-top: 50px;
}

.login__btn_img {
  width: 30px;
  margin-right: 5px;
}
</style>