<template>
  <div v-if="loading" class="loading">
    <img src="/images/logo-white.svg" alt style="height: 100px">
    <b-spinner class="mt-3 mr-1" variant="light" type="grow" label="Spinning" />
  </div>
</template>

<script>
export default {
  props: {
    state: {
      type: Boolean,
      default: () => true
    }
  },
  data: () => ({
    loading: false
  }),
  watch: {
    state: {
      immediate: true,
      handler (val) {
        this.loading = val
      }
    }
  }
}
</script>

<style scoped>
.loading {
  background: var(--black);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  z-index: 999999999999999999999999999999;
}
</style>
