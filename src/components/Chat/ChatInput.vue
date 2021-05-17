<template>

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
      @keyup.enter.exact="submit"
      @keyup.ctrl.enter="newLine"
    >
    </v-textarea>
    <v-btn class="mr-2 my-auto" icon @click="submit">
      <v-icon>mdi-send</v-icon>
    </v-btn>
  </v-form>
</template>

<script>
export default {
  props: ["submit", "value"],
  data() {
    return {
      message: "",
    };
  },
  methods: {
    newLine() {
      this.message = this.message + "\n";
    },
  },
  watch: {
    message(value) {
      this.$emit("input", value);
    },
    value(value) {
      this.message = value;
    },
  },
};
</script>