<template>
  <v-dialog
    v-model="$store.state.ongkir.show"
    transition="dialog-bottom-transition"
    max-width="800"
  >
    <v-card>
      <v-card-title class="mb-4">
        <span class="headline">Cek Ongkir</span>
      </v-card-title>
      <v-card-text>
        <v-container>
          <Area :is-store="true" title="Daerah Asal" v-model="origin" />
          <Area title="Daerah Tujuan" v-model="destination" />
          <v-row>
            <v-col>
              <v-text-field
                label="Berat"
                v-model="weight"
                suffix="Gram"
                type="number"
              />
            </v-col>
            <v-col>
              <v-autocomplete
                label="Pilih Kurir"
                v-model="courier"
                :items="couriers"
              />
            </v-col>
            <v-col>
              <v-btn
                :loading="loading"
                :disabled="disabledButton"
                class="mt-2"
                block
                color="primary"
                @click="check"
                >Cek Ongkir</v-btn
              >
            </v-col>
          </v-row>
        </v-container>
        <v-container>
          <price-list
            :prices="prices"
            :origin="origin.text"
            :destination="destination.text"
            :weight="weight"
          />
        </v-container>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="primary" text @click="$store.dispatch('TOGGLE_ONGKIR')">
          Tutup
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import Area from "./Area";
import couriers from "@/commons/couriers";
import { getData, getAddress } from "@/helpers/cekongkir_helpers";
import PriceList from "./PriceList.vue";

export default {
  components: {
    Area,
    PriceList,
  },
  data() {
    return {
      loading: false,
      origin: {},
      destination: {},
      weight: "",
      courier: "",
      couriers,
      prices: [],
    };
  },
  computed: {
    disabledButton() {
      return (
        !this.origin.type ||
        !this.origin.value ||
        !this.destination.type ||
        !this.destination.value ||
        !this.weight ||
        !this.courier
      );
    },
  },
  methods: {
    check() {
      const formData = new FormData();
      formData.append("origin", this.origin.value);
      formData.append("originType", this.origin.type);
      formData.append("destination", this.destination.value);
      formData.append("destinationType", this.destination.type);
      formData.append("weight", this.weight);
      formData.append("courier", this.courier);
      this.loading = true;
      this.prices = [];
      getData("cost", {
        method: "POST",
        data: formData,
      })
        .then((result) => {
          if (result.results[0].costs.length) {
            this.prices = result.results;
            this.origin.text = getAddress(result.origin_details);
            this.destination.text = getAddress(result.destination_details);
            this.loading = false;
          } else {
            this.$store.dispatch("SET_SNACKBAR", {
              showing: true,
              text: "Data ongkir tidak ditemukan.",
            });
            this.loading = false;
          }
        })
        .catch((e) => {
          this.$store.dispatch("SET_SNACKBAR", { showing: true, text: e });
          this.loading = false;
        });
    },
  },
  watch: {
    weight(value) {
      if (value < 1) {
        this.$nextTick(() => {
          this.weight = "";
        });
      }
    },
  },
};
</script>