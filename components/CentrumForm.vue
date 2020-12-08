<template>
	<div class="content">
		<!-- <loading :state="loadingState" /> -->

		<b-container class="mt-5">
			<h2 v-if="!editCentrum" v-text="$t('adminSidebar.center.add') + ':'" />
			<h2 v-else v-text="$t('adminSidebar.center.edit') + ':'" />
			<b-form id="add-centrum">
				<titleInputsCard
					:EditTitle="centrumEdit ? centrumEdit.title : {}"
					@titleChanged="title = $event"
				/>

				<!-- hemsida -->
				<b-card class="my-5" :title="$t('addListing.inputs.hemsida')">
					<b-card-body>
						<b-form-input v-model="hemsida" placeholder="https://vala.se" />
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

				<textareasCard
					:label="{
						en: `${$t('centrum.textarea')} en:`,
						sv: `${$t('centrum.textarea')} sv:`,
					}"
					:editCentrum="
						centrumEdit ? centrumEdit.centrumtextarea : { en: '', sv: '' }
					"
					@centrumChanged="centrum = $event"
				/>

				<openTimesCard
					:oppettider="centrumEdit ? centrumEdit.oppettider : []"
					@daysChanged="days = $event"
				/>

				<routeGuidanceCard
					:routeGuidance="centrumEdit ? centrumEdit.routeGuidance : []"
					@locationChanged="location = $event"
				/>

				<b-card :title="$t('addListing.inputs.stad')">
					<b-card-body>
						<b-form-select
							key="city-select"
							v-model="city"
							:options="regions"
							size="md"
						/>
					</b-card-body>
				</b-card>

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
import titleInputsCard from "@/components/centrumForm/title";
import centrumGalleriCard from "@/components/centrumForm/centrumGalleri";
import openTimesCard from "@/components/centrumForm/openTimes";
import routeGuidanceCard from "@/components/centrumForm/routeGuidance";
import textareasCard from "@/components/centrumForm/textarea";

export default {
	name: "CentrumForm",
	layout: "admin",
	components: {
		routeGuidanceCard,
		titleInputsCard,
		centrumGalleriCard,
		openTimesCard,
		textareasCard,
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
			days: null,
			location: null,
			toast: {
				title: null,
				variant: null,
				visible: false,
				text: null,
			},
			title: null,

			regions: [],
			city: null,
			oldCity: null,
			hemsida: null,
			centrum: {
				en: null,
				sv: null,
			},
			images: {
				centrumgalleri: null,
			},
		};
	},
	computed: {
		stadValid() {
			return !!this.city;
		},
	},
	watch: {
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
			.catch((err) => {
				this.busy = false;
				this.toast = {
					title: this.$t("allListing.toast.error"),
					variant: "danger",
					visible: true,
					text: err,
				};
			});
	},
	methods: {
		async post() {
			const centrum = await this.createCentrumForm();
			await this.$axios
				.$post("/centrum", centrum)
				.then(async (res) => {
					if (this.centrumEdit && this.oldCity) {
						await this.$axios
							.patch(`/region/${this.oldCity}`, {
								centrum: null,
							})
							.catch((err) => (this.busy = false));
					}

					await this.$axios
						.patch(`/region/${this.city}`, {
							centrum: res.data._id,
						})
						.then((_) => {
							this.$router.push(`${this.$t("link")}admin/centrum`);
						})
						.catch((err) => {
							this.busy = false;
						});
				})
				.catch((err) => {
					this.busy = false;
				});
		},
		async editCentrum() {
			const centrum = await this.createCentrumForm();
			const promises = [
				await this.$axios.$patch(`/centrum/${this.$route.params.id}`, centrum),
				await this.$axios.patch(`/region/${this.city}`, {
					centrum: this.$route.params.id,
				}),
			];

			await Promise.all(promises)
				.then(async (_) => {
					if (this.oldCity) {
						await this.$axios.patch(`/region/${this.oldCity}`, {
							centrum: null,
						});
					}
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
			const centrum = new FormData(document.getElementById("add-centrum"));
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
							.catch((err) => {
								this.busy = false;
								this.toast = {
									title: this.$t("allListing.toast.error"),
									variant: "danger",
									visible: true,
									text: err,
								};
							});
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
			this.location = {
				lng: this.centrumEdit.routeGuidance.coordinates[0] || 0,
				lat: this.centrumEdit.routeGuidance.coordinates[1] || 0,
			};
			this.images = {
				centrumgalleri: this.centrumEdit.centrumgalleri,
			};
			this.hemsida = this.centrumEdit.hemsida;

			this.centrum = {
				en: this.centrumEdit.centrumtextarea.en,
				sv: this.centrumEdit.centrumtextarea.sv,
			};
		},
	},
};
</script>
