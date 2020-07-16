<template>
  <div class="content">
    <h2 class="my-3">
      Create a listing
    </h2>
    <b-container>
      <div>
        <b-card title="Beskrivning:">
          <b-card-body>
            <client-only>
              <VueEditor v-model="article.content" />
            </client-only>
          </b-card-body>
        </b-card>

        <b-card title="Bildgalleri:">
          <b-card-body>
            <our-uploader :name="'first-uploader'" :max-file-size="1" />
          </b-card-body>
        </b-card>

        <b-card title="Cover bilden:">
          <b-card-body>
            <our-uploader :name="'cover'" :max-file-size="1" />
          </b-card-body>
        </b-card>

        <b-card title="Epost kontakt:">
          <b-card-body>
            <b-form-input v-model="email" placeholder="ex: example@example.com" />
          </b-card-body>
        </b-card>

        <b-card v-for="(card, index) in renderInputs" :key="index" :title="card.title">
          <b-card-body>
            <b-form-checkbox
              :id="card.title"
              v-model="price[card.model].temp"
              class="mb-2"
              :name="card.model"
            >
              I accept the terms and use
            </b-form-checkbox>
            <b-form-input v-model="price[card.model].val" :placeholder="card.placeholder" />
          </b-card-body>
        </b-card>

        <b-card title="Egenskaper:">
          <b-card-body>
            <b-row>
              <b-col v-for="(feat,index) in renderEgensKaper" :key="index" cols="12" md="6">
                <b-form-checkbox
                  :id="feat"
                  v-model="features[feat]"
                  class="mb-2"
                  :name="feat"
                >
                  {{ feat }}
                </b-form-checkbox>
              </b-col>
            </b-row>
          </b-card-body>
        </b-card>

        <b-card title="Yta:">
          <b-card-body>
            <b-form-input v-model="Yta" placeholder="ex: 190" />
          </b-card-body>
        </b-card>

        <b-card title="Våning/placering:">
          <b-card-body>
            <b-form-input v-model="markplan" placeholder="markplan" />
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

        <b-card title="Plats:">
          <b-card-body>
            <b-form-select v-model="platz" :options="platzOptions" />
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
                  :name="kati"
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
              <our-uploader :name="'Planrinting'" :max-file-size="64" />
            </client-only>
          </b-card-body>
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
              <b-form-radio v-for="input in sasongInputs" :key="input.model" v-model="sasong[input.model]" name="säsong" :value="input.val">
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
              <VueEditor v-model="article.content2" />
            </client-only>
          </b-card-body>
        </b-card>

        <b-card title="Öppettider:">
          <b-tabs content-class="mt-3" fill>
            <b-tab v-for="(tab) in times" :key="tab.name" :title="tab.name" :active="tab.active">
              <b-form-radio-group>
                <b-form-radio
                  v-model="days[tab.name].openTimes"
                  value="hours"
                  :name="tab.name"
                >
                  Enter hours
                </b-form-radio>
                <b-form-radio
                  v-model="days[tab.name].openTimes"
                  value="openAllDay"
                  :name="tab.name"
                >
                  Open all day
                </b-form-radio>
                <b-form-radio
                  v-model="days[tab.name].openTimes"
                  value="closeAllDay"
                  :name="tab.name"
                >
                  Close all day
                </b-form-radio>
                <b-form-radio
                  v-model="days[tab.name].openTimes"
                  value="appointment"
                  :name="tab.name"
                >
                  By appointment only
                </b-form-radio>
              </b-form-radio-group>

              <div v-if="days[tab.name].openTimes == 'hours'">
                <b-row v-for="(hours, index) in days[tab.name].hours" :key="'m' + index" class="my-3">
                  <b-col cols="12" md="5">
                    <b-form-timepicker v-model="days[tab.name].hours[index].from" locale="en" />
                  </b-col>
                  <b-col cols="12" md="5">
                    <b-form-timepicker v-model="days[tab.name].hours[index].to" locale="en" />
                  </b-col>
                  <b-col cols="12" md="2">
                    <b-button variant="outline-light" @click="delteTimeRow(tab.name, index)">
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
              <our-uploader :name="'galeri'" :max-file-size="64" />
            </client-only>
          </b-card-body>
        </b-card>

        <b-card title="Upptaget från:">
          <b-card-body>
            <b-form-datepicker id="Upptaget-från" v-model="fries" class="mb-2" />
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
              <b-form-radio v-for="input in lokalOpts" :key="input" v-model="lokal[input]" name="säsong" :value="input">
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
  name: 'AddListing',
  layout: 'admin',
  components: {
    VueEditor,
    // eslint-disable-next-line vue/no-unused-components
    BootstrapVue,
    // eslint-disable-next-line vue/no-unused-components
    BIcon,
    BIconTrash,
    ourUploader
  },
  data () {
    return {
      article: {
        content: null,
        content2: null
      },
      email: null,
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
        prioterad: {
          val: null,
          temp: false
        }
      },
      renderInputs: [
        {
          temporary: true,
          title: 'Pris per dag:',
          placeholder: 'Daglig pris',
          model: 'day'
        },
        {
          temporary: true,
          title: 'Pris per helg:',
          placeholder: 'Helgpris',
          model: 'helg'
        },
        {
          temporary: false,
          title: 'Pris per långhelg:',
          placeholder: 'lagh',
          model: 'langheig'
        },
        {
          temporary: true,
          title: 'Pris  per vecka:',
          placeholder: 'veckopris',
          model: 'veckopris'
        },
        {
          temporary: true,
          title: 'Pris per månad:',
          placeholder: 'manad',
          model: 'manad'
        },
        {
          temporary: false,
          title: 'Prioterad pris:',
          placeholder: 'prioterad',
          model: 'prioterad'
        }
      ],
      features: {
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
      renderEgensKaper: [
        'Belysning',
        'El',
        'Handikappanpassad',
        'Högtalare',
        'Inredning',
        'Kassasystem',
        'Kök',
        'Lager',
        'Lastkaj',
        'Provrum',
        'Skyltfönster',
        'VVS',
        'WC',
        'wi-fi'
      ],
      Yta: null,
      markplan: null,
      city: null,
      cityOptions: [
        'Borås',
        'Charlottenberg',
        'Eskilstuna',
        'Falköping',
        'Gotland',
        'göteborg',
        'Helsingborg',
        'Jönköping',
        'Kalmar',
        'Karlstad',
        'Linköping',
        'Långflon',
        'Malmö',
        'Motala',
        'Norrköping',
        'Stockholm',
        'Södertälje',
        'Trollhättan',
        'Uppsala',
        'Väla',
        'Västra skåna',
        'växjö',
        'örebro',
        'Falkenberg',
        'Kungsbacka',
        'Lund',
        'Burlöv',
        'Hässleholm',
        'Uddevalla'
      ],
      platz: null,
      platzOptions: [
        { value: null, text: 'Please select an option' },
        { value: 'a', text: 'This is First option' },
        { value: 'b', text: 'Selected Option' },
        { value: { C: '3PO' }, text: 'This is an option with object value' },
        { value: 'd', text: 'This one is disabled', disabled: true }
      ],
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
      kategoriOpts: [
        'Butikslokal',
        'Event',
        '-- Eventlokal',
        '-- Eventyta',
        '-- Galleri',
        '-- Showroom',
        'Foodtruck',
        'Köpcentrum',
        'Marknad',
        '-- Beach Market',
        '-- Julmarknad',
        'Mat & Dryck',
        'Whote label popup'
      ],
      location: null,

      minsta: null,
      längsta: null,

      yesNoInputsVal: {
        oppettider: null,
        Butik: null,
        MatDryck: null,
        Event: null
      },
      yesNoInputs: [
        {
          title: 'Fasta öppettider:',
          name: 'Fasta-öppettider',
          model: 'oppettider'
        },
        {
          title: 'Butik "Boxen":',
          name: 'Butik-"Boxen"',
          model: 'Butik'
        },
        {
          title: 'Mat & Dryck "Boxen":',
          name: 'Mat&Dryck',
          model: 'MatDryck'
        },
        {
          title: 'Event "Boxen":',
          name: 'Event',
          model: 'Event'
        }
      ],
      sasongInputs: [
        {
          text: 'Sol',
          model: 'Sol'
        },
        {
          text: 'Solstol',
          model: 'Solstol'
        },
        {
          text: 'Julgran',
          model: 'Julgran'
        },
        {
          text: 'Snöflinga',
          model: 'Snoflinga'
        },
        {
          text: 'Pumpa',
          model: 'Pumpa'
        },
        {
          text: 'Löv',
          model: 'Lov'
        },
        {
          text: 'Blommor',
          model: 'Blommor'
        },
        {
          text: 'Cykel',
          model: 'Cykel'
        },
        {
          text: 'Tavla',
          model: 'Tavla'
        },
        {
          text: 'Klåder',
          model: 'Klader'
        },
        {
          text: 'Året runt (ingenting)',
          model: 'aret'
        }
      ],
      sasong: {
        Sol: false,
        Solstol: false,
        Julgran: false,
        Snoflinga: false,
        Pumpa: false,
        Lov: false,
        Blommor: false,
        Cykel: false,
        Tavla: false,
        Klader: false,
        aret: false
      },

      hamside: null,
      lokalOpts: [
        'Peter',
        'Rikard',
        'Terese',
        'Ylva',
        'Jasmine',
        'Helena',
        'Annika',
        'Bertil'
      ],
      vagvisningen: null,
      lokal: {
        Peter: false,
        Rikard: false,
        Terese: false,
        Ylva: false,
        Jasmine: false,
        Helena: false,
        Annika: false,
        Bertil: false
      },
      days: {
        Mon: {
          openTimes: 'hours',
          hours: [
            { from: '00:00:00', to: '00:00:00' }
          ]
        },
        Tue: {
          openTimes: 'hours',
          hours: [
            { from: '00:00:00', to: '00:00:00' }
          ]
        },
        Wed: {
          openTimes: 'hours',
          hours: [
            { from: '00:00:00', to: '00:00:00' }
          ]
        },
        Thu: {
          openTimes: 'hours',
          hours: [
            { from: '00:00:00', to: '00:00:00' }
          ]
        },
        Fri: {
          openTimes: 'hours',
          hours: [
            { from: '00:00:00', to: '00:00:00' }
          ]
        },
        Sat: {
          openTimes: 'hours',
          hours: [
            { from: '00:00:00', to: '00:00:00' }
          ]
        },
        Sun: {
          openTimes: 'hours',
          hours: [
            { from: '00:00:00', to: '00:00:00' }
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
      expiry: null
    }
  },
  methods: {
    delteTimeRow (name, index) {
      this.days[name].hours.splice(index, 1)
    },
    addTimeRow (name) {
      this.days[name].hours.push({ from: '00:00:00', to: '00:00:00' })
    }
  }
}
</script>

<style>
/* ö
ä
Å
Ö
å */

.card-title {
  font-weight: 800;
}
</style>
