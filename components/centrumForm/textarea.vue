<template>
	<div>
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
	</div>
</template>

<script>
let VueEditor;
if (process.browser) {
	VueEditor = require("vue2-editor").VueEditor;
}
export default {
	components: {
		VueEditor,
	},
	props: {
		editCentrum: {
			type: Object,
			default: () => {
				return { en: null, sv: null };
			},
		},
	},
	watch: {
		editCentrum: {
			immediate: true,
			deep: true,
			handler(newValue) {
				this.centrum = newValue;
			},
		},
		centrum: {
			immediate: true,
			deep: true,
			handler(newValue) {
				this.$emit("centrumChanged", newValue);
			},
		},
	},
	data() {
		return {
			centrum: {
				en: "",
				sv: "",
			},
		};
	},
};
</script>

<style lang="scss" scoped></style>
