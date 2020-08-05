<template>
  <b-row>
    <!-- Start filters Bar -->
    <b-col cols="12">
      <b-container fluid>
        <b-row no-gutters class="py-2">
          <!-- Start Search Input -->
          <b-col cols="12" sm="9" md="4" class="mr-2 d-flex align-items-center">
            <b-input-group>
              <b-form-input placeholder="Address, City, Zip, Neighborhood, School" />
              <b-input-group-append>
                <b-button variant="outline-success">
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
              <div style="width: 500px" class="custom-tab border plats">
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
            </b-dropdown>
          </b-col>
          <!-- End plats Filter -->

          <!-- Start property Filter -->
          <b-col cols="12" md="auto" class="mr-2 d-none d-md-flex align-items-center">
            <b-dropdown id="property-dropdown" class="w-100" variant="light" :text="filters.property.text">
              <b-dropdown-group header="property" style="width: 300px !important" class="px-1">
                <b-row no-gutters>
                  <!-- Start left buttons -->
                  <b-col cols="6">
                    <b-button-group vertical class="w-100">
                      <b-button
                        v-for="(icon) in icons.slice(0,6)"
                        :key="icon.text"
                        :pressed.sync="icon.state"
                        variant="outline-dark"
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
                        variant="outline-dark"
                        class="text-left"
                        @click="addFilter(icon)"
                      >
                        <i :class="`fas fa-${icon.icon}`" />
                        {{ icon.text }}
                      </b-button>
                    </b-button-group>
                  </b-col>
                  <!-- End right buttons -->
                </b-row>
                <!-- <b-row>
                  <b-col v-for="icon in filters.property.icons" :key="icon.value" class="mb-1" cols="6">
                    <span class="text-center rounded-circle" :class="{ 'checked': filters.property.choose.filter(x => x === icon.value).length !== 0 }" @click="propertyClicked(icon.value)">
                      <svg data-testid="icon-single-family-circle" class="property-icon" viewBox="0 0 512 512"><path :d="icon.path" /></svg>
                      <b>{{ icon.text }}</b>
                    </span>
                  </b-col>
                </b-row> -->
              </b-dropdown-group>
            </b-dropdown>
          </b-col>
          <!-- End property Filter -->

          <!-- Start price Filter -->
          <b-col cols="12" md="auto" class="mr-2 d-none d-md-flex align-items-center">
            <b-dropdown id="price-dropdown" class="w-100" variant="light" right :text="filters.price.text">
              <b-dropdown-group header="Price" style="width: 300px !important" class="px-3">
                <vue-slider v-model="filters.price.value" />
                <small>{{ filters.price.value[0] || 0 }} Kr — {{ filters.price.value[1] || 0 }} Kr</small>
              </b-dropdown-group>
            </b-dropdown>
          </b-col>
          <!-- End price Filter -->

          <!-- Start yta Filter -->
          <b-col cols="12" md="auto" class="mr-2 d-none d-md-flex align-items-center">
            <b-dropdown id="yta-dropdown" class="w-100" variant="light" right :text="filters.yta.text">
              <b-dropdown-group header="Yta" style="width: 300px !important" class="px-3">
                <vue-slider v-model="filters.yta.value" />
                <small>{{ filters.yta.value[0] || 0 }} m<sup>3</sup> — {{ filters.yta.value[1] || 0 }} m<sup>3</sup></small>
              </b-dropdown-group>
            </b-dropdown>
          </b-col>
          <!-- End yta Filter -->

          <!-- Start more Filters -->
          <b-col cols="12" sm="2" md="auto" class="d-flex align-items-center justify-content-end">
            <b-button v-b-toggle.more-filters block class="mt-1 mt-sm-0" variant="primary" v-text="'More Filters'" />
          </b-col>
          <!-- End more Filters -->

          <!-- Sart Sidebar -->
          <b-sidebar id="more-filters" title="Filter your home search" shadow>
            <b-container class="py-2">
              <ul class="list-unstyled">
                <!-- Start Price Tab -->
                <li v-b-toggle="'price'" class="font-3 mb-1" v-text="'Price'" />

                <b-collapse id="price" accordion="filters" role="tabpanel">
                  <b-form-input id="sidebar-min-price-input" v-model="filters.price.min" list="sidebar-min-price" class="mb-2" placeholder="$min" />
                  <b-form-datalist id="sidebar-min-price" :options="filters.price.minOpts" />

                  <b-form-input id="sidebar-max-price-input" v-model="filters.price.max" list="sidebar-max-price" placeholder="$max" />
                  <b-form-datalist id="sidebar-max-price" :options="filters.price.maxOpts" />
                </b-collapse>
                <!-- End Price Tab -->
              </ul>
            </b-container>
          </b-sidebar>
          <!-- End SideBar -->
        </b-row>
      </b-container>
    </b-col>
    <!-- End filters Bar -->

    <b-col cols="12" md="6" class="wrapper">
      <b-container>
        <!-- Start Listings -->
        <b-col v-for="(card, index) in cards" :key="String(index)" class="d-none d-md-block my-2" cols="12" sm="6">
          <listing-card :card="card" />
        </b-col>
        <!-- End Listings -->
      </b-container>
    </b-col>

    <!-- Start Map -->
    <b-col cols="6" class="d-none d-md-flex">
      <!-- <gmap-map :center="center" :map-type-id="mapTypeId" :zoom="5">
        <gmap-marker
          v-for="(item, index) in markers"
          :key="index"
          :position="item.position"
          @click="center = item.position"
        />
      </gmap-map> -->
    </b-col>
    <!-- End Map -->
  </b-row>
</template>

<script>
import { BootstrapVue, BIcon } from 'bootstrap-vue'
import 'vue-slider-component/theme/material.css'
let VueSlider
if (process.browser) {
  VueSlider = require('vue-slider-component')
}

export default {
  components: {
    // eslint-disable-next-line vue/no-unused-components
    BootstrapVue,
    // eslint-disable-next-line vue/no-unused-components
    BIcon,
    VueSlider
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
      filters: {
        plats: {
          text: 'Plats'
        },
        price: {
          text: 'Price',
          value: [0, 100]
        },
        property: {
          text: 'Property type',
          choose: {},
          icons: [
            {
              text: 'Any',
              value: 'any',
              path: 'M256 0c141 0 256 115 256 256S397 512 256 512 0 397 0 256 115 0 256 0zm0 15C123 15 15 123 15 256s108 241 241 241 241-108 241-241S389 15 256 15zm48 122c4 0 7 2 7 6v92h1c1 0 1 0 1 1h1l73 62c7 7-2 17-9 12h-1l-2-2v71c0 3-2 7-6 7H251c-4 0-7-3-8-6v-26h-99c-4 0-7-3-7-6V144c0-4 2-7 6-7h1zm5 115l-51 44v75h30v-56c0-3 2-5 4-6h34c3 0 5 3 5 6v56h30v-75zm11 68h-21v51h21zm-23-169H151v188h92v-31l-1 2c-8 6-17-4-11-11l1-1 65-55zm-89 105c3 0 5 2 5 5v54c0 3-2 5-5 5h-32c-3 0-5-2-5-5v-54c0-3 2-5 5-5zm-5 11h-22v42h22zm5-96c3 0 5 2 5 5v53c0 3-2 6-5 6h-32c-3 0-5-3-5-6v-53c0-3 2-5 5-5zm64 0c3 0 5 2 5 5v53c0 3-2 6-5 6h-32c-3 0-5-3-5-6v-53c0-3 2-5 5-5zm-69 10h-22v43h22zm64 0h-22v43h22z'
            },
            {
              text: 'Single Family',
              value: 'single',
              path: 'M256 0c141 0 256 115 256 256S397 512 256 512 0 397 0 256 115 0 256 0zm0 15C123 15 15 123 15 256s108 241 241 241 241-108 241-241S389 15 256 15zm144 132h1c4 1 6 4 6 8v33l43 15c4 2 6 6 5 10-1 3-5 5-8 5l-1-1-28-9v150c0 3-2 7-6 7H91c-4 0-7-3-7-6l-1-1v-79l-17 4c-4 1-8-1-9-5s1-8 4-9h1l165-41v-22l-33 11c-3 2-7 0-9-3v-1c-1-4 0-8 4-9l1-1 128-44c1-1 2-1 3-1l1 1 44 15v-20c0-4 4-7 7-7zm-173 96L98 275v75h129zm93-70l-78 28v149h46v-83c0-6 5-11 11-11h42c6 0 11 5 11 11v83h51V203zm21 94h-42v83h42zm-149 10c6 0 11 5 11 11v32c0 6-5 11-11 11h-53c-6 0-11-5-11-11v-32c0-6 5-11 11-11zm-32 11h-21v32h21zm32 0h-21v32h21zm149-75c6 0 11 5 11 11v11c0 6-5 10-11 10h-42c-6 0-11-4-11-10v-11c0-6 5-11 11-11zm0 11h-42v11h42zm52-62h-12v17l12 4z'
            },
            {
              text: 'Condo',
              value: 'condo',
              path: 'M256 0c141 0 256 115 256 256S397 512 256 512 0 397 0 256 115 0 256 0zm0 15C123 15 15 123 15 256s108 241 241 241 241-108 241-241S389 15 256 15zm48 122c4 0 7 2 7 6v58h57c4 0 7 2 7 6v172c0 3-2 7-6 7H144c-4 0-7-3-7-6V208c0-4 2-7 6-7h58v-57c0-4 2-7 6-7h1zm-7 14h-82v57c0 4-2 7-6 7h-58v156h84v-67c0-3 2-5 4-5h33c3 0 5 2 5 5v67h84V215h-57c-4 0-7-2-7-6v-1zm-30 158h-22v62h22zm-59-10c3 0 5 2 5 5v32c0 3-2 5-5 5h-32c-3 0-5-2-5-5v-32c0-3 2-5 5-5zm128 0c3 0 5 2 5 5v32c0 3-2 5-5 5h-32c-3 0-5-2-5-5v-32c0-3 2-5 5-5zm-133 10h-22v22h22zm128 0h-22v22h22zm-59-74c3 0 5 2 5 5v32c0 3-2 5-5 5h-32c-3 0-5-2-5-5v-32c0-3 2-5 5-5zm64 0c3 0 5 2 5 5v32c0 3-2 5-5 5h-32c-3 0-5-2-5-5v-32c0-3 2-5 5-5zm-128 0c3 0 5 2 5 5v32c0 3-2 5-5 5h-32c-3 0-5-2-5-5v-32c0-3 2-5 5-5zm59 10h-22v22h22zm64 0h-22v22h22zm-128 0h-22v22h22zm69-74c3 0 5 2 5 5v32c0 3-2 5-5 5h-32c-3 0-5-2-5-5v-32c0-3 2-5 5-5zm-5 10h-22v22h22z'
            },
            {
              text: 'Townhome',
              value: 'townhome',
              path: 'M256 0c141 0 256 115 256 256S397 512 256 512 0 397 0 256 115 0 256 0zm0 15C123 15 15 123 15 256s108 241 241 241 241-108 241-241S389 15 256 15zm68 134l1 1 75 69c3 2 3 7 0 10-2 3-6 3-9 1l-1-1-4-3v142c0 4-3 7-6 8H144c-4 0-7-3-7-7V226l-4 3c-3 3-7 3-10 1v-1c-3-3-3-7-1-10h1l75-69c2-3 6-3 9-1l1 1 53 56 54-56c2-3 6-3 9-1zm-122 17l-51 47v148h20v-68c0-3 2-5 5-5h53c3 0 6 2 6 5v68h19V220zm118 0l-51 54v141h19v-68c0-3 2-5 5-5h54c3 0 5 2 5 5v68h19V213zm21 133h-42v62h42zm-117 0h-43v62h43zm5-75c3 0 6 2 6 5v32c0 3-3 6-6 6h-53c-3 0-5-3-5-6v-32c0-3 2-5 5-5zm118 0c3 0 5 2 5 5v32c0 3-2 6-5 6h-54c-3 0-5-3-5-6v-32c0-3 2-5 5-5zm-123 11h-43v21h43zm117 0h-42v21h42z'
            },
            {
              text: 'Multi Family',
              value: 'multi-fam',
              path: 'M256 0c141 0 256 115 256 256S397 512 256 512 0 397 0 256 115 0 256 0zm0 15C123 15 15 123 15 256s108 241 241 241 241-108 241-241S389 15 256 15zm48 122c4 0 7 2 7 6v58h57c4 0 7 2 7 6v172c0 3-2 7-6 7H144c-4 0-7-3-7-6V208c0-4 2-7 6-7h58v-57c0-4 2-7 6-7h1zm-7 14h-82v57c0 4-2 7-6 7h-58v156h84v-67c0-3 2-5 4-5h33c3 0 5 2 5 5v67h84V215h-57c-4 0-7-2-7-6v-1zm-30 158h-22v62h22zm-59-10c3 0 5 2 5 5v32c0 3-2 5-5 5h-32c-3 0-5-2-5-5v-32c0-3 2-5 5-5zm128 0c3 0 5 2 5 5v32c0 3-2 5-5 5h-32c-3 0-5-2-5-5v-32c0-3 2-5 5-5zm-133 10h-22v22h22zm128 0h-22v22h22zm-59-74c3 0 5 2 5 5v32c0 3-2 5-5 5h-32c-3 0-5-2-5-5v-32c0-3 2-5 5-5zm64 0c3 0 5 2 5 5v32c0 3-2 5-5 5h-32c-3 0-5-2-5-5v-32c0-3 2-5 5-5zm-128 0c3 0 5 2 5 5v32c0 3-2 5-5 5h-32c-3 0-5-2-5-5v-32c0-3 2-5 5-5zm59 10h-22v22h22zm64 0h-22v22h22zm-128 0h-22v22h22zm69-74c3 0 5 2 5 5v32c0 3-2 5-5 5h-32c-3 0-5-2-5-5v-32c0-3 2-5 5-5zm-5 10h-22v22h22z'
            },
            {
              text: 'Mobile',
              value: 'mobile',
              path: 'M256 0c141 0 256 115 256 256S397 512 256 512 0 397 0 256 115 0 256 0zm0 15C123 15 15 123 15 256s108 241 241 241 241-108 241-241S389 15 256 15zm14 101h1l128 81c3 2 4 7 2 10s-6 4-9 3l-1-1-16-9v157c0 4-2 7-6 8h-6v19c0 6-5 11-11 11h-11c-6 0-10-5-10-11v-19H203v19c0 6-5 11-11 11h-11c-6 0-10-5-10-11v-19h-6c-3 0-7-3-7-7V200l-15 9c-3 2-7 2-10-1v-1c-2-3-2-7 1-10h1l128-81c2-1 5-1 7 0zm-3 15l-94 60v159h188V190zm53 72c6 0 11 4 11 10v64c0 6-5 11-11 11H213c-6 0-10-5-10-11v-64c0-6 4-10 10-10zm0 10H213v64h107z'
            },
            {
              text: 'Farm',
              value: 'farm',
              path: 'M256 0c141 0 256 115 256 256S397 512 256 512 0 397 0 256 115 0 256 0zm0 15C123 15 15 123 15 256s108 241 241 241 241-108 241-241S389 15 256 15zm7 117c2-1 5-1 8 0l81 54c2 1 3 2 3 3l34 80c2 5-2 10-7 10h-28v100c0 3-3 7-6 7H187c-4 0-8-3-8-7V279h-30c-5 0-8-4-7-9v-1l32-82c1-1 2-3 3-3zm3 15l-79 48-27 69h27c4 0 7 3 7 7v100h20v-99-1-1c0-1 0-1 1-1v-1h1-1 1s0-1 1-1h2-1 99c1 0 1 1 1 1h1v1-1 1c1 0 1 0 1 1v2-1 100h19v-99c0-4 3-7 7-7l1-1h23l-28-67zm1 186l-34 38h68zm-43-47v79l36-40zm86 0l-36 39 36 40zm-7-8h-72l36 39zm-15-97c3 0 5 3 5 6v42c0 3-2 6-5 6h-43c-3 0-5-3-5-6v-42c0-3 2-6 5-6zm-5 11h-32v32h32z'
            },
            {
              text: 'Land',
              value: 'land',
              path: 'M256 0c141 0 256 115 256 256S397 512 256 512 0 397 0 256 115 0 256 0zm0 15C123 15 15 123 15 256s108 241 241 241 241-108 241-241S389 15 256 15zm32 132c17 0 33 8 43 21l1 1h1c29 4 52 28 53 58v2c0 31-22 56-51 60l-3 1v1c-4 17-18 30-37 31v57c0 4-3 7-7 7s-7-3-7-6v-73c-10 3-19 5-27 5l-3-1c-8 0-16-1-23-4-3 3-8 4-15 5v37c0 4-4 7-8 7-3 0-7-2-7-6v-37c-39-1-60-21-61-49v-2c0-18 11-35 29-41h1v-1c4-17 19-29 36-30h2c7 0 14 2 20 5 2-1 4-1 7-2l2-1v-1c6-25 26-43 52-44zm0 15c-21 0-38 16-40 37 0 3-3 6-6 7-5 1-9 2-13 4l-1 1c-9 5-16 13-20 23v1-1c0 1-1 2-1 2v1-1c0 2-1 3-1 5 0 0 0 1-1 2l1-2c0 1-1 2-1 3v-1 13c2 15 11 28 24 35 1 0 1 0 2 1 5 3 11 4 17 4l4 1c9 0 17-1 29-6v-8l-34-28c-2-2-2-6 0-8 1-2 4-2 6-1l1 1 27 22v-66c0-4 3-8 7-8s7 3 7 7v38l28-15c2-2 6-1 7 2 1 2 1 5-1 6l-1 1-33 19v54c13-1 23-12 23-24 0-4 3-8 7-8 26 0 46-20 46-46 0-24-19-44-43-45-3 0-5-2-6-4-8-11-20-18-34-18zm-83 43c-13 0-23 10-24 23-1 3-3 6-6 6-14 3-24 15-24 28 0 22 16 37 51 36h7l3-1c-12-9-19-22-22-38v-2-1-2-1-2-5-1-2c0-1 1-1 1-2v-2c3-13 10-25 19-34h-1-2z'
            }
          ]
        },
        yta: {
          text: 'Yta',
          value: [0, 100],
          enableCross: false
        }
      },
      cards: [],
      center: { lat: -3.350235, lng: 111.995865 },
      mapTypeId: 'terrain',
      markers: [
        { position: { lat: -0.48585, lng: 117.1466 } },
        { position: { lat: -6.9127778, lng: 107.6205556 } }
      ]
    }
  },
  computed: {
    minYtaState () {
      return (this.filters.yta.min && !this.filters.yta.max) || (this.filters.yta.min < this.filters.yta.max)
    },
    maxYtaState () {
      return (this.filters.yta.max && !this.filters.yta.min) || (this.filters.yta.min < this.filters.yta.max)
    }
  },
  watch: {
    'filters.price': {
      deep: true,
      handler (val) {
        console.log(val)
        if (!val.min && !val.max) {
          this.filters.price.text = 'Price'
        } else if (val.min && !val.max) {
          this.filters.price.text = `Min $${val.min}`
        } else {
          this.filters.price.text = `Max $${val.max}`
        }
      }
    },
    'filters.property.choose': {
      deep: true,
      handler (val) {
        if (val.length === 0) {
          this.filters.property.text = 'Property type'
        } else if (val.length === 8) {
          this.filters.property.text = 'Any'
        } else {
          this.filters.property.text = val.join()
        }
      }
    }
  },
  async mounted () {
    await this.$axios.$get('/places')
      .then((res) => {
        this.cards = res.data.map((x) => {
          return {
            images: x.cover,
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
        if (this.filters.property.choose[button.text]) {
          this.filters.property.choose[button.text] = !this.filters.property.choose[button.text]
        } else {
          this.filters.property.choose[button.text] = true
        }
      })
    }
  }
}
</script>

<style scoped>
span {
  color: #757575
}

svg.property-icon {
  font-size: 50px;
  width: 1em;
  display: inline-block;
  fill: #757575;
}

span.checked > svg.property-icon {
  fill: red;
}

span:hover, span.checked {
  color: red;
}

span:hover > svg, span.checked > svg{
  fill: red;
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

.choices, .choices * {
  height: auto !important;
}

span ~ button.list-group-item {
  background-color: #ddd !important;
}

.custom-tab, .custom-tab div {
  height: 300px;
}

</style>
