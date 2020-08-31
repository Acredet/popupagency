<template>
  <div id="page-container">
    <main-navbar />
    <div id="content-wrap" class="pt-5 pb-3 my-2">
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
