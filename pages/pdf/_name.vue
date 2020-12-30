<template>
  <div class="container" style="height: 100vh">
    <object
      :data="planritning"
      type="application/pdf"
      width="100%"
      height="100%"
    ></object>
  </div>
</template>

<script>
export default {
  data() {
    return {
      planritning: null,
    };
  },
  async created() {
    await this.$axios
      .get(`/files/${this.$route.params.name}`)
      .then((res) => {
        this.planritning = res.data;
      })
      .catch((err) => console.log(err));
  },
};
</script>

<style></style>
