<template>
  <v-row class="pa-3" align="center">
    <v-col>
      <p class="text-body-1 mb-0">
        <v-icon class="mr-1">mdi-file</v-icon>
        {{ file.name }}
      </p>
    </v-col>
    <v-col align-self="end" cols="auto">
      <v-btn icon>
        <v-icon @click="$emit('remove-file')">mdi-close</v-icon>
      </v-btn>
    </v-col>
  </v-row>
</template>

<script>
export default {
  props: ["file"],
};
</script>