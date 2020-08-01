<template>
  <b-row>
    <!-- Start filters Bar -->
    <b-col cols="12">
      <b-container fluid>
        <b-row no-gutters class="py-2">
          <!-- Start Search Input -->
          <b-col cols="12" sm="9" md="auto" class="mr-2 d-flex align-items-center">
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

          <!-- Start price Filter -->
          <b-col cols="12" md="auto" class="mr-2 d-none d-md-flex align-items-center">
            <b-dropdown id="price-dropdown" class="w-100" variant="light" :text="filters.price.text">
              <b-dropdown-group header="Price" style="width: 300px !important" class="px-1">
                <b-form-input id="min-price-input" v-model="filters.price.min" list="min-price" class="mb-2" placeholder="$min" />
                <b-form-datalist id="min-price" :options="filters.price.minOpts" />

                <b-form-input id="max-price-input" v-model="filters.price.max" list="max-price" placeholder="$max" />
                <b-form-datalist id="max-price" :options="filters.price.maxOpts" />
              </b-dropdown-group>
            </b-dropdown>
          </b-col>
          <!-- End price Filter -->

          <!-- Start property Filter -->
          <b-col cols="12" md="auto" class="mr-2 d-none d-md-flex align-items-center">
            <b-dropdown id="property-dropdown" class="w-100" variant="light" :text="filters.property.text">
              <b-dropdown-group header="property" style="width: 300px !important" class="px-1">
                <b-row>
                  <b-col v-for="icon in filters.property.icons" :key="icon.value" class="mb-1" cols="6">
                    <span class="text-center rounded-circle" :class="{ 'checked': filters.property.choose.filter(x => x === icon.value).length !== 0 }" @click="propertyClicked(icon.value)">
                      <svg data-testid="icon-single-family-circle" class="property-icon" viewBox="0 0 512 512"><path :d="icon.path" /></svg>
                      <!-- <br> -->
                      <b>{{ icon.text }}</b>
                    </span>
                  </b-col>
                </b-row>
              </b-dropdown-group>
            </b-dropdown>
          </b-col>
          <!-- End property Filter -->

          <!-- Start beds Filter -->
          <b-col cols="12" md="auto" class="mr-2 d-none d-lg-flex align-items-center">
            <b-dropdown id="beds-dropdown" class="w-100" variant="light" text="Beds">
              <b-dropdown-group header="Beds" style="width: 300px !important" class="px-1">
                <b-form-group class="w-100">
                  <b-form-radio-group
                    id="btn-radios-2"
                    v-model="filters.beds.choose"
                    class="w-100"
                    :options="filters.beds.opts"
                    buttons
                    block
                    button-variant="outline-dark"
                    name="radio-btn-outline"
                  />
                  <br>
                  <p class="text-center">
                    Or Select Bedrooms Range
                  </p>
                  <b-row>
                    <b-col md="6">
                      <b-form-select v-model="filters.beds.range.from" :options="[{ value: null, text: 'From' }, ...filters.beds.range.opts]" />
                    </b-col>
                    <b-col md="6">
                      <b-form-select v-model="filters.beds.range.to" :options="[{ value: null, text: 'To' }, ...filters.beds.range.opts]" />
                    </b-col>
                  </b-row>
                </b-form-group>
              </b-dropdown-group>
            </b-dropdown>
          </b-col>
          <!-- End beds Filter -->

          <!-- Start bathrooms Filter -->
          <b-col cols="12" md="auto" class="mr-2 d-none d-lg-flex align-items-center">
            <b-dropdown id="bathrooms-dropdown" class="w-100" variant="light" text="Bathrooms">
              <b-dropdown-group header="Bathrooms" style="width: 300px !important" class="px-1">
                <b-form-group>
                  <b-form-radio-group
                    id="btn-radios-2"
                    v-model="filters.bathrooms.choose"
                    class="w-100"
                    :options="filters.bathrooms.opts"
                    buttons
                    block
                    button-variant="outline-dark"
                    name="radio-btn-outline"
                  />
                  <br>
                  <p class="text-center">
                    Or Select Bethrooms Range
                  </p>
                  <b-row>
                    <b-col md="6">
                      <b-form-select v-model="filters.bathrooms.range.from" :options="[{ value: null, text: 'From' }, ...filters.bathrooms.range.opts]" />
                    </b-col>
                    <b-col md="6">
                      <b-form-select v-model="filters.bathrooms.range.to" :options="[{ value: null, text: 'To' }, ...filters.bathrooms.range.opts]" />
                    </b-col>
                  </b-row>
                </b-form-group>
              </b-dropdown-group>
            </b-dropdown>
          </b-col>
          <!-- End bathrooms Filter -->

          <!-- Start Status Filter -->
          <b-col cols="12" md="auto" class="mr-2 d-none d-lg-flex align-items-center">
            <b-dropdown id="listing-status-dropdown" class="w-100" variant="light" text="Listing Status">
              <b-dropdown-group header="Listing Status" style="width: 300px !important" class="px-1">
                <b-form-group>
                  <b-form-radio-group
                    id="listing-status-group"
                    v-model="filters.status.choose.status"
                    name="listing-status"
                  >
                    <b-form-radio value="any">
                      Any
                    </b-form-radio>
                    <b-form-radio value="existing">
                      Existing Homes
                    </b-form-radio>
                    <b-form-radio value="new">
                      New construction
                    </b-form-radio>
                  </b-form-radio-group>
                </b-form-group>
                <b-dropdown-divider />
                <b-form-checkbox-group
                  id="checkbox-group-1"
                  v-model="filters.status.choose.feats"
                  :options="filters.status. options"
                  name="flavour-1"
                />
              </b-dropdown-group>
            </b-dropdown>
          </b-col>
          <!-- End Status Filter -->

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

                <!-- Start property Tab -->
                <li v-b-toggle="'property'" class="font-3 mb-1" v-text="'property'" />

                <b-collapse id="property" accordion="filters" role="tabpanel">
                  <b-row>
                    <b-col v-for="icon in filters.property.icons" :key="icon.value" class="mb-1" cols="6">
                      <span class="text-center rounded-circle" :class="{ 'checked': filters.property.choose.filter(x => x === icon.value).length !== 0 }" @click="propertyClicked(icon.value)">
                        <svg data-testid="icon-single-family-circle" class="property-icon" viewBox="0 0 512 512"><path :d="icon.path" /></svg>
                        <!-- <br> -->
                        <b>{{ icon.text }}</b>
                      </span>
                    </b-col>
                  </b-row>
                </b-collapse>
                <!-- End property Tab -->

                <!-- Start beds Tab -->
                <li v-b-toggle="'beds'" class="font-3 mb-1" v-text="'Beds'" />

                <b-collapse id="beds" accordion="filters" role="tabpanel">
                  <b-form-group class="w-100">
                    <b-form-radio-group
                      id="btn-radios-2"
                      v-model="filters.beds.choose"
                      class="w-100"
                      :options="filters.beds.opts"
                      buttons
                      block
                      button-variant="outline-dark"
                      name="radio-btn-outline"
                    />
                    <br>
                    <p class="text-center">
                      Or Select Bedrooms Range
                    </p>
                    <b-row>
                      <b-col md="6">
                        <b-form-select v-model="filters.beds.range.from" :options="[{ value: null, text: 'From' }, ...filters.beds.range.opts]" />
                      </b-col>
                      <b-col md="6">
                        <b-form-select v-model="filters.beds.range.to" :options="[{ value: null, text: 'To' }, ...filters.beds.range.opts]" />
                      </b-col>
                    </b-row>
                  </b-form-group>
                </b-collapse>
                <!-- End beds Tab -->

                <!-- Start bathrooms Tab -->
                <li v-b-toggle="'bathrooms'" class="font-3 mb-1" v-text="'Bathrooms'" />

                <b-collapse id="bathrooms" accordion="filters" role="tabpanel">
                  <b-form-group>
                    <b-form-radio-group
                      id="btn-radios-2"
                      v-model="filters.bathrooms.choose"
                      class="w-100"
                      :options="filters.bathrooms.opts"
                      buttons
                      block
                      button-variant="outline-dark"
                      name="radio-btn-outline"
                    />
                    <br>
                    <p class="text-center">
                      Or Select Bethrooms Range
                    </p>
                    <b-row>
                      <b-col md="6">
                        <b-form-select v-model="filters.bathrooms.range.from" :options="[{ value: null, text: 'From' }, ...filters.bathrooms.range.opts]" />
                      </b-col>
                      <b-col md="6">
                        <b-form-select v-model="filters.bathrooms.range.to" :options="[{ value: null, text: 'To' }, ...filters.bathrooms.range.opts]" />
                      </b-col>
                    </b-row>
                  </b-form-group>
                </b-collapse>
                <!-- End bathrooms Tab -->

                <!-- Start Status Tab -->
                <li v-b-toggle="'Status'" class="font-3 mb-1" v-text="'Listing Status'" />

                <b-collapse id="Status" accordion="filters" role="tabpanel">
                  <b-form-group>
                    <b-form-radio-group
                      id="listing-status-group"
                      v-model="filters.status.choose.status"
                      name="listing-status"
                    >
                      <b-form-radio value="any">
                        Any
                      </b-form-radio>
                      <b-form-radio value="existing">
                        Existing Homes
                      </b-form-radio>
                      <b-form-radio value="new">
                        New construction
                      </b-form-radio>
                    </b-form-radio-group>
                  </b-form-group>
                  <b-dropdown-divider />
                  <b-form-checkbox-group
                    id="checkbox-group-1"
                    v-model="filters.status.choose.feats"
                    :options="filters.status. options"
                    name="flavour-1"
                  />
                </b-collapse>
                <!-- End Status Tab -->
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

export default {
  components: {
    // eslint-disable-next-line vue/no-unused-components
    BootstrapVue,
    // eslint-disable-next-line vue/no-unused-components
    BIcon
  },
  data () {
    return {
      filters: {
        price: {
          text: 'Price',
          min: null,
          minOpts: [
            { value: null, text: 'Any Price' },
            { value: 80, text: '$80K' },
            { value: 150, text: '$150K' },
            { value: 250, text: '$250K' },
            { value: 300, text: '$300K' },
            { value: 400, text: '$400K' },
            { value: 450, text: '$450K' },
            { value: 500, text: '$500K' }
          ],
          max: null,
          maxOpts: [
            { value: 120, text: '$120K' },
            { value: 250, text: '$250K' },
            { value: 400, text: '$400K' },
            { value: 500, text: '$500K' },
            { value: 600, text: '$600K' },
            { value: 800, text: '$800K' },
            { value: null, text: 'Any Price' }
          ]
        },
        property: {
          text: 'Property type',
          choose: [],
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
        beds: {
          choose: null,
          opts: [
            { text: 'Any', value: null },
            { text: '1+', value: 1 },
            { text: '2+', value: 2 },
            { text: '3+', value: 3 },
            { text: '4+', value: 4 },
            { text: '5+', value: 5 }
          ],
          range: {
            opts: [
              // { value: null, text: 'Please select an option' },
              { value: 'Studio', text: 'Studio' },
              { value: 1, text: '1' },
              { value: 2, text: '2' },
              { value: 3, text: '3' },
              { value: 4, text: '4' },
              { value: 5, text: '5' }
            ],
            from: null,
            to: null
          }
        },
        bathrooms: {
          choose: null,
          opts: [
            { text: 'Any', value: null },
            { text: '1+', value: 1 },
            { text: '2+', value: 2 },
            { text: '3+', value: 3 },
            { text: '4+', value: 4 },
            { text: '5+', value: 5 }
          ],
          range: {
            opts: [
              // { value: null, text: 'Please select an option' },
              { value: 'Studio', text: 'Studio' },
              { value: 1, text: '1' },
              { value: 2, text: '2' },
              { value: 3, text: '3' },
              { value: 4, text: '4' },
              { value: 5, text: '5' }
            ],
            from: null,
            to: null
          }
        },
        status: {
          choose: {
            status: null,
            feats: []
          },
          options: [
            { text: 'Hide Pending / Contingent', value: 'Hide' },
            { text: 'Price Reduced', value: 'Price' },
            { text: 'Open House', value: 'Open' },
            { text: '3D, Virtual Tours', value: '3D' }
          ]
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
            images: [],
            place: x.stad,
            money: `fr ${x.prispermanad} kr / månad`,
            text: x.beskreving
          }
        })
      })
      .catch(err => console.log(err))
  },
  methods: {
    propertyClicked (property) {
      const existed = this.filters.property.choose.indexOf(property)
      console.log(existed)
      if (existed !== -1) {
        this.filters.property.choose.splice(existed, 1)
      } else {
        this.filters.property.choose.push(property)
      }
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

</style>
