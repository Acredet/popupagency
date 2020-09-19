export const state = () => ({
  sidebarRenderKey: 0,
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
  changeSidebarRenderKey (state) {
    state.sidebarRenderKey++
  },
  usedFilters (state, filters) {
    Object.assign(state.used, filters)
  }
}

export const actions = {
  updateFilterProperty ({ commit }, propAndValObj) {
    commit('changeProp', propAndValObj)
  },
  updateFilters ({ commit }, fitlers) {
    commit('usedFilters', fitlers)
  },
  changeSidebarRenderKey ({ commit }) {
    commit('changeSidebarRenderKey')
  }
}

export const getters = {
  used (state) {
    return state.used
  },
  renderKey (state) {
    return state.sidebarRenderKey
  }
}
