<template>
  <b-container class="filter-bar" fluid>
    <b-row no-gutters class="py-2">
      <!-- Start Search Input -->
      <b-col cols="12" sm="9" md="4" class="mr-2 d-flex align-items-center">
        <b-input-group>
          <b-form-input
            v-model="filters.used.search"
            placeholder="Listing Name"
            @keyup="doFilter"
          />
          <b-input-group-append>
            <b-button variant="outline-primary" @click="doFilter">
              <i class="fas fa-search" />
            </b-button>
          </b-input-group-append>
        </b-input-group>
      </b-col>
      <!-- End Search Input -->

      <!-- Start plats Filter -->
      <b-col
        cols="12"
        md="auto"
        class="mr-2 d-none d-md-flex align-items-center"
      >
        <b-dropdown
          id="plats-dropdown"
          variant="light"
          :text="filters.plats.text"
        >
          <!-- Start first horizontal tab -->
          <b-dropdown-group class="px-2 custom-tab plats">
            <div class="d-flex" style="overflow-x: scroll">
              <b-btn
                v-for="(country, key) in filters.plats.tabs"
                :key="key"
                :variant="
                  filters.plats.currentCountry === key ? 'primary' : null
                "
                style="width: fit-content"
                class="mb-2 mr-2"
                @click="
                  filters.plats.currentCountry = key;
                  changeCountry(key);
                "
              >
                {{ key }}
              </b-btn>
            </div>

            <!-- Start Tabs -->
            <b-tabs
              v-model="filters.plats.currentCity"
              nav-wrapper-class="w-50 border h-400"
              nav-class="d-block p-0 m-0"
              pills
              card
              content-class="h-400"
              vertical
            >
              <!-- Start First tab -->
              <b-tab
                v-for="(tab, index) in filters.plats.tabs[
                  filters.plats.currentCountry
                ]"
                :key="tab.name"
                class="h-400"
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
                          <b class="font-2">Hela {{ tab.name }}</b>
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

            <b-btn variant="primary" class="okay" @click="doFilter"> Ok </b-btn>
          </b-dropdown-group>
        </b-dropdown>
      </b-col>
      <!-- End plats Filter -->

      <!-- Start property Filter -->
      <b-col
        cols="12"
        md="auto"
        class="mr-2 d-none d-lg-flex align-items-center"
      >
        <b-dropdown
          id="property-dropdown"
          class="w-100"
          variant="light"
          :text="filters.property.text"
        >
          <b-dropdown-group class="px-1">
            <property-filter
              :icons="filters.property.icons"
              @iconChoosed="addProperty($event)"
            />
            <b-btn variant="primary" class="okay" @click="doFilter"> Ok </b-btn>
          </b-dropdown-group>
        </b-dropdown>
      </b-col>
      <!-- End property Filter -->

      <!-- Start Category Filter -->
      <b-col
        cols="12"
        md="auto"
        class="mr-2 d-none d-lg-flex align-items-center"
      >
        <b-dropdown
          id="Category-dropdown"
          class="w-100"
          variant="light"
          :text="`categories`"
        >
          <b-dropdown-group class="px-1">
            <property-filter
              :icons="filters.categories.icons"
              @iconChoosed="addCategory($event)"
            />
            <b-btn variant="primary" class="okay" @click="doFilter"> Ok </b-btn>
          </b-dropdown-group>
        </b-dropdown>
      </b-col>
      <!-- End Category Filter -->

      <!-- Start price Filter -->
      <b-col
        cols="12"
        md="auto"
        class="mr-2 d-none d-md-flex align-items-center"
      >
        <b-dropdown
          id="price-dropdown"
          class="w-100"
          variant="light"
          right
          :text="filters.price.text"
        >
          <b-dropdown-group class="px-3">
            <p>{{ $t("ledigaLokaler.filters.price") }}</p>
            <client-only>
              <yta-filter
                :identifier="2"
                :slider-type="'price'"
                :step="1000"
                :min-and-max="filters.price"
                @ytaChanged="ytaChanged('price', $event)"
                @max-changed="updateMaxPrice($event)"
              />
            </client-only>
            <b-btn variant="primary" class="okay" @click="doFilter"> Ok </b-btn>
          </b-dropdown-group>
        </b-dropdown>
      </b-col>
      <!-- End price Filter -->

      <!-- Start yta Filter -->
      <b-col
        cols="12"
        md="auto"
        class="mr-2 d-none d-lg-flex align-items-center"
      >
        <b-dropdown
          id="yta-dropdown"
          class="w-100"
          variant="light"
          right
          :text="filters.yta.text"
        >
          <b-dropdown-group class="px-3">
            <p>{{ $t("ledigaLokaler.filters.surface") }}</p>
            <client-only>
              <yta-filter
                :identifier="10"
                :slider-type="'yta'"
                :step="1"
                :min-and-max="filters.yta"
                @ytaChanged="ytaChanged('yta', $event)"
                @max-changed="updateMaxPrice($event)"
              />
            </client-only>
            <b-btn variant="primary" class="okay" @click="doFilter"> Ok </b-btn>
          </b-dropdown-group>
        </b-dropdown>
      </b-col>

      <b-col
        cols="12"
        md="auto"
        class="mr-2 d-none d-lg-flex align-items-center"
      >
        <b-button
          block
          class="mt-1 mt-sm-0"
          variant="warning"
          @click="clearFilters"
          v-text="$t('ledigaLokaler.filters.clear')"
        />
      </b-col>
      <!-- End yta Filter -->

      <!-- Start more Filters -->
      <b-col
        cols="12"
        sm="2"
        md="auto"
        class="d-flex d-lg-none align-items-center justify-content-end"
      >
        <b-button
          v-b-toggle.more-filters
          block
          class="mt-1 mt-sm-0"
          variant="primary"
          v-text="$t('ledigaLokaler.filters.more')"
        />
      </b-col>
      <!-- End more Filters -->

      <!-- Start layout buttons -->
      <b-col
        cols="12"
        md="auto"
        class="d-none ml-auto d-md-flex align-items-center justify-content-end"
      >
        <b-form-group class="p-0 m-0">
          <b-form-radio-group
            id="layout-btns"
            v-model="layout"
            buttons
            button-variant="outline-primary"
          >
            <b-form-radio :value="$t('ledigaLokaler.list')">
              <i class="fas fa-list mr-1" />
              {{ $t("ledigaLokaler.list") }}
            </b-form-radio>
            <b-form-radio :value="$t('ledigaLokaler.map')">
              <i class="far fa-map mr-1" />
              {{ $t("ledigaLokaler.map") }}
            </b-form-radio>
          </b-form-radio-group>
        </b-form-group>
      </b-col>
      <!-- End layout buttons -->
    </b-row>
  </b-container>
</template>

<script>
import { mapGetters } from "vuex";
import { BootstrapVue, BIcon } from "bootstrap-vue";
import { sortItems } from "@/mixins/SortRegions";
import allFilters from "@/mixins/filters";
import propertyFilter from "@/components/lediga/filter/property";
import ytaFilter from "@/components/lediga/filter/yta";

export default {
  components: {
    // eslint-disable-next-line vue/no-unused-components
    BootstrapVue,
    // eslint-disable-next-line vue/no-unused-components
    BIcon,
    propertyFilter,
    ytaFilter,
  },
  mixins: [sortItems, allFilters],
  data() {
    return {
      layout: this.$t("ledigaLokaler.map"),
    };
  },
  computed: {
    ...mapGetters({
      used: "filters/used",
      AllPlaces: "listings",
      regions: "regions",
      renderKey: "renderKey",
      tags: "tags",
      categories: "categories",
    }),
  },
  watch: {
    layout(newValue) {
      this.$emit("changeLayout", this.layout);
    },
  },
};
</script>

<style>
.filter-bar div.dropdown.b-dropdown.show.btn-group > ul.dropdown-menu {
  height: 400px;
  overflow: hidden;
  width: 600px;
}

.filter-bar div.dropdown.b-dropdown.show.btn-group > ul.dropdown-menu > li {
  width: 100%;
  height: 100%;
}

.filter-bar
  div.dropdown.b-dropdown.show.btn-group
  > ul.dropdown-menu
  > li
  > ul {
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 300;
  justify-content: space-between;
}

.filter-bar
  div.dropdown.b-dropdown.show.btn-group
  > ul.dropdown-menu
  > li
  > ul
  button.btn {
  display: inline-block;
}

.filter-bar
  div.dropdown.b-dropdown.show.btn-group
  > ul
  > li
  > ul
  button.btn.okay {
  display: inline-block;
  margin-top: auto;
  margin-left: auto;
}

#property-dropdown > ul > li > ul > button.okay {
  position: absolute;
  bottom: 10px;
  right: 10px;
}

.h-400 {
  height: 300px;
  overflow-y: scroll;
}
</style>
