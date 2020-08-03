<template>
  <div>
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

</style>
