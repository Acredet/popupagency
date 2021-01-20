export const state = () => ({
  tags: [],
});

export const mutations = {
  setTags(state, tags) {
    state.tags = tags;
  },
};

export const actions = {
  async getTags({ commit }, tags) {
    await this.$axios
      .get("/tag")
      .then((res) => commit("setTags", res.data.data))
      .catch((err) => console.log(err));
  },
};

export const getters = {
  tags(state) {
    return state.tags;
  },
};
