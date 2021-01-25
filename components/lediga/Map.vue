<template>
  <gmap-map
    ref="mapRef"
    :center="map.center"
    :map-type-id="map.mapTypeId"
    :street-view-control="true"
    :zoom="map.zoom"
    @zoom_changed="mapResized"
  >
    <gmap-info-window
      :options="infoOptions"
      :position="infoWindowPos"
      :opened="infoWinOpen"
      @closeclick="infoWinOpen = false"
    />
    <gmap-cluster @click="singleClick">
      <gmap-marker
        v-for="(mark, index) in map.markers"
        :key="index"
        :clickable="true"
        :position="mark"
        :icon="require(`@/assets/img/marker.svg`)"
        @click="toggleInfoWindow(mark, index)"
      />
    </gmap-cluster>
  </gmap-map>
  <!-- End Map -->
</template>

<script>
import { mapGetters } from "vuex";
import { gmapApi } from "vue2-google-maps";
import { getImages } from "@/mixins/utils/getImage";
import { format } from "@/mixins/utils/formatNo";
/** DOCS
 * This component takes all listing and pin them in the map
 * and add popup to the markers when it's clicked.
 */
export default {
  props: {
    center: {
      type: Object,
      default: () => {
        return { lat: 59.334591, lng: 18.06324 };
      },
    },
  },
  mixins: [getImages, format],
  data() {
    return {
      loading: true,
      map: {
        mapTypeId: "roadmap",
        center: { lat: 59.334591, lng: 18.06324 },
        zoom: 2,
        markers: [],
      },
      infoWindowPos: null,
      infoWinOpen: false,
      currentMidx: null,

      infoOptions: {
        content: "",
        // optional: offset infowindow so it visually sits nicely on top of our marker
        pixelOffset: {
          width: 0,
          height: -35,
        },
      },
    };
  },
  computed: {
    ...mapGetters({
      allPlaces: "listings",
    }),
    google: gmapApi,
  },
  watch: {
    allPlaces(newValue) {
      this.pinMarkers(this.allPlaces);
      this.createDynamicZooming();
    },
    center: {
      immediate: true,
      deep: true,
      handler(newValue) {
        this.map.center = newValue;
        this.map.zoom = 5;
      },
    },
  },
  created() {
    if (this.allPlaces.length > 0) {
      this.pinMarkers(this.allPlaces);
    }
  },
  mounted() {
    this.createDynamicZooming();
  },
  methods: {
    createDynamicZooming() {
      this.$refs.mapRef.$mapPromise.then((map) => {
        const bounds = new this.google.maps.LatLngBounds();
        this.allPlaces.forEach((place) => {
          if (place.routeGuidance.coordinates) {
            const bound = {
              lng: place.routeGuidance.coordinates[0],
              lat: place.routeGuidance.coordinates[1],
            };
            bounds.extend(bound);
          }
        });
        map.fitBounds(bounds);
        if (this.allPlaces.length === 1) {
          map.setZoom(10);
        }
        if (!this.allPlaces.length) {
          map.setCenter(this.center);
          map.setZoom(5);
        }
      });
    },
    setCenter(x) {
      this.$emit("setCenter");
      this.map.center = { lng: x[0], lat: x[1] };
    },
    async pinMarkers(places) {
      const correctValues = [...places].filter(
        (x) => x.routeGuidance && x.routeGuidance.coordinates
      );

      const markers = [];

      for (let i = 0; i < correctValues.length; i++) {
        const x = correctValues[i];
        const img = await this.getImage(x.cover[0]);
        const marker = {
          lng: x.routeGuidance.coordinates[0],
          lat: x.routeGuidance.coordinates[1],
          // <div style="z-index: 4;position: absolute;  bottom: 0;  left: 0; width: 100%;  padding: 5px;  background: rgba(0,0,0,0.8); color: black;" />
          infoText: `
						<a class="map-popup px-2 d-block text-dark" href='${this.$t("link")}lokal/${
            x.title.sv
          }'>
            <div
              style="background-image: url(${img}); background-size: cover; background-repeat: no-repeat; background-position: center center;"
              class="cover flex-wrap d-flex justify-content-end flex-column align-items-start"
            />
							<div class="overlay">
							<p class="text-white font-2 p-0 m-0">${x.title.sv}</p>
							<p class="text-white font-4 p-0 m-0">${this.format(x.prioteradpris.val)} Kr</p>
							</div>
						</div>
						<div>
							<p class="p-0 m-0">${x.routeGuidance.formattedAddress}</p>
						</div>
						</a>
					`,
        };

        markers.push(marker);
      }

      this.map.markers = markers;
      this.loading = false;
    },
    toggleInfoWindow(marker, idx) {
      this.infoWindowPos = {
        lng: marker.lng,
        lat: marker.lat,
      };
      this.infoOptions.content = marker.infoText;

      // check if its the same marker that was selected if yes toggle
      if (this.currentMidx === idx) {
        this.infoWinOpen = !this.infoWinOpen;
      } else {
        // if different marker set infowindow to open and reset current marker index
        this.infoWinOpen = true;
        this.currentMidx = idx;
      }
    },
    singleClick(e) {
      this.setCenter([e.center_.lng(), e.center_.lat()]);
      this.map.zoom = this.map.zoom < 7 ? 7 : this.map.zoom + 1;
    },
    mapResized(e) {
      this.map.zoom = e;
    },
    getNearbyPlaces(lat, lng, placeType) {
      let url = "https://maps.googleapis.com/maps/api/place/nearbysearch/json?";

      url += `location=${lat},${lng}`;
      url += "&radius=10000";
      url += `&types=${placeType}`;
      url += "&sensor=true";
      url += "&key=AIzaSyCwwawqFjvbUv_ke0pviP0rHqACQB-MoaE";

      this.$axios
        .$get(url, { headers: { "Access-Control-Allow-Origin": "*" } })
        .then((res) => {
          console.log(res.results);
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
};
</script>

<style scoped>
.cover {
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center center;
}
</style>
