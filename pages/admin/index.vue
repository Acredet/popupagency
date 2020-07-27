<template>
  <div class="content">
    <h1>Under construction</h1>
    <b-btn @click="test" v-text="'See nice message'" />
  </div>
</template>

<script>
export default {
  name: 'AddUser',
  layout: 'admin',
  methods: {
    test () {
      alert('Hey handsome 😉, I\'m working 👌')
    }
  }
}
</script>

<style>

</style>
