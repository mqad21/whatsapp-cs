<template>
  <v-chip-group mandatory active-class="primary--text">
    <v-chip color="white" v-for="tag in tags" :key="tag">
      {{ tag }}
    </v-chip>
  </v-chip-group>
</template>

<script>
export default {
  data() {
    return {
      tags: ["All", "Kategori 1", "Kategori 2", "Kategori 3"],
    };
  },
};
</script>