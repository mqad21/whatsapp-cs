<template>
  <v-chip-group
    v-if="$store.state.category.categories.length"
    v-model="$store.state.category.category"
    mandatory
    active-class="primary--text"
  >
    <v-chip color="white" :value="0">Semua</v-chip>
    <v-chip
      color="white"
      v-for="category in $store.state.category.categories"
      :key="category.id"
      :value="category.id"
    >
      {{ category.kategori }}
    </v-chip>
  </v-chip-group>
</template>