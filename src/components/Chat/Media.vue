<template>
  <div class="mb-2">
    <div v-if="!src" class="loader__container">
      <v-skeleton-loader
        width="100"
        height="100"
        v-if="!src"
        type="image"
        boilerplate
      />
      <v-progress-circular
        v-if="loading"
        color="grey"
        size="25"
        width="3"
        indeterminate
      />
      <v-btn @click="loadImage()" v-else icon color="grey">
        <v-icon>mdi-download</v-icon>
      </v-btn>
    </div>
    <v-img
      @click="showImage()"
      class="cursor-pointer"
      max-width="300"
      v-else
      :src="src"
    ></v-img>
  </div>
</template>

<script>
export default {
  props: {
    messageId: String,
  },
  data() {
    return {
      loading: false,
      src: "",
      show: true,
    };
  },
  methods: {
    loadImage() {
      this.loading = true;
      this.$axios(`cs/media?message_id=${this.messageId}`)
        .then((response) => response.data)
        .then((result) => {
          this.loading = false;
          if (result.status) {
            this.src = result.data.url;
          } else {
            this.$store.dispatch("SET_SNACKBAR", {
              showing: true,
              text: result.message,
            });
          }
        })
        .catch((e) => {
          this.loading = false;
          this.$store.dispatch("SET_SNACKBAR", { showing: true, text: e });
          console.error(e);
        });
    },
    showImage() {
      this.$store.commit("SET_FULLSCREEN_MEDIA", {
        showing: true,
        src: this.src,
      });
    },
  },
};
</script>

<style>
.loader__container {
  position: relative;
  width: 100px;
  height: 100px;
}

.loader__container button,
.loader__container .v-progress-circular {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
</style>