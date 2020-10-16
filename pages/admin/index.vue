<template>
  <div class="content">
    <div class="container-fluid">
      <div class="row">
        <div class="col-sm-12">
          <div class="page-title-box">
            <h4 class="page-title">
              Dashboard
            </h4>
            <ol class="breadcrumb">
              <li class="breadcrumb-item active">
                Welcome to Popup Dashboard
              </li>
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

      <div v-for="(row, index) in rows" :key="`row-${index}`">
        <h4 class="mt-0 header-title font-wight-bold">
          {{ row.title }}
        </h4>
        <b-row>
          <b-col v-for="(card, i) in row.cards" :key="`${row.title}-card-${i}`" xl="3" md="6" cols="12">
            <div class="card mini-stat bg-primary">
              <div class="card-body mini-stat-img">
                <div class="mini-stat-icon">
                  <b-icon class="float-right" aria-hidden="true" :icon="card.icon" />
                </div>
                <div class="text-white">
                  <h6 class="text-uppercase mb-3">
                    {{ card.text }}
                  </h6>
                  <h4 class="mb-4">
                    {{ card.num }} {{ card.brefix }}
                  </h4>
                  <!-- <span class="badge badge-info"> +11% </span> <span class="ml-2">From previous period</span> -->
                </div>
              </div>
            </div>
          </b-col>
        </b-row>
      </div>
      <!-- end row -->
    </div> <!-- container-fluid -->
  </div> <!-- content -->
</template>

<script>
import { BIcon, BootstrapVue, BootstrapVueIcons, BIconPersonFill, BIconShop, BIconGeo, BIconMap, BIconPeopleFill } from 'bootstrap-vue'
import { AdminPanelDependancies } from '@/mixins/AdminPanelDependancies'
export default {
  name: 'AddUser',
  layout: 'admin',
  components: {
    BIcon,
    // eslint-disable-next-line vue/no-unused-components
    BIconPersonFill,
    // eslint-disable-next-line  comma-spacing, vue/no-unused-components, object-property-newline
    BootstrapVue,BIconShop,BIconGeo,BIconMap,BIconPeopleFill,
    // eslint-disable-next-line vue/no-unused-components
    BootstrapVueIcons
  },
  mixins: [AdminPanelDependancies],
  data () {
    return {
      rows: []
    }
  },
  async created () {
    await this.$axios.$get('/statistics')
      .then((res) => {
        this.rows = [
          {
            title: 'Overview:',
            cards: [
              { text: 'All Listings', num: res.allPlace, brefix: 'Listing.', icon: 'map' },
              { text: 'All Users', num: res.users.admin + res.users.manager + res.users.listingOwner + res.users.spaceOwner + res.users.searcher, brefix: 'User.', icon: 'people-fill' }
            ]
          },
          {
            title: 'Listings:',
            cards: [
              { text: 'Centers', num: res.allCentrum, brefix: 'Center.', icon: 'shop' },
              { text: 'Regions', num: res.allRegion, brefix: 'Region.', icon: 'geo' }
            ]
          },
          {
            title: 'Users:',
            cards: [
              { text: 'Admins', num: res.users.admin, brefix: 'User.', icon: 'person-fill' },
              { text: 'Listing Owner', num: res.users.listingOwner, brefix: 'User.', icon: 'person-fill' },
              { text: 'Space Owner', num: res.users.spaceOwner, brefix: 'User.', icon: 'person-fill' },
              { text: 'Searchers', num: res.users.searcher, brefix: 'User.', icon: 'person-fill' },
              { text: 'Manager', num: res.users.manager, brefix: 'User.', icon: 'person-fill' }
            ]
          }
        ]
      })
      .catch(err => console.log(err))
  },
  head () {
    return {
      script: [
        { src: '/js/dashboard.js', body: true }
      ]
    }
  }
}
</script>

<style scoped>

</style>
