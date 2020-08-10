<template>
  <div class="wrapper">
    <Nuxt />
  </div>
</template>

<script>
import { AdminPanelDependancies } from '@/mixins/AdminPanelDependancies'

export default {
  name: 'AuthLayout',
  mixins: [AdminPanelDependancies]
}
</script>

<style scoped>
.wrapper {
  overflow-x: hidden;
}
</style>
