<template>
  <div id="page-container">
    <main-navbar />
    <div id="content-wrap" class="my-5 pt-4">
      <Nuxt />
    </div>
    <main-footer />
  </div>
</template>

<script>
export default {
  mounted () {
    this.onResize()
    window.addEventListener('resize', this.onResize)
  },
  beforeDestroy () {
    window.removeEventListener('resize', this.onResize)
  },
  methods: {
    onResize (e) {
      const footer = document.getElementById('footer')
      const wrapper = document.getElementById('content-wrap')
      wrapper.style.paddingBottom = `${footer.offsetHeight}px`
    }
  }
}
</script>

<style scoped>

</style>
