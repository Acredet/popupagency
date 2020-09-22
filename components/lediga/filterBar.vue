<template>
  <b-container fluid>
    <b-row no-gutters class="py-2">
      <!-- Start Search Input -->
      <b-col cols="12" sm="9" md="4" class="mr-2 d-flex align-items-center">
        <b-input-group>
          <b-form-input v-model="filters.used.search" placeholder="Listing Name" />
          <b-input-group-append>
            <b-button variant="outline-primary">
              <i class="fas fa-search" />
            </b-button>
          </b-input-group-append>
        </b-input-group>
      </b-col>
      <!-- End Search Input -->

      <!-- Start plats Filter -->
      <b-col cols="12" md="auto" class="mr-2 d-none d-md-flex align-items-center">
        <b-dropdown id="plats-dropdown" variant="light" :text="filters.plats.text">
          <!-- Start first horizontal tab -->
          <b-dropdown-group :header="$t('ledigaLokaler.filters.place')" style="width: 500px !important; overflow: hidden" class="px-2 custom-tab plats">
            <b-btn v-for="(country, key) in filters.plats.tabs" :key="key" variant="primary" class="mb-2 mr-2" @click="filters.plats.currentCountry = key">
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
                v-for="(tab, index) in filters.plats.tabs[filters.plats.currentCountry]"
                :key="tab.name"
                title-item-class="tabBtn"
                :title="tab.text"
              >
                <b-card-body class="mt-0 pt-0 px-1">
                  <div class="choices">
                    <b-form-group :key="renderKey">
                      <template v-slot:label>
                        <b-form-checkbox
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
          </b-dropdown-group>
        </b-dropdown>
      </b-col>
      <!-- End plats Filter -->

      <!-- Start property Filter -->
      <b-col cols="12" md="auto" class="mr-2 d-none d-lg-flex align-items-center">
        <b-dropdown id="property-dropdown" class="w-100" variant="light" :text="filters.property.text">
          <b-dropdown-group :header="$t('ledigaLokaler.filters.propertyType')" style="width: 300px !important" class="px-1">
            <property-filter :icons="filters.property.icons" @iconChoosed="addProperty($event)" />
          </b-dropdown-group>
        </b-dropdown>
      </b-col>
      <!-- End property Filter -->

      <!-- Start price Filter -->
      <b-col cols="12" md="auto" class="mr-2 d-none d-md-flex align-items-center">
        <b-dropdown id="price-dropdown" class="w-100" variant="light" right :text="filters.price.text">
          <b-dropdown-group :header="$t('ledigaLokaler.filters.price')" style="width: 300px !important" class="px-3">
            <client-only>
              <yta-filter :identifier="2" :slider-type="'price'" :min-and-max="filters.price" @ytaChanged="ytaChanged('price', $event)" />
            </client-only>
          </b-dropdown-group>
        </b-dropdown>
      </b-col>
      <!-- End price Filter -->

      <!-- Start yta Filter -->
      <b-col cols="12" md="auto" class="mr-2 d-none d-lg-flex align-items-center">
        <b-dropdown id="yta-dropdown" class="w-100" variant="light" right :text="filters.yta.text">
          <b-dropdown-group :header="$t('ledigaLokaler.filters.surface')" style="width: 300px !important" class="px-3">
            <client-only>
              <yta-filter :identifier="10" :slider-type="'yta'" :min-and-max="filters.yta" @ytaChanged="ytaChanged('yta', $event)" />
            </client-only>
          </b-dropdown-group>
        </b-dropdown>
      </b-col>

      <b-col cols="12" md="auto" class="mr-2 d-none d-lg-flex align-items-center">
        <b-button block class="mt-1 mt-sm-0" variant="warning" @click="clearFilters" v-text="$t('ledigaLokaler.filters.clear')" />
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
      <b-col cols="12" md="auto" class="d-none ml-auto d-md-flex align-items-center justify-content-end">
        <b-form-group class="p-0 m-0">
          <b-form-radio-group id="layout-btns" v-model="layout" buttons button-variant="outline-primary">
            <b-form-radio :value="$t('ledigaLokaler.list')">
              <i class="fas fa-list mr-1" />
              {{ $t('ledigaLokaler.list') }}
            </b-form-radio>
            <b-form-radio :value="$t('ledigaLokaler.map')">
              <i class="far fa-map mr-1" />
              {{ $t('ledigaLokaler.map') }}
            </b-form-radio>
          </b-form-radio-group>
        </b-form-group>
      </b-col>
      <!-- End layout buttons -->
    </b-row>
  </b-container>
</template>

<script>
import { mapGetters } from 'vuex'
import { BootstrapVue, BIcon } from 'bootstrap-vue'
import { sortItems } from '@/mixins/SortRegions'
import allFilters from '@/mixins/filters'
import propertyFilter from '@/components/lediga/filter/property'
import ytaFilter from '@/components/lediga/filter/yta'

export default {
  components: {
    // eslint-disable-next-line vue/no-unused-components
    BootstrapVue,
    // eslint-disable-next-line vue/no-unused-components
    BIcon,
    propertyFilter,
    ytaFilter
  },
  mixins: [sortItems, allFilters],
  data () {
    return {
      layout: this.$t('ledigaLokaler.list')
    }
  },
  computed: {
    ...mapGetters({
      used: 'filters/used',
      AllPlaces: 'listings',
      regions: 'regions',
      renderKey: 'renderKey',
      tags: 'tags'
    })
  },
  watch: {
    layout (newValue) {
      this.$emit('changeLayout', this.layout)
    }
  }
}
</script>
