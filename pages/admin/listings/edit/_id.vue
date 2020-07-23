<template>
  <div>
    <listing-form />
  </div>
</template>

<script>
export default {
  name: 'EditListing',
  layout: 'admin',
  async mounted () {
    await this.$axios.$get(`/places/${this.$route.params.id}`)
      .then((res) => {
        console.log(res)
      })
      .catch(err => console.log(err))
  }
}
</script>
