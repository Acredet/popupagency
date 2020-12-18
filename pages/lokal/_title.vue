<template>
	<div>
		<loading :state="loadingState" />
		<div v-if="place._id">
			<LoginModal :modalShow="modalShow" @close-modal="modalShow = false" />

			<listingCover
				:title="place.title"
				:cover="place.cover"
				:price-per-day="place.prisperdag"
				@bookmarkWithoutLogin="modalShow = true"
			/>

			<main>
				<!-- Start Feats -->
				<b-container class="d-flex flex-column flex-nowrap my-5">
					<b-row
						no-gutters
						class="d-flex flex-nowrap jsutify-content-center w-100 py-3 tabs"
					>
						<b-col
							v-for="feat in feats"
							:key="feat.name"
							cols="auto"
							class="d-flex flex-grow-1 flex-column justify-content-center mx-2 align-items-center"
						>
							<img
								width="30px"
								:src="require(`~/assets/img/feats/${feat.name}.png`)"
								:alt="feat.name"
							/>
							<b v-if="feat.name === 'yta-1'" class="pt-1"
								>{{ feat.text }} m<sup>3</sup>
							</b>
							<b v-else class="pt-1">{{ feat.text }}</b>
						</b-col>
					</b-row>
				</b-container>
				<!-- End Feats -->

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

							<b-row>
								<b-col cols="12" md="6">
									<!-- Start Home Details -->
									<section>
										<h2 class="font-weight-bold">
											Home Details for
											{{ place.title ? place.title[$i18n.locale] : "" }}
										</h2>
										<ul class="list-inline">
											<li
												v-for="tag in place.egenskaper"
												:key="tag.name[$i18n.locale]"
												class="list-inline-item"
											>
												<img
													v-if="tag.avatar"
													:src="`https://popup.dk.se/_nuxt/img/${tag.avatar}`"
													width="30px"
													:alt="tag.name[$i18n.locale]"
												/>
												<span
													v-else
													style="
														display: inline-block;
														height: 30px;
														vertical-align: middle;
														width: 30px;
													"
												/>
												<b>{{ tag.name[$i18n.locale] }}.</b>
											</li>
										</ul>
									</section>
									<!-- End Home Details -->
								</b-col>

								<b-col cols="12" md="6">
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
								</b-col>
							</b-row>

							<b-row>
								<b-col cols="12" md="6">
									<pricesTable :place="place" />
								</b-col>

								<!-- <b-col cols="12" md="6">
									<localInfo
										:map="map"
										:hooperSettings="hooperSettings"
										:title="place.title"
									/>
								</b-col> -->
							</b-row>

							<section v-if="place.centurmTitle">
								<h1>{{ $t("singleListing.info.centrumInfo") }}:</h1>
								<b-row>
									<b-col cols="12" md="6">
										<div>
											<h4 class="d-inline-block">{{ $t("title") }}:</h4>
											<h5 class="d-inline-block">
												{{ place.centurmTitle[$i18n.locale] }}
											</h5>
										</div>

										<div>
											<h4 class="d-inline-block">
												{{ $t("singleListing.info.website") }}:
											</h4>
											<h5 class="d-inline-block">{{ place.hemsida }}</h5>
										</div>

										<section>
											<h4>{{ $t("singleListing.info.description") }}:</h4>
											<div v-html="place.centrumtextarea[$i18n.locale]" />
										</section>
									</b-col>

									<!-- Start oppettider -->
									<b-col cols="12" md="6">
										<h4>{{ $t("singleListing.info.openingHours") }}:</h4>
										<div v-for="day in place.oppettider" :key="day._id">
											<b-row>
												<b-col cols="6">
													<p class="m-0 p-0" v-text="day.day + ':'" />
												</b-col>
												<b-col cols="6">
													<p
														v-for="time in day.times"
														:key="time._id"
														class="m-0 p-0 text-right"
														v-text="
															`${time.opening.substr(
																0,
																5
															)} - ${time.closing.substr(0, 5)}`
														"
													/>
												</b-col>
											</b-row>
											<hr />
										</div>
									</b-col>
									<!-- End oppettider -->
								</b-row>
							</section>

							<!-- Start Galleri -->
							<b-col class="my-3" cols="12">
								<div
									class="my-gallery"
									itemscope
									itemtype="http://schema.org/ImageGallery"
								>
									<b class="font-4 mb-2">{{
										$t("singleListing.info.gallery")
									}}</b>
									<!-- component -->
									<b-row no-gutters>
										<b-col
											v-for="(src, index) in images"
											:key="src"
											cols="12"
											md="6"
											@click="showV('bildgalleri', index)"
										>
											<div class="gallery-images" style="height: 320px">
												<img width="100%" :src="src" style="height: 320px" />
											</div>
										</b-col>
										<b-col v-if="images.length === 0" cols="12">
											<p class="text-center text-secondary">
												{{ $t("notProvided") }}
											</p>
										</b-col>
									</b-row>

									<viewer
										ref="viewer2"
										:images="images"
										class="viewer"
										@inited="initedV('bildgalleri', $event)"
									>
										<img
											v-for="src in images"
											:key="`${src}-imaged`"
											:src="src"
											class="d-none"
										/>
									</viewer>
								</div>
							</b-col>
							<!-- End Galleri -->

							<!-- contact us -->
							<b-row style="min-height: 200px">
								<b-col cols="6" class="contact-us-img" />
								<b-col
									cols="6"
									class="d-flex justify-content-center align-items-center"
								>
									<b-btn squared variant="primary" @click="tabOpened = 3">
										{{ $t("contactUs") }}
									</b-btn>
								</b-col>
							</b-row>
							<!-- contact us -->

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
							<contactForm :sellerId="place.userId" />
						</b-col>
					</b-row>
				</b-container>
			</main>
		</div>

		<!-- Start Viewers -->
		<!-- <viewer
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
		</viewer> -->
		<!-- End Viewers -->
	</div>
</template>

<script>
import { BIcon, BIconImage } from "bootstrap-vue";
import "viewerjs/dist/viewer.css";
import Viewer from "v-viewer";
import Vue from "vue";
import LoginModal from "@/components/loginModal";
import contactForm from "@/components/singleListing/contactFrom";
import listingCover from "@/components/singleListing/listingCover";
import pricesTable from "@/components/singleListing/prices";
import localInfo from "@/components/singleListing/localInformation";

import { mapGetters } from "vuex";

import {
	Hooper,
	Slide,
	Navigation,
	Pagination as HooperPagination,
} from "hooper";

Vue.use(Viewer);

export default {
	components: {
		// Icons
		BIcon,
		BIconImage,

		// Page components
		LoginModal,
		contactForm,
		listingCover,
		pricesTable,
		localInfo,

		// Hooper
		Hooper,
		Slide,
		HooperPagination,
		hooperNavigation: Navigation,
	},
	data() {
		return {
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
		...mapGetters({
			getOneListing: "listing/getOneListings",
			listings: "listing/listings",
		}),
		feats() {
			return [
				{ name: "yta-1", text: this.place.yta || "" },
				{
					name: this.place.fasta ? "fasta-oppettider-1" : "fasta-oppettider-2",
					text: this.$t("singleListing.feats.fasta"),
				},
				{
					name: this.place.butik ? "butik-1" : "butik-2",
					text: this.$t("singleListing.feats.butik"),
				},
				{
					name: this.place.mat ? "matodrick-1" : "matodrick-2",
					text: this.$t("singleListing.feats.mat"),
				},
				{
					name: this.place.event ? "event-1" : "event-2",
					text: this.$t("singleListing.feats.event"),
				},
				{
					name: this.place.sasongBoxen ? "sol" : "solstol",
					text: this.$t("singleListing.feats.sasong"),
				},
			];
		},
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
		const placeFromStore = this.getOneListing(
			this.$route.params.title.replace(/[-]/g, " ")
		);
		console.log(placeFromStore);
		if (placeFromStore.routeGuidance) {
			this.thereIsCentrum = true;
			this.map = {
				center: {
					lng: placeFromStore.routeGuidance.coordinates[0],
					lat: placeFromStore.routeGuidance.coordinates[1],
				},
				mapTypeId: "roadmap",
				markers: [
					{
						lng: placeFromStore.routeGuidance.coordinates[0],
						lat: placeFromStore.routeGuidance.coordinates[1],
					},
				],
			};
		}

		// Increment views
		await this.$axios.patch(`/places/view/${placeFromStore._id}`);
		this.place = placeFromStore;
		this.similar = this.listings
			.filter((place) => place.stad.sv === placeFromStore.stad.sv)
			.filter((place) => place._id !== placeFromStore._id);
		this.loadingState = false;
	},
	methods: {
		initedV(name, viewer) {
			this.$viewer[name] = viewer;
		},
		showV(name, index) {
			this.$viewer[name].view(index);
		},
	},
};
</script>

<style scoped>
@media screen and (max-width: 576px) {
	.row.tabs {
		overflow-x: scroll;
	}
}

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

.contact-us-img {
	min-height: 400px;
	background-image: url("~assets/img/contact-us-person.png");
	background-size: cover;
	background-position: center center;
}
</style>
