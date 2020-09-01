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
  <div>
    <transition name="fade" mode="in-out">
      <b-card v-if="card">
        <b-card-header class="p-0">
          <b-carousel
            id="carousel-fade"
            style="text-shadow: 0px 0px 2px #000"
            indicators
          >
            <b-carousel-slide v-for="(img, index) in card.cover" :key="String(index)" :img-src="`https://popup.dk.se/_nuxt/img/${img}`">
              <template v-slot:img>
                <img
                  :src="`https://popup.dk.se/_nuxt/img/${img}`"
                  class="img-fluid"
                  style="height:200px"
                  :alt="card.title[$i18n.locale]"
                >
              </template>
            </b-carousel-slide>
          </b-carousel>
        </b-card-header>

        <b-card-text class="p-2">
          <h5 class="font-weight-bold">
            {{ card.title[$i18n.locale] }}
          </h5>
          <div v-if="card.beskreving" v-html="card.beskreving[$i18n.locale]" />

          <b-btn size="sm" variant="primary" :to="`${$t('link')}lokal/${card.title.sv}`">
            {{ $t('ledigaLokaler.moreDetails') }}
          </b-btn>
        </b-card-text>

        <template v-slot:footer>
          <b-row class="p-2">
            <b-col class="border-md-right" cols="12" :md="layout === $t('ledigaLokaler.map') ? 12 : 6">
              <small class="text-muted" style="cursor: pointer" @click="showPlace(card.location.coordinates)">
                <BIconGeoAlt class="text-dark mr-1" />{{ card.location.formattedAddress }}
              </small>
            </b-col>
            <b-col cols="12" :md="layout === $t('ledigaLokaler.map') ? 12 : 6">
              <small class="text-muted">
                <BIconWallet class="text-dark mr-1" />{{ `fr ${card.prioteradpris} kr / månad` }}
              </small>
            </b-col>
          </b-row>
        </template>
      </b-card>
    </transition>
  </div>
</template>

<style scoped>
.fade-enter-active, .fade-leave-active {
  transition: opacity .5s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
.card {
  height: 500px !important;
}
.card-body {
  overflow-y: scroll;
  padding: 0;
}
.card-footer {
  padding: 0;
  background: white;
}
</style>
