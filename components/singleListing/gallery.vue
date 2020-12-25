<template>
  <section itemscope itemtype="http://schema.org/ImageGallery">
    <h6 class="text-secondary">{{ $t("singleListing.info.gallery") }}</h6>
    <b-row>
      <!--  First 4 pics -->
      <b-col
        v-for="(src, index) in images.slice(0, 4)"
        :key="src"
        cols="12"
        :md="index <= 1 ? 6 : 4"
        class="mb-3 position-relative"
        @click="showV(gallryName, index)"
      >
        <div class="gallery-images" style="height: 320px">
          <img width="100%" :src="src" style="height: 320px" />
        </div>
      </b-col>
      <!--  First 4 pics -->

      <!-- show last One -->
      <b-col
        cols="12"
        md="4"
        class="mb-3 position-relative"
        @click="showV(gallryName, 4)"
      >
        <div class="showMore" style="height: 320px">
          <div class="showMore--overlay">
            <p>See All {{ images.length }} images</p>
          </div>
          <img width="100%" :src="images[4]" style="height: 320px" />
        </div>
      </b-col>
      <!-- show last One -->

      <!-- If not provided -->
      <b-col v-if="images.length === 0" cols="12">
        <p class="text-center text-secondary">
          {{ $t("notProvided") }}
        </p>
      </b-col>
      <!-- If not provided -->
    </b-row>

    <viewer
      ref="viewer2"
      :images="images"
      class="viewer"
      @inited="initedV(gallryName, $event)"
    >
      <img
        v-for="src in images"
        :key="`${src}-imaged`"
        :src="src"
        class="d-none"
      />
    </viewer>
  </section>
</template>

<script>
import "viewerjs/dist/viewer.css";
import Viewer from "v-viewer";
import Vue from "vue";
Vue.use(Viewer);
export default {
  props: ["images", "gallryName"],
  methods: {
    initedV(name, viewer) {
      this.$viewer[name] = viewer;
    },
    showV(name, index) {
      this.$viewer[name].view(index);
    },
  },
  created() {
    this.$viewer = {};
  },
};
</script>

<style scoped>
.gallery-images {
  cursor: pointer;
}

.showMore {
  position: relative;
}

.showMore .showMore--overlay {
  cursor: pointer;
  position: absolute;
  top: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  z-index: 1;

  text-align: center;
  color: white;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
