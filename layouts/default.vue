<template>
  <div class="body-wrapper">
    <main-navbar />
    <div class="page-content pt-5 mt-2">
      <Nuxt />
    </div>
    <main-footer />
  </div>
</template>

<script>
export default {
  name: "DefaultLayout",
};
</script>

<style scoped>
.page-content {
  flex-grow: 1;
}
</style>
