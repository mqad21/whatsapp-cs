<template>
  <v-row class="header mt-4" align="center">
    <v-col cols="8" class="pa-0">
      <Category />
    </v-col>
    <v-col cols="4" class="pa-0">
      <v-row justify="end">
        <v-col cols="auto">
          <v-btn color="white">Tambah Kategori</v-btn>
        </v-col>
        <v-col cols="auto">
          <v-btn color="success">Cek Ongkir</v-btn>
        </v-col>
      </v-row>
    </v-col>
  </v-row>
</template>

<script>
import Category from "@/components/Category.vue";

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