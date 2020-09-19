<template>
  <div style="overflow-x: hidden" class="mt-3">
    <loading :state="loadingState" />
    <!-- Sart Sidebar -->
    <b-sidebar
      id="more-filters"
      bg-variant="white"
      backdrop-variant="dark"
      backdrop
      shadow
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
            <client-only>
              <div class="px-2">
                <vue-slider
                  v-model="filters.used.price"
                  :min="filters.price.min"
                  :max="filters.price.max"
                  @change="priceChanged"
                />
                <small>{{ filters.used.price[0] || 0 }} Kr — {{ filters.used.price[1] || 0 }} Kr</small>
              </div>
            </client-only>
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
            <client-only>
              <div class="px-2">
                <vue-slider
                  v-model="filters.used.yta"
                  :min="filters.yta.min"
                  :max="filters.yta.max"
                  @change="ytaChanged"
                />
                <small>
                  {{ filters.used.yta[0] || 0 }} m
                  <sup>3</sup>
                  — {{ filters.used.yta[1] || 0 }} m
                  <sup>3</sup>
                </small>
              </div>
            </client-only>
          </b-collapse>
          <!-- End yta Tab -->

          <!-- Start yta Tab -->
          <li
            v-b-toggle="'property'"
            class="p-2 border d-flex justify-content-between align-items-center font-3 mb-1"
          >
            <span>{{ filters.property.text }}</span>
            <i class="fas fa-caret-down" />
          </li>

          <b-collapse id="property" accordion="filters" role="tabpanel">
            <div class="px-2">
              <b-button-group
                vertical
                class="d-flex flex-wrap align-items-center justify-content-between flex-row w-100"
              >
                <b-button
                  v-for="(icon) in filters.property.icons"
                  :key="icon.text"
                  :pressed.sync="icon.state"
                  variant="outline-primary"
                  squared
                  class="text-left m-1"
                  @click="addProperty(icon)"
                >
                  <b-img width="30" :src="`https://popup.dk.se/_nuxt/img/${icon.avatar}`" />
                  {{ icon.text }}
                </b-button>
              </b-button-group>
            </div>
          </b-collapse>
          <!-- End yta Tab -->

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
                  v-for="(tab, index) in filters.plats.tabs[filters.plats.currentCountry]"
                  :key="`sidebar-${tab.name}`"
                  v-b-toggle="`sidebar-${tab.name}`"
                  class="p-2 border font-3 mb-1"
                >
                  <div class="d-flex justify-content-between align-items-center mb-2">
                    <span>{{ tab.text }}</span>
                    <i class="fas fa-caret-down" />
                  </div>

                  <b-collapse :id="`sidebar-${tab.name}`" accordion="stad" role="tabpanel">
                    <div class="px-2">
                      <b-form-group :key="renderKey">
                        <template v-slot:label>
                          <b-form-checkbox
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

    <b-row class="mt-2">
      <!-- Start filters Bar -->
      <b-col cols="12">
        <b-container fluid>
          <b-row no-gutters class="py-2">
            <!-- Start Search Input -->
            <b-col cols="12" sm="9" md="4" class="mr-2 d-flex align-items-center">
              <b-input-group>
                <b-form-input
                  v-model="searchInput"
                  placeholder="Listing Name"
                />
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
                <b-dropdown-group
                  :header="$t('ledigaLokaler.filters.place')"
                  style="width: 500px !important; overflow: hidden"
                  class="px-2 custom-tab plats"
                >
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
              <b-dropdown
                id="property-dropdown"
                class="w-100"
                variant="light"
                :text="filters.property.text"
              >
                <b-dropdown-group :header="$t('ledigaLokaler.filters.propertyType')" style="width: 300px !important" class="px-1">
                  <b-button-group
                    vertical
                    class="d-flex flex-wrap align-items-center justify-content-between flex-row w-100"
                  >
                    <b-button
                      v-for="(icon) in filters.property.icons"
                      :key="icon.text"
                      :pressed.sync="icon.state"
                      variant="outline-primary"
                      squared
                      style="width: 45%"
                      class="text-left m-1"
                      @click="addProperty(icon)"
                    >
                      <b-img v-if="icon.avatar" width="30" :src="`https://popup.dk.se/_nuxt/img/${icon.avatar}`" />
                      {{ icon.text }}
                    </b-button>
                  </b-button-group>
                </b-dropdown-group>
              </b-dropdown>
            </b-col>
            <!-- End property Filter -->

            <!-- Start price Filter -->
            <b-col cols="12" md="auto" class="mr-2 d-none d-md-flex align-items-center">
              <b-dropdown
                id="price-dropdown"
                class="w-100"
                variant="light"
                right
                :text="filters.price.text"
              >
                <b-dropdown-group :header="$t('ledigaLokaler.filters.price')" style="width: 300px !important" class="px-3">
                  <vue-slider
                    v-model="filters.used.price"
                    :min="filters.price.min"
                    :max="filters.price.max"
                    @change="priceChanged"
                  />
                  <small>{{ filters.used.price[0] || 0 }} Kr — {{ filters.used.price[1] || 0 }} Kr</small>
                </b-dropdown-group>
              </b-dropdown>
            </b-col>
            <!-- End price Filter -->

            <!-- Start yta Filter -->
            <b-col cols="12" md="auto" class="mr-2 d-none d-lg-flex align-items-center">
              <b-dropdown
                id="yta-dropdown"
                class="w-100"
                variant="light"
                right
                :text="filters.yta.text"
              >
                <b-dropdown-group :header="$t('ledigaLokaler.filters.surface')" style="width: 300px !important" class="px-3">
                  <vue-slider
                    v-model="filters.used.yta"
                    :min="filters.yta.min"
                    :max="filters.yta.max"
                    @change="ytaChanged"
                  />
                  <small>
                    {{ filters.used.yta[0] || 0 }} m
                    <sup>3</sup>
                    — {{ filters.used.yta[1] || 0 }} m
                    <sup>3</sup>
                  </small>
                </b-dropdown-group>
              </b-dropdown>
            </b-col>

            <b-col cols="12" md="auto" class="mr-2 d-none d-lg-flex align-items-center">
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
                  v-model="layout.value"
                  buttons
                  button-variant="outline-primary"
                >
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
      </b-col>
      <!-- End filters Bar -->

      <!-- Start Listings -->
      <b-col cols="12" :md="layout.value === $t('ledigaLokaler.map') ? 6 : 12" class="wrapper">
        <b-container>
          <!-- Start if empty -->
          <b-row v-if="cards.length === 0" align-h="center" align-content="center">
            <p class="text-center text-secondary">
              There is No Listing yet
            </p>
          </b-row>
          <!-- End if empty -->

          <!-- start lodaing -->
          <b-row v-else-if="loadingCards && cards.length <= 0">
            <b-col
              v-for="(card, index) in 5"
              :key="String(index)"
              class="my-2"
              cols="12"
              :md="layout.value === $t('ledigaLokaler.map') ? 12 : 6"
              :lg="layout.value === $t('ledigaLokaler.map') ? 6 : 4"
            >
              <div class="skeleton" />
            </b-col>
          </b-row>
          <!-- End lodaing -->

          <!-- start if Listing -->
          <b-row v-else>
            <!-- Start Listing header -->
            <b-col cols="12" class="d-flex sticky justify-content-between align-items-center">
              <b-dropdown id="sorting" :text="sortedBy" class="m-md-2">
                <b-dropdown-item @click="sorting($t('ledigaLokaler.sorting.latest'))">
                  {{ $t('ledigaLokaler.sorting.latest') }}
                </b-dropdown-item>
                <b-dropdown-divider />
                <b-dropdown-item @click="sorting($t('ledigaLokaler.sorting.oldest'))">
                  {{ $t('ledigaLokaler.sorting.oldest') }}
                </b-dropdown-item>
                <b-dropdown-divider />
                <b-dropdown-item @click="sorting($t('ledigaLokaler.sorting.priceLowToHigh'))">
                  {{ $t('ledigaLokaler.sorting.priceLowToHigh') }}
                </b-dropdown-item>
                <b-dropdown-divider />
                <b-dropdown-item @click="sorting($t('ledigaLokaler.sorting.priceHighToLow'))">
                  {{ $t('ledigaLokaler.sorting.priceHighToLow') }}
                </b-dropdown-item>
                <b-dropdown-divider />
                <b-dropdown-item @click="sorting($t('ledigaLokaler.sorting.sizeLowToHigh'))">
                  {{ $t('ledigaLokaler.sorting.sizeLowToHigh') }}
                </b-dropdown-item>
                <b-dropdown-divider />
                <b-dropdown-item @click="sorting($t('ledigaLokaler.sorting.sizeHighToLow'))">
                  {{ $t('ledigaLokaler.sorting.sizeHighToLow') }}
                </b-dropdown-item>
              </b-dropdown>

              <p class="p-0 m-0">
                {{ cards.length }} {{ $t('ledigaLokaler.lsiting') }}
              </p>
            </b-col>
            <!-- End Listing header -->

            <!-- Start Listing -->
            <b-col
              v-for="(card, index) in cards"
              :key="String(index)"
              class="my-2"
              cols="12"
              :md="6"
              :lg="layout.value === $t('ledigaLokaler.map') ? 6 : 4"
              :xl="layout.value === $t('ledigaLokaler.map') ? 4 : 3"
            >
              <listing-card :card="card" :layout="layout.value" @showPlace="setCenter($event)" />
            </b-col>
            <!-- End Listing -->
          </b-row>
          <!-- End if Listing -->
        </b-container>
      </b-col>
      <!-- End Listings -->

      <!-- Start Map -->
      <b-col v-if="layout.value === $t('ledigaLokaler.map')" cols="12" md="6" class="map-wrapper d-md-flex">
        <GMap :all-places="AllPlaces" />
      </b-col>
      <!-- End Map -->
    </b-row>

    <!-- Strat Toggle Layout in small screens -->
    <div class="mobile-btns px-3 d-md-none position-fixed d-flex justify-content-between align-items-center">
      <b-btn
        pill
        variant="dark"
        class="w-50 mr-2"
        @click="(layout.value === $t('ledigaLokaler.map')) ? layout.value = $t('ledigaLokaler.list') : layout.value = $t('ledigaLokaler.map'); refreshMap"
      >
        {{ (layout.value === $t('ledigaLokaler.map')) ? $t('ledigaLokaler.list') : $t('ledigaLokaler.map') }} {{ $t('ledigaLokaler.view') }}
      </b-btn>

      <b-btn pill variant="dark" class="w-50">
        Save search
      </b-btn>
    </div>
    <!-- End Toggle Layout in small screens -->
  </div>
</template>

<script>
import { BootstrapVue, BIcon } from 'bootstrap-vue'
import 'vue-slider-component/theme/material.css'
import { sortItems } from '@/mixins/SortRegions'

import GMap from '@/components/lediga/Map'

let VueSlider
if (process.browser) {
  VueSlider = require('vue-slider-component')
}

/**
 * Property: selected will be true in boject
 * Plats: value in each tab will be found in tab.selected
 */

export default {
  name: 'LedigaLokaler',
  components: {
    GMap,
    // eslint-disable-next-line vue/no-unused-components
    BootstrapVue,
    // eslint-disable-next-line vue/no-unused-components
    BIcon,
    VueSlider
  },
  mixins: [sortItems],
  data () {
    return {
      loadingState: false,
      loadingCards: false,
      sortedBy: this.$t('ledigaLokaler.sorting.latest'),
      layout: {
        value: this.$t('ledigaLokaler.list')
      },
      searchInput: null,
      filters: {
        used: {
          search: null,
          price: [],
          plats: [],
          property: [],
          yta: []
        },
        plats: {
          currentCountry: '',
          currentCity: 0,
          text: this.$t('ledigaLokaler.filters.place'),
          tabs: {}
        },
        price: {
          text: this.$t('ledigaLokaler.filters.price'),
          min: 0,
          max: 0
        },
        property: {
          text: this.$t('ledigaLokaler.filters.propertyType'),
          choose: [],
          icons: []
        },
        yta: {
          text: this.$t('ledigaLokaler.filters.surface'),
          min: 0,
          max: 0,
          enableCross: false
        }
      },
      cards: [],
      AllPlaces: []
    }
  },
  computed: {
    lang () {
      return this.$i18n.getLocaleCookie()
    },
    renderKey () {
      return this.$store.state.changeSidebarRenderKey
    }
  },
  watch: {
    searchInput (val) {
      this.filters.used.search = val
      this.doFilter()
    }
  },
  mounted () {
    if (window.innerWidth >= '768') {
      this.layout.value = this.$t('ledigaLokaler.map')
    }

    this.loadingCards = false
    this.loadingState = false
  },
  async created () {
    this.loadingCards = true
    this.loadingState = true

    const promises = [
      this.$axios.$get('/places'),
      this.$axios.$get('/region'),
      this.$axios.$get('/tag')
    ]

    await Promise.all(promises).then((res) => {
      this.AllPlaces = res[0].data
      const regions = res[1].data
      const tags = res[2].data

      const minMaxPrice = this.getMinAndMax('price', 'prioteradpris')
      const minMaxYta = this.getMinAndMax('yta', 'yta')

      this.filters.used.price = minMaxPrice
      this.filters.used.yta = minMaxYta

      const sortedRegions = this.sortItems(regions, false)

      sortedRegions.forEach((country) => {
        if (!country.parent) {
          this.filters.plats.tabs[country.name[this.lang]] = []
        }

        if (country.cities) {
          country.cities.forEach((city) => {
            // eslint-disable-next-line no-return-assign
            const array1 = city.subCities
              ? city.subCities.map(x => (x.name = x.name[this.lang]))
              : []

            let all = 0
            city.subCities.forEach((subCity) => {
              // console.log('subCity: ', subCity.name)
              all += this.AllPlaces.filter(place => place.stad[this.lang] === subCity.name).length
            })

            this.filters.plats.tabs[country.name[this.lang]].push({
              name: city.name[this.lang],
              text: `${city.name[this.lang]} (${all})`,
              allSelected: false, // Shape of the check
              indeterminate: false, // Shape of the check
              selected: [],
              subcity: array1
            })
          })
        }
      })

      this.cards = this.AllPlaces

      this.filters.property.icons = tags.map((x) => {
        return {
          text: x.name[this.lang],
          avatar: x.avatar,
          state: false
        }
      })

      this.filters.plats.currentCountry = Object.keys(
        this.filters.plats.tabs
      )[0]
    })
  },
  methods: {
    // Utils
    /**
     * @param { String } Obj the object in the instance
     * @param { String } prop the property you want to fitler with
     */
    getMinAndMax (obj, prop) {
      let min = 0
      let max = 0
      this.AllPlaces.forEach((place) => {
        // Get minimum and maximum price
        if (place[prop] < min && place[prop] < max) {
          min = place[prop]
        } else if (place[prop] > min && place[prop] > max) {
          max = place[prop]
        }
      })
      this.filters[obj].min = min
      this.filters[obj].max = max

      if (this.filters[obj].min >= this.filters[obj].max) {
        this.filters[obj].max *= 100
      }

      return [min, max]
    },
    formatPrices (num) {
      return String(num).replace(/(?<!\..*)(\d)(?=(?:\d{3})+(?:\.|$))/g, '$1 ')
    },

    // Filters Functions
    doFilter () {
      this.loadingCards = true
      const used = this.filters.used
      const plats = this.filters.plats
      const chooesdTags = this.filters.used.property

      used.plats = [plats.currentCountry]
      // const selectedCity = [plats.currentCountry]

      for (const key in plats.tabs) {
        if (plats.tabs.hasOwnProperty(key)) {
          const country = plats.tabs[key]
          country.forEach((city) => {
            [...city.selected].forEach(x => console.log(`Unicode of ${x}: `, String.fromCharCode(x)))
            used.plats.push(...city.selected)
            console.log(used.plats)
          })
        }
      }

      this.cards = this.AllPlaces.filter((x) => {
        const re = new RegExp(this.filters.used.search, 'ig') // Search input

        console.log('asdsadddsfdasda', x.egenskaper)
        // Find Tags
        let existedTag
        if (x.egenskaper.length === 0) {
          existedTag = true
        } else {
          for (const i of x.egenskaper) {
            if (chooesdTags.length === 0) { // If There is no property filter
              existedTag = true
              break
            } else if (!existedTag) { // If There is a property filter and we didn't get the existed tag yet
              console.log(chooesdTags.map(tags => tags.text))
              console.log(i.name[this.$i18n.locale])
              existedTag = chooesdTags.map(tags => tags.text).includes(i.name[this.$i18n.locale])
            }
          }
        }

        const thereIsChoosePlace = (used.plats.length <= 1) ? true : used.plats.includes(x.stad.en)
        const thereIsSearch = (!this.filters.used.search) ? true : x.title.en.match(re)

        console.log('=====================START======================')
        console.log('x.stad', x.stad)
        console.log(`x.prioteradpris(${x.prioteradpris}) >= used.price[0] : `, x.prioteradpris >= used.price[0])
        console.log('x.prioteradpris <= used.price[1]: ', x.prioteradpris <= used.price[1])
        console.log(`x.yta(${x.prioteradpris}) >= used.yta[0]: `, x.yta >= used.yta[0])
        console.log(' x.yta <= used.yta[1]: ', x.yta <= used.yta[1])
        console.log('thereIsChoosePlace: ', thereIsChoosePlace)
        console.log('thereIsSearch ', thereIsSearch)
        console.log('existedTag ? existedTag ', existedTag)

        const result =
          (x.prioteradpris >= used.price[0] && x.prioteradpris <= used.price[1]) &&
          (x.yta >= used.yta[0] && x.yta <= used.yta[1]) &&
          thereIsChoosePlace &&
          thereIsSearch &&
          existedTag

        console.log('result: ', result)
        console.log('=====================END======================')

        return result
      })

      // if (
      //   this.filters.used.plats.length === 1 &&
      //   this.filters.used.price.length === 2 &&
      //   this.filters.used.property.length === 0 &&
      //   this.filters.used.yta.length === 2 &&
      //   (this.filters.used.search === null || this.filters.used.search === '')
      // ) { this.cards = this.AllPlaces }

      this.loadingCards = false
    },
    sorting (sort) {
      console.log(this.cards)
      this.sortedBy = sort
      if (sort === this.$t('ledigaLokaler.sorting.latest')) {
        // console.log(1)
        this.cards = this.cards.sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime())
      } else if (sort === this.$t('ledigaLokaler.sorting.oldest')) {
        // console.log(2)
        this.cards = this.cards.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
      } else if (sort === this.$t('ledigaLokaler.sorting.priceLowToHigh')) {
        // console.log(3)
        this.cards = this.cards.sort((a, b) => a.prioteradpris - b.prioteradpris)
      } else if (sort === this.$t('ledigaLokaler.sorting.priceHighToLow')) {
        // console.log(4)
        this.cards = this.cards.sort((a, b) => b.prioteradpris - a.prioteradpris)
      } else if (sort === this.$t('ledigaLokaler.sorting.sizeLowToHigh')) {
        // console.log(5)
        this.cards = this.cards.sort((a, b) => a.yta - b.yta)
      } else if (sort === this.$t('ledigaLokaler.sorting.sizeHighToLow')) {
        // console.log(6)
        this.cards = this.cards.sort((a, b) => b.yta - a.yta)
      }
    },
    clearFilters () {
      const { price, yta } = this.filters

      // Reset Price
      this.filters.used.price = [price.min, price.max]
      this.filters.price.text = this.$t('ledigaLokaler.filters.price')

      // Reset yta
      this.filters.yta.text = this.$t('ledigaLokaler.filters.surface')
      this.filters.used.yta = [yta.min, yta.max]

      // Reset search
      this.filters.used.search = null

      // Reset Places
      this.filters.used.plats = ['Sverige']

      // Reset Properties
      this.filters.property.icons.forEach((x) => { x.state = false })
      this.filters.used.property = []

      // Reset places
      const tabs = this.filters.plats.tabs
      for (const country in tabs) {
        if (tabs.hasOwnProperty(country)) {
          const element = tabs[country]
          element.forEach((x) => {
            x.selected = []
            this.$nextTick(() => {
              x.allSelected = false
              x.indeterminate = false
            })
          })
        }
      }

      this.$forceUpdate()

      // Reset cards
      this.cards = this.AllPlaces
    },

    priceChanged (w) {
      this.filters.used.price = w
      console.log(w)
      if (w[0] === this.filters.price.min && w[1] === this.filters.price.max) {
        this.filters.price.text = this.$t('ledigaLokaler.filters.price')
      } else {
        this.filters.price.text = `${this.formatPrices(w[0])}Kr - ${this.formatPrices(w[1])}Kr`
      }
      this.doFilter()
    },
    ytaChanged (w) {
      this.filters.used.yta = w
      if (w[0] === this.filters.yta.min && w[1] === this.filters.yta.max) {
        this.filters.yta.text = this.$t('ledigaLokaler.filters.surface')
      } else {
        this.filters.yta.text = `${this.formatPrices(w[0])}m2 - ${this.formatPrices(w[1])}m2`
      }
      this.doFilter()
    },
    toggleAll (index) {
      const arr = this.filters.plats.tabs[this.filters.plats.currentCountry][
        index
      ]
      // console.log(arr)

      const subcities = arr.selected.length !== arr.subcity.length ? arr.subcity.slice() : []
      arr.selected = arr.selected.includes(arr.name) ? (arr.selected = []) : (arr.selected = [arr.name, ...subcities])

      this.doFilter()
      this.$forceUpdate()
    },
    placeChoose (index) {
      const arr = this.filters.plats.tabs[this.filters.plats.currentCountry][index]
      this.$nextTick(() => {
        if (arr.selected.length === 2) {
          arr.indeterminate = false
          arr.allSelected = false
        } else if (arr.selected.length === arr.subcity.length + 2) {
          arr.indeterminate = false
          arr.allSelected = true
        } else {
          arr.indeterminate = true
          arr.allSelected = false
        }
        this.$forceUpdate()
        this.doFilter()
      })
    },
    addProperty (button) {
      const x = this.filters.property.icons.filter(x => x.state)
      this.filters.used.property = x
      this.doFilter()
    }
  }
}
</script>

<style scoped>
.mobile-btns {
  bottom: 5px;
  left: 50%;
  width: 100%;
  transform: translate(-50%, -50%);
  z-index: 9999;
}
@media (max-width: 767.98px) {
  .map-wrapper {
    padding: 0 !important;
    margin: 0 !important;
    display: block !important;
    position: fixed;
    z-index: 25;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }
}

.dropdown-header {
  padding: 0 !important;
  padding-bottom: 10px !important;
}

.wrapper {
  max-height: 100vh;
  overflow-y: scroll;
}

.vue-map-container {
  height: 100vh;
  width: 100%;
}

.choices,
.choices * {
  height: auto !important;
}

span ~ button.list-group-item {
  background-color: #ddd !important;
}

.custom-tab,
.custom-tab div {
  height: 300px;
}
</style>
