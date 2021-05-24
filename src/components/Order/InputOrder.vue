<template>
  <v-dialog
    v-model="$store.state.order.show"
    transition="dialog-bottom-transition"
    max-width="400"
  >
    <v-card>
      <v-card-title class="mb-4">
        <span class="headline">Input Order</span>
      </v-card-title>
      <v-card-text>
        <v-container>
          <v-row v-for="(value, key) in $store.state.order.data" :key="key">
            <v-col>
              <v-text-field :label="key" v-model="$store.state.order.data[key]" />
            </v-col>
          </v-row>
        </v-container>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn
          color="secondary"
          text
          @click="$store.commit('TOGGLE_ORDER', {})"
        >
          Batal
        </v-btn>
        <v-btn
          :loading="$store.state.order.loading"
          color="primary"
          text
          @click="$store.dispatch('SUBMIT_ORDER')"
        >
          Simpan
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>