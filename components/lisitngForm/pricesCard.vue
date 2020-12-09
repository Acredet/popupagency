<template>
	<!-- Start Prices -->
	<b-card title="Prices:">
		<b-card-body class="p-1">
			<b-row no-gutters>
				<b-col
					v-for="(card, index) in renderInputs"
					:key="index"
					cols="12"
					md="auto"
				>
					<div class="m-1 responsiveCol">
						<label class="h5" for="card.title">{{ card.title }}</label>
						<b-form-checkbox
							v-if="!card.noTemp"
							v-model="price[card.model].temp"
							class="mb-2"
							@change="setPrioteradPrice(card.model)"
						>
							{{ $t("addListing.inputs.price.priority") }}
						</b-form-checkbox>
						<b-form-input
							v-model="price[card.model].val"
							type="number"
							:placeholder="card.placeholder"
						/>
					</div>
				</b-col>
			</b-row>
		</b-card-body>
	</b-card>
	<!-- End Prices -->
</template>

<script>
export default {
	props: {
		oldPrices: {
			defalut: {
				prioteradpris: null,
				prisperdag: null,
				prisperhelg: null,
				prisperlanghelg: null,
				prispermanad: null,
				prispervecka: null,
			},
		},
	},
	methods: {
		setPrioteradPrice(card) {
			for (const key in this.price) {
				const obj = this.price[key];
				if (key !== card) {
					obj.temp = false;
				} else {
					obj.temp = true;
				}
			}
		},
	},
	data() {
		return {
			prioteradpris: {
				period: "",
				val: "",
			},
			price: {
				day: {
					val: null,
					temp: false,
				},
				helg: {
					val: null,
					temp: false,
				},
				langheig: {
					val: null,
					temp: false,
				},
				veckopris: {
					val: null,
					temp: false,
				},
				manad: {
					val: null,
					temp: false,
				},
				prioteradpris: {
					val: null,
				},
			},
			renderInputs: [
				{
					title: this.$t("addListing.inputs.price.dag"),
					placeholder: this.$t("addListing.inputs.price.dag"),
					model: "day",
				},
				{
					title: this.$t("addListing.inputs.price.helg"),
					placeholder: this.$t("addListing.inputs.price.helg"),
					model: "helg",
				},
				{
					title: this.$t("addListing.inputs.price.långhelg"),
					placeholder: this.$t("addListing.inputs.price.långhelg"),
					model: "langheig",
				},
				{
					title: this.$t("addListing.inputs.price.vecka"),
					placeholder: this.$t("addListing.inputs.price.vecka"),
					model: "veckopris",
				},
				{
					title: this.$t("addListing.inputs.price.manad"),
					placeholder: this.$t("addListing.inputs.price.manad"),
					model: "manad",
				},
			],
		};
	},
	watch: {
		oldPrices: {
			deep: true,
			immediate: true,
			handler(newVal) {
				if (newVal.prioteradpris !== null) {
					this.price.day.val = newVal.prisperdag;
					this.price.helg.val = newVal.prisperhelg;
					this.price.langheig.val = newVal.prisperlanghelg;
					this.price.manad.val = newVal.prispermanad;
					this.price.veckopris.val = newVal.prispervecka;

					this.prioteradpris = newVal.prioteradpris;
					if (
						newVal &&
						newVal.prioteradpris &&
						newVal.prioteradpris.period &&
						this.price[newVal.prioteradpris.period]
					) {
						this.price[newVal.prioteradpris.period].temp = true;
					}
					// this.price.prioteradpris.val = prioteradpris.val;
				}
			},
		},
		price: {
			immediate: true,
			deep: true,
			handler(newVal) {
				this.$emit("pricePeriodsChanged", newVal);
			},
		},
	},
};
</script>
