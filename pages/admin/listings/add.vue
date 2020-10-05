<template>
  <div>
    <listing-form />
  </div>
</template>

<script>
export default {
  name: 'AddListing',
  layout: 'admin',
  created () {
    if (!this.$auth.loggedIn || !['manager', 'admin', 'owner'].includes(this.$auth.user.role)) {
      this.$router.push('/error')
    }
  }
}
</script>
