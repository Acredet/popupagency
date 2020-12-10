export default {
	data() {
		return {
			layout: {
				value: this.$t("ledigaLokaler.list"),
			},
			filters: {
				used: {
					search: null,
					price: [],
					plats: [],
					property: [],
					yta: [],
				},
				plats: {
					currentCountry: "",
					currentCity: 0,
					text: this.$t("ledigaLokaler.filters.place"),
					tabs: {},
				},
				price: {
					text: this.$t("ledigaLokaler.filters.price"),
					min: 0,
					max: 0,
				},
				property: {
					text: this.$t("ledigaLokaler.filters.propertyType"),
					choose: [],
					icons: [],
				},
				categories: {
					text: this.$t("ledigaLokaler.filters.propertyType"),
					choose: [],
					icons: [],
				},
				yta: {
					text: this.$t("ledigaLokaler.filters.surface"),
					min: 0,
					max: 0,
					enableCross: false,
				},
			},
		};
	},
	computed: {
		lang() {
			return this.$i18n.getLocaleCookie();
		},
	},
	watch: {
		"filters.used": {
			immediate: true,
			deep: true,
			handler(val) {
				if (
					val.search === "" &&
					val.price[0] === this.filters.price.min &&
					val.price[1] === this.filters.price.max &&
					val.yta[0] === this.filters.yta.min &&
					val.yta[1] === this.filters.yta.max
				) {
					this.cards = this.AllPlaces;
				} else {
					this.$store.dispatch("filters/updateFilters", val);
				}
			},
		},
		AllPlaces: {
			immediate: true,
			deep: true,
			handler(val) {
				const minMaxPrice = this.getMinAndMax("price");
				const minMaxYta = this.getMinAndMax("yta", "yta");
				this.setRegions();
				this.filters.used.price = minMaxPrice;
				this.filters.used.yta = minMaxYta;
			},
		},
		regions: {
			immediate: true,
			deep: true,
			handler(newValue) {
				this.setRegions();
			},
		},
	},
	methods: {
		/**
		 * @param { String } Obj the object in the instance
		 * @param { String } prop the property you want to fitler with
		 */
		getMinAndMax(obj, prop) {
			let min = 0;
			let max = 0;
			if (obj === "price") {
				this.AllPlaces.forEach((place) => {
					// Get minimum and maximum price
					if (place.prioteradpris.val < min && place.prioteradpris.val < max) {
						min = place.prioteradpris.val;
					} else if (
						place.prioteradpris.val > min &&
						place.prioteradpris.val > max
					) {
						max = place.prioteradpris.val;
					}
				});
			} else {
				this.AllPlaces.forEach((place) => {
					// Get minimum and maximum price
					if (place[prop] < min && place[prop] < max) {
						min = place[prop];
					} else if (place[prop] > min && place[prop] > max) {
						max = place[prop];
					}
				});
			}

			this.filters[obj].min = min;
			this.filters[obj].max = max;

			if (this.filters[obj].min >= this.filters[obj].max) {
				this.filters[obj].max *= 100;
			}

			return [min, max];
		},
		formatPrices(num) {
			const arr = String(num).split("").reverse();
			const copy = [...arr];
			const indexes = [];

			for (let i = 1; i <= arr.length; i++) {
				if (i % 3 === 0) {
					indexes.push(i);
				}
			}

			if (copy.length > 3) {
				indexes.forEach((n, i) => copy.splice(n + i, 0, ","));
			}

			copy.reverse();
			if (copy[0] === ",") {
				copy.shift();
			}
			copy.join("");
			return copy.join("");
		},

		doFilter() {
			this.loadingCards = true;
			this.$store.dispatch("filterPlaces", this.filters.plats);
			this.loadingCards = false;
		},
		sorting(sort) {
			this.sortedBy = sort;
		},
		clearFilters() {
			const { price, yta } = this.filters;
			// reset search
			this.searchInput = null;

			this.filters.price.text = this.$t("ledigaLokaler.filters.price");
			this.filters.yta.text = this.$t("ledigaLokaler.filters.surface");
			// Reset Properties
			this.$store.dispatch("filters/clearFilters", {
				property: this.filters.property.icons,
				category: this.filters.categories.icons,
			});
			this.$store.dispatch("resetCards");

			this.filters.used = {
				price: [price.min, price.max],
				yta: [yta.min, yta.max],
				search: null,
				plats: [this.filters.plats.currentCountry],
				property: [],
				category: [],
			};

			if (this.filters.plats.tabs[this.filters.plats.currentCountry]) {
				this.filters.plats.tabs[this.filters.plats.currentCountry].forEach(
					(arr) => {
						// console.log('arr: dswa', arr)
						arr.indeterminate = false;
						arr.allSelected = false;
					}
				);
			}

			// Reset places
			const tabs = this.filters.plats.tabs;
			for (const country in tabs) {
				if (tabs.hasOwnProperty(country)) {
					const element = tabs[country];
					element.forEach((x) => {
						x.selected = [];
						this.$nextTick(() => {
							x.allSelected = false;
							x.indeterminate = false;
						});
					});
				}
			}
		},
		async changeCountry(country) {
			await this.$axios
				.$post("/places/address-by-country-name", { country })
				.then((res) =>
					this.$emit("changeMapCenter", {
						lat: res[0].latitude,
						lng: res[0].longitude,
					})
				)
				.catch((err) => console.log(err));
		},
		ytaChanged(type, w) {
			if (type === "yta") {
				this.filters.used.yta = w;
				if (w[0] === this.filters.yta.min && w[1] === this.filters.yta.max) {
					this.filters.yta.text = this.$t("ledigaLokaler.filters.surface");
				} else {
					this.filters.yta.text = `${this.formatPrices(
						w[0]
					)}m2 - ${this.formatPrices(w[1])}m2`;
				}
			} else {
				this.filters.used.price = w;
				if (
					w[0] === this.filters.price.min &&
					w[1] === this.filters.price.max
				) {
					this.filters.price.text = this.$t("ledigaLokaler.filters.price");
				} else {
					this.filters.price.text = `${this.formatPrices(
						w[0]
					)}Kr - ${this.formatPrices(w[1])}Kr`;
				}
			}
			// this.$nextTick(() => this.doFilter())
		},
		toggleAll(index) {
			const arr = this.filters.plats.tabs[this.filters.plats.currentCountry][
				index
			];

			// Upadte the selected states in this country
			const subcities =
				arr.selected.length !== arr.subcity.length ? arr.subcity.slice() : [];
			arr.selected = arr.selected.includes(arr.name)
				? (arr.selected = [])
				: (arr.selected = [arr.name, ...subcities]);

			this.$nextTick(() => {
				if (arr.selected.length === 0) {
					arr.indeterminate = false;
					arr.allSelected = false;
				} else if (
					arr.selected.length === arr.subcity.length + 1 ||
					arr.selected.length === arr.subcity.length
				) {
					arr.indeterminate = false;
					arr.allSelected = true;
				} else {
					arr.indeterminate = true;
					arr.allSelected = false;
				}
			});

			// Upadte the filters in vuex
			const finalArray = [this.filters.plats.currentCountry];
			this.filters.plats.tabs[this.filters.plats.currentCountry].forEach(
				(x) => {
					finalArray.push(...x.selected);
				}
			);

			this.filters.used.plats = finalArray;
		},
		placeChoose(index) {
			const arr = this.filters.plats.tabs[this.filters.plats.currentCountry][
				index
			];

			this.$nextTick(() => {
				if (arr.selected.length === 0) {
					arr.indeterminate = false;
					arr.allSelected = false;
				} else if (
					arr.selected.length === arr.subcity.length + 1 ||
					arr.selected.length === arr.subcity.length
				) {
					arr.indeterminate = false;
					arr.allSelected = true;
				} else {
					arr.indeterminate = true;
					arr.allSelected = false;
				}

				// Upadte the filters in vuex
				const finalArray = [this.filters.plats.currentCountry];
				this.filters.plats.tabs[this.filters.plats.currentCountry].forEach(
					(x) => {
						finalArray.push(...x.selected);
					}
				);

				this.filters.used.plats = finalArray;
			});
		},
		addProperty(button) {
			const icons = this.filters.property.icons;
			this.$store.commit("filters/changeStateOfPropertInput", {
				button,
				icons,
			});
			// this.doFilter()
		},
		addCategory(button) {
			const icons = this.filters.categories.icons;
			this.$store.commit("filters/changeStateOfCategoryInput", {
				button,
				icons,
			});
			// this.doFilter()
		},
		setRegions() {
			const sortedRegions = this.sortItems(this.regions, false);
			sortedRegions.forEach((country) => {
				let all = 0;
				// Get Countries
				if (!country.parent) {
					this.filters.plats.tabs[country.name[this.lang]] = [];
				}

				all += this.AllPlaces.filter((place) => {
					return place.stad.en === country.name.en;
				}).length;

				// Get Number Of Listings in each city
				if (country.cities) {
					country.cities.forEach((city) => {
						const array1 = city.subCities
							? [...city.subCities].map((x) =>
									x.name && x.name[this.lang] ? x.name[this.lang] : x.name
							  )
							: [];

						all += this.AllPlaces.filter((place) => {
							return place.stad.en === city.name.en;
						}).length;

						city.subCities.forEach((subCity) => {
							all += this.AllPlaces.filter((place) => {
								return place.stad.en === subCity.name.en;
							}).length;
						});

						this.filters.plats.tabs[country.name[this.lang]].push({
							name: city.name[this.lang],
							text: `${city.name[this.lang]} (${all})`,
							allSelected: false, // Shape of the check
							indeterminate: false, // Shape of the check
							selected: [],
							subcity: array1,
						});
						all = 0;
					});
				}
			});

			this.filters.property.icons = [...this.tags].map((x) => {
				if (x._id) {
					return {
						text: x.name[this.lang],
						avatar: x.avatar,
						state: false,
					};
				}
			});

			this.filters.categories.icons = [...this.categories].map((x) => {
				if (x._id) {
					return {
						text: x.name[this.lang],
						avatar: x.avatar,
						state: false,
					};
				}
			});
		},
	},
};
