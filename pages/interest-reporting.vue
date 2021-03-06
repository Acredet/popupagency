<template>
  <div class="wrapper-page my-5">
    <b-container>
      <h3>{{ $t("interestReporting.title") }}</h3>
      <b-row class="mt-5">
        <!-- Start countries -->
        <b-col cols="12">
          <p>{{ $t("interestReporting.places") }}</p>
          <b-btn
            v-for="(country, key) in filters.plats.tabs"
            :key="key"
            variant="primary"
            class="mb-2 mr-2"
            @click="filters.plats.currentCountry = key"
          >
            {{ key }}
          </b-btn>
          <!-- Start Tabs -->
          <b-tabs
            v-model="filters.plats.currentCity"
            nav-wrapper-class="w-25 h-100 overflow-auto border"
            nav-class="d-block p-0 m-0"
            pills
            card
            content-class="overflow-auto"
            vertical
          >
            <!-- Start First tab -->
            <b-tab
              v-for="(tab, index) in filters.plats.tabs[
                filters.plats.currentCountry
              ]"
              :key="index"
              title-item-class="tabBtn"
              :title="tab.text"
            >
              <b-card-body class="mt-0 pt-0 px-1">
                <div class="choices">
                  <b-form-group :key="renderKey">
                    <template v-slot:label>
                      <b-form-checkbox
                        :key="renderKey"
                        v-model="tab.allSelected"
                        :indeterminate="tab.indeterminate"
                        :aria-describedby="tab.name"
                        :aria-controls="tab.name"
                        size="md"
                        @change="toggleAll(index)"
                      >
                        <b class="font-2"
                          >{{ $t("interestReporting.all") }} {{ tab.name }}</b
                        >
                      </b-form-checkbox>
                    </template>
                    <b-form-checkbox-group
                      :id="tab.name"
                      v-model="tab.selected"
                      :options="tab.subcity"
                      :name="tab.name"
                      class="ml-4"
                      aria-label="Individual flavours"
                      stacked
                      @change="placeChoose(index)"
                    />
                  </b-form-group>
                </div>
              </b-card-body>
            </b-tab>
            <!-- End tabs -->
          </b-tabs>
        </b-col>
        <!-- End countries -->

        <!-- Start property type -->
        <b-col cols="12" class="my-5">
          <p>{{ $t("interestReporting.propertyType") }}</p>
          <b-button-group
            v-if="tags.length > 0"
            vertical
            class="d-flex flex-wrap align-items-center justify-content-between flex-row w-100"
          >
            <b-row>
              <b-col
                v-for="(icon, index) in filters.icons"
                :key="icon.text"
                cols="6"
                md="3"
              >
                <b-form-checkbox
                  button
                  button-variant="outline-primary btn-block"
                  class="m-1 btn-block"
                  :value="icon.text"
                  v-model="selectedProperties"
                >
                  <b-img
                    v-if="icon.avatar"
                    width="30"
                    :src="`https://popup.dk.se/_nuxt/img/${icon.avatar}`"
                  />
                  {{ icon.text }}
                </b-form-checkbox>
              </b-col>
            </b-row>
          </b-button-group>
        </b-col>
        <!-- End property type -->

        <!-- Start Price -->
        <b-col cols="12" md="6">
          <div>
            <p>{{ $t("interestReporting.price") }}</p>
            <vue-slider
              key="price-slider"
              v-model="price"
              :min="filters.price.min"
              :max="filters.price.max"
            />

            <small
              >{{ formatPrices(price[0]) || 0 }} Kr —
              {{ formatPrices(price[1]) || 0 }} Kr</small
            >
          </div>
        </b-col>
        <!-- End Price -->

        <!-- Start YTA -->
        <b-col cols="12" md="6">
          <div>
            <p>{{ $t("interestReporting.yta") }}</p>
            <vue-slider
              key="yta-slider"
              v-model="yta"
              :min="filters.yta.min"
              :max="filters.yta.max"
            />
            <small
              >{{ formatPrices(yta[0]) || 0 }} m<sup>3</sup>—
              {{ formatPrices(yta[1]) || 0 }} m<sup>3</sup></small
            >
          </div>
        </b-col>
        <!-- End YTA -->

        <b-btn variant="primary" class="mt-5">
          {{ $t("actions.submit") }}
        </b-btn>
      </b-row>
    </b-container>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import { sortItems } from "@/mixins/SortRegions";

export default {
  components: {},
  mixins: [sortItems],
  data() {
    return {
      filters: {
        price: {
          min: 0,
          max: 100,
        },
        yta: {
          min: 0,
          max: 100,
        },
        icons: [],
        plats: {
          currentCountry: "",
          tabs: {},
        },
      },
      price: [0, 100],
      yta: [0, 100],
      icons: [],
      plats: [],
      selectedProperties: [],
    };
  },
  computed: {
    ...mapGetters({
      renderKey: "renderKey",
      listings: "listings",
      tags: "tags",
      categories: "categories",
      regions: "regions",
    }),
  },
  watch: {
    regions: {
      immediate: true,
      handler(val) {
        const sortedRegions = this.sortItems(val, false);

        sortedRegions.forEach((country) => {
          // console.log(country)
          if (!country.parent) {
            this.filters.plats.tabs[country.name[this.$i18n.locale]] = [];
          }

          if (country.cities) {
            country.cities.forEach((city) => {
              // eslint-disable-next-line no-return-assign
              const array1 = city.subCities
                ? city.subCities.map((x) =>
                    x.name && x.name[this.$i18n.locale]
                      ? x.name[this.$i18n.locale]
                      : x.name
                  )
                : [];

              let all = 0;
              city.subCities.forEach((subCity) => {
                all += this.listings.filter(
                  (place) =>
                    place.stad[this.$i18n.locale] ===
                    subCity.name[this.$i18n.locale]
                ).length;
              });

              this.filters.plats.tabs[country.name[this.$i18n.locale]].push({
                name: city.name[this.$i18n.locale],
                text: `${city.name[this.$i18n.locale]} (${all})`,
                allSelected: false, // Shape of the check
                indeterminate: false, // Shape of the check
                selected: [],
                subcity: array1,
              });
              this.filters.plats.currentCountry = Object.keys(
                this.filters.plats.tabs
              )[0];
            });
            this.$forceUpdate();
          }
        });
      },
    },
    tags: {
      immediate: true,
      deep: true,
      handler(val) {
        this.filters.icons = [...val].map((x) => {
          if (x._id) {
            return {
              text: x.name[this.$i18n.locale],
              avatar: x.avatar,
              state: false,
            };
          }
        });
      },
    },
    listings: {
      immediate: true,
      deep: true,
      handler() {
        this.price = this.getMinAndMaxPrice("price", "prioteradpris");
        this.yta = this.getMinAndMax("yta", "yta");
      },
    },
  },
  async created() {},
  methods: {
    /**
     *
     * @param priceFilterName {string} the price property name in the component data filters object
     * @param pricePropertyName the price property name in the places
     * @returns {Array} the min and the max values for prices
     */
    getMinAndMaxPrice(priceFilterName, pricePropertyName) {
      const arr = [
        ...this.listings.map((place) => place[pricePropertyName].val),
      ];
      const min = Math.min(
        ...this.listings.map((place) => place[pricePropertyName].val)
      );
      const max = Math.max(
        ...this.listings.map((place) => place[pricePropertyName].val)
      );
      this.filters[priceFilterName].min = min;
      this.filters[priceFilterName].max = max;
      return [min, max];
    },
    getMinAndMax(obj, prop) {
      let min = 0;
      let max = 0;
      this.listings.forEach((place) => {
        // Get minimum and maximum price
        if (place[prop] < min && place[prop] < max) {
          min = place[prop];
        } else if (place[prop] > min && place[prop] > max) {
          max = place[prop];
        }
      });
      this.filters[obj].min = min;
      this.filters[obj].max = max;

      return [min, max];
    },
    formatPrices(num) {
      const arr = String(num).split("").reverse();
      const copy = [...arr];
      const indexes = [];

      for (let i = 1; i <= arr.length; i++) {
        if (i % 3 === 0) {
          indexes.push(i);
        }
      }

      if (copy.length > 3) {
        indexes.forEach((n, i) => copy.splice(n + i, 0, ","));
      }

      copy.reverse();
      if (copy[0] === ",") {
        copy.shift();
      }
      copy.join("");
      return copy.join("");
    },
    toggleAll(index) {
      const arr = this.filters.plats.tabs[this.filters.plats.currentCountry][
        index
      ];

      // Upadte the selected states in this country
      const subcities =
        arr.selected.length !== arr.subcity.length ? arr.subcity.slice() : [];
      arr.selected = arr.selected.includes(arr.name)
        ? (arr.selected = [])
        : (arr.selected = [arr.name, ...subcities]);

      this.$nextTick(() => {
        if (arr.selected.length === 0) {
          arr.indeterminate = false;
          arr.allSelected = false;
        } else if (
          arr.selected.length === arr.subcity.length + 1 ||
          arr.selected.length === arr.subcity.length
        ) {
          arr.indeterminate = false;
          arr.allSelected = true;
        } else {
          arr.indeterminate = true;
          arr.allSelected = false;
        }
      });

      // Upadte the filters in vuex
      const finalArray = [this.filters.plats.currentCountry];
      this.filters.plats.tabs[this.filters.plats.currentCountry].forEach(
        (x) => {
          finalArray.push(...x.selected);
        }
      );

      this.plats = finalArray;

      this.$forceUpdate();
    },
    placeChoose(index) {
      const arr = this.filters.plats.tabs[this.filters.plats.currentCountry][
        index
      ];

      this.$nextTick(() => {
        if (arr.selected.length === 0) {
          arr.indeterminate = false;
          arr.allSelected = false;
        } else if (
          arr.selected.length === arr.subcity.length + 1 ||
          arr.selected.length === arr.subcity.length
        ) {
          arr.indeterminate = false;
          arr.allSelected = true;
        } else {
          arr.indeterminate = true;
          arr.allSelected = false;
        }

        // Upadte the filters in vuex
        const finalArray = [this.filters.plats.currentCountry];
        this.filters.plats.tabs[this.filters.plats.currentCountry].forEach(
          (x) => {
            finalArray.push(...x.selected);
          }
        );

        this.plats = finalArray;

        this.$forceUpdate();
      });
    },
  },
};
</script>

<style $i18n.locale="scss" scoped></style>
