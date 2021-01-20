<template>
  <!-- Start similar listings -->
  <section class="my-5">
    <h6 class="text-secondary mb-5">
      {{ $t("singleListing.intersedIn") }}
    </h6>

    <p v-if="similar.length === 0" class="text-secondary text-center">
      {{ $t("singleListing.noSimilar") }}
    </p>
    <b-row v-else>
      <b-col
        v-for="(card, index) in similar"
        :key="String(index)"
        class="my-2"
        cols="12"
        md="6"
        lg="4"
      >
        <listing-card
          :place="card"
          :layout="'list'"
          @notAuthBookmark="modalShow = true"
        />
      </b-col>
    </b-row>
  </section>
  <!-- End similar listings -->
</template>

<script>
export default {
  props: ["similar"],
};
</script>

<style></style>
