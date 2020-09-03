<template>
  <nuxt-link :to="`${$t('link')}lokal/${card.title.sv}`" class="listing-card">
    <!-- Start header -->
    <div class="listing-card--header">
      <b-carousel :id="`${card.title[$i18n.locale]}-cover`" :interval="3500">
        <b-carousel-slide v-for="(img, index) in card.cover" :key="String(index)" :img-src="`https://popup.dk.se/_nuxt/img/${img}`">
          <template v-slot:img>
            <img
              :src="`https://popup.dk.se/_nuxt/img/${img}`"
              width="100%"
              class="img-fluid"
              style="height:200px"
              :alt="card.title[$i18n.locale]"
            >
          </template>
        </b-carousel-slide>
      </b-carousel>

      <div class="listing-card--header---overlay px-3">
        <p class="p-0 m-0 text-white" v-text="card.title[$i18n.locale]" />
      </div>
    </div>
    <!-- End header -->

    <!-- Start card Info -->
    <div class="listing-card--content pt-1">
      <b-row no-gutters>
        <b-col class="border-bottom px-1" cols="5">
          <!-- Add this to focus on the place on map: @click="showPlace(card.location.coordinates)" -->
          <small class="text-muted" style="cursor: pointer">
            <!-- <BIconGeoAlt class="text-dark mr-1" />{{ card.location.formattedAddress }} -->
            <BIconGeoAlt class="text-dark mr-1" />{{ card.stad[$i18n.locale] }}
          </small>
        </b-col>

        <b-col cols="7" class="border-left border-bottom pl-1 pr-3">
          <small class="text-muted">
            <BIconWallet class="text-dark mr-1" />{{ `fr ${card.prioteradpris} kr / månad` }}
          </small>
        </b-col>
      </b-row>
    </div>
    <!-- End card Info -->
  </nuxt-link>
</template>

<script>
import { BootstrapVue, BIcon, BIconGeoAlt, BIconWallet } from 'bootstrap-vue'

export default {
  components: {
    // eslint-disable-next-line vue/no-unused-components
    BootstrapVue,
    // eslint-disable-next-line vue/no-unused-components
    BIcon,
    // eslint-disable-next-line vue/no-unused-components
    BIconWallet,
    // eslint-disable-next-line vue/no-unused-components
    BIconGeoAlt
  },
  props: {
    card: {
      type: Object,
      default: () => {}
    },
    layout: {
      type: String,
      default: () => 'list'
    }
  },
  methods: {
    showPlace (loc) {
      this.$emit('showPlace', loc)
    }
  }
}
</script>

<style scoped>
.listing-card {
  display: block;
  text-decoration: none;
  border-radius: 4px;
  box-shadow: 0 0 8px rgba(0,0,0,0.1);
}

.listing-card:hover {
  text-decoration: none;
  box-shadow: 0 0 8px rgba(0,0,0,0.2);
}

.listing-card--header {
  position: relative;
}

.listing-card--header .listing-card--header---overlay {
  /* center the title */
  display: flex;
  align-items: center;
  /* Make the div overlay the carousel */
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 50px;
  background: rgba(0,0,0, 0.5);
}

.listing-card--content {
  color: black;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
</style>
