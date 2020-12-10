<template>
	<div>
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
							<p v-if="$route.params.id" class="font-weight-bold">
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
								:placeholder="$t('addListing.inputs.plats')"
							/>
							<b-form-invalid-feedback :state="locationValidLNG">
								{{ $t("forms.required") }}
							</b-form-invalid-feedback>

							<b-form-valid-feedback :state="locationValidLNG">
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
								:placeholder="$t('addListing.inputs.plats')"
							/>
							<b-form-invalid-feedback :state="locationValidLAT">
								{{ $t("forms.required") }}
							</b-form-invalid-feedback>

							<b-form-valid-feedback :state="locationValidLAT">
								{{ $t("forms.valid") }}
							</b-form-valid-feedback>
						</b-form-group>
					</b-col>
				</b-row>
			</b-card-body>
		</b-card>
		<!-- routeGuidance -->
	</div>
</template>

<script>
export default {
	props: ["routeGuidance"],
	data() {
		return {
			once: 0,
			location: {
				lat: null,
				lng: null,
			},
			map: {
				center: { lat: 59.334591, lng: 18.06324 },
				mapTypeId: "roadmap",
				markers: [],
			},
			formattedAddress: null,
		};
	},
	watch: {
		routeGuidance: {
			handler(val) {
				if (this.once === 0) {
					console.log("location in map is " + val);
					this.location = {
						lng: val && val.coordinates ? val.coordinates[0] : 0,
						lat: val && val.coordinates ? val.coordinates[1] : 0,
					};
					this.map.markers.push(this.location);
					this.formattedAddress = val.formattedAddress;
				}
			},
		},
		location: {
			deep: true,
			handler(val) {
				if (val.lat && val.lng) {
					const co = { lat: Number(val.lat), lng: Number(val.lng) };
					this.$axios
						.post("/places/address", { location: co })
						.then((res) => {
							this.formattedAddress = res.data.formattedAddress;
						})
						.catch((err) => alert(err));
					this.map.center = co;
					this.map.markers = [co];

					this.$emit("locationChanged", this.location);

					this.once++;
				}
			},
		},
	},
	computed: {
		locationValidLNG() {
			return !!this.location.lng;
		},
		locationValidLAT() {
			return !!this.location.lat;
		},
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
	},
};
</script>

<style lang="scss" scoped></style>
