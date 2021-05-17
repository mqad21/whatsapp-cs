<template>
  <v-row class="header mt-4" align="center">
    <v-col cols="8" class="pa-0">
      <Category />
    </v-col>
    <v-col cols="4" class="pa-0">
      <v-row justify="end">
        <v-col cols="auto">
          <v-btn color="white" @click="$store.dispatch('TOGGLE_CATEGORY')">Tambah Kategori</v-btn>
        </v-col>
        <v-col cols="auto">
          <v-btn color="success" @click="$store.dispatch('TOGGLE_ONGKIR')">Cek Ongkir</v-btn>
        </v-col>
      </v-row>
    </v-col>
  </v-row>
</template>

<script>
import Category from "@/components/Category/Category.vue";

export default {
  components: {
    Category,
  },
};
</script>

<style scoped>
.header {
  width: 90vw !important;
}
</style>