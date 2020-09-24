<template>
  <div id="wrapper">
    <admin-header />
    <admin-sidebar @initAppPlease="initApp" />

    <div class="my-3 content-page">
      <transition name="fade">
        <Nuxt />
      </transition>
    </div>
    <!-- <admin-footer /> -->
  </div>
</template>

<script>
import adminHeader from '@/components/admin/admin-Header'
import adminSidebar from '@/components/admin/admin-Sidebar.vue'
import { AdminPanelDependancies } from '@/mixins/AdminPanelDependancies'

export default {
  // middleware: 'authenticated',
  name: 'AdminLayout',
  components: {
    adminHeader,
    // adminFooter,
    adminSidebar
  },
  mixins: [AdminPanelDependancies],
  created () {
    if (!this.$auth.loggedIn) {
      this.$router.push('/login')
    }
  }
}
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
