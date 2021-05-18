<template>
  <v-dialog
    v-model="$store.state.profile.transfer"
    transition="dialog-bottom-transition"
    max-width="400"
  >
    <v-card>
      <v-card-title class="mb-4">
        <span class="headline">Transfer Chat</span>
      </v-card-title>
      <v-card-text>
        <v-container>
          <v-row>
            <v-col cols="12">
              <v-select hide-details label="Transfer ke" :items="css" v-model="cs" />
            </v-col>
            <v-col cols="12">
              <v-textarea hide-details rows="2" label="Keterangan" v-model="description" />
            </v-col>
          </v-row>
        </v-container>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="secondary" text @click="$store.commit('TOGGLE_TRANSFER')">
          Batal
        </v-btn>
        <v-btn
          :disabled="disabledButton"
          color="primary"
          text
          @click="transfer"
          :loading="$store.state.profile.loadingTransfer"
        >
          Transfer
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  data() {
    return {
      description: null,
      cs: "",
    };
  },
  computed: {
    disabledButton() {
      return !this.cs;
    },
    css() {
      return this.$store.state.profile.cs.map((item) => {
        return {
          value: item.id,
          text: item.email,
        };
      });
    },
  },
  methods: {
    transfer() {
      this.$store.dispatch("TRANSFER_CHAT", {
        'cs_id': this.cs,
        number: this.$store.state.chat.currentChat.number,
        keterangan: this.description,
      });
    },
  },
};
</script>