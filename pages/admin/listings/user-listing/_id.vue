<template>
  <div class="content">
    <b-container>
      <h2>{{ $t('userListings.myPlaces') }}</h2>

      <!-- start if Listing -->
      <b-row>
        <b-col v-if="!items || items.length === 0">
          <p>{{ $t('userListings.noListings') }}</p>
        </b-col>
        <!-- Start Listing -->
        <b-col
          v-for="(card, index) in items"
          v-else
          :key="String(index)"
          class="my-2"
          cols="12"
          :md="6"
        >
          <listing-card :place="card" />
        </b-col>
        <!-- End Listing -->
      </b-row>
      <!-- End if Listing -->

      <b-toast
        :title="toast.title"
        toaster="b-toaster-bottom-full"
        :solid="true"
        :variant="toast.variant"
        :visible="toast.visible"
      >
        <p>{{ toast.text }}</p>
      </b-toast>
    </b-container>
  </div>
</template>

<script>
export default {
  name: 'UsersAdmins',
  layout: 'admin',
  data () {
    return {
      toast: {
        title: null,
        variant: null,
        visible: false,
        text: null
      },
      items: null
    }
  },
  mounted () {
    this.getListings()
  },
  methods: {
    async getListings () {
      await this.$axios.$get(`/places/user/${this.$route.params.id}`)
        .then((res) => {
          this.items = res
          this.loading = false
          console.log(res)
        })
        .catch(err => console.log(err))
    },
    async deleteListing () {
      await this.$axios.$delete(`/places/${this.editForm._id}`)
        .then((res) => {
          console.log(res)
          this.getListings()
          this.toast = {
            title: this.$t('allListing.toast.delete'),
            variant: 'success',
            visible: true,
            text: `${this.$t('allListing.toast.justDeleted')} ${this.editForm.name} from Listings.`
          }
          this.editForm = {}
        })
        .catch((err) => {
          this.toast = {
            title: this.$t('allListing.toast.error'),
            variant: 'danger',
            visible: true,
            text: err.message
          }
        })
    }
  }
}
</script>
