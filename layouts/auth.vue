<template>
  <div class="wrapper">
    <Nuxt />
  </div>
</template>

<script>
export default {
  name: "AuthLayout",
  head() {
    return {
      link: [
        {
          href: "/css/admin-styles.css",
          rel: "stylesheet",
          type: "text/css",
          body: true,
        },
      ],
    };
  },
};
</script>

<style scoped>
.wrapper {
  overflow-x: hidden;
}
</style>
