<template>
  <div class="content">
    <loading :state="loadingState" />
    <b-container>
      <h2 class="my-3">
        {{ $t('addListing.title') }}
      </h2>
      <form id="listing" enctype="multipart/form-data">
        <div>
          <b-card :title="$t('addListing.inputs.title.label')">
            <b-card-body>
              <b-form-group
                id="title-sv-group"
                label="Swedish:"
                label-for="title-sv"
              >
                <b-form-input
                  id="title-sv"
                  v-model="title.sv"
                  required
                  autocomplete="off"
                  :state="titleValidSv"
                  :placeholder="$t('addListing.inputs.title.holder')"
                />
                <b-form-invalid-feedback :state="titleValidSv">
                  {{ $t('forms.required') }}
                </b-form-invalid-feedback>

                <b-form-valid-feedback :state="titleValidSv">
                  {{ $t('forms.valid') }}
                </b-form-valid-feedback>
              </b-form-group>

              <b-form-group
                id="title-en-group"
                label="English:"
                label-for="title-en"
              >
                <b-form-input
                  id="title-en"
                  v-model="title.en"
                  required
                  autocomplete="off"
                  :state="titleValidEn"
                  :placeholder="$t('addListing.inputs.title.holder')"
                />
                <b-form-invalid-feedback :state="titleValidEn">
                  {{ $t('forms.required') }}
                </b-form-invalid-feedback>

                <b-form-valid-feedback :state="titleValidEn">
                  {{ $t('forms.valid') }}
                </b-form-valid-feedback>
              </b-form-group>
            </b-card-body>
          </b-card>

          <b-card :title="$t('addListing.inputs.beskrivning')">
            <b-card-body>
              <p class="p-0 m-0">
                Swedish:
              </p>
              <client-only>
                <VueEditor v-model="article.beskreving.sv" class="mb-3" />
              </client-only>
              <p class="p-0 m-0">
                English:
              </p>
              <client-only>
                <VueEditor v-model="article.beskreving.en" />
              </client-only>
            </b-card-body>
          </b-card>

          <b-card :title="$t('addListing.inputs.Bilgalleri')">
            <b-card-body>
              <our-uploader
                :name="'bildgalleri[]'"
                :show-btn="false"
                :more="true"
                :old-images="images.bildgalleri"
                :max-number-of-inputs="999"
                :max-file-size="64"
              >
                <template v-slot:old-Image>
                  <b-row v-if="thereIsListing && images.bildgalleri.length > 0" class="mb-1">
                    <b-col
                      v-for="(img, index) in images.bildgalleri"
                      :key="index"
                      class="d-flex mb-1 "
                      cols="12"
                      sm="6"
                    >
                      <div class="position-relative">
                        <b-btn variant="danger" class="delete-btn" aria-label="Close" @click="deleteImageFromExistingArray(index, 'bildgalleri')">
                          <span aria-hidden="true">&times;</span>
                        </b-btn>
                        <b-img class="mx-2" style="height: 150px" :src="`https://popup.dk.se/_nuxt/img/${img}`" />
                      </div>
                    </b-col>
                  </b-row>
                </template>
              </our-uploader>
            </b-card-body>
            <template v-slot:footer>
              <em>Max File size: 64MB</em>
            </template>
          </b-card>

          <b-card :title="$t('addListing.inputs.Cover')">
            <b-card-body>
              <our-uploader
                :name="'cover[]'"
                :show-btn="false"
                :more="true"
                :old-images="images.cover"
                :max-number-of-inputs="999"
                :max-file-size="64"
              >
                <template v-slot:old-Image>
                  <b-row v-if="thereIsListing && images.cover.length > 0" class="mb-1">
                    <b-col
                      v-for="(img, index) in images.cover"
                      :key="index"
                      class="d-flex mb-1 "
                      cols="12"
                      sm="6"
                    >
                      <div class="position-relative">
                        <b-btn type="button" variant="danger" class="delete-btn" aria-label="Close" @click="deleteImageFromExistingArray(index, 'cover')">
                          <span aria-hidden="true">&times;</span>
                        </b-btn>
                        <b-img class="mx-2" style="height: 150px" :src="`https://popup.dk.se/_nuxt/img/${img}`" />
                      </div>
                    </b-col>
                  </b-row>
                </template>
              </our-uploader>
            </b-card-body>
            <template v-slot:footer>
              <em>Max File size: 64MB</em>
            </template>
          </b-card>

          <b-card v-for="(card, index) in renderInputs" :key="index" :title="card.title">
            <b-card-body>
              <b-form-checkbox
                v-if="!card.noTemp"
                :id="card.title"
                v-model="price[card.model].temp"
                class="mb-2"
                @change="setPrioteradPrice(card.model)"
              >
                {{ $t('addListing.inputs.price.priority') }}
              </b-form-checkbox>
              <b-form-input v-model="price[card.model].val" type="number" :placeholder="card.placeholder" />
            </b-card-body>
          </b-card>

          <b-card :title="$t('addListing.inputs.egenskaper')">
            <b-card-body>
              <b-form-checkbox-group
                id="egenskaper"
                v-model="egenskaper"
                :options="renderEgensKaper"
                name="tags"
              />
            </b-card-body>
          </b-card>

          <b-card :title="$t('addListing.inputs.yta.label')">
            <b-card-body>
              <b-form-input v-model="Yta" type="number" :placeholder="$t('addListing.inputs.yta.holder')" />
            </b-card-body>
          </b-card>

          <b-card :title="$t('addListing.inputs.placering.label')">
            <b-card-body>
              <b-form-input v-model="markplan" type="number" :placeholder="$t('addListing.inputs.placering.holder')" />
            </b-card-body>
          </b-card>

          <b-card :title="$t('addListing.inputs.stad')">
            <b-card-body>
              <b-form-radio-group
                v-model="city"
                :stacked="true"
                :options="cityOptions"
                :state="stadValid"
                name="radio-validation"
              >
                <b-form-invalid-feedback :state="stadValid">
                  {{ $t('addListing.inputs.selectOne') }}
                </b-form-invalid-feedback>
                <b-form-valid-feedback :state="stadValid">
                  {{ $t('forms.valid') }}
                </b-form-valid-feedback>
              </b-form-radio-group>
            </b-card-body>
          </b-card>

          <b-card :title="$t('addListing.inputs.plats')">
            <b-card-body>
              <div class="w-100">
                {{ location }}
                <gmap-map
                  :center="map.center"
                  :map-type-id="map.mapTypeId"
                  style="height: 300px"
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
                <gmap-autocomplete
                  @place_changed="setPlace"
                />
              </div>
              <b-form-group
                id="location-group"
                label-for="location"
              >
                <b-form-input
                  id="location"
                  v-model="location"
                  required
                  autocomplete="off"
                  :state="locationValid"
                  :placeholder="$t('addListing.inputs.plats')"
                />
                <b-form-invalid-feedback :state="locationValid">
                  {{ $t('forms.required') }}
                </b-form-invalid-feedback>

                <b-form-valid-feedback :state="locationValid">
                  {{ $t('forms.valid') }}
                </b-form-valid-feedback>
              </b-form-group>
            </b-card-body>
          </b-card>

          <b-card :title="$t('addListing.inputs.kategori')">
            <b-card-body>
              <b-form-checkbox-group
                v-model="kategori"
                :options="kategoriOpts"
                :state="kategoryValid"
                name="catigory-validation"
              >
                <b-form-invalid-feedback :state="kategoryValid">
                  {{ $t('addListing.inputs.selectOne') }}
                </b-form-invalid-feedback>
                <b-form-valid-feedback :state="kategoryValid">
                  {{ $t('forms.valid') }}
                </b-form-valid-feedback>
              </b-form-checkbox-group>
            </b-card-body>
          </b-card>

          <b-card :title="$t('addListing.inputs.planritning')">
            <b-card-body>
              <client-only>
                <our-uploader
                  :name="'planritning[]'"
                  :show-btn="false"
                  :more="true"
                  :old-images="images.planritning"
                  :max-number-of-inputs="999"
                  :max-file-size="64"
                >
                  <template v-slot:old-Image>
                    <b-row v-if="thereIsListing && images.planritning.length > 0" class="mb-1">
                      <b-col
                        v-for="(img, index) in images.planritning"
                        :key="index"
                        class="d-flex mb-1 "
                        cols="12"
                        sm="6"
                      >
                        <div class="position-relative">
                          <b-btn type="button" variant="danger" class="delete-btn" aria-label="Close" @click="deleteImageFromExistingArray(index, 'planritning')">
                            <span aria-hidden="true">&times;</span>
                          </b-btn>
                          <b-img class="mx-2" style="height: 150px" :src="`https://popup.dk.se/_nuxt/img/${img}`" />
                        </div>
                      </b-col>
                    </b-row>
                  </template>
                </our-uploader>
              </client-only>
            </b-card-body>
            <template v-slot:footer>
              <em>Max File size: 64MB</em>
            </template>
          </b-card>

          <b-card :title="$t('addListing.inputs.minsta.label')">
            <b-card-body>
              <b-form-input v-model="minsta" :placeholder="$t('addListing.inputs.minsta.holder')" />
            </b-card-body>
          </b-card>

          <b-card :title="$t('addListing.inputs.langsta.label')">
            <b-card-body>
              <b-form-input v-model="längsta" :placeholder="$t('addListing.inputs.langsta.holder')" />
            </b-card-body>
          </b-card>

          <b-card v-for="(input) in yesNoInputs" :key="input.name" :title="input.title">
            <b-card-body>
              <b-form-group>
                <b-form-radio v-model="yesNoInputsVal[input.model]" :name="input.name" value="true">
                  {{ $t('addListing.inputs.yes') }}
                </b-form-radio>
                <b-form-radio v-model="yesNoInputsVal[input.model]" :name="input.name" value="false">
                  {{ $t('addListing.inputs.no') }}
                </b-form-radio>
              </b-form-group>
            </b-card-body>
          </b-card>

          <b-card :title="$t('addListing.inputs.season')">
            <b-card-body>
              <b-form-group>
                <b-form-radio v-for="input in sasongInputs" :key="input" v-model="sasong" name="sasong" :value="input.text">
                  {{ input }}
                </b-form-radio>
              </b-form-group>
            </b-card-body>
          </b-card>

          <b-card :title="$t('addListing.inputs.hemsida')">
            <b-card-body>
              <b-form-input v-model="hamside" placeholder="https://vala.se" />
            </b-card-body>
          </b-card>

          <b-card :title="$t('addListing.inputs.textarea')">
            <b-card-body>
              <client-only>
                <VueEditor v-model="article.centrum" />
              </client-only>
            </b-card-body>
          </b-card>

          <b-card :title="$t('addListing.inputs.optidder')">
            <b-tabs content-class="mt-3" fill>
              <b-tab v-for="(tab) in times" :key="tab.name" :title="tab.name" :active="tab.active">
                <b-form-group>
                  <b-form-radio-group id="optidder" v-model="days[tab.name].openTimes" :name="tab.name">
                    <b-form-radio value="hours">
                      {{ $t('addListing.inputs.optidderOpts.hours') }}
                    </b-form-radio>
                    <b-form-radio value="openAllDay">
                      {{ $t('addListing.inputs.optidderOpts.allDayOpen') }}
                    </b-form-radio>
                    <b-form-radio value="closeAllDay">
                      {{ $t('addListing.inputs.optidderOpts.allDayClose') }}
                    </b-form-radio>
                    <b-form-radio value="appointment">
                      {{ $t('addListing.inputs.optidderOpts.appointment') }}
                    </b-form-radio>
                  </b-form-radio-group>
                </b-form-group>

                <div v-if="days[tab.name].openTimes == 'hours'">
                  <b-row v-for="(hours, index) in days[tab.name].hours" :key="'m' + index" class="my-3">
                    <b-col cols="12" md="5" class="mb-2 mb-md-0">
                      <b-form-timepicker v-model="days[tab.name].hours[index].opening" locale="en" />
                    </b-col>
                    <b-col cols="12" md="5" class="mb-2 mb-md-0">
                      <b-form-timepicker v-model="days[tab.name].hours[index].closing" locale="en" />
                    </b-col>
                    <b-col cols="12" md="2">
                      <b-button variant="outline-light" block @click="delteTimeRow(tab.name, index)">
                        <b-icon-trash variant="dark" class="rounded-circle" />
                      </b-button>
                    </b-col>
                  </b-row>

                  <b-col cols="12">
                    <b-button block variant="primary" @click="addTimeRow(tab.name)">
                      Add Time
                    </b-button>
                  </b-col>
                </div>
              </b-tab>
            </b-tabs>
          </b-card>

          <b-card :title="$t('addListing.inputs.vag')">
            <b-card-body>
              <b-form-input v-model="vagvisningen" :placeholder="$t('addListing.inputs.vag')" />
            </b-card-body>
          </b-card>

          <b-card :title="$t('addListing.inputs.centerGallery')">
            <b-card-body>
              <client-only>
                <our-uploader
                  :name="'centrumgalleri[]'"
                  :show-btn="false"
                  :more="true"
                  :old-images="images.centrumgalleri"
                  :max-number-of-inputs="999"
                  :max-file-size="64"
                >
                  <template v-slot:old-Image>
                    <b-row v-if="thereIsListing && images.centrumgalleri.length > 0" class="mb-1">
                      <b-col
                        v-for="(img, index) in images.centrumgalleri"
                        :key="index"
                        class="d-flex mb-1 "
                        cols="12"
                        sm="6"
                      >
                        <div class="position-relative">
                          <b-btn type="button" variant="danger" class="delete-btn" aria-label="Close" @click="deleteImageFromExistingArray(index, 'centrumgalleri')">
                            <span aria-hidden="true">&times;</span>
                          </b-btn>
                          <b-img class="mx-2" style="height: 150px" :src="`https://popup.dk.se/_nuxt/img/${img}`" />
                        </div>
                      </b-col>
                    </b-row>
                  </template>
                </our-uploader>
              </client-only>
            </b-card-body>
            <template v-slot:footer>
              <em>Max File size: 64MB</em>
            </template>
          </b-card>

          <b-card :title="$t('addListing.inputs.fran')">
            <b-card-body>
              <b-form-datepicker id="Upptaget-från" v-model="fran" today-button reset-button class="mb-2" />
            </b-card-body>
          </b-card>

          <b-card :title="$t('addListing.inputs.till')">
            <b-card-body>
              <b-form-datepicker id="Upptaget-till" v-model="till" today-button reset-button class="mb-2" />
            </b-card-body>
          </b-card>

          <b-card :title="$t('addListing.inputs.Lokalens')">
            <b-card-body>
              <b-form-radio-group v-model="lokal" :stacked="true" :options="lokalOpts" :state="lokalensValid" name="lokal-validation">
                <b-form-invalid-feedback :state="lokalensValid">
                  {{ $t('addListing.inputs.selectOne') }}
                </b-form-invalid-feedback>
                <b-form-valid-feedback :state="lokalensValid">
                  {{ $t('addListing.inputs.choosed') }} {{ lokal }}
                </b-form-valid-feedback>
              </b-form-radio-group>
            </b-card-body>
          </b-card>

          <b-card :title="$t('addListing.inputs.expiry')">
            <b-card-body>
              <b-form-datepicker id="example-datepicker" v-model="expiry" today-button reset-button class="mb-2" />
            </b-card-body>
          </b-card>
        </div>
      </form>

      <!-- Start Alert -->
      <b-alert :show="!valid" variant="danger">
        <div>
          <p v-if="!titleValidEn" class="font-weight-bold">
            <i class="fas fa-exclamation-triangle" />
            {{ $t('addListing.errors.title.en') }}
          </p>
          <p v-if="!titleValidSv" class="font-weight-bold">
            <i class="fas fa-exclamation-triangle" />
            {{ $t('addListing.errors.title.sv') }}
          </p>
          <p v-if="!stadValid" class="font-weight-bold">
            <i class="fas fa-exclamation-triangle" />
            {{ $t('addListing.errors.stad') }}
          </p>
          <p v-if="!locationValid" class="font-weight-bold">
            <i class="fas fa-exclamation-triangle" />
            {{ $t('addListing.errors.location') }}
          </p>
          <p v-if="!kategoryValid" class="font-weight-bold">
            <i class="fas fa-exclamation-triangle" />
            {{ $t('addListing.errors.category') }}
          </p>
          <p v-if="!lokalensValid" class="font-weight-bold">
            <i class="fas fa-exclamation-triangle" />
            {{ $t('addListing.errors.lokalens') }}
          </p>
          <p v-if="!price.prioteradpris.val" class="font-weight-bold">
            <i class="fas fa-exclamation-triangle" />
            {{ $t('addListing.errors.propteradpris') }}
          </p>
        </div>
      </b-alert>
      <!-- End Alert -->
      <b-btn v-if="!thereIsListing" :disabled="!valid" variant="primary" block @click="addListing">
        {{ $t('addListing.btns.add') }}
      </b-btn>
      <b-btn v-else :disabled="!valid" variant="primary" block @click="editListing">
        {{ $t('addListing.btns.edit') }}
      </b-btn>
    </b-container>
  </div>
</template>

<script>
import { BootstrapVue, BIcon, BIconTrash } from 'bootstrap-vue'
import ourUploader from '@/components/ourUploader'

let VueEditor
if (process.browser) {
  VueEditor = require('vue2-editor').VueEditor
}

export default {
  name: 'ListingForm',
  components: {
    VueEditor,
    // eslint-disable-next-line vue/no-unused-components
    BootstrapVue,
    // eslint-disable-next-line vue/no-unused-components
    BIcon,
    BIconTrash,
    ourUploader
  },
  props: {
    listing: {
      type: Object,
      default: () => {}
    }
  },
  data () {
    return {
      loadingState: false,
      map: {
        center: { lat: 59.334591, lng: 18.063240 },
        mapTypeId: 'roadmap',
        markers: []
      },
      title: {
        en: null,
        sv: null
      },
      article: {
        beskreving: {
          en: null,
          sv: null
        },
        centrum: null
      },
      price: {
        day: {
          val: null,
          temp: false
        },
        helg: {
          val: null,
          temp: false
        },
        langheig: {
          val: null,
          temp: false
        },
        veckopris: {
          val: null,
          temp: false
        },
        manad: {
          val: null,
          temp: false
        },
        prioteradpris: {
          val: null
        }
      },
      renderInputs: [
        {
          title: this.$t('addListing.inputs.price.dag'),
          placeholder: this.$t('addListing.inputs.price.dag'),
          model: 'day'
        },
        {
          title: this.$t('addListing.inputs.price.helg'),
          placeholder: this.$t('addListing.inputs.price.helg'),
          model: 'helg'
        },
        {
          title: this.$t('addListing.inputs.price.långhelg'),
          placeholder: this.$t('addListing.inputs.price.långhelg'),
          model: 'langheig'
        },
        {
          title: this.$t('addListing.inputs.price.vecka'),
          placeholder: this.$t('addListing.inputs.price.vecka'),
          model: 'veckopris'
        },
        {
          title: this.$t('addListing.inputs.price.manad'),
          placeholder: this.$t('addListing.inputs.price.manad'),
          model: 'manad'
        }
      ],
      allTags: [],
      egenskaper: [],
      renderEgensKaper: [],
      Yta: null,
      markplan: null,
      city: null,
      cityOptions: [],
      kategori: [],
      kategoriOpts: [],
      location: null,

      minsta: null,
      längsta: null,

      yesNoInputsVal: {
        fasta: null,
        butik: null,
        mat: null,
        event: null
      },
      yesNoInputs: [
        {
          title: this.$t('addListing.inputs.fasta'),
          name: 'Fasta-öppettider',
          model: 'fasta'
        },
        {
          title: this.$t('addListing.inputs.butik'),
          name: 'Butik-"Boxen"',
          model: 'butik'
        },
        {
          title: this.$t('addListing.inputs.mat'),
          name: 'Mat&Dryck',
          model: 'mat'
        },
        {
          title: this.$t('addListing.inputs.event'),
          name: 'Event',
          model: 'event'
        }
      ],
      sasongInputs: this.$t('addListing.inputs.seasonOts'),
      sasong: null,

      hamside: null,
      lokalOpts: [],
      lokal: null,
      vagvisningen: null,
      fran: null,
      till: null,
      days: {
        Mon: {
          openTimes: 'hours',
          hours: [
            { opening: '00:00:00', closing: '00:00:00' }
          ]
        },
        Tue: {
          openTimes: 'hours',
          hours: [
            { opening: '00:00:00', closing: '00:00:00' }
          ]
        },
        Wed: {
          openTimes: 'hours',
          hours: [
            { opening: '00:00:00', closing: '00:00:00' }
          ]
        },
        Thu: {
          openTimes: 'hours',
          hours: [
            { opening: '00:00:00', closing: '00:00:00' }
          ]
        },
        Fri: {
          openTimes: 'hours',
          hours: [
            { opening: '00:00:00', closing: '00:00:00' }
          ]
        },
        Sat: {
          openTimes: 'hours',
          hours: [
            { opening: '00:00:00', closing: '00:00:00' }
          ]
        },
        Sun: {
          openTimes: 'hours',
          hours: [
            { opening: '00:00:00', closing: '00:00:00' }
          ]
        }
      },
      times: [
        {
          name: 'Mon',
          active: true
        },
        {
          name: 'Tue',
          active: false
        },
        {
          name: 'Wed',
          active: false
        },
        {
          name: 'Thu',
          active: false
        },
        {
          name: 'Fri',
          active: false
        },
        {
          name: 'Sat',
          active: false
        },
        {
          name: 'Sun',
          active: false
        }
      ],
      expiry: null,
      images: {
        bildgalleri: null,
        cover: null,
        planritning: null,
        centrumgalleri: null
      }
    }
  },
  computed: {
    thereIsListing () {
      return !!this.$route.params.id
    },
    titleValidEn () {
      return !!this.title.en
    },
    titleValidSv () {
      return !!this.title.sv
    },
    stadValid () {
      return !!this.city
    },
    locationValid () {
      return !!this.location
    },
    kategoryValid () {
      return this.kategori.length > 0
    },
    lokalensValid () {
      return !!this.lokal
    },
    valid () {
      return !!this.titleValidEn &&
              !!this.titleValidSv &&
              !!this.stadValid &&
              !!this.locationValid &&
              !!this.kategoryValid &&
              !!this.lokalensValid &&
              !!this.price.prioteradpris.val
    },
    renderKey () {
      return this.$store.state.sidebarRenderKey
    }
  },
  watch: {
    location (val) {
      console.log('location: ', val)
      this.map.center = val
      this.map.markers = [val]
    }
  },
  mounted () {
    this.loadingState = true

    this.preparePageData()
    if (this.thereIsListing) { this.assignListingToEdit() }
  },
  methods: {
    setPlace (place) {
      if (!place) { return }

      this.location = {
        lat: place.geometry.location.lat(),
        lng: place.geometry.location.lng()
      }
    },
    async preparePageData () {
      const promises = [
        this.$axios.$get('/users/all'),
        this.$axios.$get('/region'),
        this.$axios.$get('/category'),
        this.$axios.$get('/tag')
      ]
      await Promise.all(promises)
        .then((res) => {
          console.log(res)
          const users = res[0].data
          const regions = res[1].data
          const categories = res[2].data
          const tags = res[3].data
          const lang = this.$i18n.getLocaleCookie()

          this.lokalOpts = users.map(x => x.name)
          this.allTags = tags
          this.renderEgensKaper = tags.map((x) => {
            return {
              text: x.name[lang],
              value: { name: x.name, avatar: x.avatar }
            }
          })
          this.cityOptions = regions.map((x) => {
            return {
              text: x.name[lang],
              value: JSON.stringify(x.name)
            }
          })
          this.kategoriOpts = categories.map((x) => {
            return { text: x.name[lang], value: x.name[lang] }
          })
          this.loadingState = false
        })
        .catch((err) => {
          console.log(err)
        })
    },
    assignListingToEdit () {
      const { prioteradpris, egenskaper, oppettider, kategori, title, yta, placering, stad, location, vagvisningen, fran, till, kontaktperson, expiry, minstahyresperiod, langstahyresperiod, sasongBoxen, hemsida, beskreving, centrumtextarea, prisperdag, prisperhelg, prisperlanghelg, prispermanad, prispervecka, bildgalleri, cover, planritning, centrumgalleri } = this.listing
      this.title.en = title.en
      this.title.sv = title.sv
      this.Yta = yta
      this.markplan = placering
      this.city = JSON.stringify(stad)
      this.location = location
      this.vagvisningen = vagvisningen
      this.fran = fran
      this.till = till
      this.lokal = kontaktperson
      this.expiry = expiry
      this.minsta = minstahyresperiod
      this.längsta = langstahyresperiod
      this.sasong = sasongBoxen
      this.hamside = hemsida
      this.article.beskreving.en = beskreving.en
      this.article.beskreving.sv = beskreving.sv
      this.article.centrum = centrumtextarea

      // ASSIGN DAYS
      for (const key in oppettider) {
        if (oppettider.hasOwnProperty(key)) {
          const element = oppettider[key]
          const day = this.days[element.day]
          day.hours = element.times
          day.openTimes = element.oppettider
        }
      }

      // ASSIGN PRICES
      this.price.day.val = prisperdag
      this.price.helg.val = prisperhelg
      this.price.langheig.val = prisperlanghelg
      this.price.manad.val = prispermanad
      this.price.veckopris.val = prispervecka

      // ASSIGN IMAGES
      this.images.bildgalleri = bildgalleri
      this.images.cover = cover
      this.images.planritning = planritning
      this.images.centrumgalleri = centrumgalleri

      const prices = [
        { text: 'day', val: prisperdag },
        { text: 'helg', val: prisperhelg },
        { text: 'langheig', val: prisperlanghelg },
        { text: 'manad', val: prispermanad },
        { text: 'veckopris', val: prispervecka }
      ]

      // DETERMINE THE prispervecka
      prices.forEach((price) => {
        if (Number(price.val) === Number(prioteradpris)) {
          this.price[price.text].temp = true
          this.price.prioteradpris.val = price.val
        }
      })

      // ADD TAGS
      this.egenskaper = egenskaper

      // ADD CATEGORY
      this.kategori = kategori

      // ASSIGN YES AND NO INPUTS
      const yesNoFromListing = ['fasta', 'butik', 'mat', 'event']
      yesNoFromListing.forEach((input) => {
        this.yesNoInputsVal[input] = this.listing[input]
      })
      this.loadingState = false
    },
    delteTimeRow (name, index) {
      this.days[name].hours.splice(index, 1)
    },
    addTimeRow (name) {
      this.days[name].hours.push({ opening: '00:00:00', closing: '00:00:00' })
    },
    setPrioteradPrice (card) {
      this.$nextTick(() => {
        for (const key in this.price) {
          const obj = this.price[key]
          if (key !== card) {
            obj.temp = false
          } else {
            this.price.prioteradpris.val = this.price[card].val
          }
        }
      })
    },
    createFormDate () {
      const listing = new FormData(document.getElementById('listing'))
      listing.delete('Fasta-öppettider')
      listing.delete('Butik-%22Boxen%22')
      listing.delete('Mat&Dryck')
      listing.delete('Event')
      listing.delete('säsong')
      listing.delete('user')

      listing.append('beskreving', JSON.stringify(this.article.beskreving))
      listing.append('title', JSON.stringify(this.title))

      // ASSIGN THE PRICE
      listing.append('prisperdag', this.price.day.val || 0)
      listing.append('prisperhelg', this.price.helg.val || 0)
      listing.append('prisperlanghelg', this.price.langheig.val || 0)
      listing.append('prispervecka', this.price.veckopris.val || 0)
      listing.append('prispermanad', this.price.manad.val || 0)
      listing.append('prioteradpris', this.price.prioteradpris.val)

      // ASSIGN TAG
      this.egenskaper.forEach(feat => listing.append('egenskaper[]', JSON.stringify(feat)))

      listing.append('yta', this.Yta)
      listing.append('placering', this.markplan)
      listing.append('stad', this.city)

      // ASSIGN CATEGORY
      this.kategori.forEach(cate => listing.append('kategori[]', cate))

      listing.append('minstahyresperiod', this.minsta)
      listing.append('langstahyresperiod', this.längsta)

      for (const key in this.yesNoInputsVal) {
        // eslint-disable-next-line no-prototype-builtins
        if (this.yesNoInputsVal.hasOwnProperty(key)) {
          const value = this.yesNoInputsVal[key]
          // console.log(key, value)
          if (value) { listing.append(key, value) }
        }
      }

      listing.append('sasongBoxen', this.sasong)
      listing.append('hemsida', this.hamside)
      listing.append('centrumtextarea', this.article.centrum)

      for (const key in this.days) {
        // eslint-disable-next-line no-prototype-builtins
        if (this.days.hasOwnProperty(key)) {
          const value = this.days[key]
          const data = JSON.stringify({
            day: key,
            oppettider: value.openTimes,
            times: value.hours
          })

          listing.append('oppettider[]', data)
        }
      }

      listing.append('vagvisningen', this.vagvisningen)
      listing.append('fran', this.fran)
      listing.append('till', this.till)

      listing.append('kontaktperson', this.lokal)
      listing.append('expiry', this.expiry)

      return listing
    },
    async addListing () {
      this.loadingState = true

      const listing = this.createFormDate()
      await this.$axios.$post('/places', listing)
        .then((res) => {
          this.$nextTick(() => {
            this.$router.push('/admin/listings/')
          })
        })
        .catch((err) => {
          this.$bvToast.toast(err.response.data.msg, {
            title: this.$t('region.toast.error'),
            autoHideDelay: 5000,
            appendToast: true,
            variant: 'danger'
          })
        })
    },
    deleteImageFromExistingArray (index, name) {
      this.images[name].splice(index, 1)
    },
    async editListing () {
      this.loadingState = true

      const listing = this.createFormDate()

      const bildgalleri = this.listing.bildgalleri ? [...this.listing.bildgalleri] : []
      const cover = this.listing.cover ? [...this.listing.cover] : []
      const planritning = this.listing.planritning ? [...this.listing.planritning] : []
      const centrumgalleri = this.listing.centrumgalleri ? [...this.listing.centrumgalleri] : []

      for (const pair of listing.entries()) { // post Images First
        if (pair[0] === 'bildgalleri[]') {
          const data = new FormData()
          if (pair[1].name) {
            data.append('bildgalleri[]', pair[1]); data.append('name', 'bildgalleri[]')

            await this.$axios.$post('/places/images', data)
              .then(res => bildgalleri.push(res))
              .catch(err => console.log(err))
          }
        } else if (pair[0] === 'cover[]') {
          const data = new FormData()
          if (pair[1].name) {
            data.append('cover[]', pair[1]); data.append('name', 'cover[]')

            await this.$axios.$post('/places/images', data)
              .then(res => cover.push(res))
              .catch(err => console.log(err))
          }
        } else if (pair[0] === 'planritning[]') {
          const data = new FormData()
          if (pair[1].name) {
            data.append('planritning[]', pair[1]); data.append('name', 'planritning[]')

            await this.$axios.$post('/places/images', data)
              .then(res => planritning.push(res))
              .catch(err => console.log(err))
          }
        } else if (pair[0] === 'centrumgalleri[]') {
          const data = new FormData()
          if (pair[1].name) {
            data.append('centrumgalleri[]', pair[1]); data.append('name', 'centrumgalleri[]')

            await this.$axios.$post('/places/images', data)
              .then(res => centrumgalleri.push(res))
              .catch(err => console.log(err))
          }
        }
      }

      // DELETE THE INPUTS
      listing.delete('bildgalleri[]')
      listing.delete('cover[]')
      listing.delete('planritning[]')
      listing.delete('centrumgalleri[]')

      // APPEND THE ARRAY WE CREATED 😉
      listing.append('bildgalleri', JSON.stringify(bildgalleri))
      listing.append('cover', JSON.stringify(cover))
      listing.append('planritning', JSON.stringify(planritning))
      listing.append('centrumgalleri', JSON.stringify(centrumgalleri))

      for (const pair of listing.entries()) {
        console.log(pair[0], ':', pair[1])
      }
      await this.$axios.$patch(`/places/${this.listing._id}`, listing)
        .then(res => this.$router.push('/admin/listings/'))
        .catch((err) => {
          this.toast = {
            title: this.$t('region.toast.error'),
            variant: 'danger',
            visible: true,
            text: err.message
          }
        })
    }
  }
}
</script>

<style scoped>
/* ö ä Å Ö å */

.card-title {
  font-weight: 800
}

button.delete-btn{
  position: absolute;
  top: 0;
  right: 10px;
  z-index: 4;
  /* color: white; */
  /* background-color: red; */
}
</style>
