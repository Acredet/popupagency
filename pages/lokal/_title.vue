<template>
  <div>
    <!-- Start cover -->
    <div class="position-relative cover">
      <div class="position-relative cover--overlay" :style="imgStyles" />
      <section class="cover--details">
        <b-container class="h-100">
          <div class="text-center h-100 d-flex flex-column flex-lg-row align-items-lg-center justify-content-lg-between">
            <h1 class="font-5">
              {{ place.title ? place.title[$i18n.locale] : '' }}
            </h1>
            <p class="h2 mb-2">
              <BIconHeart />
            </p>
          </div>
        </b-container>
      </section>
    </div>
    <!-- End cover -->
    <b-tabs no-nav-style :value="tabOpened" fill content-class="mt-3">
      <template v-slot:tabs-start>
        <div class="w-100">
          <div class="shadow w-100 d-flex flex-nowrap">
            <b-container class="d-flex flex-column flex-nowrap">
              <b-row no-gutters class="d-flex flex-nowrap jsutify-content-center w-100 tabs">
                <b-col v-for="(tab, index) in ['Information', 'Centruminfo', 'Pris', 'Bokningsförfrågan']" :key="tab" class="flex-grow-1" cols="auto">
                  <b-btn
                    squared
                    block
                    variant="light"
                    class="anime-tab anime-tab-fromLeft border-0 bg-transparent"
                    :class="{ 'active': (index === tabOpened) }"
                    @click="tabOpened = index"
                  >
                    {{ tab }}
                  </b-btn>
                </b-col>
              </b-row>
            </b-container>
          </div>

          <!-- fEATS SECTION -->
          <b-container class="d-flex flex-column flex-nowrap my-5">
            <b-row no-gutters class="d-flex flex-nowrap jsutify-content-center w-100 py-3 tabs">
              <b-col v-for="(feat) in feats" :key="feat.name" cols="auto" class="d-flex flex-grow-1 flex-column justify-content-center mx-2 align-items-center">
                <img width="30px" :src="require(`~/assets/img/feats/${feat.name}.png`)" :alt="feat.name">
                <b v-if="feat.name==='yta-1'" class="pt-1">{{ feat.text }} m<sup>3</sup> </b>
                <b v-else class="pt-1">{{ feat.text }}</b>
              </b-col>
            </b-row>
          </b-container>
          <!-- fEATS SECTION -->
        </div>
      </template>

      <b-tab title-item-class="d-none" active>
        <b-container>
          <b-row>
            <b-col class="my-3" cols="12" md="6">
              <b class="font-4">Beskrivning</b>
              <!-- eslint-disable-next-line vue/no-v-html -->
              <div class="my-2" v-html="place.beskreving ? place.beskreving[$i18n.locale] : ''" />
            </b-col>
            <!-- Start Karta -->
            <b-col class="my-3" cols="12" md="6">
              <div class="d-flex justify-content-between">
                <b class="font-4">Karta</b>
                <a class="link-main" target="_blank" href="https://www.google.com/maps/dir//56.0992854,12.8043192/@56.0992329,12.7340866,12z">Get Directions</a>
              </div>
              <div class="content my-2">
                <gmap-map
                  style="width: 100%; height: 300px"
                  :center="map.center"
                  :map-type-id="map.mapTypeId"
                  :zoom="7"
                >
                  <gmap-cluster>
                    <gmap-marker
                      v-for="(mark, index) in map.markers"
                      :key="index"
                      :position="mark"
                    />
                  </gmap-cluster>
                </gmap-map>
              </div>
            </b-col>
            <!-- End Karta -->

            <!-- Start Detaljer -->
            <b-col class="my-3" cols="12" md="6">
              <b class="font-4">Detaljer</b>
              <!-- eslint-disable-next-line vue/no-v-html -->
              <div class="my-2">
                <div class="d-flex justify-content-between">
                  <p>Area</p>
                  <p>190 m²</p>
                </div>
                <hr>
                <div class="d-flex justify-content-between">
                  <p>Våning/Placering</p>
                  <p>Markplan</p>
                </div>
              </div>
            </b-col>
            <!-- End Detaljer -->

            <!-- Start Planritning -->
            <b-col class="my-3" cols="12" md="6">
              <b class="font-4">Planritning</b>
              <!-- eslint-disable-next-line vue/no-v-html -->
              <div class="my-2">
                <div class="d-flex justify-content-between">
                  <p>Area</p>
                  <p>190 m²</p>
                </div>
                <hr>
                <div class="d-flex justify-content-between">
                  <p>Våning/Placering</p>
                  <p>Markplan</p>
                </div>
              </div>
            </b-col>
            <!-- End Planritning -->

            <!-- Start Galleri -->
            <b-col class="my-3" cols="12">
              <div class="my-gallery" itemscope itemtype="http://schema.org/ImageGallery">
                <b class="font-4 mb-2">Galleri</b>
                <!-- component -->
                <viewer :images="images">
                  <b-row no-gutters>
                    <b-col v-for="src in images" :key="src" cols="12" md="6">
                      <div class="gallery-images">
                        <img width="100%" :src="src">
                      </div>
                    </b-col>
                  </b-row>
                </viewer>
              </div>
            </b-col>
            <!-- End Galleri -->
          </b-row>
        </b-container>
      </b-tab>

      <b-tab title-item-class="d-none">
        <b-container>
          <p>I'm the Centruminfo tab</p>
        </b-container>
      </b-tab>

      <b-tab title-item-class="d-none">
        <b-container>
          <p>I'm the Pris tab</p>
        </b-container>
      </b-tab>

      <b-tab title-item-class="d-none">
        <b-container>
          <p>I'm the Pris tab</p>
        </b-container>
      </b-tab>
    </b-tabs>
  </div>
</template>

<script>
import { BootstrapVue, BIcon, BIconHeart, BIconHeartFill } from 'bootstrap-vue'
import 'viewerjs/dist/viewer.css'
import Viewer from 'v-viewer'
import Vue from 'vue'
Vue.use(Viewer)
export default {
  components: {
    // eslint-disable-next-line vue/no-unused-components
    BootstrapVue,
    // eslint-disable-next-line vue/no-unused-components
    BIcon,
    // eslint-disable-next-line vue/no-unused-components
    BIconHeart,
    // eslint-disable-next-line vue/no-unused-components
    BIconHeartFill
  },
  data () {
    return {
      map: {
        center: { lat: 59.334591, lng: 18.063240 },
        mapTypeId: 'roadmap',
        markers: [
          { lat: 10, lng: 10 },
          { lat: 59.334591, lng: 18.063240 },
          { lat: 10, lng: 10 }
        ]
      },
      place: {},
      tabOpened: 0
    }
  },
  computed: {
    images () {
      return !this.place.centrumgalleri ? [] : this.place.centrumgalleri.map(x => `https://popup.dk.se/_nuxt/img/${x}`)
    },
    imgStyles () {
      return {
        'min-height': '60vh',
        'background-repeat': 'no-repeat',
        'background-image': `url('https://popup.dk.se/_nuxt/img/${this.place.cover ? this.place.cover[0] : ''}')`,
        'background-position': 'center center',
        'background-attachment': 'fixed',
        'background-size': 'cover'
      }
    },
    feats () {
      return [
        { name: 'yta-1', text: '190' },
        { name: 'fasta-oppettider-1', text: 'FASTA ÖPPETTIDER' },
        { name: 'butik-1', text: 'BUTIK' },
        { name: 'matodrick-2', text: 'MAT & DRYCK' },
        { name: 'event-1', text: 'EVENT' },
        { name: 'sol', text: 'SÄSONG' }
      ]
    }
  },
  async beforeCreate () {
    await this.$axios.$get(`/places/${this.$route.params.title}`)
      .then((res) => {
        this.place = res.place
        console.log(res.place)
      })
      .catch(res => console.log(res))
  },
  methods: {
    handleClose () {
      this.key++
    }
  }
}
</script>

<style scoped>
@media screen and (max-width: 576px) {
  .row.tabs {
    overflow-x: scroll;
  }
}
.anime-tab {
  margin:10px;
  padding:10px 10px;
  float:left;
  box-sizing:border-box;
  transition:0.4s all ease-in-out;
  position:relative;
  cursor:pointer;
}
.anime-tab:before {
  position:absolute;
  bottom:0;
  background: var(--indigo);
  height:2px;
  display:block;
  content:"";
  width:0;
  transition:0.4s all ease-in-out;
}
.anime-tab:hover:before ,.anime-tab.active:before {
  width:100%;
}
.anime-tab-fromLeft:before {
  bottom:0;
  left:0;
}

.cover .cover--details::before {
  z-index: -1;
  content: "";
  background-color: var(--dark);
  position: absolute;
  opacity: 0.5;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
}

.cover .cover--details {
  z-index: 4;
  position: absolute;
  bottom: 0;
  left: 0;
  height: 30%;
  width: 100%;
  padding: 5px;
  color: white;
}

p {
  padding: 0;
  margin: 0
}

.gallery-images {
  cursor: pointer;
  position: relative;
  overflow: hidden;
}

.gallery-images::before {
  content: '\f00e';
  color: white;
  font-size: 12px;
  font-family: "Font Awesome 5 Free";
  font-weight: 900;
  display: flex;
  transform: scale(1);
  justify-content: center;
  align-items: center;
  opacity: 0;
  transition: all 0.4s ease;
  width: 100%;
  height: 100%;
  background: rgba(0,0,0,0.8);
  position: absolute;
}

.gallery-images:hover::before {
  opacity: 1;
  transform: scale(1.2);
}

</style>
