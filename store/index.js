export const state = () => ({
	sidebarRenderKey: 0,
	sortedBy: "latest",
	listings: [],
	cards: [],
	regions: [],
	tags: [],
	centrums: [],
	categories: [],
	loginRedirectLink: "",
});

export const mutations = {
	listings(state, listings) {
		state.listings = listings;
	},
	regions(state, regions) {
		state.regions = regions;
	},
	tags(state, tags) {
		state.tags = tags;
	},
	categories(state, categories) {
		state.categories = categories;
	},
	centrum(state, centrums) {
		state.centrums = centrums;
	},
	sortCards(state, sortType) {
		if (state.cards.length === 0) {
			state.cards = state.listings;
		}

		if (sortType === "latest") {
			state.cards = state.cards.sort(
				(a, b) =>
					new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
			);
		} else if (sortType === "oldest") {
			state.cards = state.cards.sort(
				(a, b) =>
					new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
			);
		} else if (sortType === "priceLowToHigh") {
			state.cards = state.cards.sort(
				(a, b) => a.prioteradpris.val - b.prioteradpris.val
			);
		} else if (sortType === "priceHighToLow") {
			state.cards = state.cards.sort(
				(a, b) => b.prioteradpris.val - a.prioteradpris.val
			);
		} else if (sortType === "sizeLowToHigh") {
			state.cards = state.cards.sort((a, b) => a.yta - b.yta);
		} else if (sortType === "sizeHighToLow") {
			state.cards = state.cards.sort((a, b) => b.yta - a.yta);
		}
	},
	cards(state, cards) {
		state.cards = cards;
	},
};

export const actions = {
	async updateStoreData({ commit }) {
		const {
			listings,
			regions,
			tags,
			categories,
			centrums,
		} = await this.$axios.$get("/availablePopups");
		commit("categories", categories);
		commit("tags", tags);
		commit("regions", regions);
		commit("listings", listings);
		commit("centrum", centrums);
		commit("sortCards", "latest");

		// TODO: CREATE MODULE IN VUEX FOR EACH MODULE IN DB.
		commit("listing/setListings", listings);
	},
	async nuxtServerInit({ dispatch }, { $axios, redirect, app }) {
		try {
			await dispatch("updateStoreData");
		} catch (e) {
			console.log(e);
			redirect(app.localePath("/"));
		}
	},
	async getListings({ commit, state }) {
		await this.$axios
			.get("/places")
			.then(async (res) => {
				for (let i = 0; i < res.data.data.length; i++) {
					const listing = res.data.data[i];
					const listingRegion = state.regions.filter(
						(x) => JSON.stringify(x.name) === JSON.stringify(listing.stad)
					)[0];

					if (listingRegion.centrum) {
						await this.$axios
							.get(`/centrum/${listingRegion.centrum}`)
							.then((centrum) => {
								if (centrum.data) {
									listing.hemsida = centrum.data.hemsida;
									listing.centrumgalleri = centrum.data.centrumgalleri;
									listing.centrumtextarea = centrum.data.centrumtextarea;
									listing.oppettider = centrum.data.oppettider;
									// listing.location = centrum.data.routeGuidance;
								}
							});
					}
				}
				commit("listings", res.data.data);
				commit("sortCards", "latest");
			})
			.catch((err) => console.log(err));
	},
	async getRegions({ commit }) {
		await this.$axios
			.get("/region")
			.then((res) => commit("regions", res.data.data))
			.catch((err) => console.log(err));
	},
	async getTags({ commit }, tags) {
		await this.$axios
			.get("/tag")
			.then((res) => commit("tags", res.data.data))
			.catch((err) => console.log(err));
	},
	async getCategories({ commit }) {
		await this.$axios
			.get("/category")
			.then((res) => commit("categories", res.data.data))
			.catch((err) => console.log(err));
	},
	async getCentrums({ commit }) {
		await this.$axios
			.get("/centrum")
			.then((res) => commit("centrum", res.data.data))
			.catch((err) => console.log(err));
	},
	sortCards({ commit }, sortType) {
		if (sortType === this.$i18n.t("ledigaLokaler.sorting.latest")) {
			commit("sortCards", "latest");
		} else if (sortType === this.$i18n.t("ledigaLokaler.sorting.oldest")) {
			commit("sortCards", "oldest");
		} else if (
			sortType === this.$i18n.t("ledigaLokaler.sorting.priceLowToHigh")
		) {
			commit("sortCards", "priceLowToHigh");
		} else if (
			sortType === this.$i18n.t("ledigaLokaler.sorting.priceHighToLow")
		) {
			commit("sortCards", "priceHighToLow");
		} else if (
			sortType === this.$i18n.t("ledigaLokaler.sorting.sizeLowToHigh")
		) {
			commit("sortCards", "sizeLowToHigh");
		} else if (
			sortType === this.$i18n.t("ledigaLokaler.sorting.sizeHighToLow")
		) {
			commit("sortCards", "sizeHighToLow");
		}
	},
	resetCards({ state, commit }) {
		commit("cards", state.listings);
	},
	filterPlaces({ commit, rootGetters }, plats) {
		const used = rootGetters["filters/used"];
		// Dont't run when we clear filters
		if (used.property) {
			const realUsed = [...used.plats];
			const listings = rootGetters.listings;
			const chooesdTags = [...used.property];
			const chooesdCategories = [...used.category];

			// const selectedCity = [plats.currentCountry]

			for (const key in plats.tabs) {
				if (plats.tabs.hasOwnProperty(key)) {
					const country = [...plats.tabs[key]];
					if (country) {
						country.forEach((city) => {
							[...city.selected].forEach((x) =>
								console.log(`Unicode of ${x}: `, String.fromCharCode(x))
							);
							realUsed.push(...city.selected);
						});
					}
				}
			}

			const cards = listings.filter((x) => {
				const re = new RegExp(used.search, "ig"); // Search input

				// Find Tags
				let existedTag;
				if (x.egenskaper.length === 0) {
					existedTag = true;
				} else {
					for (const i of x.egenskaper) {
						if (chooesdTags.length === 0) {
							// If There is no property filter
							existedTag = true;
							break;
						} else if (!existedTag) {
							// If There is a property filter and we didn't get the existed tag yet
							existedTag = chooesdTags
								.map((tags) => tags.text)
								.includes(i.name[this.$i18n.locale]);
						}
					}
				}

				// Find Category
				let existedCategory;
				if (x.kategori.length === 0) {
					existedCategory = true;
				} else {
					for (const i of x.kategori) {
						if (chooesdCategories.length === 0) {
							// If There is no property filter
							existedCategory = true;
							break;
						} else if (!existedCategory) {
							// If There is a property filter and we didn't get the existed tag yet
							existedCategory = chooesdCategories
								.map((tags) => tags.text)
								.includes(i);
						}
					}
				}

				const thereIsChoosePlace =
					realUsed.length <= 1
						? true
						: realUsed.includes(x.stad[this.$i18n.locale]);
				const thereIsSearch = !used.search ? true : x.title.en.match(re);

				// console.log('=====================START======================')
				// console.log('x.stad', x.stad)
				// console.log(`x.prioteradpris(${x.prioteradpris.val}) >= used.price[0](${used.price[0]}) : `, x.prioteradpris.val >= used.price[0])
				// console.log('x.prioteradpris <= used.price[1]: ', x.prioteradpris.val <= used.price[1])
				// console.log(`x.yta(${x.yta}) >= used.yta[0]: `, x.yta >= used.yta[0])
				// console.log(' x.yta <= used.yta[1]: ', x.yta <= used.yta[1])
				// console.log('thereIsChoosePlace: ', thereIsChoosePlace)
				// console.log('thereIsSearch ', thereIsSearch)
				// console.log('existedTag ? existedTag ', existedTag)
				// console.log('existedCategory ? existedCategory ', existedCategory)

				const result =
					x.prioteradpris.val >= used.price[0] &&
					x.prioteradpris.val <= used.price[1] &&
					x.yta >= used.yta[0] &&
					x.yta <= used.yta[1] &&
					thereIsChoosePlace &&
					thereIsSearch &&
					existedTag &&
					existedCategory;

				// console.log('result: ', result)
				// console.log('=====================END======================')

				return result;
			});

			commit("cards", cards);
		}
	},
};

export const getters = {
	renderKey(state) {
		return state.sidebarRenderKey;
	},
	listings(state) {
		return state.listings;
	},
	cards(state) {
		return state.cards;
	},
	regions(state) {
		return state.regions;
	},
	tags(state) {
		return state.tags;
	},
	categories(state) {
		return state.categories;
	},
	centrums(state) {
		return state.centrums;
	},
	loginRedirectLink(state) {
		return state.loginRedirectLink;
	},
};
