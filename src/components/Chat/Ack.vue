<template>
    <span>
        <v-icon small v-if="ack == 0" color="grey">mdi-clock-outline</v-icon>
        <v-icon small v-else-if="ack == 1" color="grey">mdi-check</v-icon>
        <v-icon small v-else-if="ack == 2" color="blue">mdi-check-all</v-icon>
    </span>
</template>

<script>
export default {
  props: {
    ack: String,
  },
};
</script>