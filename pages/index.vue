<template>
  <div class="content">
    <b-container>
      <div>
        <b-card title="text editor">
          <b-card-header class="d-flex justify-content-end">
            <b-button class="mr-3">
              visual
            </b-button>
            <b-button>text</b-button>
          </b-card-header>

          <b-card-body>
            <client-only>
              <VueEditor v-model="article.content" />
            </client-only>
          </b-card-body>
        </b-card>

        <b-card title="uploader">
          <b-card-body>
            <client-only>
              <upload-image is="upload-image" url="https://google.com" :max_files="5" name="files[]" />
            </client-only>
          </b-card-body>
        </b-card>

        <b-card title="Cover blieden">
          <b-card-body>
            <client-only>
              <upload-image input_id="cover" url="https://google.com" :max_files="5" name="cover[]" />
            </client-only>
          </b-card-body>
        </b-card>

        <b-card title="Epost kntalt">
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

        <b-card title="selection">
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

        <b-card title="Yta">
          <b-card-body>
            <b-form-input v-model="Yta" placeholder="ex: 190" />
          </b-card-body>
        </b-card>

        <b-card title="markplan">
          <b-card-body>
            <b-form-input v-model="markplan" placeholder="markplan" />
          </b-card-body>
        </b-card>

        <b-card title="Stad">
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
      </div>
    </b-container>
  </div>
</template>

<script>
import UploadImage from 'vue-upload-image'

let VueEditor
if (process.browser) {
  VueEditor = require('vue2-editor').VueEditor
}

export default {
  layout: 'admin',
  components: {
    VueEditor,
    UploadImage
  },
  data () {
    return {
      article: {
        content: null
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
          title: 'price per day:',
          placeholder: 'Daglig pris',
          model: 'day'
        },
        {
          temporary: true,
          title: 'price per helg:',
          placeholder: 'Helgpris',
          model: 'helg'
        },
        {
          temporary: false,
          title: 'price per langheig:',
          placeholder: 'lagh',
          model: 'langheig'
        },
        {
          temporary: true,
          title: 'price per veckopris:',
          placeholder: 'veckopris',
          model: 'veckopris'
        },
        {
          temporary: true,
          title: 'price per manad:',
          placeholder: 'manad',
          model: 'manad'
        },
        {
          temporary: false,
          title: 'prioterad pris:',
          placeholder: 'prioterad',
          model: 'prioterad'
        }
      ],
      features: {
        El: false,
        'wi-fi': false
      },
      renderEgensKaper: [
        'El',
        'wi-fi'
      ],
      Yta: null,
      markplan: null,
      city: null,
      cityOptions: [
        'lol1',
        'lol2',
        'lol3'
      ]
    }
  }
}
</script>

<style>
</style>
