<template>
  <v-list>
    <template v-for="(price, priceIndex) in prices">
      <template v-for="(cost, costIndex) in price.costs">
        <template v-for="(cost_, costIndex_) in cost.cost">
          <div :key="priceIndex + costIndex + costIndex_">
            <v-list-item>
              <v-list-item-content>
                <v-row justify="space-between">
                  <v-col align-self="center">
                    <v-list-item-title
                      v-text="price.code.toUpperCase()"
                    ></v-list-item-title>
                    <v-list-item-subtitle
                      v-text="'Layanan: ' + cost.service"
                    ></v-list-item-subtitle>
                    <v-list-item-subtitle
                      v-text="'Deskripsi: ' + cost.description"
                    ></v-list-item-subtitle>
                    <v-list-item-subtitle
                      v-text="'Estimasi: ' + cost_.etd + ' Hari'"
                    ></v-list-item-subtitle>
                  </v-col>
                  <v-col class="my-auto">
                    <p class="text-h6 mb-0">{{ toRupiah(cost_.value) }}</p>
                    <small v-if="cost_.note">Note: {{ cost_.note }}</small>
                  </v-col>
                </v-row>
              </v-list-item-content>
              <v-list-item-action class="my-auto">
                <v-btn icon>
                  <v-icon
                    @click="
                      copy(
                        price.code.toUpperCase(),
                        cost.service,
                        cost.description,
                        cost_.etd + ' Hari',
                        toRupiah(cost_.value),
                        cost_.note
                      )
                    "
                    color="grey lighten-1"
                    >mdi-content-copy</v-icon
                  >
                </v-btn>
                <input type="hidden" ref="container" />
              </v-list-item-action>
            </v-list-item>
            <v-divider></v-divider>
          </div>
        </template>
      </template>
    </template>
  </v-list>
</template>

<script>
import numberHelpers from "@/helpers/number_helpers";
import copy from "copy-to-clipboard";

export default {
  props: ["prices", "origin", "destination", "weight"],
  computed: {},
  methods: {
    copy(courier, service, description, estimation, price, note) {
      const text = `Asal: ${this.origin}\nTujuan: ${this.destination}\nBerat: ${this.weight} gram\nKurir: ${courier}\nLayanan: ${service} (${description})\nEstimasi: ${estimation}\nHarga: ${price}\nCatatan: ${note}`;
      copy(text);
      this.$store.dispatch("SET_SNACKBAR", {
        showing: true,
        text: "Harga berhasil disalin.",
      });
    },
    ...numberHelpers,
  },
};
</script>