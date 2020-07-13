<template>
  <b-row>
    <b-col cols="12" md="6" class="wrapper">
      <b-container>
        <b-row>
          <b-col v-for="(card, index) in cards" :key="String(index)" class="my-2" cols="12" md="6">
            <listing-card :card="card" />
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
import { BootstrapVue, BIcon } from 'bootstrap-vue'

export default {
  components: {
    // eslint-disable-next-line vue/no-unused-components
    BootstrapVue,
    // eslint-disable-next-line vue/no-unused-components
    BIcon
  },
  data () {
    return {
      cards: [
        {
          images: ['https://picsum.photos/1024/480/?image=10', 'https://picsum.photos/1024/480/?image=12', 'https://picsum.photos/1024/480/?image=22'],
          place: "'Uppsala'",
          money: "'fr 50 000 kr / månad'",
          text: "'Dragarbrunnstorg 6 ∙ Popup lokal på gågata ∙ ca 163 m²'"
        },
        {
          images: ['https://picsum.photos/1024/480/?image=10', 'https://picsum.photos/1024/480/?image=12', 'https://picsum.photos/1024/480/?image=22'],
          place: "'Uppsala'",
          money: "'fr 50 000 kr / månad'",
          text: "'Dragarbrunnstorg 6 ∙ Popup lokal på gågata ∙ ca 163 m²'"
        },
        {
          images: ['https://picsum.photos/1024/480/?image=10', 'https://picsum.photos/1024/480/?image=12', 'https://picsum.photos/1024/480/?image=22'],
          place: "'Uppsala'",
          money: "'fr 50 000 kr / månad'",
          text: "'Dragarbrunnstorg 6 ∙ Popup lokal på gågata ∙ ca 163 m²'"
        },
        {
          images: ['https://picsum.photos/1024/480/?image=10', 'https://picsum.photos/1024/480/?image=12', 'https://picsum.photos/1024/480/?image=22'],
          place: "'Uppsala'",
          money: "'fr 50 000 kr / månad'",
          text: "'Dragarbrunnstorg 6 ∙ Popup lokal på gågata ∙ ca 163 m²'"
        },
        {
          images: ['https://picsum.photos/1024/480/?image=10', 'https://picsum.photos/1024/480/?image=12', 'https://picsum.photos/1024/480/?image=22'],
          place: "'Uppsala'",
          money: "'fr 50 000 kr / månad'",
          text: "'Dragarbrunnstorg 6 ∙ Popup lokal på gågata ∙ ca 163 m²'"
        },
        {
          images: ['https://picsum.photos/1024/480/?image=10', 'https://picsum.photos/1024/480/?image=12', 'https://picsum.photos/1024/480/?image=22'],
          place: "'Uppsala'",
          money: "'fr 50 000 kr / månad'",
          text: "'Dragarbrunnstorg 6 ∙ Popup lokal på gågata ∙ ca 163 m²'"
        },
        {
          images: ['https://picsum.photos/1024/480/?image=10', 'https://picsum.photos/1024/480/?image=12', 'https://picsum.photos/1024/480/?image=22'],
          place: "'Uppsala'",
          money: "'fr 50 000 kr / månad'",
          text: "'Dragarbrunnstorg 6 ∙ Popup lokal på gågata ∙ ca 163 m²'"
        },
        {
          images: ['https://picsum.photos/1024/480/?image=10', 'https://picsum.photos/1024/480/?image=12', 'https://picsum.photos/1024/480/?image=22'],
          place: "'Uppsala'",
          money: "'fr 50 000 kr / månad'",
          text: "'Dragarbrunnstorg 6 ∙ Popup lokal på gågata ∙ ca 163 m²'"
        },
        {
          images: ['https://picsum.photos/1024/480/?image=10', 'https://picsum.photos/1024/480/?image=12', 'https://picsum.photos/1024/480/?image=22'],
          place: "'Uppsala'",
          money: "'fr 50 000 kr / månad'",
          text: "'Dragarbrunnstorg 6 ∙ Popup lokal på gågata ∙ ca 163 m²'"
        },
        {
          images: ['https://picsum.photos/1024/480/?image=10', 'https://picsum.photos/1024/480/?image=12', 'https://picsum.photos/1024/480/?image=22'],
          place: "'Uppsala'",
          money: "'fr 50 000 kr / månad'",
          text: "'Dragarbrunnstorg 6 ∙ Popup lokal på gågata ∙ ca 163 m²'"
        },
        {
          images: ['https://picsum.photos/1024/480/?image=10', 'https://picsum.photos/1024/480/?image=12', 'https://picsum.photos/1024/480/?image=22'],
          place: "'Uppsala'",
          money: "'fr 50 000 kr / månad'",
          text: "'Dragarbrunnstorg 6 ∙ Popup lokal på gågata ∙ ca 163 m²'"
        },
        {
          images: ['https://picsum.photos/1024/480/?image=10', 'https://picsum.photos/1024/480/?image=12', 'https://picsum.photos/1024/480/?image=22'],
          place: "'Uppsala'",
          money: "'fr 50 000 kr / månad'",
          text: "'Dragarbrunnstorg 6 ∙ Popup lokal på gågata ∙ ca 163 m²'"
        }
      ],
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
.wrapper {
  max-height: 100vh;
  overflow: scroll;
}

.vue-map-container {
  height: 100vh;
  width: 100%;
}
</style>
