export const state = () => ({
  sidebarRenderKey: 0,
  sortedBy: 'latest',
  listings: [],
  cards: [],
  regions: [],
  tags: [],
  loginRedirectLink: ''
})

export const mutations = {
  changeSidebarRenderKey (state) {
    state.sidebarRenderKey++
  },
  listings (state, listings) {
    state.listings = listings
  },
  regions (state, regions) {
    state.regions = regions
  },
  tags (state, tags) {
    state.tags = tags
  },
  sortCards (state, sortType) {
    if (state.cards.length === 0) { state.cards = state.listings }

    if (sortType === 'latest') {
      state.cards = state.cards.sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime())
    } else if (sortType === 'oldest') {
      state.cards = state.cards.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    } else if (sortType === 'priceLowToHigh') {
      state.cards = state.cards.sort((a, b) => a.prioteradpris - b.prioteradpris)
    } else if (sortType === 'priceHighToLow') {
      state.cards = state.cards.sort((a, b) => b.prioteradpris - a.prioteradpris)
    } else if (sortType === 'sizeLowToHigh') {
      state.cards = state.cards.sort((a, b) => a.yta - b.yta)
    } else if (sortType === 'sizeHighToLow') {
      state.cards = state.cards.sort((a, b) => b.yta - a.yta)
    }
  },
  cards (state, cards) {
    state.cards = cards
  },
  saveRedirectLink (state, link) {
    state.loginRedirectLink = link
  }
}

export const actions = {
  changeSidebarRenderKey ({ commit }) {
    commit('changeSidebarRenderKey')
  },
  async getListings ({ commit }) {
    await this.$axios.get('/places')
      .then(async (res) => {
        for (let i = 0; i < res.data.data.length; i++) {
          const listing = res.data.data[i]
          await this.$axios.get(`/centrum/${listing.centrum}`)
            .then((centrum) => {
              listing.hemsida = centrum.hemsida
              listing.centrumgalleri = centrum.centrumgalleri
              listing.centrumtextarea = centrum.centrumtextarea
              listing.oppettider = centrum.oppettider
              listing.location = centrum.routeGuidance
            })
        }
        commit('listings', res.data.data)
        commit('sortCards', 'latest')
      })
      .catch(err => console.log(err))
  },
  async getRegions ({ commit }, regions) {
    await this.$axios.get('/region')
      .then(res => commit('regions', res.data.data))
      .catch(err => console.log(err))
  },
  async getTags ({ commit }, tags) {
    await this.$axios.get('/tag')
      .then(res => commit('tags', res.data.data))
      .catch(err => console.log(err))
  },
  sortCards ({ commit }, sortType) {
    if (sortType === this.$i18n.t('ledigaLokaler.sorting.latest')) {
      commit('sortCards', 'latest')
    } else if (sortType === this.$i18n.t('ledigaLokaler.sorting.oldest')) {
      commit('sortCards', 'oldest')
    } else if (sortType === this.$i18n.t('ledigaLokaler.sorting.priceLowToHigh')) {
      commit('sortCards', 'priceLowToHigh')
    } else if (sortType === this.$i18n.t('ledigaLokaler.sorting.priceHighToLow')) {
      commit('sortCards', 'priceHighToLow')
    } else if (sortType === this.$i18n.t('ledigaLokaler.sorting.sizeLowToHigh')) {
      commit('sortCards', 'sizeLowToHigh')
    } else if (sortType === this.$i18n.t('ledigaLokaler.sorting.sizeHighToLow')) {
      commit('sortCards', 'sizeHighToLow')
    }
  },
  resetCards ({ state, commit }) {
    commit('cards', state.listings)
  },
  filterPlaces ({ commit, rootGetters }, plats) {
    const used = rootGetters['filters/used']
    // Dont't run when we clear filters
    if (used.property) {
      const realUsed = [...used.plats]
      const listings = rootGetters.listings
      const chooesdTags = [...used.property]

      // const selectedCity = [plats.currentCountry]

      for (const key in plats.tabs) {
        if (plats.tabs.hasOwnProperty(key)) {
          const country = [...plats.tabs[key]]
          country.forEach((city) => {
            [...city.selected].forEach(x => console.log(`Unicode of ${x}: `, String.fromCharCode(x)))
            realUsed.push(...city.selected)
            console.log(realUsed)
          })
        }
      }

      const cards = listings.filter((x) => {
        const re = new RegExp(used.search, 'ig') // Search input

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
              existedTag = chooesdTags.map(tags => tags.text).includes(i.name[this.$i18n.locale])
            }
          }
        }

        const thereIsChoosePlace = (realUsed.length <= 1) ? true : realUsed.includes(x.stad[this.$i18n.locale])
        const thereIsSearch = (!used.search) ? true : x.title.en.match(re)

        console.log('=====================START======================')
        console.log('x.stad', x.stad)
        console.log(`x.prioteradpris(${x.prioteradpris}) >= used.price[0](${used.price[0]}) : `, x.prioteradpris >= used.price[0])
        console.log('x.prioteradpris <= used.price[1]: ', x.prioteradpris <= used.price[1])
        console.log(`x.yta(${x.yta}) >= used.yta[0]: `, x.yta >= used.yta[0])
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

      commit('cards', cards)
    }
  },
  redirectLink ({ commit }, link) {
    commit('saveRedirectLink', link)
  }
}

export const getters = {
  renderKey (state) {
    return state.sidebarRenderKey
  },
  listings (state) {
    return state.listings
  },
  cards (state) {
    return state.cards
  },
  regions (state) {
    return state.regions
  },
  tags (state) {
    return state.tags
  },
  loginRedirectLink (state) {
    return state.loginRedirectLink
  }
}
