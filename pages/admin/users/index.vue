<template>
  <div class="content">
    <b-modal id="edit-modal" centered :title="$t('allUsers.editModal.title')" @close="Object.assign(user, {})">
      <b-form>
        <b-form-group id="name-group" :label="$t('allUsers.editModal.name.label')" label-for="name">
          <b-form-input id="name" v-model="user.name" autocomplete="off" required :placeholder="$t('allUsers.editModal.name.holder')" />
        </b-form-group>

        <b-form-group
          id="Email-group"
          :label="$t('allUsers.editModal.email.label')"
          label-for="email"
          :description="$t('allUsers.editModal.email.desc')"
        >
          <b-form-input
            id="email"
            v-model="user.email"
            type="email"
            required
            :placeholder="$t('allUsers.editModal.email.holder')"
          />
        </b-form-group>
      </b-form>

      <template v-slot:modal-footer="{ ok, cancel }">
        <b-btn variant="primary" @click="editUser(); ok()">
          {{ $t('actions.edit') }}
        </b-btn>
        <b-btn variant="danger" @click="cancel(); Object.assign(user, {})">
          {{ $t('actions.cancle') }}
        </b-btn>
      </template>
    </b-modal>

    <b-modal id="delete-modal" centered :title="$t('allUsers.deleteModal.title')">
      <p class="my-4">
        {{ $t('actions.deleteConfimrMessage') }} {{ user.name }}?
      </p>

      <template v-slot:modal-footer="{ ok, cancel }">
        <b-btn variant="danger" @click="deleteUser(); ok()">
          {{ $t('actions.delete') }}
        </b-btn>
        <b-btn variant="primary" @click="cancel(); user = {}">
          {{ $t('actions.cancle') }}
        </b-btn>
      </template>
    </b-modal>

    <b-container>
      <h2>{{ $t('allUsers.title') }}</h2>

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
              <b>{{ $t('actions.actions') }}</b>
            </template>
            <b-dropdown-item v-b-modal.edit-modal @click="Object.assign(user, data.item)">
              {{ $t('actions.edit') }}
            </b-dropdown-item>
            <b-dropdown-item v-b-modal.delete-modal @click="Object.assign(user, data.item)">
              {{ $t('actions.delete') }}
            </b-dropdown-item>
          </b-dropdown>
        </template>
      </b-table>

      <div>
        {{ $t('tables.sort.by') }} <b>{{ sortBy }}</b>, {{ $t('tables.sort.direction') }}
        <b>{{ sortDesc ? $t('tables.sort.descending') : $t('tables.sort.ascending') }}</b>
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
  middleware: 'authenticated',
  layout: 'admin',
  data () {
    return {
      toast: {
        title: null,
        variant: null,
        visible: false,
        text: null
      },
      sortBy: this.$t('allUsers.table.header.name'),
      sortDesc: false,
      fields: [
        { key: 'name', label: this.$t('allUsers.table.header.name'), sortable: true },
        { key: 'email', label: this.$t('allUsers.table.header.email'), sortable: true },
        { key: 'actions', label: this.$t('tables.actions') }
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
        .catch((err) => {
          this.toast = {
            title: this.$t('allUsers.toast.error'),
            variant: 'danger',
            visible: true,
            text: err.message
          }
        })
    },
    async editUser () {
      await this.$axios.$patch(`/users/${this.user._id}`, this.user)
        .then((res) => {
          this.getUsers()
          this.toast = {
            title: this.$t('allUsers.toast.edit'),
            variant: 'success',
            visible: true,
            text: `${this.$t('allUsers.toast.justEdited')} ${this.user.name}`
          }
          Object.assign(this.user, {})
        })
        .catch((err) => {
          this.toast = {
            title: this.$t('allUsers.toast.error'),
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
            title: this.$t('allUsers.toast.delete'),
            variant: 'success',
            visible: true,
            text: `${this.$t('allUsers.toast.justDeleted')} ${this.user.name}`
          }
          Object.assign(this.user, {})
        })
        .catch((err) => {
          this.toast = {
            title: this.$t('allUsers.toast.error'),
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
