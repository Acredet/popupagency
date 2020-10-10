<template>
  <div v-if="place._id">
    <!-- Login modal -->
    <b-modal id="modal-center" v-model="modalShow" centered title="Login">
      <p class="my-4">
        You must login to be able to have bookmarks!
      </p>
      <template v-slot:modal-footer>
        <div>
          <b-btn variant="primary" to="/login">
            Login
          </b-btn>
          <b-btn variant="error" @click="modalShow = false">
            cancel
          </b-btn>
        </div>
      </template>
    </b-modal>
    <!-- End modal -->

    <!-- Start cover -->
    <div class="position-relative cover">
      <div class="position-relative cover--overlay" :style="imgStyles" />
      <section class="cover--details">
        <b-container class="h-100">
          <div class="text-center h-100 d-flex flex-column flex-lg-row align-items-lg-center justify-content-lg-between">
            <h1 class="font-5">
              {{ place.title ? place.title[$i18n.locale] : '' }}
            </h1>
            <div class="position-relative">
              <section
                class="like position-static"
                :class="{ 'anim-like': $auth.loggedIn && ($auth.user.fav.findIndex(x => x === place.title.sv) !== -1) }"
                @click="(e) => { if (!this.$auth.loggedIn) { this.modalShow = true } else { this.AddToFav(e) } }"
              />
            </div>
          </div>
        </b-container>
      </section>
    </div>
    <!-- End cover -->

    <b-tabs no-nav-style :value="tabOpened" fill content-class="mt-3">
      <template v-slot:tabs-start>
        <div class="w-100">
          <!-- Start Tabs buttons -->
          <div class="shadow w-100 d-flex flex-nowrap">
            <b-container class="d-flex flex-column flex-nowrap">
              <b-row no-gutters class="d-flex flex-nowrap jsutify-content-center w-100 tabs">
                <b-col v-for="(tab, index) in tabs" :key="tab" class="flex-grow-1" cols="auto">
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
          <!-- End Tabs buttons -->

          <!-- Start fEATS SECTION -->
          <b-container class="d-flex flex-column flex-nowrap my-5">
            <b-row no-gutters class="d-flex flex-nowrap jsutify-content-center w-100 py-3 tabs">
              <b-col v-for="(feat) in feats" :key="feat.name" cols="auto" class="d-flex flex-grow-1 flex-column justify-content-center mx-2 align-items-center">
                <img width="30px" :src="require(`~/assets/img/feats/${feat.name}.png`)" :alt="feat.name">
                <b v-if="feat.name==='yta-1'" class="pt-1">{{ feat.text }} m<sup>3</sup> </b>
                <b v-else class="pt-1">{{ feat.text }}</b>
              </b-col>
            </b-row>
          </b-container>
          <!-- End fEATS SECTION -->
        </div>
      </template>

      <b-tab title-item-class="d-none" class="my-4" active>
        <b-container>
          <b-row>
            <b-col class="my-3" cols="12" md="6">
              <b class="font-4">{{ $t('singleListing.info.description') }}</b>
              <!-- eslint-disable-next-line vue/no-v-html -->
              <div class="my-2" v-html="place.beskreving ? place.beskreving[$i18n.locale] : ''" />
            </b-col>
            <!-- Start Karta -->
            <b-col class="my-3" cols="12" md="6">
              <div class="d-flex justify-content-between">
                <b class="font-4">{{ $t('singleListing.info.map') }}</b>
                <a v-if="place.location" class="link-main" target="_blank" :href="`https://www.google.com/maps/dir//${place.location.coordinates[1]},${place.location.coordinates[0]}/@${place.location.coordinates[1]},${place.location.coordinates[0]},12z`">{{ $t('singleListing.info.directions') }}</a>
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
                      :icon="require(`@/assets/img/marker.svg`)"
                      :position="mark"
                    />
                  </gmap-cluster>
                </gmap-map>
                <hr>
                <panorama v-if="place.location" :pos="map.center" />
              </div>
            </b-col>
            <!-- End Karta -->

            <!-- Start Detaljer -->
            <b-col class="my-3" cols="12" md="6">
              <b class="font-4">{{ $t('singleListing.info.details') }}</b>
              <!-- eslint-disable-next-line vue/no-v-html -->
              <div class="my-2">
                <div class="d-flex justify-content-between">
                  <p>{{ $t('singleListing.info.area') }}</p>
                  <p>{{ place.yta ? place.yta : '190' }} m²</p>
                </div>
                <hr>
                <div class="d-flex justify-content-between">
                  <p>{{ $t('singleListing.info.floor') }}</p>
                  <p>Markplan</p>
                </div>
              </div>
            </b-col>
            <!-- End Detaljer -->

            <!-- Start Planritning -->
            <b-col v-if="place.planritning" class="my-3" cols="12" md="6">
              <b class="font-4">{{ $t('singleListing.info.floorPlan') }}</b>
              <div v-for="img in place.planritning" :key="img" class="img">
                <div class="planritning rounder-circle" @click="showV('planritningImages',index)">
                  <i class="far fa-file-image font-1 text-secondaty mr-2" />
                  <span>{{ img }}</span>
                </div>

                <viewer
                  ref="viewer"
                  :images="planritningImages"
                  class="viewer"
                  @inited="initedV('planritningImages', $event)"
                >
                  <img v-for="src in planritningImages" :key="src" :src="src" class="d-none">
                </viewer>
              </div>
              <div v-if="place.planritning.length === 0">
                <p class="secondary--text">
                  Not provided.
                </p>
              </div>
            </b-col>
            <!-- End Planritning -->

            <!-- Start egenskaper -->
            <b-col v-if="place.egenskaper" class="my-3" cols="12" md="6">
              <b class="font-4">{{ $t('singleListing.info.characteristics') }}</b>
              <div v-for="tag in place.egenskaper" :key="tag.name[$i18n.locale]" class="mt-1 img">
                -
                <img v-if="tag.avatar" :src="`https://popup.dk.se/_nuxt/img/${tag.avatar}`" width="50px" :alt="tag.name[$i18n.locale]">
                <span v-else style="display: inline-block; width: 50px" />
                <b>{{ tag.name[$i18n.locale] }}</b>
              </div>
            </b-col>
            <!-- End Planritning -->

            <!-- Start Galleri -->
            <b-col class="my-3" cols="12">
              <div class="my-gallery" itemscope itemtype="http://schema.org/ImageGallery">
                <b class="font-4 mb-2">{{ $t('singleListing.info.gallery') }}</b>
                <!-- component -->
                <b-row no-gutters>
                  <b-col v-for="(src, index) in images" :key="src" cols="12" md="6" @click="showV('bildgalleri',index)">
                    <div class="gallery-images" style="height: 320px">
                      <img width="100%" :src="src" style="height: 320px">
                    </div>
                  </b-col>
                  <b-col v-if="images.length === 0" cols="12">
                    <p class="text-center text-secondary">
                      Not provided.
                    </p>
                  </b-col>
                </b-row>

                <viewer
                  ref="viewer2"
                  :images="images"
                  class="viewer"
                  @inited="initedV('bildgalleri', $event)"
                >
                  <img v-for="src in images" :key="`${src}-imaged`" :src="src" class="d-none">
                </viewer>
              </div>
            </b-col>
            <!-- End Galleri -->

            <b-col cols="12">
              <b-row style="min-height: 200px">
                <b-col cols="6" class="d-flex justify-content-end align-items-center">
                  <b-btn squared variant="primary" @click="tabOpened = 3">
                    Kontakta oss
                  </b-btn>
                </b-col>
                <b-col cols="6" class="contact-us-img" />
              </b-row>
            </b-col>
          </b-row>
        </b-container>
      </b-tab>

      <b-tab v-if="thereIsCentrum" title-item-class="d-none" class="my-4">
        <b-container>
          <!-- component -->
          <b-row no-gutters>
            <b-col v-for="(src, index) in centrumgalleri" :key="src" cols="12" md="6" @click="showV('centrumgalleri',index)">
              <div class="gallery-images" style="height: 320px">
                <img width="100%" :src="src" style="height: 320px">
              </div>
            </b-col>
          </b-row>

          <viewer ref="viewer3" :images="centrumgalleri" class="viewer" @inited="initedV('centrumgalleri', $event)">
            <img v-for="src in centrumgalleri" :key="`${src}-imaged`" :src="src" class="d-none">
          </viewer>

          <b-row class="my-3 py-5">
            <!-- Start Oppning -->
            <b-col cols="12" md="6" lg="3" offset-lg="2">
              <b class="d-block mb-3">Oppning</b>
              <div v-for="day in place.oppettider" :key="day._id">
                <b-row>
                  <b-col cols="6">
                    <p class="m-0 p-0" v-text="day.day + ':'" />
                  </b-col>
                  <b-col cols="6">
                    <p v-for="time in day.times" :key="time._id" class="m-0 p-0 text-right" v-text="`${time.opening.substr(0,5)} - ${time.closing.substr(0,5)}`" />
                  </b-col>
                </b-row>
                <hr>
              </div>
            </b-col>
            <!-- End Oppning -->
            <b-col cols="12" md="6" offset-lg="1">
              <b class="d-block mb-3">{{ $t('singleListing.info.website') }}</b>
              <a target="_blank" :href="'/' + place.hemsida" v-text="place.hemsida" />
            </b-col>
          </b-row>
        </b-container>
      </b-tab>

      <b-tab title-item-class="d-none" class="my-4">
        <b-container>
          <ul class="row">
            <li
              v-for="price in $t('singleListing.info.priceList')"
              :key="price"
              class="d-flex mb-1 col-12 col-md-6 justify-content-between align-items-center"
            >
              <b>{{ price }}:</b>
              <span>${{ place[price] }}</span>
            </li>
          </ul>
        </b-container>
      </b-tab>

      <b-tab title-item-class="d-none" class="my-4">
        <b-container>
          <b-form>
            <b class="font-3">Send us a booking request:</b>
            <b-row>
              <!-- Start user name -->
              <b-col cols="12">
                <b-form-group
                  class="my-2"
                  :label="$t('forms.name.title')"
                  label-class="font-weight-bold"
                  label-for="username"
                >
                  <b-form-input
                    id="username"
                    v-model="form.name"
                    autocomplete="off"
                    size="sm"
                  />
                </b-form-group>
              </b-col>
              <!-- End user name -->

              <!-- Start email -->
              <b-col cols="12" md="6">
                <b-form-group
                  class="my-2"
                  :label="$t('forms.email.title')"
                  label-class="font-weight-bold"
                  label-for="email"
                >
                  <b-form-input
                    id="email"
                    v-model="form.email"
                    type="email"
                    autocomplete="off"
                    size="sm"
                  />
                </b-form-group>
              </b-col>
              <!-- End email -->

              <!-- Start Phone -->
              <b-col cols="12" md="6">
                <b-form-group
                  class="my-2"
                  :label="$t('forms.phone.title')"
                  label-class="font-weight-bold"
                  label-for="Phone"
                >
                  <b-form-input
                    id="Phone"
                    v-model="form.phone"
                    autocomplete="off"
                    size="sm"
                  />
                </b-form-group>
              </b-col>
              <!-- End Phone -->

              <!-- Start Business -->
              <b-col cols="12" md="6">
                <b-form-group
                  class="my-2"
                  :label="$t('forms.business.title')"
                  label-class="font-weight-bold"
                  label-for="Business"
                >
                  <b-form-input
                    id="Business"
                    v-model="form.business"
                    autocomplete="off"
                    size="sm"
                  />
                </b-form-group>
              </b-col>
              <!-- End Business -->

              <!-- Start Website -->
              <b-col cols="12" md="6">
                <b-form-group
                  class="my-2"
                  :label="$t('singleListing.info.website') + ':'"
                  label-class="font-weight-bold"
                  label-for="Website"
                >
                  <b-form-input
                    id="Website"
                    v-model="form.website"
                    autocomplete="off"
                    size="sm"
                  />
                </b-form-group>
              </b-col>
              <!-- End Website -->

              <!-- Start From -->
              <b-col cols="12" md="6">
                <b-form-group
                  class="my-2"
                  :label="$t('singleListing.form.from')"
                  label-class="font-weight-bold"
                  label-for="from"
                >
                  <b-form-datepicker
                    id="from"
                    v-model="form.from"
                    today-button
                    reset-button
                    close-button
                    size="sm"
                    class="mb-2"
                  />
                </b-form-group>
              </b-col>
              <!-- End From -->

              <!-- Start empty -->
              <b-col cols="12" md="6">
                <b-form-group
                  class="my-2"
                  :label="$t('singleListing.form.empty')"
                  label-class="font-weight-bold"
                  label-for="Empty"
                >
                  <b-form-datepicker
                    id="Empty"
                    v-model="form.empty"
                    today-button
                    reset-button
                    close-button
                    size="sm"
                    class="mb-2"
                  />
                </b-form-group>
              </b-col>
              <!-- End empty -->

              <!-- Start details -->
              <b-col cols="12">
                <b-form-group
                  class="my-2"
                  :label="$t('singleListing.form.details')"
                  label-class="font-weight-bold"
                  label-for="details"
                >
                  <b-form-textarea
                    id="details"
                    size="sm"
                  />
                </b-form-group>
              </b-col>
              <!-- End details -->
              <b-col cols="12">
                <b-form-checkbox
                  id="GDPR"
                  v-model="form.GDPR"
                  name="GDPR"
                  :value="true"
                  :unchecked-value="false"
                >
                  {{ $t('singleListing.form.GDPR') }}
                </b-form-checkbox>
              </b-col>

              <b-btn class="m-2" size="lg" type="button" variant="primary" @click="sendForm">
                {{ $t('actions.submit') }}
              </b-btn>
            </b-row>
          </b-form>
        </b-container>
      </b-tab>
    </b-tabs>

    <b-container>
      <section class="my-3">
        <h2 class="text-center">
          {{ $t('singleListing.intersedIn') }}
        </h2>

        <p v-if="similar.length === 0" class="text-secondary text-center">
          {{ $t('singleListing.noSimilar') }}
        </p>
        <b-row v-else>
          <b-col
            v-for="(card, index) in similar"
            :key="String(index)"
            class="my-2"
            cols="12"
            md="6"
            lg="4"
          >
            <listing-card :place="card" :layout="'list'" @notAuthBookmark="modalShow = true" />
          </b-col>
        </b-row>
      </section>
    </b-container>
  </div>
</template>

<script>
import { BootstrapVue, BIcon } from 'bootstrap-vue'
import 'viewerjs/dist/viewer.css'
import Viewer from 'v-viewer'
import Vue from 'vue'
import panorama from '@/components/panorama'
import { addToFav } from '@/mixins/utils/addToFav'
Vue.use(Viewer)

export default {
  components: {
    // eslint-disable-next-line vue/no-unused-components
    BootstrapVue,
    // eslint-disable-next-line vue/no-unused-components
    BIcon,
    panorama
  },
  mixins: [addToFav],
  data () {
    return {
      modalShow: false,
      thereIsCentrum: false,
      map: {
        center: { lat: 59.334591, lng: 18.063240 },
        mapTypeId: 'roadmap',
        markers: []
      },
      place: {},
      similar: [],
      tabOpened: 0,
      form: {
        name: '',
        email: '',
        phone: '',
        business: '',
        website: '',
        empty: '',
        from: '',
        details: '',
        GDPR: false
      }
    }
  },
  computed: {
    tabs () {
      const tabs = {
        en: ['Information', 'Center info', 'Price', 'Booking request'],
        sv: ['Information', 'Centruminfo', 'Pris', 'Bokningsförfrågan']
      }
      if (!this.thereIsCentrum) {
        tabs.en.splice(1, 1)
        tabs.sv.splice(1, 1)
      }
      return tabs[this.$i18n.locale]
    },
    images () {
      return !this.place.bildgalleri ? [] : this.place.bildgalleri.map(x => `https://popup.dk.se/_nuxt/img/${x}`)
    },
    centrumgalleri () {
      return !this.place.centrumgalleri ? [] : this.place.centrumgalleri.map(x => `https://popup.dk.se/_nuxt/img/${x}`)
    },
    planritningImages () {
      return !this.place.planritning ? [] : this.place.planritning.map(x => `https://popup.dk.se/_nuxt/img/${x}`)
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
        { name: 'yta-1', text: this.place.yta || '' },
        { name: this.place.fasta ? 'fasta-oppettider-1' : 'fasta-oppettider-2', text: this.$t('singleListing.feats.fasta') },
        { name: this.place.butik ? 'butik-1' : 'butik-2', text: this.$t('singleListing.feats.butik') },
        { name: this.place.mat ? 'matodrick-1' : 'matodrick-2', text: this.$t('singleListing.feats.mat') },
        { name: this.place.event ? 'event-1' : 'event-2', text: this.$t('singleListing.feats.event') },
        { name: this.place.sasongBoxen ? 'sol' : 'solstol', text: this.$t('singleListing.feats.sasong') }
      ]
    }
  },
  async created () {
    this.$viewer = {}
    await this.$axios.$get(`/places/${this.$route.params.title}`)
      .then(async (res) => {
        const place = res.place
        await this.$axios.get('/region/')
          .then(async (regions) => {
            const region = regions.data.data.filter(x => JSON.stringify(x.name) === JSON.stringify(place.stad))[0]
            console.log(region)
            if (region.centrum) {
              await this.$axios.get(`/centrum/${region.centrum}`)
                .then((centrum) => {
                  // Get Centrum
                  place.hemsida = centrum.data.hemsida
                  place.centrumgalleri = centrum.data.centrumgalleri
                  place.centrumtextarea = centrum.data.centrumtextarea
                  place.oppettider = centrum.data.oppettider
                  place.location = centrum.data.routeGuidance
                  this.thereIsCentrum = true
                })
            }
          })
          // Assign place and map and similar listings
        this.place = place
        this.similar = res.similar.filter(x => x._id !== this.place._id)
        this.map = {
          center: { lng: res.place.location.coordinates[0], lat: res.place.location.coordinates[1] },
          mapTypeId: 'roadmap',
          markers: [
            { lng: res.place.location.coordinates[0], lat: res.place.location.coordinates[1] }
          ]
        }
      })
      .catch(res => console.log(res))
  },
  methods: {
    sendForm () {
      alert('Not working yet 😉')
    },
    initedV (name, viewer) {
      console.log('HEY YPU')
      console.log(name, viewer)
      this.$viewer[name] = viewer
    },
    showV (name, index) {
      this.$viewer[name].view(index)
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

.planritning {
  cursor: pointer;
}

.planritning i{
  transition: all 0.4s ease;
  border: 1px solid var(--dark);
  padding: 10px;
  border-radius: 50%;
}

.planritning:hover i{
  color: white;
  border: 1px solid var(--indigo);
  background: var(--indigo);
}

.contact-us-img {
  min-height: 400px;
  background-image: url('~assets/img/contact-us-person.png');
  background-size: cover;
  background-position: center center;
}
</style>
