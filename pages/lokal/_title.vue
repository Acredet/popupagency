<template>
  <div>
    Hey
  </div>
</template>

<script>
export default {
  async mounted () {
    await this.$axios.$get(`/places/${this.$route.params.title}`)
      .then(res => console.log(res))
      .catch(res => console.log(res))
  }
}
</script>

<style lang="scss" scoped>

</style>
