<template>
  <div class="content">
    <b-container>
      <h2 class="my-3">
        Add Listing:
      </h2>
      <form id="listing" enctype="multipart/form-data">
        <div>
          <b-card title="Title:">
            <b-card-body>
              <b-form-input v-model="title" placeholder="Listing Title" />
            </b-card-body>
          </b-card>

          <b-card title="Beskrivning:">
            <b-card-body>
              <client-only>
                <VueEditor v-model="article.beskreving" />
              </client-only>
            </b-card-body>
          </b-card>

          <b-card title="Bildgalleri:">
            <b-card-body>
              <our-uploader :name="'bildgalleri[]'" :more="true" :old-images="images.bildgalleri" :max-number-of-inputs="999" :max-file-size="64">
                <template v-slot:old-Image>
                  <b-row>
                    <b-col
                      v-if="thereIsListing && images.bildgalleri.length > 0"
                      class="d-flex justify-content-center"
                      cols="12"
                      sm="6"
                      md="4"
                      lg="3"
                    >
                      <b-img v-for="(img, index) in images.bildgalleri" :key="index" class="mx-2" style="height: 150px" :src="require(`@/server/images/${img}`)" />
                      <button type="button" class="close" aria-label="Close" @click="deleteImage">
                        <span aria-hidden="true">&times;</span>
                      </button>
                    </b-col>
                  </b-row>
                </template>
              </our-uploader>
            </b-card-body>
            <template v-slot:footer>
              <em>Max File size: 64MB</em>
            </template>
          </b-card>

          <b-card title="Cover bilden:">
            <b-card-body>
              <our-uploader :name="'cover[]'" :more="true" :old-images="images.cover" :max-number-of-inputs="999" :max-file-size="64">
                <template v-slot:old-Image>
                  <b-row>
                    <b-col
                      v-if="thereIsListing && images.cover.length > 0"
                      class="d-flex justify-content-center"
                      cols="12"
                      sm="6"
                      md="4"
                      lg="3"
                    >
                      <b-img v-for="(img, index) in images.cover" :key="index" class="mx-2" style="height: 150px" :src="require(`@/server/images/${img}`)" />
                      <button type="button" class="close" aria-label="Close" @click="deleteImage">
                        <span aria-hidden="true">&times;</span>
                      </button>
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
                Set as priorited price
              </b-form-checkbox>
              <b-form-input v-model="price[card.model].val" type="number" :placeholder="card.placeholder" />
            </b-card-body>
          </b-card>

          <b-card title="Egenskaper:">
            <b-card-body>
              <b-row>
                <b-col v-for="(feat,index) in renderEgensKaper" :key="index" cols="12" md="6">
                  <b-form-checkbox
                    :id="feat"
                    v-model="egenskaper[feat]"
                    class="mb-2"
                  >
                    {{ feat }}
                  </b-form-checkbox>
                </b-col>
              </b-row>
            </b-card-body>
          </b-card>

          <b-card title="Yta:">
            <b-card-body>
              <b-form-input v-model="Yta" type="number" placeholder="ex: 190" />
            </b-card-body>
          </b-card>

          <b-card title="Våning/placering:">
            <b-card-body>
              <b-form-input v-model="markplan" type="number" placeholder="markplan" />
            </b-card-body>
          </b-card>

          <b-card title="Stad:">
            <b-card-body>
              <b-form-group>
                <b-form-radio
                  v-for="(stad, index) in cityOptions"
                  :key="index"
                  v-model="city"
                  :name="stad"
                  :value="stad"
                >
                  {{ stad }}
                </b-form-radio>
              </b-form-group>
            </b-card-body>
          </b-card>

          <b-card title="Location:">
            <b-card-body>
              <b-form-input v-model="location" placeholder="location" />
            </b-card-body>
          </b-card>

          <b-card title="Kategori*:">
            <b-card-body>
              <b-row>
                <b-col v-for="(kati,index) in kategoriOpts" :key="index" cols="12" md="6">
                  <b-form-checkbox
                    :id="kati"
                    v-model="kategori[kati]"
                    class="mb-2"
                  >
                    {{ kati }}
                  </b-form-checkbox>
                </b-col>
              </b-row>
            </b-card-body>
          </b-card>

          <b-card title="Planritning:">
            <b-card-body>
              <client-only>
                <our-uploader :name="'planritning[]'" :more="true" :old-images="images.planritning" :max-number-of-inputs="999" :max-file-size="64">
                  <template v-slot:old-Image>
                    <b-row>
                      <b-col
                        v-if="thereIsListing && images.planritning.length > 0"
                        class="d-flex justify-content-center"
                        cols="12"
                        sm="6"
                        md="4"
                        lg="3"
                      >
                        <b-img v-for="(img, index) in images.planritning" :key="index" class="mx-2" style="height: 150px" :src="require(`@/server/images/${img}`)" />
                        <button type="button" class="close" aria-label="Close" @click="deleteImage">
                          <span aria-hidden="true">&times;</span>
                        </button>
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

          <b-card title="Minsta hyresperiod">
            <b-card-body>
              <b-form-input v-model="minsta" placeholder="Den minsta hyresperiod för lokalen" />
            </b-card-body>
          </b-card>

          <b-card title="Längsta hyresperiod:">
            <b-card-body>
              <b-form-input v-model="längsta" placeholder="Den längsta hyresperiod för lokalen" />
            </b-card-body>
          </b-card>

          <b-card v-for="(input) in yesNoInputs" :key="input.name" :title="input.title">
            <b-card-body>
              <b-form-group>
                <b-form-radio v-model="yesNoInputsVal[input.model]" :name="input.name" value="true">
                  Ja
                </b-form-radio>
                <b-form-radio v-model="yesNoInputsVal[input.model]" :name="input.name" value="false">
                  Nej
                </b-form-radio>
              </b-form-group>
            </b-card-body>
          </b-card>

          <b-card title="Säsong Boxen:">
            <b-card-body>
              <b-form-group>
                <b-form-radio v-for="input in sasongInputs" :key="input.text" v-model="sasong" name="sasong" :value="input.text">
                  {{ input.text }}
                </b-form-radio>
              </b-form-group>
            </b-card-body>
          </b-card>

          <b-card title="Centrum hemsida:">
            <b-card-body>
              <b-form-input v-model="hamside" placeholder="https://vala.se" />
            </b-card-body>
          </b-card>

          <b-card title="Centrum textarea:">
            <b-card-body>
              <client-only>
                <VueEditor v-model="article.centrum" />
              </client-only>
            </b-card-body>
          </b-card>

          <b-card title="Öppettider:">
            <b-tabs content-class="mt-3" fill>
              <b-tab v-for="(tab) in times" :key="tab.name" :title="tab.name" :active="tab.active">
                <b-form-radio-group>
                  <b-row>
                    <b-col cols="6" md="3">
                      <b-form-radio
                        v-model="days[tab.name].openTimes"
                        value="hours"
                        :name="tab.name"
                      >
                        Enter hours
                      </b-form-radio>
                    </b-col>
                    <b-col cols="6" md="3">
                      <b-form-radio
                        v-model="days[tab.name].openTimes"
                        value="openAllDay"
                        :name="tab.name"
                      >
                        Open all day
                      </b-form-radio>
                    </b-col>

                    <b-col cols="6" md="3">
                      <b-form-radio
                        v-model="days[tab.name].openTimes"
                        value="closeAllDay"
                        :name="tab.name"
                      >
                        Close all day
                      </b-form-radio>
                    </b-col>

                    <b-col cols="6" md="3">
                      <b-form-radio
                        v-model="days[tab.name].openTimes"
                        value="appointment"
                        :name="tab.name"
                      >
                        By appointment only
                      </b-form-radio>
                    </b-col>
                  </b-row>
                </b-form-radio-group>

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

          <b-card title="Vägvisningen:">
            <b-card-body>
              <b-form-input v-model="vagvisningen" placeholder="Vägvisningen" />
            </b-card-body>
          </b-card>

          <b-card title="Centrum Galleri:">
            <b-card-body>
              <client-only>
                <our-uploader :name="'centrumgalleri[]'" :more="true" :old-images="images.bildgalleri" :max-number-of-inputs="999" :max-file-size="64">
                  <template v-slot:old-Image>
                    <b-row>
                      <b-col
                        v-if="thereIsListing && images.centrumgalleri.length > 0"
                        class="d-flex justify-content-center"
                        cols="12"
                        sm="6"
                        md="4"
                        lg="3"
                      >
                        <b-img v-for="(img, index) in images.centrumgalleri" :key="index" class="mx-2" style="height: 150px" :src="require(`@/server/images/${img}`)" />
                        <button type="button" class="close" aria-label="Close" @click="deleteImage">
                          <span aria-hidden="true">&times;</span>
                        </button>
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

          <b-card title="Upptaget från:">
            <b-card-body>
              <b-form-datepicker id="Upptaget-från" v-model="fran" class="mb-2" />
            </b-card-body>
          </b-card>

          <b-card title="Upptaget till:">
            <b-card-body>
              <b-form-datepicker id="Upptaget-till" v-model="till" class="mb-2" />
            </b-card-body>
          </b-card>

          <b-card title="Lokalens kontaktperson:">
            <b-card-body>
              <b-form-group>
                <b-form-radio v-for="input in lokalOpts" :key="input" v-model="lokal" name="users" :value="input">
                  {{ input }}
                </b-form-radio>
              </b-form-group>
            </b-card-body>
          </b-card>

          <b-card title="Listing Expiry Date:">
            <b-card-body>
              <b-form-datepicker id="example-datepicker" v-model="expiry" class="mb-2" />
            </b-card-body>
          </b-card>
        </div>
      </form>
      <b-btn v-if="!thereIsListing" variant="primary" block @click="addListing">
        Add Listing
      </b-btn>
      <b-btn v-else variant="primary" block @click="editListing">
        Edit Listing
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
      /* form: {
        title: null,
        Yta: null,
        markplan: null,
        city: null,
        location: null,
        vagvisningen: null,
        fran: null,
        till: null,
        lokal: null,
        expiry: null,
        minsta: null,
        längsta: null,
        sasong: null,
        hamside: null,
        beskreving: null,
        centrum: null,
        price[card.model].temp: null,
        price[card.model].val: null,
        egenskaper[feat]: null,
        kategori[kati]: null,
        yesNoInputsVal[input.model]: null,
        days[tab.name].openTimes: null,
        days[tab.name].hours[index].opening: null,
        days[tab.name].hours[index].closing: null,
      }, */

      title: null,
      article: {
        beskreving: null,
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
        }
      },
      renderInputs: [
        {
          title: 'Pris per dag:',
          placeholder: 'Daglig pris',
          model: 'day'
        },
        {
          title: 'Pris per helg:',
          placeholder: 'Helgpris',
          model: 'helg'
        },
        {
          title: 'Pris per långhelg:',
          placeholder: 'lagh',
          model: 'langheig'
        },
        {
          title: 'Pris per vecka:',
          placeholder: 'veckopris',
          model: 'veckopris'
        },
        {
          title: 'Pris per månad:',
          placeholder: 'manad',
          model: 'manad'
        }
      ],
      egenskaper: {
        Belysning: false,
        El: false,
        Handikappanpassad: false,
        Högtalare: false,
        Inredning: false,
        Kassasystem: false,
        Kök: false,
        Lager: false,
        Lastkaj: false,
        Provrum: false,
        Skyltfönster: false,
        VVS: false,
        WC: false,
        'wi-fi': false
      },
      renderEgensKaper: [],
      Yta: null,
      markplan: null,
      city: null,
      cityOptions: [],
      kategori: {
        Butikslokal: false,
        Event: false,
        '-- Eventlokal': false,
        '-- Eventyta': false,
        '-- Galleri': false,
        '-- Showroom': false,
        Foodtruck: false,
        Köpcentrum: false,
        Marknad: false,
        '-- Beach Market': false,
        '-- Julmarknad': false,
        'Mat & Dryck': false,
        'Whote label popup': false
      },
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
          title: 'Fasta öppettider:',
          name: 'Fasta-öppettider',
          model: 'fasta'
        },
        {
          title: 'Butik "Boxen":',
          name: 'Butik-"Boxen"',
          model: 'butik'
        },
        {
          title: 'Mat & Dryck "Boxen":',
          name: 'Mat&Dryck',
          model: 'mat'
        },
        {
          title: 'Event "Boxen":',
          name: 'Event',
          model: 'event'
        }
      ],
      sasongInputs: [
        {
          text: 'Sol'
        },
        {
          text: 'Solstol'
        },
        {
          text: 'Julgran'
        },
        {
          text: 'Snöflinga',
          model: 'Snoflinga'
        },
        {
          text: 'Pumpa'
        },
        {
          text: 'Löv'
        },
        {
          text: 'Blommor'
        },
        {
          text: 'Cykel'
        },
        {
          text: 'Tavla'
        },
        {
          text: 'Klåder'
        },
        {
          text: 'Året runt (ingenting)'
        }
      ],
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
    }
  },
  mounted () {
    this.preparePageData()
    if (this.thereIsListing) { this.assignListingToEdit() }
  },
  methods: {
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

          this.lokalOpts = users.map(x => x.name)
          this.renderEgensKaper = tags.map(x => x.name)
          this.cityOptions = regions.map(x => x.name)
          this.kategoriOpts = categories.map(x => x.name)
        })
        .catch((err) => {
          console.log(err)
        })
    },
    assignListingToEdit () {
      console.log(this.listing)
      this.title = this.listing.title
      this.Yta = this.listing.yta
      this.markplan = this.listing.placering
      this.city = this.listing.stad
      this.location = this.listing.location
      this.vagvisningen = this.listing.vagvisningen
      this.fran = this.listing.fran
      this.till = this.listing.till
      this.lokal = this.listing.kontaktperson
      this.expiry = this.listing.expiry
      this.minsta = this.listing.minstahyresperiod
      this.längsta = this.listing.langstahyresperiod
      this.sasong = this.listing.sasongBoxen
      this.hamside = this.listing.hemsida
      this.article.beskreving = this.listing.beskreving
      this.article.centrum = this.listing.centrumtextarea

      // ASSIGN DAYS
      for (const key in this.listing.oppettider) {
        if (this.listing.oppettider.hasOwnProperty(key)) {
          const element = this.listing.oppettider[key]
          const day = this.days[element.day]
          day.hours = element.times
          day.openTimes = element.oppettider
        }
      }

      // ASSIGN PRICES
      this.price.day.val = this.listing.prisperdag
      this.price.helg.val = this.listing.prisperhelg
      this.price.langheig.val = this.listing.prisperlanghelg
      this.price.manad.val = this.listing.prispermanad
      this.price.veckopris.val = this.listing.prispervecka

      // ASSIGN IMAGES
      this.images.bildgalleri = this.listing.bildgalleri
      this.images.cover = this.listing.cover
      this.images.planritning = this.listing.planritning
      this.images.centrumgalleri = this.listing.centrumgalleri

      const prices = [
        { text: 'day', val: this.listing.prisperdag },
        { text: 'helg', val: this.listing.prisperhelg },
        { text: 'langheig', val: this.listing.prisperlanghelg },
        { text: 'manad', val: this.listing.prispermana },
        { text: 'veckopris', val: this.listing.prispervecka }
      ]

      // DETERMINE THE prispervecka
      prices.forEach((price) => {
        if (Number(price.val) === Number(this.listing.prioteradpris)) {
          this.price[price.text].temp = true
          this.price.veckopris.val = price.val
        }
      })

      // ADD TAGS
      this.listing.egenskaper.forEach((tag) => {
        this.egenskaper[tag] = true
      })

      // ADD CATEGORY
      this.listing.kategori.forEach((category) => {
        this.kategori[category] = true
      })

      // ASSIGN YES AND NO INPUTS
      const yesNoFromListing = ['fasta', 'butik', 'mat', 'event']
      yesNoFromListing.forEach((input) => {
        this.yesNoInputsVal[input] = this.listing[input]
      })
    },
    delteTimeRow (name, index) {
      this.days[name].hours.splice(index, 1)
    },
    addTimeRow (name) {
      this.days[name].hours.push({ opening: '00:00:00', closing: '00:00:00' })
    },
    setPrioteradPrice (card) {
      console.log(this.price[card])
      this.$nextTick(() => {
        for (const key in this.price) {
          const obj = this.price[key]
          if (key !== card) {
            obj.temp = false
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

      listing.append('beskreving', this.article.beskreving)
      listing.append('title', this.title)

      listing.append('prisperdag', this.price.day.val || 0)
      listing.append('prisperhelg', this.price.helg.val || 0)
      listing.append('prisperlanghelg', this.price.langheig.val || 0)
      listing.append('prispervecka', this.price.veckopris.val || 0)
      listing.append('prispermanad', this.price.manad.val || 0)

      // ASSIGN THE PRICE
      let prioteradpris
      for (const key in this.price) {
        const obj = this.price[key]
        if (obj.temp) { prioteradpris = obj.val }
      }

      listing.append('prioteradpris', prioteradpris)

      for (const key in this.egenskaper) {
        if (this.egenskaper.hasOwnProperty(key)) {
          const feat = this.egenskaper[key]
          if (feat) { listing.append('egenskaper[]', key) }
        }
      }

      listing.append('yta', this.Yta)
      listing.append('placering', this.markplan)
      listing.append('stad', this.city)

      for (const key in this.kategori) {
        // eslint-disable-next-line no-prototype-builtins
        if (this.kategori.hasOwnProperty(key)) {
          const catigory = this.kategori[key]
          if (catigory) { listing.append('kategori[]', key) }
        }
      }

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
      const listing = this.createFormDate()
      await this.$axios.$post('/places', listing)
        .then(res => this.$router.push('/admin/listings/'))
        .catch((err) => {
          this.$bvToast.toast(err.response.data.msg, {
            title: 'There is something wrong',
            autoHideDelay: 5000,
            appendToast: true,
            variant: 'danger'
          })
        })
    },
    async editListing () {
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
        .then(res => this.$router.go())
        .catch((err) => {
          this.$bvToast.toast(err.response.data.msg, {
            title: 'There is something wrong',
            autoHideDelay: 5000,
            appendToast: true,
            variant: 'danger'
          })
        })
    },
    deleteImage () {
      alert('not working yet 😜')
    }
  }
}
</script>

<style lang="sass" scoped>
/* ö ä Å Ö å */

.card-title
  font-weight: 800

button.close
  position: absolute
  top: 0
  right: 10px
  z-index: 4
  color: white
</style>
