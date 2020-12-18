export const state = () => ({
	regions: [],
});

export const mutations = {
	setRegions(state, regions) {
		state.regions = regions;
	},
};

export const actions = {
	async getRegions({ commit }) {
		await this.$axios
			.get("/region")
			.then((res) => commit("setRegions", res.data.data))
			.catch((err) => console.log(err));
	},
};

export const getters = {
	regions(state) {
		return state.regions;
	},
};
