<template>
  <div style="overflow-x: hidden" class="mt-3">
    <loading :state="loadingState" />

    <filter-sidebar />

    <b-row class="mt-2">
      <!-- Start filters Bar -->
      <b-col cols="12">
        <filter-bar @changeLayout="layout = $event" />
      </b-col>
      <!-- End filters Bar -->

      <!-- Start Listings -->
      <b-col cols="12" :md="layout === $t('ledigaLokaler.map') ? 6 : 12" class="wrapper">
        <b-container class="h-100">
          <!-- Start if empty -->
          <b-row v-if="cards.length === 0" align-h="center" align-content="center" class="h-100">
            <p class="text-center text-secondary">
              There are no listings.
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
              :md="layout === $t('ledigaLokaler.map') ? 12 : 6"
              :lg="layout === $t('ledigaLokaler.map') ? 6 : 4"
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
                <b-dropdown-item @click="sortCards($t('ledigaLokaler.sorting.latest'))">
                  {{ $t('ledigaLokaler.sorting.latest') }}
                </b-dropdown-item>
                <b-dropdown-divider />
                <b-dropdown-item @click="sortCards($t('ledigaLokaler.sorting.oldest'))">
                  {{ $t('ledigaLokaler.sorting.oldest') }}
                </b-dropdown-item>
                <b-dropdown-divider />
                <b-dropdown-item @click="sortCards($t('ledigaLokaler.sorting.priceLowToHigh'))">
                  {{ $t('ledigaLokaler.sorting.priceLowToHigh') }}
                </b-dropdown-item>
                <b-dropdown-divider />
                <b-dropdown-item @click="sortCards($t('ledigaLokaler.sorting.priceHighToLow'))">
                  {{ $t('ledigaLokaler.sorting.priceHighToLow') }}
                </b-dropdown-item>
                <b-dropdown-divider />
                <b-dropdown-item @click="sortCards($t('ledigaLokaler.sorting.sizeLowToHigh'))">
                  {{ $t('ledigaLokaler.sorting.sizeLowToHigh') }}
                </b-dropdown-item>
                <b-dropdown-divider />
                <b-dropdown-item @click="sortCards($t('ledigaLokaler.sorting.sizeHighToLow'))">
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
              :lg="layout === $t('ledigaLokaler.map') ? 6 : 4"
              :xl="layout === $t('ledigaLokaler.map') ? 4 : 3"
            >
              <listing-card :card="card" :layout="layout" @showPlace="setCenter($event)" />
            </b-col>
            <!-- End Listing -->
          </b-row>
          <!-- End if Listing -->
        </b-container>
      </b-col>
      <!-- End Listings -->

      <!-- Start Map -->
      <b-col v-if="layout === $t('ledigaLokaler.map')" cols="12" md="6" class="map-wrapper d-md-flex">
        <client-only>
          <GMap :all-places="cards" />
        </client-only>
      </b-col>
      <!-- End Map -->
    </b-row>

    <!-- Strat Toggle Layout in small screens -->
    <div class="mobile-btns px-3 d-md-none position-fixed d-flex justify-content-between align-items-center">
      <b-btn
        pill
        variant="dark"
        class="w-50 mr-2"
        @click="(layout === $t('ledigaLokaler.map')) ? layout = $t('ledigaLokaler.list') : layout = $t('ledigaLokaler.map'); refreshMap"
      >
        {{ (layout === $t('ledigaLokaler.map')) ? $t('ledigaLokaler.list') : $t('ledigaLokaler.map') }} {{ $t('ledigaLokaler.view') }}
      </b-btn>

      <b-btn pill variant="dark" class="w-50">
        Save search
      </b-btn>
    </div>
    <!-- End Toggle Layout in small screens -->
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import GMap from '@/components/lediga/Map'
import filterSidebar from '@/components/lediga/fitlerSidebar'
import filterBar from '@/components/lediga/filterBar'

export default {
  name: 'LedigaLokaler',
  components: {
    GMap,
    filterBar,
    filterSidebar
  },
  data () {
    return {
      loadingState: false,
      loadingCards: false,
      sortedBy: this.$t('ledigaLokaler.sorting.latest'),
      layout: this.$t('ledigaLokaler.list')
    }
  },
  computed: {
    ...mapGetters({
      AllPlaces: 'listings',
      cards: 'cards'
    }),
    lang () {
      return this.$i18n.getLocaleCookie()
    }
  },
  mounted () {
    this.loadingCards = true
    this.loadingState = true

    if (window.innerWidth >= '768') {
      this.layout = this.$t('ledigaLokaler.map')
    }

    this.loadingCards = false
    this.loadingState = false
  },
  async created () {
    this.loadingState = true
    await this.getTags()
    await this.getListings()
    await this.getRegions()
  },
  methods: {
    ...mapActions({
      getListings: 'getListings',
      getRegions: 'getRegions',
      sortCards: 'sortCards',
      getTags: 'getTags'
    })
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
