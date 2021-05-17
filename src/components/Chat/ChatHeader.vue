<template>
  <div class="chat__header">
    <v-avatar><v-img :src="currentChat.profile"></v-img></v-avatar>
    <div class="chat__header_info">
      <h3>{{ currentChat.name }}</h3>
      <p class="mb-0">{{ currentChat.number }}</p>
    </div>
    <div class="chat__header_right">
      <v-btn icon @click="$store.commit('TOGGLE_PROFILE')"><v-icon>mdi-dots-vertical</v-icon></v-btn>
    </div>
  </div>
</template>

<script>
export default {
  props: ["currentChat"],
};
</script>

<style>
.chat__header {
  padding: 10px 20px;
  display: flex;
  align-items: center;
  border-bottom: 1px solid lightgrey;
}

.chat__header_info {
  flex: 1;
  padding-left: 20px;
}

.chat__header_info > h3 {
  margin-bottom: 3px;
  font-weight: bold;
}

.chat__header_info > p {
  color: gray;
}

.chat__header_right {
  display: flex;
  justify-content: end;
}
</style>