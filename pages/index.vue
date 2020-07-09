<template>
  <div class="content">
    <b-container>
      <div>
        <b-card title="text editor">
          <b-card-text>
            <client-only>
              <VueEditor v-model="article.content" />
            </client-only>
          </b-card-text>
        </b-card>

        <b-card title="uploader">
          <b-card-text>
            <client-only>
              <upload-image
                is="upload-image"
                :max_files="5"
                name="files[]"
              />
            </client-only>
          </b-card-text>
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
      }
    }
  }
}
</script>

<style>

</style>
