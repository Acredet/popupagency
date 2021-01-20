<template>
  <div>
    <listing-form v-if="listing" :listing="listing" />
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  name: "EditListing",
  layout: "admin",
  data() {
    return {
      listing: null,
      fromdsad: null,
    };
  },
  computed: {
    ...mapGetters({
      getOneListings: "listing/getOneListings",
    }),
  },
  async mounted() {
    // this.fromdsad = this.getOneListings(this.$route.params.id)
    await this.$axios
      .$get(`/places/${this.$route.params.id}`)
      .then((res) => {
        this.listing = res.place;
      })
      .catch((err) => console.log(err));
  },
};
</script>
