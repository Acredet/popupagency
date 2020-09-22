export const state = () => ({
  sidebarRenderKey: 0,
  sortedBy: 'latest',
  listings: [],
  cards: [],
  regions: [],
  tags: []
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
  }
}

export const actions = {
  changeSidebarRenderKey ({ commit }) {
    commit('changeSidebarRenderKey')
  },
  async getListings ({ commit }) {
    await this.$axios.get('/places')
      .then((res) => {
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
  }
}
