<template>
  <div class="wrapper-page my-5">
    <b-container style="overflow-x: hidden" class="mt-3">
      <h2>BookMark:</h2>
      <!-- start if Listing -->
      <div v-if="!$auth.user || cards.length === 0">
        <p>There are no listings in your bookmark</p>
        <b-button variant="outline-primary" :to="`${$t('link')}lediga-lokaler`">
          Check Listings
        </b-button>
      </div>
      <b-row v-else>
        <!-- Start Listing -->
        <b-col
          v-for="(card, index) in cards"
          :key="String(index)"
          class="my-2"
          cols="12"
          :md="6"
        >
          <listing-card :card="card" />
        </b-col>
      <!-- End Listing -->
      </b-row>
    <!-- End if Listing -->
    </b-container>
  </div>
</template>

<script>
export default {
  name: 'BookMarkedPlaces',
  data () {
    return {
      cards: []
    }
  },
  async created () {
    for (let index = 0; index < this.$auth.user.fav.length; index++) {
      const card = this.$auth.user.fav[index]
      await this.$axios.get(`/places/${card}`)
        .then((res) => {
          this.cards.push(res.data.place)
          console.log(res.data)
        })
        .catch(err => console.log(err))
    }
  }
}
</script>
