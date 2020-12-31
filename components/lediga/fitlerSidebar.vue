<template>
  <!-- Sart Sidebar -->
  <b-sidebar
    id="more-filters"
    bg-variant="white"
    backdrop-variant="dark"
    backdrop
    title="Filter your home search"
  >
    <b-container class="py-2">
      <ul class="list-unstyled">
        <!-- Start Price Tab -->
        <li
          v-b-toggle="'price'"
          class="p-2 border d-flex justify-content-between align-items-center font-3 mb-1"
        >
          <span>{{ filters.price.text }}</span>
          <i class="fas fa-caret-down" />
        </li>

        <b-collapse id="price" accordion="filters" role="tabpanel">
          <div class="px-2">
            <yta-filter
              :identifier="0"
              :slider-type="'price'"
              :step="1000"
              :min-and-max="filters.price"
              @ytaChanged="ytaChanged('price', $event)"
              @max-changed="updateMaxPrice($event)"
            />
            <b-btn variant="primary" @click="doFilter"> Ok </b-btn>
          </div>
        </b-collapse>
        <!-- End Price Tab -->

        <!-- Start yta Tab -->
        <li
          v-b-toggle="'yta'"
          class="p-2 border d-flex justify-content-between align-items-center font-3 mb-1"
        >
          <span>{{ filters.yta.text }}</span>
          <i class="fas fa-caret-down" />
        </li>

        <b-collapse id="yta" accordion="filters" role="tabpanel">
          <div class="px-2">
            <yta-filter
              :identifier="1"
              :slider-type="'yta'"
              :step="1"
              :min-and-max="filters.yta"
              @ytaChanged="ytaChanged('yta', $event)"
              @max-changed="updateMaxPrice($event)"
            />
            <b-btn variant="primary" @click="doFilter"> Ok </b-btn>
          </div>
        </b-collapse>
        <!-- End yta Tab -->

        <!-- Start property Tab -->
        <li
          v-b-toggle="'property'"
          class="p-2 border d-flex justify-content-between align-items-center font-3 mb-1"
        >
          <span>{{ filters.property.text }}</span>
          <i class="fas fa-caret-down" />
        </li>

        <b-collapse id="property" accordion="filters" role="tabpanel">
          <div class="px-2">
            <property-filter
              :side-bar="true"
              :icons="filters.property.icons"
              @iconChoosed="addProperty($event)"
            />
            <b-btn variant="primary" @click="doFilter"> Ok </b-btn>
          </div>
        </b-collapse>
        <!-- End property Tab -->

        <!-- Start category Tab -->
        <li
          v-b-toggle="'category'"
          class="p-2 border d-flex justify-content-between align-items-center font-3 mb-1"
        >
          <span>Categories</span>
          <i class="fas fa-caret-down" />
        </li>

        <b-collapse id="category" accordion="filters" role="tabpanel">
          <div class="px-2">
            <property-filter
              :side-bar="true"
              :icons="filters.categories.icons"
              @iconChoosed="addCategory($event)"
            />
            <b-btn variant="primary" @click="doFilter"> Ok </b-btn>
          </div>
        </b-collapse>
        <!-- End category Tab -->

        <!-- Start yta Tab -->
        <li
          v-b-toggle="'plats'"
          class="p-2 border d-flex justify-content-between align-items-center font-3 mb-1"
        >
          <span>Plats</span>
          <i class="fas fa-caret-down" />
        </li>

        <b-collapse id="plats" accordion="filters" role="tabpanel">
          <div class="px-2">
            <b-btn
              v-for="(country, key) in filters.plats.tabs"
              :key="key"
              variant="primary"
              class="mb-2 mr-2"
              @click="filters.plats.currentCountry = key"
            >
              {{ key }}
            </b-btn>
            <ul class="list-unstyled">
              <li
                v-for="(tab, index) in filters.plats.tabs[
                  filters.plats.currentCountry
                ]"
                :key="`sidebar-${tab.name}`"
                v-b-toggle="`sidebar-${tab.name}`"
                class="p-2 border font-3 mb-1"
              >
                <div
                  class="d-flex justify-content-between align-items-center mb-2"
                >
                  <span>{{ tab.text }}</span>
                  <i class="fas fa-caret-down" />
                </div>

                <b-collapse
                  :id="`sidebar-${tab.name}`"
                  accordion="stad"
                  role="tabpanel"
                >
                  <div class="px-2">
                    <b-form-group :key="renderKey">
                      <template v-slot:label>
                        <b-form-checkbox
                          :key="renderKey"
                          v-model="tab.allSelected"
                          :indeterminate="tab.indeterminate"
                          :aria-describedby="`sidebar-${tab.name}-choose-all`"
                          :aria-controls="`sidebar-${tab.name}-choose-all`"
                          size="md"
                          @change="toggleAll(index)"
                        >
                          <b class="font-2">Hela {{ tab.name }}</b>
                        </b-form-checkbox>
                      </template>

                      <b-form-checkbox-group
                        :id="`sidebar-${tab.name}`"
                        v-model="tab.selected"
                        :options="tab.subcity"
                        :name="`sidebar-${tab.name}`"
                        :aria-label="`sidebar-${tab.name}`"
                        stacked
                        @change="placeChoose(index)"
                      />
                    </b-form-group>
                    <b-btn variant="primary" @click="doFilter"> Ok </b-btn>
                  </div>
                </b-collapse>
              </li>
            </ul>
          </div>
        </b-collapse>
        <!-- End yta Tab -->
        <li>
          <b-button
            block
            class="mt-1 mt-sm-0"
            variant="warning"
            @click="clearFilters"
            v-text="$t('ledigaLokaler.filters.clear')"
          />
        </li>
      </ul>
    </b-container>
  </b-sidebar>
  <!-- End SideBar -->
</template>

<script>
import { mapGetters } from "vuex";
import { BootstrapVue, BIcon } from "bootstrap-vue";
import { sortItems } from "@/mixins/SortRegions";
import propertyFilter from "@/components/lediga/filter/property";
import ytaFilter from "@/components/lediga/filter/yta";
import allFilters from "@/mixins/filters";

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
  computed: {
    ...mapGetters({
      renderKey: "renderKey",
      AllPlaces: "listings",
      regions: "regions",
      tags: "tags",
      categories: "categories",
      used: "filters/used",
    }),
  },
};
</script>
