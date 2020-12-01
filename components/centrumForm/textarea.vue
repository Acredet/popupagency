<template>
	<!-- centrumtextarea -->
	<b-card class="my-5">
		<b-card-body>
			<h3>{{ $t("centrum.textarea") }} en:</h3>
			<client-only>
				<VueEditor v-model="textareaVal.en" />
			</client-only>
			<hr />
			<h3>{{ $t("centrum.textarea") }} sw:</h3>
			<client-only>
				<VueEditor v-model="textareaVal.sv" />
			</client-only>
		</b-card-body>
	</b-card>
	<!-- centrumtextarea -->
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
				if (!!newValue.en && !!newValue.sv) {
					this.textareaVal = newValue;
				}
			},
		},
		textareaVal: {
			deep: true,
			handler(newValue) {
				console.log(newValue);
				this.$emit("centrumChanged", newValue);
			},
		},
	},
	data() {
		return {
			textareaVal: {
				en: "",
				sv: "",
			},
		};
	},
};
</script>

<style lang="scss" scoped></style>
