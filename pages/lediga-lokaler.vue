<template>
  <b-row>
    <b-col cols="12" md="6" class="wrapper">
      <b-container>
        <b-row>
          <b-col v-for="(ds, index) in 16" :key="String(index)" class="my-2" cols="12" md="6">
            <b-card>
              <b-card-body class="p-0">
                <b-carousel
                  id="carousel-fade"
                  style="text-shadow: 0px 0px 2px #000"
                  indicators
                  img-width="1024"
                  img-height="480"
                >
                  <b-carousel-slide img-src="https://picsum.photos/1024/480/?image=10" />
                  <b-carousel-slide img-src="https://picsum.photos/1024/480/?image=12" />
                  <b-carousel-slide img-src="https://picsum.photos/1024/480/?image=22" />
                </b-carousel>
              </b-card-body>

              <b-card-text class="p-2">
                Dragarbrunnstorg 6 ∙ Popup lokal på gågata ∙ ca 163 m²
              </b-card-text>
              <template v-slot:footer>
                <b-row class="p-2">
                  <b-col class="border-right" cols="6">
                    <small class="text-muted">
                      <BIconGeoAlt class="text-dark" />Uppsala
                    </small>
                  </b-col>
                  <b-col cols="6">
                    <small class="text-muted">
                      <BIconWallet class="text-dark" />fr 50 000 kr / månad
                    </small>
                  </b-col>
                </b-row>
              </template>
            </b-card>
          </b-col>
        </b-row>
      </b-container>
    </b-col>

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
  </b-row>
</template>

<script>
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
  data () {
    return {
      center: { lat: -3.350235, lng: 111.995865 },
      mapTypeId: 'terrain',
      markers: [
        { position: { lat: -0.48585, lng: 117.1466 } },
        { position: { lat: -6.9127778, lng: 107.6205556 } }
      ]
    }
  }
}
</script>

<style scoped>
.card-body {
  padding: 0;
}
.card-footer {
  padding: 0;
  background: white;
}

.wrapper {
  max-height: 100vh;
  overflow: scroll;
}

.vue-map-container {
  height: 100vh;
  width: 100%;
}
</style>
