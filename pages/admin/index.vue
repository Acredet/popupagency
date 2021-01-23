<template>
  <div class="content">
    <loading :state="loadingState" />
    <div class="container-fluid">
      <div class="row">
        <div class="col-sm-12">
          <div class="page-title-box">
            <h4 class="page-title">Dashboard</h4>
            <ol class="breadcrumb">
              <li class="breadcrumb-item active">Welcome to Popup Dashboard</li>
            </ol>

            <!-- <div class="state-information d-none d-sm-block">
              <div class="state-graph">
                <div id="header-chart-1" />
                <div class="info">
                  Balance $ 2,317
                </div>
              </div>
              <div class="state-graph">
                <div id="header-chart-2" />
                <div class="info">
                  Item Sold 1230
                </div>
              </div>
            </div> -->
          </div>
        </div>
      </div>

      <section
        v-for="(row, index) in rows.slice(0, rows.length - 1)"
        :key="`row-${index}`"
      >
        <h4 class="mt-0 header-title font-wight-bold">
          {{ row.title }}
        </h4>
        <b-row>
          <b-col
            v-for="(card, i) in row.cards"
            :key="`${row.title}-card-${i}`"
            xl="3"
            md="6"
            cols="12"
          >
            <div class="card mini-stat bg-primary">
              <div class="card-body mini-stat-img">
                <div class="mini-stat-icon">
                  <b-icon
                    class="float-right"
                    aria-hidden="true"
                    :icon="card.icon"
                  />
                </div>
                <div class="text-white">
                  <h6 class="text-uppercase font-1 mb-3">
                    {{ card.text }}
                  </h6>
                  <h4 class="mb-4 font-2">{{ card.num }} {{ card.brefix }}</h4>
                  <!-- <span class="badge badge-info"> +11% </span> <span class="ml-2">From previous period</span> -->
                </div>
              </div>
            </div>
          </b-col>
        </b-row>
      </section>

      <section v-if="$auth.user.role !== 'listing manager'" :key="`row-users`">
        <h4 class="mt-0 header-title font-wight-bold">Users:</h4>
        <b-row v-if="rows[rows.length - 1]">
          <b-col
            v-for="(card, i) in rows[rows.length - 1].cards"
            :key="`users-card-${i}`"
            xl="3"
            md="6"
            cols="12"
          >
            <div class="card mini-stat bg-primary">
              <div class="card-body mini-stat-img">
                <div class="mini-stat-icon">
                  <b-icon
                    class="float-right"
                    aria-hidden="true"
                    :icon="card.icon"
                  />
                </div>
                <div class="text-white">
                  <h6 class="text-uppercase mb-3">
                    {{ card.text }}
                  </h6>
                  <h4 class="mb-4">{{ card.num }} {{ card.brefix }}</h4>
                  <!-- <span class="badge badge-info"> +11% </span> <span class="ml-2">From previous period</span> -->
                </div>
              </div>
            </div>
          </b-col>
        </b-row>
      </section>
      <!-- end row -->

      <section>
        <b-row>
          <b-col
            v-for="(table, index) in tableRows"
            :key="`table-${table.title}-${index}`"
            md="6"
          >
            <div class="card m-b-20">
              <div class="card-body">
                <h4 class="mt-0 m-b-30 header-title">
                  {{ table.title }}
                </h4>
                <div class="table-responsive">
                  <table class="table mb-1">
                    <thead>
                      <tr>
                        <th>Title</th>
                        <th>Cover</th>
                        <th>Stad</th>
                        <th v-if="table.views">Views</th>
                        <th v-if="table.date">Date</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr
                        v-for="row in table.rows"
                        :key="`col-${table.title}-${row.title}`"
                        :style="{ cursor: row.url ? 'pointer' : 'not-allowed' }"
                        @click="
                          () => {
                            if (row.url) {
                              $router.push(row.url);
                            }
                          }
                        "
                      >
                        <td>{{ row.title }}</td>
                        <td>
                          <b-img
                            v-if="row.img"
                            v-cloak
                            width="100"
                            :src="row.img"
                          />
                          <p v-else class="text-center" v-text="'-'" />
                        </td>
                        <td v-text="row.stad" />
                        <td
                          v-if="row.views || row.views === 0"
                          v-text="row.views"
                        />
                        <td v-if="row.date" v-text="row.date.substr(0, 10)" />
                      </tr>
                    </tbody>
                  </table>
                </div>
                <!-- End table -->
              </div>
              <!-- End Card Body -->
            </div>
            <!-- End Card -->
          </b-col>
        </b-row>
      </section>
    </div>
    <!-- container-fluid -->
  </div>
  <!-- content -->
</template>

<script>
import { getImages } from "@/mixins/utils/getImage";
import {
  BIcon,
  BootstrapVue,
  BootstrapVueIcons,
  BIconPersonFill,
  BIconShop,
  BIconGeo,
  BIconMap,
  BIconPeopleFill,
} from "bootstrap-vue";

export default {
  name: "Dashboard",
  layout: "admin",
  components: {
    BIcon,
    // eslint-disable-next-line vue/no-unused-components
    BIconPersonFill,
    // eslint-disable-next-line  comma-spacing, vue/no-unused-components, object-property-newline
    BootstrapVue,
    BIconShop,
    BIconGeo,
    BIconMap,
    BIconPeopleFill,
    // eslint-disable-next-line vue/no-unused-components
    BootstrapVueIcons,
  },
  mixins: [getImages],
  data() {
    return {
      loadingState: true,
      tableRows: [],
      rows: [],
    };
  },
  async created() {
    await this.$axios
      .$get("/statistics")
      .then(async (res) => {
        const {
          mostViewsListings,
          leatestListings,
          leatestCentrums,
        } = await this.prepareTable(res);

        this.tableRows = [
          {
            title: "Leatest Listings",
            views: false,
            date: true,
            rows: leatestListings,
          },
          {
            title: "Most Viewed Listings",
            views: true,
            rows: mostViewsListings,
          },
          {
            title: "Leatest Centrums",
            views: false,
            rows: leatestCentrums,
          },
        ];
        this.rows = [
          {
            title: "Overview:",
            cards: [
              {
                text: "All Listings",
                num: res.allPlace,
                brefix: "Listing.",
                icon: "map",
              },
              {
                text: "All Users",
                num:
                  res.users.admin +
                  res.users.manager +
                  res.users.listingOwner +
                  res.users.spaceOwner +
                  res.users.searcher,
                brefix: "User.",
                icon: "people-fill",
              },
            ],
          },
          {
            title: "Listings:",
            cards: [
              {
                text: "Centers",
                num: res.allCentrum,
                brefix: "Center.",
                icon: "shop",
              },
              {
                text: "Regions",
                num: res.allRegion,
                brefix: "Region.",
                icon: "geo",
              },
            ],
          },
          {
            title: "Users:",
            cards: [
              {
                text: "Admins",
                num: res.users.admin,
                brefix: "User.",
                icon: "person-fill",
              },
              {
                text: "Listing Owner",
                num: res.users.listingOwner,
                brefix: "User.",
                icon: "person-fill",
              },
              {
                text: "Space Owner",
                num: res.users.spaceOwner,
                brefix: "User.",
                icon: "person-fill",
              },
              {
                text: "Searchers",
                num: res.users.searcher,
                brefix: "User.",
                icon: "person-fill",
              },
              {
                text: "Manager",
                num: res.users.manager,
                brefix: "User.",
                icon: "person-fill",
              },
            ],
          },
        ];

        this.loadingState = false;
      })
      .catch((err) => console.log(err));
  },
  methods: {
    async prepareTable(res) {
      let leatestListings = [];
      let mostViewsListings = [];
      let leatestCentrums = [];

      for (let i = 0; i < res.leatestListings.length; i++) {
        let x = res.leatestListings[i];
        const y = {
          url: this.localePath(`/lokal/${x.title.sv.split(" ").join("-")}`),
          title: x.title[this.$i18n.locale],
          stad: x.title[this.$i18n.locale],
          img: await this.getImage(x.cover[0]),
          date: x.createdAt,
        };
        leatestListings.push(y);
      }

      for (let i = 0; i < res.mostViewsListings.length; i++) {
        let x = res.mostViewsListings[i];
        const y = {
          url: this.localePath(`/lokal/${x.title.sv.split(" ").join("-")}`),
          title: x.title[this.$i18n.locale],
          stad: x.title[this.$i18n.locale],
          img: await this.getImage(x.cover[0]),
          views: x.views,
        };
        mostViewsListings.push(y);
      }

      for (let i = 0; i < res.leatestCentrums.length; i++) {
        let x = res.leatestCentrums[i];
        const y = {
          // url: `lokal/${x.title.en}`,
          title: x.title[this.$i18n.locale],
          stad: x.title[this.$i18n.locale],
          img: x.centrumgalleri[0],
        };
        leatestCentrums.push(y);
      }

      return { mostViewsListings, leatestListings, leatestCentrums };
    },
  },
};
</script>

<style scoped></style>
