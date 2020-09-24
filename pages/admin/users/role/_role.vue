<template>
  <div class="content">
    <b-container>
      <h2>{{ $t('allUsers.title') }}</h2>

      <b-table
        :items="items"
        :fields="fields"
        :sort-by.sync="sortBy"
        :sort-desc.sync="sortDesc"
        responsive="sm"
        show-empty
      />

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
  name: 'UsersAdmins',
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
        { key: 'createdAt', label: 'Created At', sortable: true }
      ],
      items: null
    }
  },
  mounted () {
    this.getUsers()
  },
  methods: {
    async getUsers () {
      await this.$axios.$get(`/users/${this.$route.params.role}`)
        .then((res) => {
          // const currentUser = res.data.filter(user => user._id === this.$auth.user._id)[0]
          this.items = res
        })
        .catch((err) => {
          this.toast = {
            title: this.$t('allUsers.toast.error'),
            variant: 'danger',
            visible: true,
            text: err.message
          }
        })
    }
  }
}
</script>

<style scoped>

</style>
