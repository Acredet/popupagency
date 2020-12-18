export const state = () => ({
	categories: [],
});

export const mutations = {
	setCategories(state, categories) {
		state.categories = categories;
	},
};

export const actions = {
	async getCategories({ commit }) {
		await this.$axios
			.get("/category")
			.then((res) => commit("setCategories", res.data.data))
			.catch((err) => console.log(err));
	},
};

export const getters = {
	categories(state) {
		return state.categories;
	},
};
