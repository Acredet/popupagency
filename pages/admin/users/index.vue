<template>
  <div class="content">
    <b-modal id="edit-modal" centered title="Edit User" @close="Object.assign(user, {})">
      <b-form>
        <b-form-group id="name-group" label="Name:" label-for="name">
          <b-form-input id="name" v-model="user.name" autocomplete="off" required placeholder="Enter name" />
        </b-form-group>

        <b-form-group
          id="Email-group"
          label="Email:"
          label-for="email"
          description="We'll respect your inbox."
        >
          <b-form-input
            id="email"
            v-model="user.email"
            type="email"
            required
            placeholder="Enter email"
          />
        </b-form-group>
      </b-form>

      <template v-slot:modal-footer="{ ok, cancel }">
        <b-btn variant="primary" @click="editUser(); ok()">
          Edit
        </b-btn>
        <b-btn variant="danger" @click="cancel(); Object.assign(user, {})">
          Close
        </b-btn>
      </template>
    </b-modal>

    <b-modal id="delete-modal" centered title="Delete User">
      <p class="my-4">
        Are you sure you wanna delete {{ user.name }}?
      </p>

      <template v-slot:modal-footer="{ ok, cancel }">
        <b-btn variant="danger" @click="deleteUser(); ok()">
          Delete
        </b-btn>
        <b-btn variant="primary" @click="cancel(); Object.assign(user, {})">
          Close
        </b-btn>
      </template>
    </b-modal>

    <b-container>
      <h2>All Users:</h2>

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
            <b-dropdown-item v-b-modal.edit-modal @click="Object.assign(user, data.item)">
              Edit
            </b-dropdown-item>
            <b-dropdown-item v-b-modal.delete-modal @click="Object.assign(user, data.item)">
              Delete
            </b-dropdown-item>
          </b-dropdown>
        </template>
      </b-table>

      <div>
        Sorting By: <b>{{ sortBy }}</b>, Sort Direction:
        <b>{{ sortDesc ? 'Descending' : 'Ascending' }}</b>
      </div>

      <b-toast
        :title="toast.title"
        toaster="b-toaster-bottom-full"
        :solid="true"
        :variant="toast.variant"
        :visible="toast.visible"
      >
        <p>{{ toast.text }}</p>
      </b-toast>
    </b-container>
  </div>
</template>

<script>
export default {
  name: 'AllUsers',
  layout: 'admin',
  data () {
    return {
      toast: {
        title: null,
        variant: null,
        visible: false,
        text: null
      },
      sortBy: 'name',
      sortDesc: false,
      fields: [
        { key: 'name', sortable: true },
        { key: 'email', sortable: true },
        { key: 'actions' }
      ],
      items: null,
      user: {
        name: '',
        email: ''
      }
    }
  },
  mounted () {
    this.getUsers()
  },
  methods: {
    async getUsers () {
      await this.$axios.$get('/users/all')
        .then((res) => {
          this.items = res.data
        })
        .catch(err => console.log(err))
    },
    async editUser () {
      await this.$axios.$patch(`/users/${this.user._id}`, this.user)
        .then((res) => {
          this.getUsers()
          this.toast = {
            title: 'User Edited',
            variant: 'success',
            visible: true,
            text: `${this.user.name} Edited successfully`
          }
          Object.assign(this.user, {})
        })
        .catch((err) => {
          this.toast = {
            title: 'There is something wrong',
            variant: 'danger',
            visible: true,
            text: err.message
          }
          Object.assign(this.user, {})
        })
    },
    async deleteUser () {
      await this.$axios.$delete(`/users/${this.user._id}`)
        .then((res) => {
          this.getUsers()
          this.toast = {
            title: 'User Deleted',
            variant: 'success',
            visible: true,
            text: `${this.user.name} Deleted successfully`
          }
          Object.assign(this.user, {})
        })
        .catch((err) => {
          this.toast = {
            title: 'There is something wrong',
            variant: 'danger',
            visible: true,
            text: err.message
          }
          Object.assign(this.user, {})
        })
    }
  }
}
</script>

<style scoped>

</style>
