<template>
  <div v-if="thereIsUser" id="wrapper">
    <admin-header />
    <admin-sidebar />

    <div class="my-3 content-page">
      <nuxt />
    </div>
    <!-- <admin-footer /> -->
  </div>
</template>

<script>
import adminHeader from "@/components/admin/admin-Header";
import adminSidebar from "@/components/admin/admin-Sidebar.vue";
import { AdminPanelDependancies } from "@/mixins/AdminPanelDependancies";

export default {
  name: "AdminLayout",
  middleware: ["authAdmin"],
  components: {
    adminHeader,
    // adminFooter,
    adminSidebar,
  },
  mixins: [AdminPanelDependancies],
  data() {
    return {
      thereIsUser: false,
    };
  },
  mounted() {
    if (!this.$auth.loggedIn) {
      this.$router.push("/login");
    } else {
      this.thereIsUser = true;

      if (window.innerWidth < 1025) {
        document.body.classList.add("enlarged");
      } else {
        document.body.classList.remove("enlarged");
      }
    }
  },
};
</script>

<style scoped>
h1,
h2,
h3,
h4,
h5,
h6 {
  font-weight: bold;
}
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
</style>
