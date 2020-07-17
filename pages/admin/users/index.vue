<template>
  <div class="content">
    <b-table
      :items="items"
      :fields="fields"
      :sort-by.sync="sortBy"
      :sort-desc.sync="sortDesc"
      responsive="sm"
      show-empty
    >
      <template v-slot:cell(actions)="data">
        <b-dropdown variant="light">
          <template v-slot:button-content>
            <b>Actions</b>
          </template>
          <b-dropdown-item @click="editUser(data.item)">
            Edit
          </b-dropdown-item>
          <b-dropdown-item @click="deleteUser(data.item)">
            Delete
          </b-dropdown-item>
        </b-dropdown>
      </template>
    </b-table>

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
      sortBy: 'name',
      sortDesc: false,
      fields: [
        { key: 'name', sortable: true },
        { key: 'email', sortable: true },
        { key: 'actions' }
      ],
      items: null
    }
  },
  async mounted () {
    await this.$axios.$get('/users/all')
      .then((res) => {
        this.items = res.data
      })
      .catch(err => console.log(err))
  }
}
</script>

<style>

</style>
