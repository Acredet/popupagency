<template>
	<!-- Start title -->
	<b-card :title="$t('addListing.inputs.title.label')">
		<b-card-body>
			<b-form-group
				id="title-sv-group"
				label="Swedish:"
				label-for="title-sv"
			>
				<b-form-input
					id="title-sv"
					v-model="title.sv"
					required
					autocomplete="off"
					:state="titleValidSv"
					:placeholder="$t('addListing.inputs.title.holder')"
				/>
				<b-form-invalid-feedback :state="titleValidSv">
					{{ $t("forms.required") }}
				</b-form-invalid-feedback>

				<b-form-valid-feedback :state="titleValidSv">
					{{ $t("forms.valid") }}
				</b-form-valid-feedback>
			</b-form-group>

			<b-form-group
				id="title-en-group"
				label="English:"
				label-for="title-en"
			>
				<b-form-input
					id="title-en"
					v-model="title.en"
					required
					autocomplete="off"
					:state="titleValidEn"
					:placeholder="$t('addListing.inputs.title.holder')"
				/>
				<b-form-invalid-feedback :state="titleValidEn">
					{{ $t("forms.required") }}
				</b-form-invalid-feedback>

				<b-form-valid-feedback :state="titleValidEn">
					{{ $t("forms.valid") }}
				</b-form-valid-feedback>
			</b-form-group>
		</b-card-body>
	</b-card>
	<!-- End title -->
</template>

<script>
export default {
	props: {
		EditTitle: {
			type: Object,
			default: () => {
				return { en: null, sv: null };
			},
		},
	},
	data() {
		return {
			once: 0,
			title: {
				en: null,
				sv: null,
			},
		};
	},
	watch: {
		title: {
			deep: true,
			handler(newValue) {
				this.$emit("titleChanged", newValue);
			},
		},
		EditTitle: {
			immediate: true,
			deep: true,
			handler(newValue) {
				if (!!newValue.en && !!newValue.sv && this.once === 0) {
					this.title = newValue;
					this.once++;
				}
			},
		},
	},
	computed: {
		titleValidEn() {
			return !!this.title.en;
		},
		titleValidSv() {
			return !!this.title.sv;
		},
	},
};
</script>
