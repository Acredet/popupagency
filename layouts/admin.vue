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
/* eslint-disable no-sequences */
import adminHeader from '@/components/admin/admin-Header'
// import adminFooter from '@/components/admin/adminFooter'
import adminSidebar from '@/components/admin/admin-Sidebar.vue'
import { AdminPanelDependancies } from '@/mixins/AdminPanelDependancies'

export default {
  name: 'AdminLayout',
  components: {
    adminHeader,
    // adminFooter,
    adminSidebar
  },
  mixins: [AdminPanelDependancies]

}
</script>

<style scoped>
h1,h2,h3,h4,h5,h6 {
  font-weight: bold;
}
</style>
