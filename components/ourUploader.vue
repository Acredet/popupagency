<template>
  <div>
    <b-row v-if="fetchedOldImages && fetchedOldImages.length > 0">
      <b-col
        v-for="(img, index) in fetchedOldImages"
        :key="`img-${index}`"
        cols="12"
        md="2"
      >
        <b-button-close
          size="sm"
          variant="danger"
          @click="deleteOldImage($event, index)"
        />
        <img width="100%" :src="img" alt="" />
      </b-col>
    </b-row>
    <FormulateInput
      type="image"
      :name="name"
      accept="image/*"
      label="Select an image to upload"
      help="Select a png, jpg or gif to upload."
      validation="mime:image/jpeg,image/png,image/gif,image/svg+xml,image/x-icon"
      multiple
    />
  </div>
</template>

<script>
import { getImages } from "@/mixins/utils/getImage";
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
  mixins: [getImages],
  data() {
    return {
      fetchedOldImages: [],
    };
  },
  watch: {
    oldImages: {
      deep: true,
      immediate: true,
      handler: async function (val, oldVal) {
        if (val && val.length > 0) {
          if (!oldVal || val.length > oldVal.length) {
            for (let i = 0; i < val.length; i++) {
              const img = val[i];
              await this.getImage(img)
                .then((res) => this.fetchedOldImages.push(res))
                .catch((err) => console.log(err));
            }
          }
        }
      },
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
