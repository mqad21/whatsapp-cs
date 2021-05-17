<template>
  <v-dialog
    v-model="$store.state.category.show"
    transition="dialog-bottom-transition"
    max-width="400"
  >
    <v-card>
      <v-card-title class="mb-4">
        <span class="headline">Tambah Kategori</span>
      </v-card-title>
      <v-card-text>
        <v-container>
          <v-row>
            <v-col>
              <v-text-field label="Nama Kategori" v-model="name" />
            </v-col>
          </v-row>
        </v-container>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn
          color="secondary"
          text
          @click="$store.dispatch('TOGGLE_CATEGORY')"
        >
          Batal
        </v-btn>
        <v-btn
          :disabled="disabledButton"
          color="primary"
          text
          @click="addCategory"
        >
          Tambah
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  data() {
    return {
      name: "",
    };
  },
  computed: {
    disabledButton() {
      return !this.name;
    },
  },
  methods: {
    addCategory() {
      this.$store.dispatch("ADD_CATEGORY", this.name);
      this.$store.dispatch("TOGGLE_CATEGORY");
    },
  },
};
</script>