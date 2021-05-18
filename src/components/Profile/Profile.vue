<template>
  <div class="user__profile">
    <v-row justify="center" class="mt-6">
      <v-col cols="8">
        <v-avatar class="mx-auto" size="100%">
          <img alt="Avatar" :src="currentChat.profile" />
        </v-avatar>
      </v-col>
    </v-row>
    <v-row justify="center" class="mt-4">
      <v-col
        v-click-outside="closeEditable"
        v-if="$store.state.profile.editable"
        cols="auto"
      >
        <v-row align="center">
          <v-col class="pr-0">
            <v-text-field v-model="name" />
          </v-col>
          <v-col cols="auto" class="pl-0">
            <v-btn
              @click="
                $store.dispatch('CHANGE_NAME', {
                  name,
                  number: currentChat.number,
                })
              "
              :loading="$store.state.profile.loading"
              small
              text
              color="primary"
            >
              Simpan
            </v-btn>
          </v-col>
        </v-row>
      </v-col>
      <v-col v-else cols="12">
        <p class="text-center text-h6 mb-0">
          {{ currentChat.name }}
          <v-icon
            size="14"
            class="mb-4 cursor-pointer"
            @click="$store.commit('TOGGLE_EDITABLE')"
          >
            mdi-pencil-outline
          </v-icon>
        </p>
      </v-col>
      <v-col cols="12" class="pa-0">
        <p class="text-caption text-center mb-0" v-if="currentChat.note.length">
          Note: {{ currentChat.note.join(" | ") }}
        </p>
      </v-col>
      <v-col cols="8">
        <v-select
          label="Pilih Kategori"
          hide-details
          :items="categories"
          v-model="currentChat.kategori_id"
        >
        </v-select>
      </v-col>
      <v-col cols="8">
        <v-btn color="success" block @click="$store.commit('TOGGLE_TRANSFER')">
          Transfer
        </v-btn>
      </v-col>
      <v-col cols="8">
        <v-btn color="primary" block @click="endChat"> Selesai Chat </v-btn>
      </v-col>
    </v-row>
    <transfer />
  </div>
</template>

<script>
import { mapState } from "vuex";
import Transfer from "./Transfer.vue";

export default {
  components: { Transfer },
  data() {
    return {
      editable: false,
      name: this.$store.state.chat.currentChat.name,
    };
  },
  computed: {
    ...mapState({ currentChat: (state) => state.chat.currentChat }),
    categories() {
      return this.$store.state.category.categories.map((item) => {
        return {
          text: item.kategori,
          value: item.id,
        };
      });
    },
  },
  methods: {
    closeEditable() {
      if (this.$store.state.profile.editable) {
        this.$store.commit("TOGGLE_EDITABLE");
      }
    },
    endChat() {
      this.$store.dispatch("END_CHAT", this.currentChat);
      this.$store.commit("TOGGLE_PROFILE");
    },
  },
  watch: {
    "currentChat.kategori_id": {
      handler(value) {
        this.$store.dispatch("ASSIGN_KATEGORI", {
          'kategori_id': value,
          number: this.currentChat.number,
        });
      },
    },
  },
};
</script>

<style>
.user__profile {
  width: 300px;
  border-left: 0.1px solid lightgray;
  padding: 1rem;
}
</style>