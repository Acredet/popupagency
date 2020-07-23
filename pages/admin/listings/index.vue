<template>
  <div class="content">
    <b-modal id="delete-modal" centered title="Delete Listing">
      <p class="my-4">
        Are you sure you wanna delete {{ editForm._id }}?
      </p>

      <template v-slot:modal-footer="{ ok, cancel }">
        <b-btn variant="danger" @click="deleteListing(); ok()">
          Delete
        </b-btn>
        <b-btn variant="primary" @click="cancel(); editForm = {}">
          Close
        </b-btn>
      </template>
    </b-modal>
    <b-container>
      <h2>All Listings:</h2>
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
            <b-dropdown-item :to="`/admin/listings/edit/${data.item._id}`">
              Edit
            </b-dropdown-item>
            <b-dropdown-item v-b-modal.delete-modal @click="editForm = data.item">
              Delete
            </b-dropdown-item>
          </b-dropdown>
        </template>
      </b-table>

      <div>
        Sorting By: <b>{{ sortBy }}</b>, Sort Direction:
        <b>{{ sortDesc ? 'Descending' : 'Ascending' }}</b>
      </div>
      <toast :toast="toast" />
    </b-container>
  </div>
</template>

<script>
export default {
  name: 'Listings',
  layout: 'admin',
  data () {
    return {
      toast: {
        title: null,
        variant: null,
        visible: false,
        text: null
      },
      sortBy: 'age',
      sortDesc: false,
      editForm: {},
      fields: [
        { key: 'title', sortable: true },
        { key: 'expiry', sortable: true },
        { key: 'stad', sortable: true },
        { key: 'actions' }
      ],
      items: null
    }
  },
  mounted () {
    this.getListings()
  },
  methods: {
    async getListings () {
      await this.$axios.$get('/places')
        .then((res) => {
          this.items = res.data
          console.log(res)
        })
        .catch(err => console.log(err))
    },
    async deleteListing () {
      await this.$axios.$delete(`/places/${this.editForm._id}`)
        .then((res) => {
          console.log(res)
          this.getListings()
          this.toast = {
            title: 'Listing deleted successfully',
            variant: 'success',
            visible: true,
            text: `You just deleted ${this.editForm.name} from Listings.`
          }
          this.editForm = {}
        })
        .catch((err) => {
          this.toast = {
            title: 'There is something wrong',
            variant: 'danger',
            visible: true,
            text: err.message
          }
        })
    }
  }
}
</script>

<style>

</style>
