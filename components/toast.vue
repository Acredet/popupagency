<template>
  <b-toast
    :title="toast.title"
    toaster="b-toaster-bottom-center"
    :solid="true"
    :variant="toast.variant"
    :visible="toast.visible"
  >
    <p>{{ toast.text }}</p>
  </b-toast>
</template>

<script>
export default {
  props: {
    toast: {
      type: Object,
      default () {
        return {
          title: null,
          variant: null,
          visible: false,
          text: null
        }
      }
    }
  }
}
</script>

<style scoped>

</style>
