<template>
	<!-- centrumgalleri -->
	<b-card class="my-5" :title="details.title">
		<b-card-body>
			<client-only>
				<our-uploader
					:name="details.name"
					:show-btn="false"
					:more="true"
					:old-images="oldImages"
					:max-number-of-inputs="999"
					:max-file-size="64"
				>
					<template v-slot:old-Image>
						<b-row v-if="oldImages.length > 0" class="mb-1">
							<b-col
								v-for="(img, index) in oldImages"
								:key="index"
								class="d-flex mb-1"
								cols="12"
								sm="6"
							>
								<div class="position-relative">
									<b-btn
										type="button"
										variant="danger"
										class="delete-btn"
										aria-label="Close"
										@click="
											deleteImageFromExistingArray(index)
										"
									>
										<span aria-hidden="true">&times;</span>
									</b-btn>
									<b-img
										class="mx-2"
										style="height: 150px"
										:src="`https://popup.dk.se/_nuxt/img/${img}`"
									/>
								</div>
							</b-col>
						</b-row>
					</template>
				</our-uploader>
			</client-only>
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
	data() {
		return {
			images: [],
		};
	},
	watch: {
		oldImages: {
			immediate: true,
			deep: true,
			handler(newValue) {
				this.images = newValue;
			},
		},
	},
	methods: {
		deleteImageFromExistingArray(index, name) {
			this.images.splice(index, 1);
		},
	},
};
</script>

<style lang="scss" scoped></style>
