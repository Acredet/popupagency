<template>
	<div class="content">
		<!-- <loading :state="loadingState" /> -->

		<b-container class="mt-5">
			<h2
				v-if="!editCentrum"
				v-text="$t('adminSidebar.center.add') + ':'"
			/>
			<h2 v-else v-text="$t('adminSidebar.center.edit') + ':'" />
			<b-form id="add-centrum">
				<titleInputsCard
					:EditTitle="centrumEdit ? centrumEdit.title : {}"
					@titleChanged="title = $event"
				/>

				<!-- hemsida -->
				<b-card class="my-5" :title="$t('addListing.inputs.hemsida')">
					<b-card-body>
						<b-form-input
							v-model="hemsida"
							placeholder="https://vala.se"
						/>
					</b-card-body>
				</b-card>
				<!-- hemsida -->

				<centrumGalleriCard
					:details="{
						title: $t('addListing.inputs.centerGallery'),
						name: 'centrumgalleri[]',
					}"
					:oldImages="centrumEdit ? centrumEdit.centrumgalleri : []"
				/>

				<!-- centrumtextarea -->
				<b-card class="my-5">
					<b-card-body>
						<h3>{{ $t("centrum.textarea") }} en:</h3>
						<client-only>
							<VueEditor v-model="centrum.en" />
						</client-only>
						<hr />
						<h3>{{ $t("centrum.textarea") }} sw:</h3>
						<client-only>
							<VueEditor v-model="centrum.sv" />
						</client-only>
					</b-card-body>
				</b-card>
				<!-- centrumtextarea -->

				<!-- oppettider -->
				<b-card class="my-5" :title="$t('addListing.inputs.optidder')">
					<b-tabs content-class="mt-3" fill>
						<b-tab
							v-for="tab in times"
							:key="tab.name"
							:title="tab.name"
							:active="tab.active"
						>
							<b-form-group>
								<b-form-radio-group
									id="optidder"
									v-model="days[tab.name].openTimes"
									:name="tab.name"
								>
									<b-form-radio value="hours">
										{{
											$t(
												"addListing.inputs.optidderOpts.hours"
											)
										}}
									</b-form-radio>
									<b-form-radio value="openAllDay">
										{{
											$t(
												"addListing.inputs.optidderOpts.allDayOpen"
											)
										}}
									</b-form-radio>
									<b-form-radio value="closeAllDay">
										{{
											$t(
												"addListing.inputs.optidderOpts.allDayClose"
											)
										}}
									</b-form-radio>
									<b-form-radio value="appointment">
										{{
											$t(
												"addListing.inputs.optidderOpts.appointment"
											)
										}}
									</b-form-radio>
								</b-form-radio-group>
							</b-form-group>

							<div v-if="days[tab.name].openTimes == 'hours'">
								<b-row
									v-for="(hours, index) in days[tab.name]
										.hours"
									:key="'m' + index"
									class="my-3"
								>
									<b-col
										cols="12"
										md="5"
										class="mb-2 mb-md-0"
									>
										<b-form-timepicker
											v-model="
												days[tab.name].hours[index]
													.opening
											"
											locale="en"
										/>
									</b-col>
									<b-col
										cols="12"
										md="5"
										class="mb-2 mb-md-0"
									>
										<b-form-timepicker
											v-model="
												days[tab.name].hours[index]
													.closing
											"
											locale="en"
										/>
									</b-col>
									<b-col cols="12" md="2">
										<b-button
											variant="outline-light"
											block
											@click="
												delteTimeRow(tab.name, index)
											"
										>
											<b-icon-trash
												variant="dark"
												class="rounded-circle"
											/>
										</b-button>
									</b-col>
								</b-row>

								<b-col cols="12">
									<b-button
										block
										variant="primary"
										@click="addTimeRow(tab.name)"
									>
										Add Time
									</b-button>
								</b-col>
							</div>
						</b-tab>
					</b-tabs>
				</b-card>
				<!-- oppettider -->

				<!-- routeGuidance -->
				<b-card :title="$t('addListing.inputs.plats')">
					<b-card-body>
						<div class="w-100">
							<gmap-map
								:center="map.center"
								:map-type-id="map.mapTypeId"
								style="height: 300px"
								:street-view-control="true"
								:zoom="7"
							>
								<gmap-cluster>
									<gmap-marker
										v-for="(mark, index) in map.markers"
										:key="index"
										:position="mark"
									/>
								</gmap-cluster>
							</gmap-map>
							<div class="my-2">
								<b-form-group
									id="address-group"
									:label="`${$t('centrum.address')}`"
									label-class="font-weight-bold "
									label-for="address"
								>
									<gmap-autocomplete
										id="address"
										class="form-control"
										@place_changed="setPlace"
									/>
									<p
										v-if="$route.params.id"
										class="font-weight-bold"
									>
										{{ $t("centrum.location") }}:
										{{ formattedAddress }}
									</p>
								</b-form-group>
							</div>
						</div>
						<b-row>
							<b-col cols="12" md="6">
								<b-form-group
									id="location-lang-group"
									:label="`${$t('centrum.longitude')}`"
									label-class="font-weight-bold "
									label-for="location-lang"
								>
									<b-form-input
										id="location-lang"
										v-model="location.lng"
										required
										autocomplete="off"
										:state="locationValidLNG"
										:placeholder="
											$t('addListing.inputs.plats')
										"
									/>
									<b-form-invalid-feedback
										:state="locationValidLNG"
									>
										{{ $t("forms.required") }}
									</b-form-invalid-feedback>

									<b-form-valid-feedback
										:state="locationValidLNG"
									>
										{{ $t("forms.valid") }}
									</b-form-valid-feedback>
								</b-form-group>
							</b-col>

							<b-col cols="12" md="6">
								<b-form-group
									id="location-lat-group"
									:label="`${$t('centrum.latitude')}`"
									label-class="font-weight-bold "
									label-for="location-lat"
								>
									<b-form-input
										id="location-lat"
										v-model="location.lat"
										required
										autocomplete="off"
										:state="locationValidLAT"
										:placeholder="
											$t('addListing.inputs.plats')
										"
									/>
									<b-form-invalid-feedback
										:state="locationValidLAT"
									>
										{{ $t("forms.required") }}
									</b-form-invalid-feedback>

									<b-form-valid-feedback
										:state="locationValidLAT"
									>
										{{ $t("forms.valid") }}
									</b-form-valid-feedback>
								</b-form-group>
							</b-col>
						</b-row>
					</b-card-body>
				</b-card>
				<!-- routeGuidance -->

				<b-card :title="$t('addListing.inputs.stad')">
					<b-card-body>
						<b-form-select
							v-model="city"
							:options="regions"
							size="md"
						/>
					</b-card-body>
				</b-card>
				<!-- <b-btn variant="primary" :disabled="!form.name.en || !form.name.sv" @click="addItem('tag')" v-text="$t('tag.addBtn')" /> -->
				<b-overlay
					:show="busy"
					rounded
					opacity="0.6"
					spinner-small
					spinner-variant="primary"
					class="d-inline-block"
				>
					<b-btn
						v-if="$route.params.id"
						ref="post-button"
						type="button"
						:disabled="busy"
						block
						style="display: inherit"
						variant="warning"
						@click="editCentrum"
						v-text="$t('adminSidebar.center.edit')"
					/>
					<b-btn
						v-else
						ref="edit-button"
						type="button"
						block
						style="display: inherit"
						variant="primary"
						:disabled="busy"
						@click="post"
						v-text="$t('adminSidebar.center.add')"
					/>
				</b-overlay>
			</b-form>
		</b-container>

		<toast :toast="toast" />
	</div>
</template>

<script>
import { BootstrapVue, BIcon, BIconTrash, BIconTrashFill } from "bootstrap-vue";
import titleInputsCard from "@/components/centrumForm/title";
import centrumGalleriCard from "@/components/centrumForm/centrumGalleri";
import ourUploader from "@/components/ourUploader";
// import { sortItems } from '@/mixins/SortRegions'
let VueEditor;
if (process.browser) {
	VueEditor = require("vue2-editor").VueEditor;
}

export default {
	name: "ListingTags",
	layout: "admin",
	components: {
		BootstrapVue,
		BIcon,
		BIconTrash,
		BIconTrashFill,
		ourUploader,
		VueEditor,
		titleInputsCard,
		centrumGalleriCard,
	},
	// mixins: [sortItems],
	props: {
		centrumEdit: {
			type: Object,
			default: () => {},
		},
	},
	data() {
		return {
			busy: false,
			toast: {
				title: null,
				variant: null,
				visible: false,
				text: null,
			},
			title: null,
			map: {
				center: { lat: 59.334591, lng: 18.06324 },
				mapTypeId: "roadmap",
				markers: [],
			},
			formattedAddress: null,
			regions: [],
			city: null,
			oldCity: null,
			location: {
				lat: null,
				lng: null,
			},
			hemsida: null,
			centrum: {
				en: null,
				sv: null,
			},
			days: {
				Mon: {
					openTimes: "hours",
					hours: [{ opening: "00:00:00", closing: "00:00:00" }],
				},
				Tue: {
					openTimes: "hours",
					hours: [{ opening: "00:00:00", closing: "00:00:00" }],
				},
				Wed: {
					openTimes: "hours",
					hours: [{ opening: "00:00:00", closing: "00:00:00" }],
				},
				Thu: {
					openTimes: "hours",
					hours: [{ opening: "00:00:00", closing: "00:00:00" }],
				},
				Fri: {
					openTimes: "hours",
					hours: [{ opening: "00:00:00", closing: "00:00:00" }],
				},
				Sat: {
					openTimes: "hours",
					hours: [{ opening: "00:00:00", closing: "00:00:00" }],
				},
				Sun: {
					openTimes: "hours",
					hours: [{ opening: "00:00:00", closing: "00:00:00" }],
				},
			},
			times: [
				{
					name: "Mon",
					active: true,
				},
				{
					name: "Tue",
					active: false,
				},
				{
					name: "Wed",
					active: false,
				},
				{
					name: "Thu",
					active: false,
				},
				{
					name: "Fri",
					active: false,
				},
				{
					name: "Sat",
					active: false,
				},
				{
					name: "Sun",
					active: false,
				},
			],
			images: {
				centrumgalleri: null,
			},
		};
	},
	computed: {
		stadValid() {
			return !!this.city;
		},
		locationValidLNG() {
			return !!this.location.lng;
		},
		locationValidLAT() {
			return !!this.location.lat;
		},
	},
	watch: {
		location: {
			deep: true,
			handler(val) {
				console.log(val);
				if (val.lat && val.lng) {
					const co = { lat: Number(val.lat), lng: Number(val.lng) };
					console.log("location: ", { location: co });
					this.$axios
						.post("/centrum/address", { location: co })
						.then((res) => {
							this.formattedAddress = res.data.formattedAddress;
						})
						.catch((err) => alert(err));
					this.map.center = co;
					this.map.markers = [co];
				}
			},
		},
		centrumEdit: {
			immediate: true,
			deep: true,
			handler(newValue) {
				if (newValue && newValue._id) {
					this.assignCentrumEdit();
				}
			},
		},
	},
	async created() {
		if (
			!this.$auth.loggedIn ||
			!["manager", "admin"].includes(this.$auth.user.role)
		) {
			this.$router.push("/error");
		}
		await this.$axios
			.get("/region")
			.then((res) => {
				if (this.centrumEdit) {
					this.regions = res.data.data.map((x) => {
						return {
							text: x.name[this.$i18n.locale],
							value: x._id,
							centrum: x.centrum || null,
						};
					});
					this.city = res.data.data.filter(
						(x) => x.centrum && x.centrum === this.centrumEdit._id
					)[0]._id;
					this.oldCity = this.city;
					this.$forceUpdate();
				} else {
					this.regions = res.data.data
						.filter((j) => !j.centrum)
						.map((x) => {
							return {
								text: x.name[this.$i18n.locale],
								value: x._id,
								centrum: x.centrum || null,
							};
						});
				}
			})
			.catch((err) => console.log(err));
	},
	methods: {
		setPlace(place) {
			if (!place) {
				return;
			}

			this.location = {
				lat: place.geometry.location.lat(),
				lng: place.geometry.location.lng(),
			};
		},

		delteTimeRow(name, index) {
			this.days[name].hours.splice(index, 1);
		},
		addTimeRow(name) {
			this.days[name].hours.push({
				opening: "00:00:00",
				closing: "00:00:00",
			});
		},
		async post() {
			const centrum = await this.createCentrumForm();
			await this.$axios
				.$post("/centrum", centrum)
				.then(async (res) => {
					if (this.centrumEdit && this.oldCity) {
						await this.$axios.patch(`/region/${this.oldCity}`, {
							centrum: null,
						});
					}

					await this.$axios
						.patch(`/region/${this.city}`, {
							centrum: res.data._id,
						})
						.then((_) => {
							this.$router.push(
								`${this.$t("link")}admin/centrum`
							);
						})
						.catch((err) => console.log(err));
				})
				.catch((err) => console.log(err));
		},
		async editCentrum() {
			const centrum = await this.createCentrumForm();
			const promises = [
				await this.$axios.$patch(
					`/centrum/${this.$route.params.id}`,
					centrum
				),
				await this.$axios.patch(`/region/${this.oldCity}`, {
					centrum: null,
				}),
				await this.$axios.patch(`/region/${this.city}`, {
					centrum: this.$route.params.id,
				}),
			];
			// if (!this.oldCity)
			await Promise.all(promises)
				.then((_) => {
					this.$router.push(`${this.$t("link")}admin/centrum`);
				})
				.catch((err) => {
					this.busy = false;
					this.toast = {
						title: this.$t("allListing.toast.error"),
						variant: "danger",
						visible: true,
						text: err.message,
					};
				});
		},
		async createCentrumForm() {
			this.busy = true;
			const centrum = new FormData(
				document.getElementById("add-centrum")
			);
			const centrumgalleri =
				this.centrumEdit && this.centrumEdit._id
					? [...this.images.centrumgalleri]
					: [];
			for (const key in this.days) {
				// eslint-disable-next-line no-prototype-builtins
				if (this.days.hasOwnProperty(key)) {
					const value = this.days[key];
					const data = JSON.stringify({
						day: key,
						oppettider: value.openTimes,
						times: value.hours,
					});

					centrum.append("oppettider[]", data);
				}
			}

			centrum.append("hemsida", this.hemsida);

			for (const pair of centrum.entries()) {
				if (pair[0] === "centrumgalleri[]") {
					const data = new FormData();
					if (pair[1].name) {
						data.append("centrumgalleri", pair[1]);

						await this.$axios
							.$post("/centrum/images", data)
							.then((res) => centrumgalleri.push(res))
							.catch((err) => console.log(err));
					}
				}
			}

			centrum.append("title", JSON.stringify(this.title));
			centrum.append("centrumtextarea", JSON.stringify(this.centrum));
			centrum.append("routeGuidance", JSON.stringify(this.location));
			centrum.append("centrumgalleri", JSON.stringify(centrumgalleri));

			return centrum;
		},
		assignCentrumEdit() {
			console.log(this.centrumEdit);

			this.location = {
				lng: this.centrumEdit.routeGuidance.coordinates[0] || 0,
				lat: this.centrumEdit.routeGuidance.coordinates[1] || 0,
			};

			this.map.markers.push(this.location);
			this.formattedAddress = this.centrumEdit.routeGuidance.formattedAddress;

			this.hemsida = this.centrumEdit.hemsida;

			this.centrum = {
				en: this.centrumEdit.centrumtextarea.en,
				sv: this.centrumEdit.centrumtextarea.sv,
			};

			this.title = {
				en: this.centrumEdit.title.en,
				sv: this.centrumEdit.title.sv,
			};

			this.images = {
				centrumgalleri: this.centrumEdit.centrumgalleri,
			};

			for (const key in this.centrumEdit.oppettider) {
				if (this.centrumEdit.oppettider.hasOwnProperty(key)) {
					const element = this.centrumEdit.oppettider[key];
					const day = this.days[element.day];
					day.hours = element.times;
					day.openTimes = element.oppettider;
				}
			}
		},
	},
};
</script>
