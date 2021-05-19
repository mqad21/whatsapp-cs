<template>
  <div>
    <router-view></router-view>
  </div>
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({
  name: "App",
});
</script>

<style >
input:focus,
textarea:focus,
select:focus {
  outline: none;
}
</style>
