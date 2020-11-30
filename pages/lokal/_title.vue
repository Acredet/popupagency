<template>
	<div>
		<loading :state="loadingState" />
		<div v-if="place._id">
			<!-- Login modal -->
			<b-modal
				id="modal-center"
				v-model="modalShow"
				centered
				:title="$t('loginModal.title')"
			>
				<p class="my-4">
					{{ $t("loginModal.text") }}
				</p>
				<template v-slot:modal-footer>
					<div>
						<b-btn variant="primary" to="/login">
							{{ $t("loginModal.title") }}
						</b-btn>
						<b-btn variant="error" @click="modalShow = false">
							{{ $t("actions.cancle") }}
						</b-btn>
					</div>
				</template>
			</b-modal>
			<!-- End modal -->

			<!-- Start cover -->
			<div class="position-relative cover">
				<div class="position-relative cover--overlay" :style="imgStyles" />
				<section class="cover--details">
					<b-container class="h-100 position-relative">
						<div
							class="text-center h-100 d-flex flex-column flex-lg-row align-items-lg-center justify-content-lg-between"
						>
							<h1 class="font-5">
								{{ place.title ? place.title[$i18n.locale] : "" }}
								<b-btn
									v-if="
										$auth.loggedIn &&
										['admin', 'manager'].includes($auth.user.role)
									"
									variant="icon"
									:to="`${$t('link')}admin/listings/edit/${place.title.sv
										.split(' ')
										.join('-')}`"
								>
									<b-icon icon="pencil-square" class="text-white" />
								</b-btn>
							</h1>
						</div>

						<div class="bookmark-wrapper position-absolute">
							<b-btn
								class="bookmark-btn"
								@click="
									(e) => {
										if (!this.$auth.loggedIn) {
											this.modalShow = true;
										} else {
											this.AddToFav(e);
										}
									}
								"
								variant="icon"
							>
								<b-icon
									scale="1.5"
									:icon="
										$auth.loggedIn &&
										$auth.user.fav.findIndex((x) => x === place.title.sv) !== -1
											? 'heart-fill'
											: 'heart'
									"
									style="color: red"
								/>
							</b-btn>
						</div>
					</b-container>
				</section>
			</div>
			<!-- End cover -->

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
							<section>
								<h2>Local Information</h2>
								<hooper :settings="hooperSettings">
									<!-- Start MapView card -->
									<slide>
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
									<slide>
										<div
											@click="streatViewModalState = true"
											class="custom-card"
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
										<span v-else>
											{{ data.item }}
											{{ format(place[data.item].val) }} Kr /
											{{ $t(place[data.item].period) }}</span
										>
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

						<!-- Start Form -->
						<b-col
							style="
								position: sticky;
								top: 70px;
								width: 100px;
								height: 100%;
								justify-self: flex-start;
							"
							class="d-none d-md-flex"
							md="4"
						>
							<b-form class="py-5">
								<h4
									class="font-weight-bold"
									v-text="$t('singleListing.form.sendUs')"
								/>
								<b-row>
									<!-- Start user name -->
									<b-col cols="12">
										<b-form-group
											class="my-2"
											:label="$t('forms.name.title')"
											label-class="font-weight-bold"
											label-for="username"
										>
											<b-form-input
												id="username"
												v-model="form.name"
												autocomplete="off"
												size="sm"
											/>
										</b-form-group>
									</b-col>
									<!-- End user name -->

									<!-- Start email -->
									<b-col cols="12" md="6">
										<b-form-group
											class="my-2"
											:label="$t('forms.email.title')"
											label-class="font-weight-bold"
											label-for="email"
										>
											<b-form-input
												id="email"
												v-model="form.email"
												type="email"
												autocomplete="off"
												size="sm"
											/>
										</b-form-group>
									</b-col>
									<!-- End email -->

									<!-- Start Phone -->
									<b-col cols="12" md="6">
										<b-form-group
											class="my-2"
											:label="$t('forms.phone.title')"
											label-class="font-weight-bold"
											label-for="Phone"
										>
											<b-form-input
												id="Phone"
												v-model="form.phone"
												autocomplete="off"
												size="sm"
											/>
										</b-form-group>
									</b-col>
									<!-- End Phone -->

									<!-- Start Business -->
									<b-col cols="12" md="6">
										<b-form-group
											class="my-2"
											:label="$t('forms.business.title')"
											label-class="font-weight-bold"
											label-for="Business"
										>
											<b-form-input
												id="Business"
												v-model="form.business"
												autocomplete="off"
												size="sm"
											/>
										</b-form-group>
									</b-col>
									<!-- End Business -->

									<!-- Start Website -->
									<b-col cols="12" md="6">
										<b-form-group
											class="my-2"
											:label="$t('singleListing.info.website') + ':'"
											label-class="font-weight-bold"
											label-for="Website"
										>
											<b-form-input
												id="Website"
												v-model="form.website"
												autocomplete="off"
												size="sm"
											/>
										</b-form-group>
									</b-col>
									<!-- End Website -->

									<!-- Start From -->
									<b-col cols="12" md="6">
										<b-form-group
											class="my-2"
											:label="$t('singleListing.form.from')"
											label-class="font-weight-bold"
											label-for="from"
										>
											<b-form-datepicker
												id="from"
												v-model="form.from"
												today-button
												reset-button
												close-button
												size="sm"
												class="mb-2"
											/>
										</b-form-group>
									</b-col>
									<!-- End From -->

									<!-- Start empty -->
									<b-col cols="12" md="6">
										<b-form-group
											class="my-2"
											:label="$t('singleListing.form.empty')"
											label-class="font-weight-bold"
											label-for="Empty"
										>
											<b-form-datepicker
												id="Empty"
												v-model="form.empty"
												today-button
												reset-button
												close-button
												size="sm"
												class="mb-2"
											/>
										</b-form-group>
									</b-col>
									<!-- End empty -->

									<!-- Start details -->
									<b-col cols="12">
										<b-form-group
											class="my-2"
											:label="$t('singleListing.form.details')"
											label-class="font-weight-bold"
											label-for="details"
										>
											<b-form-textarea id="details" size="sm" />
										</b-form-group>
									</b-col>
									<!-- End details -->
									<b-col cols="12">
										<b-form-checkbox
											id="GDPR"
											v-model="form.GDPR"
											name="GDPR"
											:value="true"
											:unchecked-value="false"
										>
											{{ $t("singleListing.form.GDPR") }}
										</b-form-checkbox>
									</b-col>

									<b-btn
										class="m-2"
										size="lg"
										type="button"
										variant="primary"
										@click="sendForm"
									>
										{{ $t("actions.submit") }}
									</b-btn>
								</b-row>
							</b-form>
						</b-col>
						<!-- End Form -->
					</b-row>
				</b-container>
			</main>
		</div>

		<!-- Modals -->
		<b-modal v-model="mapViewModalState" size="xl" centered title="Map View">
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

		<b-modal v-model="streatViewModalState" size="xl" centered title="Map View">
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
import {
	BootstrapVue,
	BIcon,
	BIconPencilSquare,
	BIconHeart,
	BIconHeartFill,
} from "bootstrap-vue";
import "viewerjs/dist/viewer.css";
import Viewer from "v-viewer";
import Vue from "vue";
import panorama from "@/components/panorama";
import { addToFav } from "@/mixins/utils/addToFav";
import { mapGetters } from "vuex";
import { Hooper, Slide, Pagination as HooperPagination } from "hooper";

Vue.use(Viewer);

export default {
	components: {
		BootstrapVue,
		BIconPencilSquare,
		BIcon,
		panorama,
		BIconHeart,
		BIconHeartFill,
		Hooper,
		Slide,
		HooperPagination,
	},
	mixins: [addToFav],
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
			form: {
				name: "",
				email: "",
				phone: "",
				business: "",
				website: "",
				empty: "",
				from: "",
				details: "",
				GDPR: false,
			},
		};
	},
	computed: {
		tabs() {
			const tabs = {
				en: ["Information", "Center info", "Price", "Booking request"],
				sv: ["Information", "Centruminfo", "Pris", "Bokningsförfrågan"],
			};
			if (!this.thereIsCentrum) {
				tabs.en.splice(1, 1);
				tabs.sv.splice(1, 1);
			}
			return tabs[this.$i18n.locale];
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
		imgStyles() {
			return {
				"min-height": "60vh",
				"background-repeat": "no-repeat",
				"background-image": `url('https://popup.dk.se/_nuxt/img/${
					this.place.cover ? this.place.cover[0] : ""
				}')`,
				"background-position": "center center",
				"background-attachment": "fixed",
				"background-size": "cover",
			};
		},
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
	},
	async created() {
		this.$viewer = {};
		const listings = this.$store.getters.listings;
		const placeFromStore = listings.find(
			(place) =>
				place.title.sv === this.$route.params.title.replace(/[-]/g, " ")
		);
		if (placeFromStore.location) {
			this.thereIsCentrum = true;
		}

		// Increment views
		await this.$axios.patch(`/places/view/${placeFromStore._id}`);
		this.place = placeFromStore;
		this.similar = listings
			.filter((place) => place.stad.sv === placeFromStore.stad.sv)
			.filter((place) => place._id !== placeFromStore._id);
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
		this.loadingState = false;
	},
	methods: {
		updatePov(pov) {
			this.pov = pov;
		},
		updatePano(pano) {
			this.pano = pano;
		},
		sendForm() {
			alert("Not working yet 😉");
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
@media screen and (max-width: 576px) {
	.row.tabs {
		overflow-x: scroll;
	}
}

.anime-tab {
	margin: 10px;
	padding: 10px 10px;
	float: left;
	box-sizing: border-box;
	transition: 0.4s all ease-in-out;
	position: relative;
	cursor: pointer;
}

.anime-tab:before {
	position: absolute;
	bottom: 0;
	background: var(--indigo);
	height: 2px;
	display: block;
	content: "";
	width: 0;
	transition: 0.4s all ease-in-out;
}

.anime-tab:hover:before,
.anime-tab.active:before {
	width: 100%;
}

.anime-tab-fromLeft:before {
	bottom: 0;
	left: 0;
}

.cover .cover--details::before {
	z-index: -1;
	content: "";
	background: rgb(0, 0, 0);
	background: linear-gradient(
		180deg,
		rgba(0, 0, 0, 0) 0%,
		rgba(0, 0, 0, 0.710504270067402) 71%
	);
	position: absolute;
	opacity: 0.5;
	bottom: 0;
	left: 0;
	width: 100%;
	height: 100%;
	display: flex;
}

.cover .cover--details {
	z-index: 4;
	position: absolute;
	bottom: 0;
	left: 0;
	height: 30%;
	width: 100%;
	padding: 5px;
	color: white;
}

.cover .cover--details .bookmark-wrapper {
	bottom: -22%;
	right: 0;
}

.cover .cover--details .bookmark-btn,
.cover .cover--details .bookmark-btn:hover,
.cover .cover--details .bookmark-btn:focus {
	outline: none !important;
	box-shadow: 0 !important;
	background: white;
	width: 60px;
	height: 60px;
	border-radius: 50%;
	box-shadow: 0px 0px 14px 0px rgba(50, 50, 50, 0.75);
}

p {
	padding: 0;
	margin: 0;
}

.gallery-images {
	cursor: pointer;
	position: relative;
	overflow: hidden;
}

.gallery-images::before {
	content: "\f00e";
	color: white;
	font-size: 12px;
	font-family: "Font Awesome 5 Free";
	font-weight: 900;
	display: flex;
	transform: scale(1);
	justify-content: center;
	align-items: center;
	opacity: 0;
	transition: all 0.4s ease;
	width: 100%;
	height: 100%;
	background: rgba(0, 0, 0, 0.8);
	position: absolute;
}

.gallery-images:hover::before {
	opacity: 1;
	transform: scale(1.2);
}

.planritning {
	cursor: pointer;
}

.planritning i {
	transition: all 0.4s ease;
	border: 1px solid var(--dark);
	padding: 10px;
	border-radius: 50%;
}

.planritning:hover i {
	color: white;
	border: 1px solid var(--indigo);
	background: var(--indigo);
}

.contact-us-img {
	min-height: 400px;
	background-image: url("~assets/img/contact-us-person.png");
	background-size: cover;
	background-position: center center;
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
