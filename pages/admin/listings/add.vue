<template>
  <div>
    <listing-form />
  </div>
</template>

<script>
export default {
  name: 'AddListing',
  middleware: 'authenticated',
  layout: 'admin'
}
</script>
