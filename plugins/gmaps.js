
import Vue from 'vue'
import * as VueGoogleMaps from 'vue2-google-maps'
import GmapCluster from 'vue2-google-maps/dist/components/cluster'

Vue.use(VueGoogleMaps, {
  load: {
    key: 'AIzaSyC0O4NFJx4StGcEq6jbm1R8FNWLxvaqgXY',
    libraries: 'places' // necessary for places input
  }
})

Vue.component('GmapCluster', GmapCluster)
