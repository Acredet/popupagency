<template>
  <div>
    <listing-form v-if="listing" :listing="listing" />
  </div>
</template>

<script>
export default {
  name: 'EditListing',
  layout: 'admin',
  data () {
    return {
      listing: null
    }
  },
  created () {
    if (!this.$auth.loggedIn || !['manager', 'admin'].includes(this.$auth.user.role)) {
      this.$router.push('/error')
    }
  },
  async mounted () {
    await this.$axios.$get(`/places/${this.$route.params.id}`)
      .then((res) => {
        this.listing = res.place
      })
      .catch(err => console.log(err))
  }
}
</script>
