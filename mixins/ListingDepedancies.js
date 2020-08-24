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
        name: {
          en: '',
          sv: ''
        },
        parent: null,
        description: {
          en: '',
          sv: ''
        }
      },
      editForm: {
        name: {
          en: '',
          sv: ''
        },
        parent: null,
        description: {
          en: '',
          sv: ''
        }
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
    nameValidEn () {
      return !!this.form.name.en
    },
    nameValidSv () {
      return !!this.form.name.sv
    },
    editNameValidEn () {
      return !!this.editForm.name.en
    },
    editNameValidSv () {
      return !!this.editForm.name.sv
    }
  },
  methods: {
    async addItem (link) {
      this.loadingState = true

      const item = new FormData(document.getElementById(`add-${link}`))

      item.append('name', JSON.stringify(this.form.name))
      item.append('description', JSON.stringify(this.form.description))
      item.append('parent', this.form.parent)

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
              name: {
                en: '',
                sv: ''
              },
              parent: null,
              description: {
                en: '',
                sv: ''
              }
            }
            this.editForm = {
              name: {
                en: '',
                sv: ''
              },
              parent: null,
              description: {
                en: '',
                sv: ''
              }
            }
          })
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
    async getItems (link) {
      const vm = this
      this.loadingState = true

      await this.$axios.$get(`/${link}`)
        .then((res) => {
          this.items = res.data
          this.parentOpts = this.items.map(function (x) {
            return {
              text: (vm.$i18n.getLocaleCookie() === 'en') ? x.name.en : x.name.sv,
              value: x._id
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
          if (pair[1].name !== '') {
            data.append(pair[0], pair[1])
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
        .then((res) => {
          this.getItems(link)
          this.loadingState = false
          this.editForm = {
            name: {
              en: '',
              sv: ''
            },
            parent: null,
            description: {
              en: '',
              sv: ''
            }
          }
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
    async deleteItem (link) {
      this.loadingState = true

      await this.$axios.$delete(`/${link}/${this.editForm._id}`)
        .then((res) => {
          this.getItems(link)
          this.toast = {
            title: this.$t('category.toast.delete'),
            variant: 'success',
            visible: true,
            text: `${this.$t('category.toast.justDeleted')} ${(this.$i18n.getLocaleCookie() === 'en') ? this.editForm.name.en : this.editForm.name.sv} Categories.`
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
    },
    getParent (parentId) {
      return this.items.filter(x => x._id === parentId)
    }
  }
}
