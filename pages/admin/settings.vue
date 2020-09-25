<template>
  <div class="content">
    <h1>Under construction</h1>
  </div>
</template>

<script>
export default {
  name: 'AddUser',
  layout: 'admin',
  created () {
    if (!this.$auth.loggedIn || !['admin'].includes(this.$auth.user.role)) {
      this.$router.push('/error')
    }
  }
}
</script>

<style scoped>

</style>
