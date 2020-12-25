<template>
  <!-- Start Feats -->
  <b-container class="d-flex flex-column flex-nowrap my-5">
    <b-row
      no-gutters
      class="d-flex flex-nowrap jsutify-content-center w-100 py-3 tabs"
    >
      <b-col
        v-for="feat in feats"
        :key="feat.name"
        cols="auto"
        class="d-flex flex-grow-1 flex-column justify-content-center mx-2 align-items-center"
      >
        <img
          width="30px"
          :src="require(`~/assets/img/feats/${feat.name}.png`)"
          :alt="feat.name"
        />
        <p v-if="feat.name === 'yta-1'" class="pt-1">
          {{ feat.text }} m<sup>3</sup>
        </p>
        <p v-else class="pt-1">{{ feat.text }}</p>
      </b-col>
    </b-row>
  </b-container>
  <!-- End Feats -->
</template>

<script>
export default {
  props: {
    feats: {
      type: Array,
      default: () => [],
    },
  },
};
</script>

<style></style>
