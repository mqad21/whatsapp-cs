<template>
  <v-row>
    <v-col cols="12 pb-0">
      <p class="text-subtitle mb-0">{{ title }}</p>
    </v-col>
    <template v-if="!isStore">
      <v-col cols="12" md="4" v-for="(area, key) in areas" :key="key">
        <v-autocomplete
          v-model="area.selected"
          :items="area.items"
          :loading="area.loading"
          :placeholder="'Pilih ' + area.title"
          :label="area.title"
          no-data-text="Tidak ada data"
          color="primary"
          :disabled="area.loading"
          hide-selected
          return-object
        >
        </v-autocomplete>
      </v-col>
    </template>
    <template v-else>
      <v-col cols="12" md="4">
        <v-autocomplete
          v-model="store.selected"
          :items="store.items"
          :loading="store.loading"
          :placeholder="'Pilih ' + store.title"
          :label="store.title"
          no-data-text="Tidak ada data"
          color="primary"
          :disabled="store.loading"
          hide-selected
          return-object
        >
        </v-autocomplete>
      </v-col>
    </template>
  </v-row>
</template>

<script>
import { getData } from "@/helpers/cekongkir_helpers";
import axios from "@/plugins/axios";

export default {
  props: ["title", "isStore"],
  data() {
    return {
      areas: {
        province: {
          title: "Provinsi",
          loading: false,
          items: [],
          selected: "",
        },
        city: {
          title: "Kabupaten/Kota",
          loading: false,
          items: [],
          selected: "",
        },
        subdistrict: {
          title: "Kecamatan",
          loading: false,
          items: [],
          selected: "",
        },
      },
      store: {
        title: "Toko",
        loading: false,
        items: [],
        selected: "",
      },
    };
  },
  methods: {
    initArea(path, params = {}) {
      this.areas[path].items = [];
      this.areas[path].loading = true;
      getData(path, { params })
        .then((result) => result.results)
        .then((areas) => {
          this.areas[path].items = areas.map((item) => {
            return {
              value: item[path + "_id"],
              text: item[path] || item[path + "_name"],
            };
          });
          this.areas[path].loading = false;
        })
        .catch((e) => {
          this.$store.dispatch("SET_SNACKBAR", { showing: true, text: e });
          this.areas[path].loading = false;
        });
    },
    initStore() {
      axios("/cs/origin")
        .then((response) => response.data)
        .then((result) => {
          if (!result.status) {
            throw result.message;
          }
          this.store.items = result.data.map((item) => {
            return {
              ...item,
              text: item.name,
              value: item.origin,
            };
          });
          this.store.loading = false;
        })
        .catch((e) => {
          this.$store.dispatch("SET_SNACKBAR", { showing: true, text: e });
          this.store.loading = false;
        });
    },
  },
  watch: {
    "areas.province.selected": {
      handler(province) {
        this.areas.subdistrict.items = [];
        this.initArea("city", { province: province.value });
      },
      deep: true,
    },
    "areas.city.selected": {
      handler(city) {
        this.$emit("input", {
          type: "city",
          value: city.value,
        });
        this.initArea("subdistrict", { city: city.value });
      },
      deep: true,
    },
    "areas.subdistrict.selected": {
      handler(subdistrict) {
        this.$emit("input", {
          type: "subdistrict",
          value: subdistrict.value,
        });
      },
      deep: true,
    },
    "store.selected": {
      handler(store) {
        this.$emit("input", {
          type: store.originType,
          value: store.origin,
        });
      },
      deep: true,
    },
  },
  beforeMount() {
    if (!this.isStore) {
      this.initArea("province");
    } else {
      this.initStore();
    }
  },
};
</script>