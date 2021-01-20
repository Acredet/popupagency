exports.sortItems = {
  methods: {
    sortItems(regions, withNameSpace) {
      const countries = JSON.parse(
        JSON.stringify(regions.filter((x) => !x.parent))
      ); // Get countries

      const cities = regions.filter((x) =>
        countries.map((x) => x._id).includes(x.parent)
      ); // get cities
      const subCities = regions.filter((x) =>
        cities.map((x) => x._id).includes(x.parent)
      ); // get subCities

      const vm = this;
      this.parentOpts = [...countries, ...cities].map(function (x) {
        return {
          text: vm.$i18n.getLocaleCookie() === "en" ? x.name.en : x.name.sv,
          value: x._id,
        };
      });
      this.parentOpts.unshift({
        text: this.$t("chooseParent"),
        value: null,
      });

      countries.forEach((x) => {
        x.cities = [];

        cities.forEach((city) => {
          const currentCity = JSON.parse(JSON.stringify(city));
          currentCity.subCities = [];

          subCities.forEach((subCity) => {
            const currentSubCity = JSON.parse(JSON.stringify(subCity));
            if (city._id === subCity.parent) {
              if (withNameSpace && subCity.name.en[0] !== "-") {
                currentSubCity.name.en = "---" + subCity.name.en;
                currentSubCity.name.sv = "---" + subCity.name.sv;
              }

              currentCity.subCities.push(currentSubCity);
            }
          });

          if (x._id === city.parent) {
            if (withNameSpace && city.name.en[0] !== "-") {
              currentCity.name.en = "--" + city.name.en;
              currentCity.name.sv = "--" + city.name.sv;
            }
            x.cities.push(currentCity);
          }
        });
      });

      const all = [];
      // console.log(all)
      for (let i = 0; i < countries.length; i++) {
        const country = countries[i];

        // console.log('country: ', country.name.sv)
        all.push(country);

        for (let j = 0; j < country.cities.length; j++) {
          const city = country.cities[j];

          // console.log('city: ', city.name.sv)
          all.push(city);

          // console.log('city.subCities: ', ...city.subCities)
          all.push(...city.subCities);
        }
      }

      // console.log('regions: ', regions)
      // console.log('all: ', all)
      // const difference = [...regions].filter(x => !all.includes(x))
      // console.log('Spent: ', difference)

      return all;
    },
  },
};
