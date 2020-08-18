<script>
/* eslint-disable vue/no-v-html */
import { BootstrapVue, BIcon, BIconGeoAlt, BIconWallet } from 'bootstrap-vue'

export default {
  components: {
    // eslint-disable-next-line vue/no-unused-components
    BootstrapVue,
    // eslint-disable-next-line vue/no-unused-components
    BIcon,
    BIconWallet,
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

<template>
  <b-card>
    <b-card-header class="p-0">
      <b-carousel
        id="carousel-fade"
        style="text-shadow: 0px 0px 2px #000"
        indicators
      >
        <b-carousel-slide v-for="(img, index) in card.images" :key="String(index)" :img-src="`https://popup.dk.se/_nuxt/img/${img}`">
          <template v-slot:img>
            <img
              :src="`https://popup.dk.se/_nuxt/img/${img}`"
              class="img-fluid"
              width="480px"
              height="320px"
              :alt="card.text"
            >
          </template>
        </b-carousel-slide>
      </b-carousel>
    </b-card-header>

    <b-card-body class="p-2">
      <div v-html="card.text[$i18n.locale]" />

      <b-btn variant="primary" :to="`/lokal/${card.title.sv}`">
        More Details
      </b-btn>
    </b-card-body>

    <template v-slot:footer>
      <b-row class="p-2">
        <b-col class="border-md-right" cols="12" :md="layout === 'map' ? 12 : 6">
          <small class="text-muted" style="cursor: pointer" @click="showPlace(card.location.coordinates)">
            <BIconGeoAlt class="text-dark mr-1" />{{ card.location.formattedAddress }}
          </small>
        </b-col>
        <b-col cols="12" :md="layout === 'map' ? 12 : 6">
          <small class="text-muted">
            <BIconWallet class="text-dark mr-1" />{{ card.money }}
          </small>
        </b-col>
      </b-row>
    </template>
  </b-card>
</template>

<style scoped>
.card-body {
  padding: 0;
}
.card-footer {
  padding: 0;
  background: white;
}
</style>
