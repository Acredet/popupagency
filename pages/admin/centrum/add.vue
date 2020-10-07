<template>
  <div>
    <CentrumForm />
  </div>
</template>

<script>
import CentrumForm from '@/components/CentrumForm'
export default {
  name: 'AddCentrum',
  layout: 'admin',
  components: {
    CentrumForm
  },
  created () {
    if (!this.$auth.loggedIn || !['manager', 'admin'].includes(this.$auth.user.role)) {
      this.$router.push('/error')
    }
  }
}
</script>
