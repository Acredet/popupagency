<template>
	<!-- Start Map -->
	<gmap-map
		ref="mapRef"
		:key="renderKey"
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
import { gmapApi } from "vue2-google-maps";

/** DOCS
 * This component takes all listing and pin them in the map
 * and add popup to the markers when it's clicked.
 */
export default {
	props: {
		allPlaces: {
			type: Array,
			default: () => [],
		},
		center: {
			type: Object,
			default: () => {
				return { lat: 59.334591, lng: 18.06324 };
			},
		},
	},
	mounted() {
		this.createDynamicZooming();
	},
	data() {
		return {
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
		renderKey() {
			return this.$store.state.changeSidebarRenderKey;
		},
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
	methods: {
		createDynamicZooming() {
			this.$refs.mapRef.$mapPromise.then((map) => {
				const bounds = new this.google.maps.LatLngBounds();
				this.allPlaces.forEach((place) => {
					if (place.location) {
						const bound = {
							lng: place.location.coordinates[0],
							lat: place.location.coordinates[1],
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
		pinMarkers(places) {
			const correctValues = [...places].filter(
				(x) => x.location && x.location.coordinates
			);
			this.map.markers = correctValues.map((x) => {
				return {
					lng: x.location.coordinates[0],
					lat: x.location.coordinates[1],
					// <div style="z-index: 4;position: absolute;  bottom: 0;  left: 0; width: 100%;  padding: 5px;  background: rgba(0,0,0,0.8); color: black;" />
					infoText: `
						<nuxt-link class="map-popup px-2 d-block text-dark" to='${this.$t(
							"link"
						)}lokal/${x.title.sv}'>
						<div style="background-image: url('https://popup.dk.se/_nuxt/img/${
							x.cover[0]
						}')" class="cover flex-wrap d-flex justify-content-end flex-column align-items-start" />
							<div class="overlay">
							<p class="text-white font-2 p-0 m-0">${x.title.sv}</p>
							<p class="text-white font-4 p-0 m-0">$${x.prioteradpris.val}</p>
							</div>
						</div>
						<div>
							<p class="p-0 m-0">${x.location.formattedAddress}</p>
						</div>
						</nuxt-link>
					`,
				};
			});
		},
		refreshMap() {
			this.$store.commit("changeSidebarRenderKey");
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

<style lang="scss" scoped></style>
