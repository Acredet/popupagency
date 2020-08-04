<template>
  <div id="wrapper">
    <admin-header />
    <admin-sidebar />

    <div class="my-3 content-page">
      <Nuxt />
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
      this.$router.push('/admin/login')
    }
  }

}
</script>

<style scoped>
h1,h2,h3,h4,h5,h6 {
  font-weight: bold;
}
</style>
