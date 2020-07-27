<template>
  <b-row>
    <b-col cols="12" md="6" class="wrapper">
      <b-container>
        <b-row>
          <b-col cols="12">
            <b-form-input type="search" placeholder="Sök på något..." />
          </b-col>

          <b-col cols="12">
            <b-tabs content-class="border p-2" fill>
              <!-- Start first horizontal tab -->
              <b-tab active title="Plats" @click="tabClicked(1)">
                <div v-if="show1">
                  <b-button class="mb-3 bg-our-primary">
                    Sverige
                  </b-button>
                  <div class="custom-tab border plats">
                    <div class="cities w-full">
                      <!-- Start Tabs -->
                      <b-tabs
                        nav-wrapper-class="w-25 h-100 overflow-auto border"
                        nav-class="d-block p-0 m-0"
                        pills
                        card
                        content-class="overflow-auto"
                        vertical
                      >
                        <!-- Start First tab -->

                        <b-tab
                          v-for="(tab, index) in tabs"
                          :key="String(index)"
                          title-item-class="tabBtn"
                          :title="tab.text"
                        >
                          <b-card-body class="p-1">
                            <div class="choices">
                              <b-form-group>
                                <template v-slot:label>
                                  <b-form-checkbox
                                    v-model="tabs[index].allSelected"
                                    :indeterminate="tabs[index].indeterminate"
                                    :aria-describedby="tabs[index].name"
                                    :aria-controls="tabs[index].name"
                                    size="md"
                                    @change="toggleAll(index)"
                                  >
                                    <b class="font-2">Hela {{ tabs[index].name }}</b>
                                  </b-form-checkbox>
                                </template>

                                <b-form-checkbox-group
                                  :id="tabs[index].name"
                                  v-model="tabs[index].selected"
                                  :options="tabs[index].options"
                                  :name="tabs[index].name"
                                  aria-label="Individual popup"
                                  stacked
                                  @change="changed(index)"
                                />
                              </b-form-group>
                            </div>
                          </b-card-body>
                        </b-tab>
                        <!-- End First tab -->

                        <!-- End tabs -->
                      </b-tabs>
                    </div>
                  </div>
                  <div class="mt-3 d-flex justify-content-end">
                    <b-button class="mr-1" @click="show1 = !show1">
                      close
                    </b-button>
                    <b-button class="bg-our-primary" @click="show1 = !show1">
                      ok
                    </b-button>
                  </div>
                </div>
              </b-tab>
              <!-- End first horizontal tab -->

              <!-- Start second horizontal tab -->
              <b-tab active title="Lokaltyp" @click="tabClicked(2)">
                <div v-if="show2">
                  <b-row>
                    <!-- Start left buttons -->
                    <b-col cols="6">
                      <b-button-group vertical class="w-100">
                        <b-button
                          v-for="(icon) in icons.slice(0,6)"
                          :key="icon.text"
                          :pressed.sync="icon.state"
                          variant="primary"
                          class="text-left"
                          @click="addFilter(icon)"
                        >
                          <i :class="`fas fa-${icon.icon}`" />
                          {{ icon.text }}
                        </b-button>
                      </b-button-group>
                    </b-col>
                    <!-- End Left buttons -->

                    <!-- Start right buttons -->
                    <b-col cols="6">
                      <b-button-group vertical class="w-100">
                        <b-button
                          v-for="(icon) in icons.slice(6,12)"
                          :key="icon.text"
                          :pressed.sync="icon.state"
                          variant="primary"
                          class="text-left"
                          @click="addFilter(icon)"
                        >
                          <i :class="`fas fa-${icon.icon}`" />
                          {{ icon.text }}
                        </b-button>
                      </b-button-group>
                    </b-col>
                    <!-- End right buttons -->

                    <b-col cols="12" class="mt-3 d-flex justify-content-end">
                      <b-button class="mr-1" @click="show2 = !show2">
                        close
                      </b-button>
                      <b-button class="bg-our-primary" @click="show2 = !show2">
                        ok
                      </b-button>
                    </b-col>
                  </b-row>
                </div>
              </b-tab>
              <!-- End second horizontal tab -->

              <!-- Start third horizontal tab -->
              <b-tab active title="Pris" @click="tabClicked(3)">
                <div v-if="show3">
                  <div>
                    <label for="from">From: {{ price.from }} Kr</label>
                    <b-form-input v-model="price.from" placeholder="Enter your name" />
                    <b-form-input id="from" v-model="price.from" type="range" min="0" max="10000000" />
                  </div>
                  <div>
                    <label for="to">To: {{ price.to }} Kr</label>
                    <b-form-input v-model="price.to" placeholder="Enter your name" />
                    <b-form-input id="to" v-model="price.to" type="range" :min.sync="price.from" max="100000000" />
                  </div>
                  <div cols="12" class="mt-3 d-flex justify-content-end">
                    <b-button class="mr-1" @click="show3 = !show3">
                      close
                    </b-button>
                    <b-button class="bg-our-primary" @click="show3 = !show3">
                      ok
                    </b-button>
                  </div>
                </div>
              </b-tab>
              <!-- End third horizontal tab -->
            </b-tabs>
          </b-col>

          <b-col v-for="(card, index) in cards" :key="String(index)" class="my-2" cols="12" sm="6">
            <listing-card :card="card" />
          </b-col>
        </b-row>
      </b-container>
    </b-col>

    <!-- Start Map -->
    <b-col cols="6" class="d-none d-md-flex">
      <gmap-map :center="center" :map-type-id="mapTypeId" :zoom="5">
        <gmap-marker
          v-for="(item, index) in markers"
          :key="index"
          :position="item.position"
          @click="center = item.position"
        />
      </gmap-map>
    </b-col>
    <!-- End Map -->
  </b-row>
</template>

<script>
import { BootstrapVue, BIcon } from 'bootstrap-vue'

export default {
  components: {
    // eslint-disable-next-line vue/no-unused-components
    BootstrapVue,
    // eslint-disable-next-line vue/no-unused-components
    BIcon
  },
  data () {
    return {
      tabs: [
        {
          name: 'Stockholm',
          text: 'Stockholm (51)',
          allSelected: false, // Shape of the check
          indeterminate: false, // Shape of the check
          selected: [],
          options: [
            'Väsby Centrum (4)',
            'Värmdö Köpcentrum (1)',
            'Vällingby Centrum (1)',
            'Tyresö Centrum (6)',
            'Täby Centrum (7)',
            'Sollentuna Centrum (1)',
            'Söderhallarna (1)',
            'Skrapan (1)',
            'Skärholmen centrum (5)',
            'Signalfabriken (1)',
            'Kungens Kurva Shoppingcenter (1)',
            'Kista (1)',
            'Hornstull Galleria (2)',
            'Haninge Centrum (1)',
            'Götgatan 31 (1)',
            'Globen Shopping (2)',
            'Gallerian (1)',
            'Farsta Centrum (2)',
            'Bromma Blocks (3)',
            'BETA (1)',
            'Bålsta Centrum (1)',
            'Arninge Centrum (1)',
            'Åkersberga Centrum (1)'
          ]
        },
        {
          name: 'Malmö',
          text: 'Malmö (11)',
          allSelected: false, // Shape of the check
          indeterminate: false, // Shape of the check
          selected: [],
          options: [
            'Triangeln (3)',
            'Södra Förstadsgatan (1)',
            'Södertull (1)',
            'Burlöv centrum (6)'
          ]
        }
      ],
      show1: false,
      show2: false,
      show3: false,
      filters: [],
      LokalFilters: {},
      price: {
        from: 0,
        to: 0
      },
      icons: [
        {
          text: 'Butikslokal',
          icon: 'shopping-bag',
          state: false
        },
        {
          text: 'Event',
          icon: 'calendar-alt',
          state: false
        },
        {
          text: 'Eventlokal',
          icon: 'car ml-2',
          state: false
        },
        {
          text: 'Eventyta',
          icon: 'calendar-day ml-2',
          state: false
        },
        {
          text: 'Galleri',
          icon: 'image ml-2',
          state: false
        },
        {
          text: 'Showroom',
          icon: 'warehouse ml-2',
          state: false
        },
        {
          text: 'Foodtruck',
          icon: 'truck',
          state: false
        },
        {
          text: 'Köpcentrum',
          icon: 'shopping-basket',
          state: false
        },
        {
          text: 'Marknad',
          icon: 'store-alt',
          state: false
        },
        {
          text: 'Beach Market',
          icon: 'umbrella-beach ml-2',
          state: false
        },
        {
          text: 'Julmarknad',
          icon: 'landmark ml-2',
          state: false
        },
        {
          text: 'Mat & Dryck',
          icon: 'hamburger',
          state: false
        },
        {
          text: 'White label popup',
          icon: 'tag',
          state: false
        }
      ],
      cards: [],
      center: { lat: -3.350235, lng: 111.995865 },
      mapTypeId: 'terrain',
      markers: [
        { position: { lat: -0.48585, lng: 117.1466 } },
        { position: { lat: -6.9127778, lng: 107.6205556 } }
      ]
    }
  },
  async mounted () {
    await this.$axios.$get('/places')
      .then((res) => {
        this.cards = res.data.map((x) => {
          return {
            images: ['107862309_933915647019504_6298911049464957333_o.jpg-1595253253452.jpg', 'keychron K2 2.jpg-1595253253457.jpg'],
            place: x.stad,
            money: `fr ${x.prispermanad} kr / månad`,
            text: x.beskreving
          }
        })
      })
      .catch(err => console.log(err))
  },
  methods: {
    toggleAll (index) {
      this.tabs[index].selected =
        this.tabs[index].selected.length !== this.tabs[index].options.length
          ? this.tabs[index].options.slice()
          : []
    },
    changed (index) {
      console.log(this.tabs[index].selected.length)
      this.$nextTick(() => {
        if (this.tabs[index].selected.length === 0) {
          this.tabs[index].indeterminate = false
          this.tabs[index].allSelected = false
        } else if (
          this.tabs[index].selected.length === this.tabs[index].options.length
        ) {
          this.tabs[index].indeterminate = false
          this.tabs[index].allSelected = true
        } else {
          this.tabs[index].indeterminate = true
          this.tabs[index].allSelected = false
        }
      })
    },
    tabClicked (tabNo) {
      if (tabNo === 1) {
        this.show1 = !this.show1
        this.show2 = false
        this.show3 = false
        this.show4 = false
      } else if (tabNo === 2) {
        this.show1 = false
        this.show2 = !this.show2
        this.show3 = false
        this.show4 = false
      } else if (tabNo === 3) {
        this.show1 = false
        this.show2 = false
        this.show3 = !this.show3
        this.show4 = false
      } else {
        this.show1 = false
        this.show2 = false
        this.show3 = false
        this.show4 = !this.show3
      }
    },
    addToFilters (val, index) {
      const existing = this.filters.findIndex(x => x === val)

      if (existing === -1) {
        const length = this.icons[index].icon.length
        console.log(length)
        this.filters.push(val)
        this.icons[index].icon = this.icons[index].icon + ' active'
      } else {
        this.filters.splice(existing, existing + 1)
        const activeIndex = this.icons[index].icon.indexOf(' active')
        this.icons[index].icon = this.icons[index].icon.slice(0, activeIndex)
      }
    },
    addFilter (button) {
      this.$nextTick(() => {
        if (this.LokalFilters[button.text]) {
          this.LokalFilters[button.text] = !this.LokalFilters[button.text]
        } else {
          this.LokalFilters[button.text] = true
        }
      })
    }
  }
}
</script>

<style scoped >
.custom-tab, .custom-tab div {
  height: 300px;
}

.wrapper {
  max-height: 100vh;
  overflow: scroll;
}

.vue-map-container {
  height: 100vh;
  width: 100%;
}

.choices, .choices * {
  height: auto !important;
}

span ~ button.list-group-item {
  background-color: #ddd !important;
}

</style>
