<template>
  <div class="content">
    <h2>All Listings:</h2>
    <b-table
      :items="items"
      :fields="fields"
      :sort-by.sync="sortBy"
      :sort-desc.sync="sortDesc"
      responsive="sm"
      show-empty
    />

    <div>
      Sorting By: <b>{{ sortBy }}</b>, Sort Direction:
      <b>{{ sortDesc ? 'Descending' : 'Ascending' }}</b>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Listings',
  layout: 'admin',
  data () {
    return {
      sortBy: 'age',
      sortDesc: false,
      fields: [
        { key: 'location', sortable: true },
        { key: 'expiry', sortable: true },
        { key: 'stad', sortable: true },
        { key: 'Epost', sortable: false }
      ],
      items: null
    }
  },
  async mounted () {
    await this.$axios.$get('/places')
      .then((res) => {
        this.items = res.data
        console.log(res)
      })
      .catch(err => console.log(err))
  }
}
</script>

<style>

</style>
