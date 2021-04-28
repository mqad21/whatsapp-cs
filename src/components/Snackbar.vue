<template>
  <v-snackbar dark right v-model="$store.state.snackbar.snackbar.showing">
    {{ $store.state.snackbar.snackbar.text }}
    <template v-slot:action="{ attrs }">
      <v-btn
        color="white"
        text
        v-bind="attrs"
        @click="$store.dispatch('SET_SNACKBAR', { showing: false })"
      >
        Tutup
      </v-btn>
    </template>
  </v-snackbar>
</template>