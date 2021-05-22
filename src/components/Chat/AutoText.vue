<template>
  <v-card elevation="0">
    <v-list dense>
      <v-list-item-group color="primary">
        <v-list-item v-if="loading">
          <v-list-item-content>
            <v-progress-circular indeterminate size="25" width="3"/>
          </v-list-item-content>
        </v-list-item>
        <v-list-item
          v-else
          v-for="(text, i) in autoText"
          :key="i"
          @click="select(text)"
        >
          <v-list-item-content>
            <v-list-item-title v-html="text"></v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list-item-group>
    </v-list>
  </v-card>
</template>

<script>
export default {
  props: ["autoText", "loading"],
  methods: {
    select(text) {
      this.$emit("update-message", text);
    },
  },
};
</script>