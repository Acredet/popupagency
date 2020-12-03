<template>
	<!-- centrumtextarea -->
	<b-card class="my-5">
		<b-card-body>
			<h3>{{ label.en }}</h3>
			<client-only>
				<VueEditor v-model="textareaVal.en" />
			</client-only>
			<hr />
			<h3>{{ label.sv }}</h3>
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
		label: {
			type: Object,
			defalut: () => {
				return { en: null, sv: null };
			},
		},
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
