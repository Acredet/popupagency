export default {
  data () {
    return {
      layout: {
        value: this.$t('ledigaLokaler.list')
      },
      filters: {
        used: {
          search: null,
          price: [],
          plats: [],
          property: [],
          yta: []
        },
        plats: {
          currentCountry: '',
          currentCity: 0,
          text: this.$t('ledigaLokaler.filters.place'),
          tabs: {}
        },
        price: {
          text: this.$t('ledigaLokaler.filters.price'),
          min: 0,
          max: 0
        },
        property: {
          text: this.$t('ledigaLokaler.filters.propertyType'),
          choose: [],
          icons: []
        },
        yta: {
          text: this.$t('ledigaLokaler.filters.surface'),
          min: 0,
          max: 0,
          enableCross: false
        }
      }
    }
  },
  computed: {
    lang () {
      return this.$i18n.getLocaleCookie()
    }
  },
  watch: {
    'filters.used': {
      immediate: true,
      deep: true,
      handler (newValue) {
        // console.log(newValue)
        this.$store.dispatch('filters/updateFilters', newValue)
      }
    },
    regions: {
      immediate: true,
      deep: true,
      handler (newValue) {
        const minMaxPrice = this.getMinAndMax('price', 'prioteradpris')
        const minMaxYta = this.getMinAndMax('yta', 'yta')

        this.filters.used.price = minMaxPrice
        this.filters.used.yta = minMaxYta

        const sortedRegions = this.sortItems(this.regions, false)

        sortedRegions.forEach((country) => {
          console.log(country)
          if (!country.parent) {
            this.filters.plats.tabs[country.name[this.lang]] = []
          }

          if (country.cities) {
            country.cities.forEach((city) => {
              // eslint-disable-next-line no-return-assign
              const array1 = city.subCities
                ? city.subCities.map(x => ((x.name && x.name[this.lang]) ? x.name[this.lang] : x.name))
                : []

              let all = 0
              city.subCities.forEach((subCity) => {
                // console.log('subCity: ', subCity.name)
                all += this.AllPlaces.filter(place => place.stad[this.lang] === subCity.name).length
              })

              this.filters.plats.tabs[country.name[this.lang]].push({
                name: city.name[this.lang],
                text: `${city.name[this.lang]} (${all})`,
                allSelected: false, // Shape of the check
                indeterminate: false, // Shape of the check
                selected: [],
                subcity: array1
              })
            })
          }
        })

        this.filters.property.icons = [...this.tags].map((x) => {
          if (x._id) {
            return {
              text: x.name[this.lang],
              avatar: x.avatar,
              state: false
            }
          }
        })

        this.filters.plats.currentCountry = Object.keys(this.filters.plats.tabs)[0]
      }
    }
  },
  methods: {
    /**
     * @param { String } Obj the object in the instance
     * @param { String } prop the property you want to fitler with
     */
    getMinAndMax (obj, prop) {
      let min = 0
      let max = 0
      this.AllPlaces.forEach((place) => {
        // Get minimum and maximum price
        if (place[prop] < min && place[prop] < max) {
          min = place[prop]
        } else if (place[prop] > min && place[prop] > max) {
          max = place[prop]
        }
      })
      this.filters[obj].min = min
      this.filters[obj].max = max

      if (this.filters[obj].min >= this.filters[obj].max) {
        this.filters[obj].max *= 100
      }

      return [min, max]
    },
    formatPrices (num) {
      return String(num).replace(/(?<!\..*)(\d)(?=(?:\d{3})+(?:\.|$))/g, '$1 ')
    },

    doFilter () {
      this.loadingCards = true
      this.$store.dispatch('filterPlaces', this.filters.plats)
      this.loadingCards = false
    },
    sorting (sort) {
      console.log(this.cards)
      this.sortedBy = sort
    },
    clearFilters () {
      const { price, yta } = this.filters
      // reset search
      this.searchInput = null

      // Reset Price
      this.filters.used.price = [price.min, price.max]
      this.filters.price.text = this.$t('ledigaLokaler.filters.price')

      // Reset yta
      this.filters.yta.text = this.$t('ledigaLokaler.filters.surface')
      this.filters.used.yta = [yta.min, yta.max]

      // Reset search
      this.filters.used.search = null

      // Reset Places
      this.filters.used.plats = ['Sverige']

      // Reset Properties
      this.filters.property.icons.forEach((x) => { x.state = false })
      this.filters.used.property = []

      // Reset places
      const tabs = this.filters.plats.tabs
      for (const country in tabs) {
        if (tabs.hasOwnProperty(country)) {
          const element = tabs[country]
          element.forEach((x) => {
            x.selected = []
            this.$nextTick(() => {
              x.allSelected = false
              x.indeterminate = false
            })
          })
        }
      }

      this.$forceUpdate()

      // Reset cards
      this.cards = this.AllPlaces
    },

    ytaChanged (type, w) {
      console.log(w)
      if (type === 'yta') {
        this.filters.used.yta = w
        if (w[0] === this.filters.yta.min && w[1] === this.filters.yta.max) {
          this.filters.yta.text = this.$t('ledigaLokaler.filters.surface')
        } else {
          this.filters.yta.text = `${this.formatPrices(w[0])}m2 - ${this.formatPrices(w[1])}m2`
        }
      } else {
        this.filters.used.price = w
        if (w[0] === this.filters.price.min && w[1] === this.filters.price.max) {
          this.filters.price.text = this.$t('ledigaLokaler.filters.price')
        } else {
          this.filters.price.text = `${this.formatPrices(w[0])}Kr - ${this.formatPrices(w[1])}Kr`
        }
      }
      this.doFilter()
    },
    toggleAll (index) {
      const arr = this.filters.plats.tabs[this.filters.plats.currentCountry][
        index
      ]
      // console.log(arr)

      // Upadte the selected states in this country
      const subcities = arr.selected.length !== arr.subcity.length ? arr.subcity.slice() : []
      arr.selected = arr.selected.includes(arr.name) ? (arr.selected = []) : (arr.selected = [arr.name, ...subcities])

      // Upadte the filters in vuex
      const finalArray = []
      this.filters.plats.tabs[this.filters.plats.currentCountry].forEach((x) => {
        finalArray.push(...x.selected)
      })

      this.filters.used.plats = finalArray

      this.doFilter()
      this.$forceUpdate()
    },
    placeChoose (index) {
      const arr = this.filters.plats.tabs[this.filters.plats.currentCountry][index]
      this.$nextTick(() => {
        if (arr.selected.length === 2) {
          arr.indeterminate = false
          arr.allSelected = false
        } else if (arr.selected.length === arr.subcity.length + 2) {
          arr.indeterminate = false
          arr.allSelected = true
        } else {
          arr.indeterminate = true
          arr.allSelected = false
        }
        this.$forceUpdate()
        this.doFilter()
      })
    },
    addProperty (button) {
      const icons = this.filters.property.icons
      this.$store.commit('filters/changeStateOfPropertInput', { button, icons })
      this.doFilter()
    }
  }
}
