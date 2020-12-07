<template>
	<div>
		<loading :state="loadingState" />
		<div v-if="place._id">
			<LoginModal :modalShow="modalShow" @close-modal="modalShow = false" />

			<listingCover
				:title="place.title"
				:cover="place.cover"
				@bookmarkWithoutLogin="modalShow = true"
			/>

			<main>
				<b-container>
					<b-row>
						<!-- Start Info col -->
						<b-col cols="12" md="8">
							<!-- Start Description -->
							<section>
								<h2 class="font-weight-bold">Description</h2>
								<div
									v-html="
										place.beskreving ? place.beskreving[$i18n.locale] : ''
									"
								/>
							</section>
							<!-- End Description -->

							<!-- Start Local Information -->
							<section v-if="map.markers.length > 0">
								<h2>Local Information</h2>
								<hooper :settings="hooperSettings">
									<!-- Start MapView card -->
									<slide v-if="map.markers.length > 0">
										<div @click="mapViewModalState = true" class="custom-card">
											<div class="custom-card--imgWrapper">
												<img
													src="@/assets/img/mapthumbnail.png"
													alt="Map View"
												/>
											</div>
											<p class="text-secondary">
												Explore the area around
												{{ place.title ? place.title[$i18n.locale] : "" }}
											</p>
										</div>
									</slide>
									<!-- End MapView card -->

									<!-- Start StreatView card -->
									<slide v-if="map.markers.length > 0">
										<div
											class="custom-card"
											@click="streatViewModalState = true"
										>
											<div class="custom-card--imgWrapper">
												<img
													src="@/assets/img/streatview-thumbnai.svg"
													height="130px"
													alt="Streat View"
												/>
											</div>
											<p class="text-secondary">
												Take a virtual walk around the neighborhood.
											</p>
										</div>
									</slide>
									<!-- End MapView card -->
									<hooper-navigation slot="hooper-addons"></hooper-navigation>
									<hooper-progress slot="hooper-addons"></hooper-progress>
									<hooper-pagination slot="hooper-addons"></hooper-pagination>
								</hooper>
							</section>
							<!-- End Local Information -->

							<!-- Start Home Details -->
							<section>
								<h2 class="font-weight-bold">
									Home Details for
									{{ place.title ? place.title[$i18n.locale] : "" }}
								</h2>
								<ul class="row">
									<li
										v-for="tag in place.egenskaper"
										:key="tag.name[$i18n.locale]"
										class="col-12 col-md-6 col-lg-4"
									>
										<img
											v-if="tag.avatar"
											:src="`https://popup.dk.se/_nuxt/img/${tag.avatar}`"
											width="50px"
											:alt="tag.name[$i18n.locale]"
										/>
										<span
											v-else
											style="
												display: inline-block;
												height: 50px;
												vertical-align: middle;
												width: 50px;
											"
										/>
										<b>{{ tag.name[$i18n.locale] }}</b>
									</li>
								</ul>
							</section>
							<!-- End Home Details -->

							<!-- Start Prices -->
							<div>
								<h2 class="font-weight-bold">listing's priceing list</h2>
								<b-table
									class="border-top normal"
									:fields="['period', 'price']"
									head-variant="light"
									:items="$t('singleListing.info.priceList')"
								>
									<!-- A custom formatted data column cell -->
									<template #cell(price)="data">
										<span v-if="data.item !== 'prioteradpris'"
											>{{ format(place[data.item]) }} Kr</span
										>
										<!-- <span v-else>
											{{ data.item }}
											{{ format(place[data.item].val) }} Kr /
											{{ $t(place[data.item].period) }}</span
										> -->
									</template>

									<template #cell(period)="data">
										{{ data.item }}
									</template>
								</b-table>

								<!-- <ul class="row list-unstyled">
									<li
										v-for="price in $t('singleListing.info.priceList')"
										:key="price"
										class="d-flex mb-1 col-12 col-md-6 justify-content-between align-items-center"
									>
										<b>{{ price }}:</b>
										<span v-if="price !== 'prioteradpris'"
											>{{ format(place[price]) }} Kr</span
										>
										<span v-else
											>{{ format(place[price].val) }} Kr /
											{{ $t(place[price].period) }}</span
										>
									</li>
								</ul> -->
							</div>
							<!-- End Prices -->

							<!-- Start Galleries -->
							<section>
								<h2>Galleries:</h2>
								<hooper :settings="hooperSettings">
									<!-- Start planritningImages card -->
									<slide>
										<div
											class="custom-card"
											@click="showV('planritningImages', index)"
										>
											<div
												class="custom-card--imgWrapper d-flex justify-content-center align-items-center"
												style="height: 130px"
											>
												<b-icon scale="2" icon="image"></b-icon>
											</div>
											<p class="text-secondary">Planritning.</p>
										</div>
									</slide>
									<!-- End planritningImages card -->

									<!-- Start bildgalleri card -->
									<slide>
										<div
											class="custom-card"
											@click="showV('bildgalleri', index)"
										>
											<div
												class="custom-card--imgWrapper d-flex justify-content-center align-items-center"
												style="height: 130px"
											>
												<b-icon scale="2" icon="image"></b-icon>
											</div>
											<p class="text-secondary">bildgalleri.</p>
										</div>
									</slide>
									<!-- End bildgalleri card -->

									<!-- Start centrumgalleri card -->
									<slide v-if="this.centrumgalleri.length > 0">
										<div
											class="custom-card"
											@click="showV('centrumgalleri', index)"
										>
											<div
												class="custom-card--imgWrapper d-flex justify-content-center align-items-center"
												style="height: 130px"
											>
												<b-icon scale="2" icon="image"></b-icon>
											</div>
											<p class="text-secondary">centrumgalleri.</p>
										</div>
									</slide>
									<!-- End centrumgalleri card -->

									<hooper-navigation slot="hooper-addons"></hooper-navigation>
									<hooper-progress slot="hooper-addons"></hooper-progress>
									<hooper-pagination slot="hooper-addons"></hooper-pagination>
								</hooper>
							</section>
							<!-- End Galleries -->

							<!-- Start similar listings -->
							<section class="my-3">
								<h4 class="font-font-weight-bold">
									{{ $t("singleListing.intersedIn") }}
								</h4>

								<p
									v-if="similar.length === 0"
									class="text-secondary text-center"
								>
									{{ $t("singleListing.noSimilar") }}
								</p>
								<b-row v-else>
									<b-col
										v-for="(card, index) in similar"
										:key="String(index)"
										class="my-2"
										cols="12"
										md="6"
										lg="4"
									>
										<listing-card
											:place="card"
											:layout="'list'"
											@notAuthBookmark="modalShow = true"
										/>
									</b-col>
								</b-row>
							</section>
							<!-- End similar listings -->
						</b-col>
						<!-- End Info col -->

						<b-col
							style="
								position: sticky;
								top: 70px;
								width: 100px;
								height: 100%;
								justify-self: flex-start;
							"
							class="d-md-flex"
							md="4"
							cols="12"
						>
							<contactForm />
						</b-col>
					</b-row>
				</b-container>
			</main>
		</div>

		<!-- Start Viewers -->
		<viewer
			v-for="(i, index) in [
				{ images: planritningImages, ref: 'viewer', init: 'planritningImages' },
				{ images: images, ref: 'viewer2', init: 'bildgalleri' },
				{ images: centrumgalleri, ref: 'viewer3', init: 'centrumgalleri' },
			]"
			:key="`${index}-viewer`"
			:ref="i.ref"
			:images="i.images"
			class="viewer"
			@inited="initedV(i.init, $event)"
		>
			<img
				v-for="src in i.images"
				:key="src + '- ' + i.init"
				:src="src"
				class="d-none"
			/>
		</viewer>
		<!-- End Viewers -->

		<!-- Modals -->
		<b-modal
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
		</b-modal>

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
import { BIcon, BIconImage } from "bootstrap-vue";
import "viewerjs/dist/viewer.css";
import Viewer from "v-viewer";
import Vue from "vue";
import panorama from "@/components/panorama";
import LoginModal from "@/components/loginModal";
import contactForm from "@/components/singleListing/contactFrom";
import listingCover from "@/components/singleListing/listingCover";

import { mapGetters } from "vuex";
import { Hooper, Slide, Pagination as HooperPagination } from "hooper";

Vue.use(Viewer);

export default {
	components: {
		BIcon,
		panorama,
		BIconImage,
		LoginModal,
		Hooper,
		Slide,
		HooperPagination,
		contactForm,
		listingCover,
	},
	data() {
		return {
			pov: null,
			pano: null,
			mapViewModalState: false,
			streatViewModalState: false,
			hooperSettings: {
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
			},
			loadingState: true,
			modalShow: false,
			thereIsCentrum: false,
			map: {
				center: { lat: 59.334591, lng: 18.06324 },
				mapTypeId: "roadmap",
				markers: [],
			},
			place: {},
			similar: [],
			tabOpened: 0,
		};
	},
	computed: {
		images() {
			return !this.place.bildgalleri
				? []
				: this.place.bildgalleri.map(
						(x) => `https://popup.dk.se/_nuxt/img/${x}`
				  );
		},
		centrumgalleri() {
			return !this.place.centrumgalleri
				? []
				: this.place.centrumgalleri.map(
						(x) => `https://popup.dk.se/_nuxt/img/${x}`
				  );
		},
		planritningImages() {
			return !this.place.planritning
				? []
				: this.place.planritning.map(
						(x) => `https://popup.dk.se/_nuxt/img/${x}`
				  );
		},
	},
	async created() {
		this.$viewer = {};
		const listings = this.$store.getters.listings;
		const placeFromStore = listings.find(
			(place) =>
				place.title.sv === this.$route.params.title.replace(/[-]/g, " ")
		);

		console.log(placeFromStore);
		if (placeFromStore.location) {
			this.thereIsCentrum = true;
			this.map = {
				center: {
					lng: placeFromStore.location.coordinates[0],
					lat: placeFromStore.location.coordinates[1],
				},
				mapTypeId: "roadmap",
				markers: [
					{
						lng: placeFromStore.location.coordinates[0],
						lat: placeFromStore.location.coordinates[1],
					},
				],
			};
		}

		// Increment views
		await this.$axios.patch(`/places/view/${placeFromStore._id}`);
		this.place = placeFromStore;
		this.similar = listings
			.filter((place) => place.stad.sv === placeFromStore.stad.sv)
			.filter((place) => place._id !== placeFromStore._id);
		this.loadingState = false;
	},
	methods: {
		updatePov(pov) {
			this.pov = pov;
		},
		updatePano(pano) {
			this.pano = pano;
		},
		initedV(name, viewer) {
			this.$viewer[name] = viewer;
		},
		showV(name, index) {
			this.$viewer[name].view(index);
		},
		format(num) {
			const arr = String(num).split("").reverse();
			const copy = [...arr];
			const indexes = [];

			for (let i = 1; i <= arr.length; i++) {
				if (i % 3 === 0) {
					indexes.push(i);
				}
			}

			if (copy.length > 3) {
				indexes.forEach((n, i) => copy.splice(n + i, 0, ","));
			}

			copy.reverse();
			if (copy[0] === ",") {
				copy.shift();
			}
			copy.join("");
			return copy.join("");
		},
	},
};
</script>

<style scoped>
p {
	padding: 0;
	margin: 0;
}

main .container section {
	padding: 30px 0;
}

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
