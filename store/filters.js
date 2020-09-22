export const state = () => ({
  used: {
    search: null,
    price: [],
    plats: [],
    property: [],
    yta: []
  }
})

export const mutations = {
  changeProp (state, propAndValObj) {
    state.used[propAndValObj.prop] = propAndValObj.val
  },
  usedFilters (state, filters) {
    Object.assign(state.used, filters)
  },
  resetFilters (state) {
    state.used = {
      search: null,
      price: [],
      plats: [],
      property: [],
      yta: []
    }
  },
  changeStateOfPropertInput (state, obj) {
    state.used.property = obj.icons.filter((x) => {
      if (x.text === obj.button.text) { x.state = !x.state }
      return x.state
    })
  }
}

export const actions = {
  updateFilterProperty ({ commit }, propAndValObj) {
    commit('changeProp', propAndValObj)
  },
  updateFilters ({ commit }, fitlers) {
    commit('usedFilters', fitlers)
  }
}

export const getters = {
  used (state) {
    return state.used
  }
}
