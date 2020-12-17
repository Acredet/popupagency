<template>
	<div>
		<!-- Start Local Information -->
		<section v-if="map.markers.length > 0">
			<h2>Local Information</h2>
			<hooper :settings="hooperSettings">
				<!-- Start MapView card -->
				<!-- <slide v-if="map.markers.length > 0">
					<div @click="mapViewModalState = true" class="custom-card">
						<div class="custom-card--imgWrapper">
							<img src="@/assets/img/mapthumbnail.png" alt="Map View" />
						</div>
						<p class="text-secondary">
							Explore the area around
							{{ title ? title[$i18n.locale] : "" }}
						</p>
					</div>
				</slide> -->
				<!-- End MapView card -->

				<!-- Start StreatView card -->
				<slide v-if="map.markers.length > 0">
					<div class="custom-card" @click="streatViewModalState = true">
						<div class="custom-card--imgWrapper">
							<img
								src="@/assets/img/streatview-thumbnai.svg"
								height="130px"
								alt="Streat View"
							/>
						</div>
						panorama
						<p class="text-secondary">
							Take a virtual walk around the neighborhood.
						</p>
					</div>
				</slide>
				<!-- End MapView card -->
				<hooper-navigation slot="hooper-addons"></hooper-navigation>
				<hooper-pagination slot="hooper-addons"></hooper-pagination>
			</hooper>
		</section>
		<!-- End Local Information -->

		<!-- Modals -->
		<!-- <b-modal
			v-if="map.markers.length > 0"
			v-model="mapViewModalState"
			size="xl"
			centered
			title="Map View"
		>
			<gmap-map
				style="width: 100%; height: 300px"
				:center="map.center"
				:map-type-id="map.mapTypeId"
				:zoom="7"
			>
				<gmap-cluster>
					<gmap-marker
						v-for="(mark, index) in map.markers"
						:key="index"
						:icon="require(`@/assets/img/marker.svg`)"
						:position="mark"
					/>
				</gmap-cluster>
			</gmap-map>
		</b-modal> -->

		<b-modal
			v-if="map.markers.length > 0"
			v-model="streatViewModalState"
			size="xl"
			centered
			title="Map View"
		>
			<gmap-street-view-panorama
				class="pano"
				:position="map.markers[0]"
				:pov="pov"
				:zoom="1"
				@pano_changed="updatePano"
				@pov_changed="updatePov"
			/>
		</b-modal>
		<!-- End modals -->
	</div>
</template>

<script>
import panorama from "@/components/panorama";
import {
	Hooper,
	Slide,
	Navigation,
	Pagination as HooperPagination,
} from "hooper";

export default {
	components: {
		panorama,
		Hooper,
		Slide,
		HooperPagination,
		hooperNavigation: Navigation,
	},
	props: {
		map: {
			type: Object,
			default: () => {
				return {};
			},
		},
		hooperSettings: {
			type: Object,
			default: () => {
				return {
					itemsToShow: 2,
					autoPlay: false,
					wheelControl: false,
					centerMode: false,
					infiniteScroll: false,
					breakpoints: {
						700: {
							itemsToShow: 3,
						},
						1000: {
							itemsToShow: 5,
						},
					},
				};
			},
		},
		title: {
			type: Object,
			default: () => {
				return { en: null, sv: null };
			},
		},
	},
	data() {
		return {
			pov: null,
			pano: null,
			mapViewModalState: false,
			streatViewModalState: false,
		};
	},
	methods: {
		updatePov(pov) {
			this.pov = pov;
		},
		updatePano(pano) {
			this.pano = pano;
		},
	},
};
</script>

<style>
.hooper {
	height: 250px;
}

.custom-card {
	cursor: pointer;
	padding: 15px;
}

.custom-card .custom-card--imgWrapper {
	border-radius: 10px;
	overflow: hidden;
}
.custom-card .custom-card--imgWrapper img {
	width: 100%;
	height: 130px;
}
</style>
