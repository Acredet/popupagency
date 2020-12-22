<template>
	<div>
		<b-row v-if="oldImages && oldImages.length > 0">
			<b-col v-for="(img, index) in oldImages" :key="img" cols="12" md="2">
				<b-button-close
					size="sm"
					variant="danger"
					@click="deleteOldImage($event, index)"
				/>
				<img
					width="100%"
					:src="`https://popup.dk.se/_nuxt/img/${img}`"
					alt=""
				/>
			</b-col>
		</b-row>
		<FormulateInput
			type="image"
			:name="name"
			label="Select an image to upload"
			help="Select a png, jpg or gif to upload."
			validation="mime:image/jpeg,image/png,image/gif,image/svg+xml,image/x-icon"
			multiple
		/>
	</div>
</template>

<script>
export default {
	name: "ImageUploader",
	props: {
		maxFileSize: {
			type: Number,
			default: () => 64,
		},
		name: {
			type: String,
			default: () => "input",
		},
		oldImages: {
			type: Array,
			default: () => [],
		},
	},
	methods: {
		deleteOldImage(e, index) {
			e.target.parentElement.style.display = "none";
			this.$emit("deleteOldImage", { index, name: this.name });
		},
	},
};
</script>

<style scoped></style>
