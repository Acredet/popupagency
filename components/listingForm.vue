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
              <em>{{ $t('maxFileSize') }}</em>
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
              <em>{{ $t('maxFileSize') }}</em>
            </template>
          </b-card>

          <!-- Start Prices -->
          <b-card title="Prices:">
            <b-card-body class="p-1">
              <b-row no-gutters>
                <b-col
                  v-for="(card, index) in renderInputs"
                  :key="index"
                  cols="12"
                  md="auto"
                >
                  <div class="m-1 responsiveCol">
                    <label class="h5" for="card.title">{{ card.title }}</label>
                    <b-form-checkbox v-if="!card.noTemp" v-model="price[card.model].temp" class="mb-2" @change="setPrioteradPrice(card.model)">
                      {{ $t('addListing.inputs.price.priority') }}
                    </b-form-checkbox>
                    <b-form-input v-model="price[card.model].val" type="number" :placeholder="card.placeholder" />
                  </div>
                </b-col>
              </b-row>
            </b-card-body>
          </b-card>
          <!-- End Prices -->

          <b-card :title="$t('addListing.inputs.egenskaper')">
            <b-card-body>
              <toggleAllCheckBoxGroup
                :name="'egenskaper'"
                :items="renderEgensKaper"
                :edit="egenskaperForToggle"
                :link="`${$t('link')}admin/listings/tags`"
                @valueChanged="egenskaper = $event"
              />
            </b-card-body>
          </b-card>

          <b-row>
            <b-col cols="12" md="6">
              <b-card :title="$t('addListing.inputs.yta.label')">
                <b-card-body>
                  <b-form-input v-model="Yta" type="number" :placeholder="$t('addListing.inputs.yta.holder')" />
                </b-card-body>
              </b-card>
            </b-col>
            <b-col cols="12" md="6">
              <b-card :title="$t('addListing.inputs.placering.label')">
                <b-card-body>
                  <b-form-input v-model="markplan" :placeholder="$t('addListing.inputs.placering.holder')" />
                </b-card-body>
              </b-card>
            </b-col>
          </b-row>

          <b-card :title="$t('addListing.inputs.stad')">
            <b-card-body>
              <b-form-select v-model="city" :options="cityOptions" :state="stadValid" />
              <b-form-invalid-feedback :state="stadValid">
                {{ $t('addListing.inputs.selectOne') }}
              </b-form-invalid-feedback>
              <b-form-valid-feedback :state="stadValid">
                {{ $t('forms.valid') }}
              </b-form-valid-feedback>
            </b-card-body>
          </b-card>

          <b-card :title="$t('addListing.inputs.kategori')">
            <b-card-body>
              <toggleAllCheckBoxGroup
                :name="'kategori'"
                :items="kategoriOpts"
                :edit="kategoriForToggle"
                :state="kategoryValid"
                :link="`${$t('link')}admin/listings/categories`"
                @valueChanged="kategori = $event"
              />
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
              <em>{{ $t('maxFileSize') }}</em>
            </template>
          </b-card>

          <b-row>
            <b-col cols="12" md="6">
              <b-card :title="$t('addListing.inputs.minsta.label')">
                <b-card-body>
                  <b-form-input v-model="minsta" :placeholder="$t('addListing.inputs.minsta.holder')" />
                </b-card-body>
              </b-card>
            </b-col>
            <b-col cols="12" md="6">
              <b-card :title="$t('addListing.inputs.langsta.label')">
                <b-card-body>
                  <b-form-input v-model="längsta" :placeholder="$t('addListing.inputs.langsta.holder')" />
                </b-card-body>
              </b-card>
            </b-col>
          </b-row>

          <!-- Start Prices -->
          <b-card title="Prices:">
            <b-card-body class="p-1">
              <b-row>
                <b-col
                  v-for="(input, index) in yesNoInputs"
                  :key="`radio-${index}`"
                  cols="12"
                  md="3"
                >
                  <label class="h5" v-text="input.title" />
                  <b-checkbox
                    v-model="yesNoInputsVal[input.model]"
                    switch
                    :name="input.name"
                  />
                </b-col>
              </b-row>
            </b-card-body>
          </b-card>
          <!-- End Prices -->

          <b-row>
            <b-col cols="12" md="6">
              <b-card :title="$t('addListing.inputs.season')">
                <b-card-body>
                  <b-form-select v-model="sasong" :options="sasongInputs" />
                </b-card-body>
              </b-card>
            </b-col>

            <b-col cols="12" md="6">
              <b-card :title="$t('addListing.inputs.vag')">
                <b-card-body>
                  <b-form-input v-model="vagvisningen" :placeholder="$t('addListing.inputs.vag')" />
                </b-card-body>
              </b-card>
            </b-col>
          </b-row>

          <b-row>
            <b-col cols="12" md="6">
              <b-card :title="$t('addListing.inputs.fran')">
                <b-card-body>
                  <b-form-datepicker id="Upptaget-från" v-model="fran" today-button reset-button class="mb-2" />
                </b-card-body>
              </b-card>
            </b-col>
            <b-col cols="12" md="6">
              <b-card :title="$t('addListing.inputs.till')">
                <b-card-body>
                  <b-form-datepicker id="Upptaget-till" v-model="till" today-button reset-button class="mb-2" />
                </b-card-body>
              </b-card>
            </b-col>
          </b-row>

          <b-row>
            <b-col cols="12" md="6">
              <b-card :title="$t('addListing.inputs.Lokalens')">
                <b-card-body>
                  <b-form-select v-model="lokal" :options="lokalOpts" :state="lokalensValid" />
                  <b-form-invalid-feedback :state="lokalensValid">
                    {{ $t('addListing.inputs.selectOne') }}
                  </b-form-invalid-feedback>
                  <b-form-valid-feedback :state="lokalensValid">
                    {{ $t('addListing.inputs.choosed') }} {{ lokal }}
                  </b-form-valid-feedback>
                </b-card-body>
              </b-card>
            </b-col>
            <b-col cols="12" md="6">
              <b-card :title="$t('addListing.inputs.expiry')">
                <b-card-body>
                  <b-form-datepicker id="example-datepicker" v-model="expiry" today-button reset-button class="mb-2" />
                </b-card-body>
              </b-card>
            </b-col>
          </b-row>
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
          <p v-if="!kategoryValid" class="font-weight-bold">
            <i class="fas fa-exclamation-triangle" />
            {{ $t('addListing.errors.category') }}
          </p>
          <p v-if="!lokalensValid" class="font-weight-bold">
            <i class="fas fa-exclamation-triangle" />
            {{ $t('addListing.errors.lokalens') }}
          </p>
          <p v-if="!prioteradpris.val" class="font-weight-bold">
            <i class="fas fa-exclamation-triangle" />
            {{ $t('addListing.errors.propteradpris') }}
          </p>
        </div>
      </b-alert>
      <!-- End Alert -->
      <b-btn v-if="!thereIsListing" :disabled="!valid" variant="primary" @click="addListing(false)">
        {{ $t('addListing.btns.add') }}
      </b-btn>
      <b-btn v-else :disabled="!valid" variant="warning" @click="editListing(false)">
        {{ $t('addListing.btns.edit') }}
      </b-btn>
      <b-btn variant="success" @click="saveDraft">
        Draft
      </b-btn>
    </b-container>
  </div>
</template>

<script>
import { BootstrapVue, BIcon } from 'bootstrap-vue'
import ourUploader from '@/components/ourUploader'
import toggleAllCheckBoxGroup from '@/components/admin/checkBoxGroup'

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
    toggleAllCheckBoxGroup,
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
      egenskaperForToggle: null,
      kategoriForToggle: null,
      loadingState: false,
      title: {
        en: null,
        sv: null
      },
      article: {
        beskreving: {
          en: null,
          sv: null
        }
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

      lokalOpts: [],
      lokal: null,
      vagvisningen: null,
      fran: null,
      till: null,
      expiry: null,
      images: {
        bildgalleri: null,
        cover: null,
        planritning: null
      },
      prioteradpris: {
        period: '',
        val: ''
      }
    }
  },
  computed: {
    thereIsListing () {
      return !!this.$route.params.id
    },
    titleValidEn () {
      return !!this.title.en && !this.title.en.includes('-')
    },
    titleValidSv () {
      return !!this.title.sv && !this.title.sv.includes('-')
    },
    stadValid () {
      return !!this.city
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
              !!this.kategoryValid &&
              !!this.lokalensValid &&
              !!this.prioteradpris.val
    },
    renderKey () {
      return this.$store.state.sidebarRenderKey
    }
  },
  async created () {
    this.loadingState = true

    await this.preparePageData()
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
          const regions = res[1].data.filter(x => !!x.centrum)
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
            return { text: x.name[lang], value: { name: x.name, avatar: x.avatar } }
          })
          this.loadingState = false
        })
        .catch((err) => {
          console.log(err)
        })
    },
    assignListingToEdit () {
      const { prioteradpris, egenskaper, kategori, title, yta, placering, stad, vagvisningen, fran, till, kontaktperson, expiry, minstahyresperiod, langstahyresperiod, sasongBoxen, beskreving, prisperdag, prisperhelg, prisperlanghelg, prispermanad, prispervecka, bildgalleri, cover, planritning } = this.listing
      this.title.en = title.en
      this.title.sv = title.sv
      this.Yta = yta
      this.markplan = placering
      this.city = stad ? JSON.stringify(stad) : ''
      this.vagvisningen = vagvisningen
      this.fran = fran
      this.till = till
      this.lokal = kontaktperson
      this.expiry = expiry
      this.minsta = minstahyresperiod
      this.längsta = langstahyresperiod
      this.sasong = sasongBoxen
      this.article.beskreving.en = beskreving.en
      this.article.beskreving.sv = beskreving.sv

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

      // const prices = [
      //   { text: 'day', val: prisperdag },
      //   { text: 'helg', val: prisperhelg },
      //   { text: 'langheig', val: prisperlanghelg },
      //   { text: 'manad', val: prispermanad },
      //   { text: 'veckopris', val: prispervecka }
      // ]

      // DETERMINE THE prispervecka
      this.prioteradpris = prioteradpris
      if (this.price[prioteradpris.period]) {
        this.price[prioteradpris.period].temp = true
      }
      this.price.prioteradpris.val = prioteradpris.val

      // ADD TAGS
      this.egenskaper = egenskaper
      this.egenskaperForToggle = egenskaper

      // ADD CATEGORY
      this.kategori = kategori
      this.kategoriForToggle = kategori

      // ASSIGN YES AND NO INPUTS
      const yesNoFromListing = ['fasta', 'butik', 'mat', 'event']
      yesNoFromListing.forEach((input) => {
        this.yesNoInputsVal[input] = this.listing[input]
      })
      this.loadingState = false
    },
    setPrioteradPrice (card) {
      console.log(this.price[card])
      this.$nextTick(() => {
        for (const key in this.price) {
          const obj = this.price[key]
          if (key !== card) {
            obj.temp = false
          } else {
            this.price.prioteradpris.val = this.price[card].val
            this.prioteradpris = { period: key, val: this.price[card].val }
          }
        }
      })
    },
    createFormDate (draft) {
      const listing = new FormData(document.getElementById('listing'))
      const keysNotWanted = ['Butik-%22Boxen%22', 'Fasta-öppettider', 'Mat&Dryck', 'Event', 'säsong', 'user', 'egenskaper']

      for (const key in listing) {
        console.log(key, listing[key])
        if (keysNotWanted.includes(key)) { listing.delete(key) }
      }

      listing.append('beskreving', JSON.stringify(this.article.beskreving))
      listing.append('title', JSON.stringify(this.title))

      // ASSIGN THE PRICE
      listing.append('prisperdag', this.price.day.val || 0)
      listing.append('prisperhelg', this.price.helg.val || 0)
      listing.append('prisperlanghelg', this.price.langheig.val || 0)
      listing.append('prispervecka', this.price.veckopris.val || 0)
      listing.append('prispermanad', this.price.manad.val || 0)
      listing.append('prioteradpris', JSON.stringify(this.prioteradpris))

      listing.append('draft', draft)

      // ASSIGN TAG
      this.egenskaper.forEach(feat => listing.append('egenskaper[]', JSON.stringify(feat)))

      listing.append('yta', this.Yta)
      listing.append('placering', this.markplan)
      listing.append('stad', this.city)

      // ASSIGN CATEGORY
      this.kategori.forEach(cate => listing.append('kategori[]', JSON.stringify(cate)))

      listing.append('minstahyresperiod', this.minsta)
      listing.append('langstahyresperiod', this.längsta)

      for (const key in this.yesNoInputsVal) {
        // eslint-disable-next-line no-prototype-builtins
        if (this.yesNoInputsVal.hasOwnProperty(key)) {
          const value = this.yesNoInputsVal[key]
          // console.log(key, value)
          if (value) { listing.append(key, value) } else { listing.append(key, false) }
        }
      }

      listing.append('sasongBoxen', this.sasong)
      listing.append('hemsida', this.hamside)

      listing.append('vagvisningen', this.vagvisningen)
      listing.append('fran', this.fran)
      listing.append('till', this.till)

      listing.append('kontaktperson', this.lokal)
      listing.append('expiry', this.expiry)

      return listing
    },
    async saveDraft () {
      if (this.listing) {
        // The Boolean value here is the value of the draft property in the place object.
        await this.editListing(true)
      } else {
        await this.addListing(false)
      }
    },
    async addListing (draft) {
      this.loadingState = true

      const listing = this.createFormDate(draft)
      await this.$axios.$post('/places', listing)
        .then((res) => {
          this.$nextTick(() => {
            if (draft) {
              this.$router.push(`${this.$t('link')}/admin/listings/`)
            } else {
              this.$router.push(`${this.$t('link')}/admin/listings/drafts`)
            }
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
    async editListing (draft) {
      this.loadingState = true

      const listing = this.createFormDate(draft)

      const bildgalleri = this.listing.bildgalleri ? [...this.listing.bildgalleri] : []
      const cover = this.listing.cover ? [...this.listing.cover] : []
      const planritning = this.listing.planritning ? [...this.listing.planritning] : []

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
        }
      }

      // DELETE THE INPUTS
      listing.delete('bildgalleri[]')
      listing.delete('cover[]')
      listing.delete('planritning[]')

      // APPEND THE ARRAY WE CREATED 😉
      listing.append('bildgalleri', JSON.stringify(bildgalleri))
      listing.append('cover', JSON.stringify(cover))
      listing.append('planritning', JSON.stringify(planritning))

      for (const pair of listing.entries()) {
        console.log(pair[0], ':', pair[1])
      }
      await this.$axios.$patch(`/places/${this.listing._id}`, listing)
        .then((res) => {
          if (draft) {
            this.$router.push(`${this.$t('link')}/admin/listings/`)
          } else {
            this.$router.push(`${this.$t('link')}/admin/listings/drafts`)
          }
        })
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
.responsiveCol {
  margin: 26px !important;
}
</style>
