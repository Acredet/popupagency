export default {
  data () {
    return {
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
    }
  },
  async created () {
    const promises = [
      this.$axios.$get('/region'),
      this.$axios.$get('/tag')
    ]

    await Promise.all(promises).then((res) => {
      const regions = res[0].data
      const tags = res[1].data

      const minMaxPrice = this.getMinAndMax('price', 'prioteradpris')
      const minMaxYta = this.getMinAndMax('yta', 'yta')

      this.filters.used.price = minMaxPrice
      this.filters.used.yta = minMaxYta

      const sortedRegions = this.sortItems(regions, false)

      sortedRegions.forEach((country) => {
        if (!country.parent) {
          this.filters.plats.tabs[country.name[this.lang]] = []
        }

        if (country.cities) {
          country.cities.forEach((city) => {
            // eslint-disable-next-line no-return-assign
            const array1 = city.subCities
              ? city.subCities.map(x => (x.name = x.name[this.lang]))
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

      this.filters.property.icons = tags.map((x) => {
        return {
          text: x.name[this.lang],
          avatar: x.avatar,
          state: false
        }
      })

      this.filters.plats.currentCountry = Object.keys(
        this.filters.plats.tabs
      )[0]
    })
  },
  methods: {
    // Utils
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

    // Filters Functions
    doFilter () {
      this.loadingCards = true
      const used = this.filters.used
      const plats = this.filters.plats
      const chooesdTags = this.filters.used.property

      used.plats = [plats.currentCountry]
      // const selectedCity = [plats.currentCountry]

      for (const key in plats.tabs) {
        if (plats.tabs.hasOwnProperty(key)) {
          const country = plats.tabs[key]
          country.forEach((city) => {
            [...city.selected].forEach(x => console.log(`Unicode of ${x}: `, String.fromCharCode(x)))
            used.plats.push(...city.selected)
            console.log(used.plats)
          })
        }
      }

      this.cards = this.AllPlaces.filter((x) => {
        const re = new RegExp(this.filters.used.search, 'ig') // Search input

        console.log('asdsadddsfdasda', x.egenskaper)
        // Find Tags
        let existedTag
        if (x.egenskaper.length === 0) {
          existedTag = true
        } else {
          for (const i of x.egenskaper) {
            if (chooesdTags.length === 0) { // If There is no property filter
              existedTag = true
              break
            } else if (!existedTag) { // If There is a property filter and we didn't get the existed tag yet
              console.log(chooesdTags.map(tags => tags.text))
              console.log(i.name[this.$i18n.locale])
              existedTag = chooesdTags.map(tags => tags.text).includes(i.name[this.$i18n.locale])
            }
          }
        }

        const thereIsChoosePlace = (used.plats.length <= 1) ? true : used.plats.includes(x.stad.en)
        const thereIsSearch = (!this.filters.used.search) ? true : x.title.en.match(re)

        console.log('=====================START======================')
        console.log('x.stad', x.stad)
        console.log(`x.prioteradpris(${x.prioteradpris}) >= used.price[0] : `, x.prioteradpris >= used.price[0])
        console.log('x.prioteradpris <= used.price[1]: ', x.prioteradpris <= used.price[1])
        console.log(`x.yta(${x.prioteradpris}) >= used.yta[0]: `, x.yta >= used.yta[0])
        console.log(' x.yta <= used.yta[1]: ', x.yta <= used.yta[1])
        console.log('thereIsChoosePlace: ', thereIsChoosePlace)
        console.log('thereIsSearch ', thereIsSearch)
        console.log('existedTag ? existedTag ', existedTag)

        const result =
          (x.prioteradpris >= used.price[0] && x.prioteradpris <= used.price[1]) &&
          (x.yta >= used.yta[0] && x.yta <= used.yta[1]) &&
          thereIsChoosePlace &&
          thereIsSearch &&
          existedTag

        console.log('result: ', result)
        console.log('=====================END======================')

        return result
      })

      // if (
      //   this.filters.used.plats.length === 1 &&
      //   this.filters.used.price.length === 2 &&
      //   this.filters.used.property.length === 0 &&
      //   this.filters.used.yta.length === 2 &&
      //   (this.filters.used.search === null || this.filters.used.search === '')
      // ) { this.cards = this.AllPlaces }

      this.loadingCards = false
    },
    sorting (sort) {
      console.log(this.cards)
      this.sortedBy = sort
      if (sort === this.$t('ledigaLokaler.sorting.latest')) {
        // console.log(1)
        this.cards = this.cards.sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime())
      } else if (sort === this.$t('ledigaLokaler.sorting.oldest')) {
        // console.log(2)
        this.cards = this.cards.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
      } else if (sort === this.$t('ledigaLokaler.sorting.priceLowToHigh')) {
        // console.log(3)
        this.cards = this.cards.sort((a, b) => a.prioteradpris - b.prioteradpris)
      } else if (sort === this.$t('ledigaLokaler.sorting.priceHighToLow')) {
        // console.log(4)
        this.cards = this.cards.sort((a, b) => b.prioteradpris - a.prioteradpris)
      } else if (sort === this.$t('ledigaLokaler.sorting.sizeLowToHigh')) {
        // console.log(5)
        this.cards = this.cards.sort((a, b) => a.yta - b.yta)
      } else if (sort === this.$t('ledigaLokaler.sorting.sizeHighToLow')) {
        // console.log(6)
        this.cards = this.cards.sort((a, b) => b.yta - a.yta)
      }
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

      const subcities = arr.selected.length !== arr.subcity.length ? arr.subcity.slice() : []
      arr.selected = arr.selected.includes(arr.name) ? (arr.selected = []) : (arr.selected = [arr.name, ...subcities])

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
    addProperty () {
      const x = this.filters.property.icons.filter(x => x.state)
      this.filters.used.property = x
      this.doFilter()
    }
  }
}
