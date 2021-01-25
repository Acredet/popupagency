<template>
  <div class="wrapper-page my-5">
    <b-container style="overflow-x: hidden" class="mt-3">
      <h2 class="mb-3">{{ $t("bookmark.title") }}:</h2>
      <!-- start if Listing -->
      <div v-if="!$auth.user || noCards">
        <p>{{ $t("bookmark.empty") }}</p>
        <b-button variant="outline-primary" :to="`${$t('link')}lediga-lokaler`">
          {{ $t("bookmark.checkListings") }}
        </b-button>
      </div>

      <div>
        <b-row v-if="loading">
          <b-col
            v-for="card in 3"
            :key="String(card)"
            class="my-2"
            cols="12"
            :md="6"
          >
            <b-skeleton-img />
          </b-col>
        </b-row>

        <b-row v-else>
          <!-- Start Listing -->

          <b-col
            v-for="(card, index) in cards"
            :key="String(index)"
            class="my-2"
            cols="12"
            :md="6"
          >
            <listing-card :place="card" />
          </b-col>
          <!-- End Listing -->
        </b-row>
      </div>
    </b-container>
  </div>
</template>

<script>
export default {
  name: "BookMarkedPlaces",
  data() {
    return {
      cards: [],
      noCards: false,
      loading: true,
    };
  },
  async created() {
    if (this.$auth.user.fav.length > 0) {
      for (let index = 0; index < this.$auth.user.fav.length; index++) {
        const card = this.$auth.user.fav[index];
        await this.$axios
          .get(`/places/${card}`)
          .then((res) => {
            this.cards.push(res.data.place);
            this.loading = false;
          })
          .catch((err) => console.log(err));
      }
    } else {
      this.noCards = true;
    }
  },
};
</script>
