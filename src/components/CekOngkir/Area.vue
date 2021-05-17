<template>
  <v-row>
    <v-col cols="12 pb-0">
      <p class="text-subtitle mb-0">{{ title }}</p>
    </v-col>
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
  </v-row>
</template>

<script>
import getData from "@/helpers/cekongkir_helpers";

export default {
  props: ["title"],
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
    };
  },
  methods: {
    initArea(path, params = {}) {
      this.areas[path].items = [];
      this.areas[path].loading = true;
      getData(path, { params })
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
          text: [city.text, this.areas.province.selected.text].join(", "),
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
          text: [
            subdistrict.text,
            this.areas.city.selected.text,
            this.areas.province.selected.text,
          ].join(", "),
        });
      },
      deep: true,
    },
  },
  beforeMount() {
    this.initArea("province");
  },
};
</script>