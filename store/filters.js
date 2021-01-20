export const state = () => ({
  used: {
    search: null,
    price: [],
    plats: [],
    property: [],
    category: [],
    yta: [],
  },
});

export const mutations = {
  changeProp(state, propAndValObj) {
    state.used[propAndValObj.prop] = propAndValObj.val;
  },
  usedFilters(state, filters) {
    Object.assign(state.used, filters);
  },
  resetFilters(state) {
    state.used = {
      search: null,
      price: [],
      plats: [],
      property: [],
      category: [],
      yta: [],
    };
  },
  changeStateOfPropertInput(state, obj) {
    state.used.property = obj.icons.filter((x) => {
      if (x.text === obj.button.text) {
        x.state = !x.state;
      }
      return x.state;
    });
  },
  changeStateOfCategoryInput(state, obj) {
    state.used.category = obj.icons.filter((x) => {
      if (x.text === obj.button.text) {
        x.state = !x.state;
      }
      return x.state;
    });
  },
  clearFilter(state, icons) {
    state.used.property = icons.property.forEach((x) => {
      x.state = false;
    });
    state.used.category = icons.category.forEach((x) => {
      x.state = false;
    });
  },
};

export const actions = {
  updateFilterProperty({ commit }, propAndValObj) {
    commit("changeProp", propAndValObj);
  },
  updateFilters({ commit }, fitlers) {
    commit("usedFilters", fitlers);
  },
  clearFilters({ commit, dispatch }, icons) {
    commit("clearFilter", icons);
  },
};

export const getters = {
  used(state) {
    return state.used;
  },
};
