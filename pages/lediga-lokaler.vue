<template>
  <div style="overflow-x: hidden">
    <loading :state="loading" />
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
            <div class="px-2">
              <vue-slider
                v-model="filters.price.value"
                :min="filters.price.min"
                :max="filters.price.max"
                @change="priceChanged"
              />
              <small>{{ filters.price.value[0] || 0 }} Kr — {{ filters.price.value[1] || 0 }} Kr</small>
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
              <vue-slider
                v-model="filters.yta.value"
                :min="filters.yta.min"
                :max="filters.yta.max"
                @change="ytaChanged"
              />
              <small>
                {{ filters.yta.value[0] || 0 }} m
                <sup>3</sup>
                — {{ filters.yta.value[1] || 0 }} m
                <sup>3</sup>
              </small>
            </div>
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
                  placeholder="Address, City, Zip, Neighborhood, School"
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
                  header="plats"
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
                <b-dropdown-group header="property" style="width: 300px !important" class="px-1">
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
                      <b-img width="30" :src="`https://popup.dk.se/_nuxt/img/${icon.avatar}`" />
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
                <b-dropdown-group header="Price" style="width: 300px !important" class="px-3">
                  <vue-slider
                    v-model="filters.price.value"
                    :min="filters.price.min"
                    :max="filters.price.max"
                    @change="priceChanged"
                  />
                  <small>{{ filters.price.value[0] || 0 }} Kr — {{ filters.price.value[1] || 0 }} Kr</small>
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
                <b-dropdown-group header="Yta" style="width: 300px !important" class="px-3">
                  <vue-slider
                    v-model="filters.yta.value"
                    :min="filters.yta.min"
                    :max="filters.yta.max"
                    @change="ytaChanged"
                  />
                  <small>
                    {{ filters.yta.value[0] || 0 }} m
                    <sup>3</sup>
                    — {{ filters.yta.value[1] || 0 }} m
                    <sup>3</sup>
                  </small>
                </b-dropdown-group>
              </b-dropdown>
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
                v-text="'More Filters'"
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
                  <b-form-radio value="list">
                    <i class="fas fa-list mr-1" />
                    List
                  </b-form-radio>
                  <b-form-radio value="map">
                    <i class="far fa-map mr-1" />
                    Map
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
      <b-col cols="12" :md="layout.value === 'map' ? 6 : 12" class="wrapper">
        <b-container>
          <b-row>
            <b-col
              v-for="(card, index) in cards"
              :key="String(index)"
              class="my-2"
              cols="12"
              :md="layout.value === 'map' ? 12 : 6"
              :lg="layout.value === 'map' ? 6 : 4"
            >
              <listing-card :card="card" :layout="layout.value" @showPlace="setCenter($event)" />
            </b-col>
          </b-row>
        </b-container>
      </b-col>
      <!-- End Listings -->

      <!-- Start Map -->
      <b-col v-if="layout.value === 'map'" cols="12" md="6" class="map-wrapper d-md-flex">
        <gmap-map ref="mapRef" :key="renderKey" :center="map.center" :map-type-id="map.mapTypeId" :zoom="7">
          <gmap-info-window :options="infoOptions" :position="infoWindowPos" :opened="infoWinOpen" @closeclick="infoWinOpen=false">
            <p>hey</p>
          </gmap-info-window>
          <gmap-cluster>
            <gmap-marker v-for="(mark, index) in map.markers" :key="index" :clickable="true" :position="mark" @click="toggleInfoWindow(mark, index)" />
          </gmap-cluster>
        </gmap-map>
      </b-col>
      <!-- End Map -->
    </b-row>

    <!-- Strat Toggle Layout in small screens -->
    <div
      class="mobile-btns px-3 d-md-none position-fixed d-flex justify-content-between align-items-center"
    >
      <b-btn
        pill
        variant="dark"
        class="w-50 mr-2"
        @click="(layout.value === 'map') ? layout.value = 'list' : layout.value = 'map'; refreshMap"
      >
        {{ (layout.value === 'map') ? 'list' : 'map' }} View
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
    // eslint-disable-next-line vue/no-unused-components
    BootstrapVue,
    // eslint-disable-next-line vue/no-unused-components
    BIcon,
    VueSlider
  },
  mixins: [sortItems],
  data () {
    return {
      loading: false,
      map: {
        center: { lat: 59.334591, lng: 18.06324 },
        mapTypeId: 'roadmap',
        markers: []
      },
      infoWindowPos: null,
      infoWinOpen: false,
      currentMidx: null,

      infoOptions: {
        content: '',
        // optional: offset infowindow so it visually sits nicely on top of our marker
        pixelOffset: {
          width: 0,
          height: -35
        }
      },
      layout: {
        value: 'map'
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
          text: 'Plats',
          tabs: {}
        },
        price: {
          text: 'Price',
          min: 0,
          max: 0,
          value: [0, 100]
        },
        property: {
          text: 'Property type',
          choose: [],
          icons: []
        },
        yta: {
          text: 'Yta',
          min: 0,
          max: 0,
          value: [0, 100],
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
  async created () {
    this.loading = true
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

      this.filters.price.value = minMaxPrice
      this.filters.used.price = minMaxPrice
      this.filters.yta.value = minMaxYta
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

            this.filters.plats.tabs[country.name[this.lang]].push({
              name: city.name[this.lang],
              text: `${city.name[this.lang]} (${city.subCities.length})`,
              allSelected: false, // Shape of the check
              indeterminate: false, // Shape of the check
              selected: [],
              subcity: array1
            })
          })
        }
      })

      this.pinMarkers(this.AllPlaces)

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
      this.loading = false
    })
  },
  methods: {
    // Map Functions
    setCenter (x) {
      this.layout.value = 'map'
      this.map.center = { lng: x[0], lat: x[1] }
    },
    pinMarkers (places) {
      this.cards = places
      this.map.markers = this.cards.map((x) => {
        return {
          lng: x.location.coordinates[0],
          lat: x.location.coordinates[1],
          infoText: `
            <a class="d-block" href='/lokal/${x.title.sv}'>
              <div style="background-image: url('https://popup.dk.se/_nuxt/img/${x.cover[0]}'); width: 200px; height: 200px; background-size: cover; background-repeat: no-repeat"/>
              <div >
                <div style="z-index: 4;position: absolute;  bottom: 0;  left: 0; width: 100%;  padding: 5px;  background: rgba(0,0,0,0.8); color: black;" />
                <h3 style="padding: 0, margin: 0; color: white">${x.title.sv}</h3>
              </div>
            </a>
          `
        }
      })
    },
    refreshMap () {
      this.$store.commit('changeSidebarRenderKey')
    },
    toggleInfoWindow (marker, idx) {
      console.log(marker)
      console.log(idx)
      this.infoWindowPos = {
        lng: marker.lng,
        lat: marker.lat
      }
      this.infoOptions.content = marker.infoText

      // check if its the same marker that was selected if yes toggle
      if (this.currentMidx === idx) {
        this.infoWinOpen = !this.infoWinOpen
      } else {
        // if different marker set infowindow to open and reset current marker index
        this.infoWinOpen = true
        this.currentMidx = idx
      }
    },

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

    // Filters Functions
    doFilter () {
      const used = this.filters.used
      const plats = this.filters.plats

      used.plats = [plats.currentCountry]
      // const selectedCity = [plats.currentCountry]

      for (const key in plats.tabs) {
        if (plats.tabs.hasOwnProperty(key)) {
          const country = plats.tabs[key]
          country.forEach((city) => {
            used.plats.push(...city.selected)
          })
        }
      }

      this.cards = this.AllPlaces.filter((x) => {
        const re = new RegExp(this.filters.used.search, 'ig')
        let existedTag
        for (const i of x.egenskaper) {
          if (this.filters.property.choose.length === 0) {
            existedTag = true
            break
          } else if (!existedTag) {
            console.log(this.filters.property.choose.map(tags => tags.text))
            console.log(i.name[this.$i18n.locale])
            existedTag = this.filters.property.choose.map(tags => tags.text).includes(i.name[this.$i18n.locale])
          } else {
            break
          }
        }

        const thereIsChoosePlace = (used.plats.length <= 1) ? true : used.plats.includes(x.stad[this.$i18n.locale])
        const thereIsSearch = (!this.filters.used.search) ? true : x.title[this.$i18n.locale].match(re)

        console.log('x.prioteradpris >= used.price[0] : ', x.prioteradpris >= used.price[0])
        console.log('x.prioteradpris <= used.price[1]: ', x.prioteradpris <= used.price[1])
        console.log(' x.yta >= used.yta[0]: ', x.yta >= used.yta[0])
        console.log(' x.yta <= used.yta[1]: ', x.yta <= used.yta[1])
        console.log('thereIsChoosePlace: ', thereIsChoosePlace)
        console.log('thereIsSearch ', thereIsSearch)
        console.log('existedTag ? existedTag ', existedTag)

        console.log('result: ', (x.prioteradpris >= used.price[0] &&
          x.prioteradpris <= used.price[1]) &&
          (x.yta >= used.yta[0] &&
          x.yta <= used.yta[1]) &&
          thereIsChoosePlace &&
          thereIsSearch && (existedTag))

        return (
          (x.prioteradpris >= used.price[0] &&
          x.prioteradpris <= used.price[1]) &&
          (x.yta >= used.yta[0] &&
          x.yta <= used.yta[1]) &&
          thereIsChoosePlace &&
          // eslint-disable-next-line no-unneeded-ternary
          thereIsSearch && (!existedTag ? false : true)
        )
      })

      if (
        this.filters.used.plats.length === 1 &&
        this.filters.used.price.length === 2 &&
        this.filters.used.property.length === 0 &&
        this.filters.used.yta.length === 2 &&
        this.filters.used.search === null
      ) { this.cards = this.AllPlaces }
    },
    priceChanged (w) {
      this.filters.used.price = w
      console.log(w)
      this.filters.price.text = `Max $${w[1]}`
      this.doFilter()
    },
    ytaChanged (w) {
      this.filters.used.yta = w
      this.doFilter()
    },
    toggleAll (index) {
      const arr = this.filters.plats.tabs[this.filters.plats.currentCountry][
        index
      ]
      // console.log(arr)

      const subcities =
        arr.selected.length !== arr.subcity.length ? arr.subcity.slice() : []
      arr.selected = arr.selected.includes(arr.name)
        ? (arr.selected = [])
        : (arr.selected = [arr.name, ...subcities])

      this.doFilter()
      this.$forceUpdate()
    },
    placeChoose (index) {
      const arr = this.filters.plats.tabs[this.filters.plats.currentCountry][
        index
      ]
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
      this.filters.property.choose = x
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
