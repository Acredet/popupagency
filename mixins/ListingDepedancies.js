exports.ListingDepedancies = {
  layout: 'admin',
  data () {
    return {
      loadingState: false,
      toast: {
        title: null,
        variant: null,
        visible: false,
        text: null
      },
      form: {
        name: '',
        parent: null,
        description: null
      },
      editForm: {
        name: '',
        parent: null,
        description: null
      },
      sortBy: 'name',
      sortDesc: false,
      currentPage: 1,
      parentOpts: [],
      perPage: 5,
      perPageOpts: [
        { value: 1, text: '1' },
        { value: 5, text: '5' },
        { value: 10, text: '10' },
        { value: 25, text: '25' },
        { value: 50, text: '50' },
        { value: 100, text: '100' }
      ],
      fields: [
        { key: 'name', label: this.$t('tables.name'), sortable: true },
        { key: 'description', label: this.$t('tables.description'), sortable: true },
        { key: 'parent', label: this.$t('tables.parent'), sortable: true },
        { key: 'actions', label: this.$t('tables.actions'), sortable: false }
      ],
      items: []
    }
  },
  computed: {
    nameValid () {
      return !!this.form.name
    },
    editNameValid () {
      return !!this.editForm.name
    }
  },
  methods: {
    async addItem (link) {
      const item = new FormData(document.getElementById(`add-${link}`))

      for (const key in this.form) {
        if (this.form.hasOwnProperty(key)) {
          const element = this.form[key]
          item.append(key, element)
        }
      }

      for (const pair of item.entries()) { // Show data in console.
        console.log(pair[0] + ', ' + pair[1])
      }

      await this.$axios.$post(`/${link}`, item)
        .then((res) => {
          this.getItems(link)
          const inputs = [...document.querySelectorAll('.input-group--wrapper input')]
          const images = [...document.querySelectorAll('.input-group--wrapper img')]

          inputs.forEach((e) => {
            e.value = ''
            const img = images.find((x) => {
              console.log(x)
              return x.getAttribute('data-id') === e.getAttribute('data-id')
            })
            img.style.display = 'none'

            this.form = {
              name: '',
              parent: null,
              description: null
            }
          })
          this.loadingState = true
        })
        .catch((err) => {
          this.loadingState = false

          this.toast = {
            title: this.$t('category.toast.error'),
            variant: 'danger',
            visible: true,
            text: err.message
          }
        })
    },
    async getItems (link) {
      this.loadingState = true
      await this.$axios.$get(`/${link}`)
        .then((res) => {
          this.items = res.data
          this.parentOpts = this.items.map(function (x) {
            return {
              text: x.name,
              value: x.name
            }
          })
          this.parentOpts.unshift({ text: this.$t('chooseParent'), value: null })
          this.loadingState = false
        })
        .catch((err) => {
          this.loadingState = false

          this.toast = {
            title: this.$t('category.toast.error'),
            variant: 'danger',
            visible: true,
            text: err.message
          }
        })
    },
    async editItem (link) {
      this.loadingState = true

      const item = new FormData(document.getElementById(`edit-${link}`))

      for (const pair of item.entries()) { // upload images
        console.log(pair[0] + ', ' + pair[1])
        const data = new FormData()
        if (pair[0] === 'edit-avatar') {
          if (pair[1].name === '') {
            this.editForm.avatar = null
            return
          }
          data.append(pair[0], pair[1])
          if (pair[1].name) {
            await this.$axios.$post(`/${link}/images`, data)
              .then((res) => {
                this.editForm.avatar = res
                console.log(res)
              })
              .catch((err) => {
                this.$bvToast.toast(err.response.data.msg, {
                  title: this.$t('category.toast.error'),
                  autoHideDelay: 5000,
                  appendToast: true,
                  variant: 'danger'
                })
              })
          } else {
            this.editForm.avatar = ''
          }
        }
      }

      await this.$axios.$patch(`/${link}/${this.editForm._id}`, this.editForm)
        .then(res => this.getItems(link))
        .catch((err) => {
          this.loadingState = false
          this.toast = {
            title: this.$t('category.toast.error'),
            variant: 'danger',
            visible: true,
            text: err.message
          }
        })
    },
    async deleteItem (link) {
      this.loadingState = true

      await this.$axios.$delete(`/${link}/${this.editForm._id}`)
        .then((res) => {
          this.getItems(link)
          this.toast = {
            title: this.$t('category.toast.delete'),
            variant: 'success',
            visible: true,
            text: `${this.$t('category.toast.justDeleted')} ${this.editForm.name} Categories.`
          }
          // this.$router.go()
        })
        .catch((err) => {
          this.loadingState = false

          this.toast = {
            title: this.$t('category.toast.error'),
            variant: 'danger',
            visible: true,
            text: err.message
          }
        })
    }
  }
}
