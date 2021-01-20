<template>
  <div class="content">
    <b-container>
      <h2>Personal Details:</h2>
      <b-row>
        <b-col cols="12" md="3">
          <b>Name: {{ user.name }}</b>
        </b-col>
        <b-col cols="12" md="3">
          <b>Email: {{ user.email }}</b>
        </b-col>
        <b-col cols="12" md="3">
          <b>Joined in: {{ user.createdAt }}</b>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
export default {
  layout: "admin",
  name: "UserProfile",
  data() {
    return {
      user: {
        name: "",
        email: "",
        createdAt: "",
      },
    };
  },
  async mounted() {
    await this.$axios
      .$get("/users/me")
      .then((res) => {
        this.user = res.data;
      })
      .catch((err) => {
        console.log(err);
      });
  },
};
</script>

<style scoped></style>
