<template>
	<!-- centrumgalleri -->
	<b-card class="my-5" :title="details.title">
		<b-card-body>
			<our-uploader
				:name="details.name"
				:old-images="oldImages"
				@deleteOldImage="hey($event)"
			/>
		</b-card-body>
		<template v-slot:footer>
			<em>{{ $t("maxFileSize") }}</em>
		</template>
	</b-card>
	<!-- centrumgalleri -->
</template>

<script>
export default {
	props: {
		details: {
			type: Object,
			default: () => {
				return { title: "", name: "" };
			},
		},
		oldImages: {
			type: Array,
			default: () => [],
		},
	},
	methods: {
		hey(data) {
			this.$emit("delete-images-from-gallery", data);
		},
	},
};
</script>
