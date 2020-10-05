<template>
  <!-- ========== Left Sidebar Start ========== -->
  <div v-if="$auth.user" :key="renderKey" class="left side-menu">
    <div id="remove-scroll" class="slimscroll-menu">
      <!--- Sidemenu -->
      <div id="sidebar-menu">
        <!-- Left Menu Start -->
        <ul id="side-menu" :key="renderKey - 50" class="metismenu">
          <li class="menu-title" v-text="$t('adminSidebar.main')" />

          <li v-for="list in realLinks" :key="list.text">
            <a href="javascript:void(0);" class="waves-effect">
              <i :class="list.icon" />
              <span> {{ list.text }} <span class="float-right menu-arrow"><i class="mdi mdi-chevron-right" /></span> </span>
            </a>
            <ul v-if="list.subMenu.length > 0" class="submenu">
              <li v-for="link in list.subMenu" :key="link.url">
                <nuxt-link exact :to="`${$t('link')}admin${link.url}`">
                  {{ link.text }}
                </nuxt-link>
              </li>
            </ul>
          </li>
        </ul>
      </div>
      <!-- Sidebar -->
      <div class="clearfix" />
    </div>
    <!-- Sidebar -left -->
  </div>
  <!-- Left Sidebar End -->
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  data () {
    return {
      realLinks: [
        {
          accessableFor: ['manager', 'admin'],
          text: this.$t('adminSidebar.listing.text'),
          icon: 'far fa-map',
          subMenu: [
            { url: '/listings/add', text: this.$t('adminSidebar.listing.addNewListing') },
            { url: '/listings/', text: this.$t('adminSidebar.listing.allListings') },
            { url: '/listings/region', text: this.$t('adminSidebar.listing.region') },
            { url: '/listings/tags', text: this.$t('adminSidebar.listing.tags') },
            { url: '/listings/categories', text: this.$t('adminSidebar.listing.categories') }
          ]
        },
        {
          accessableFor: ['admin'],
          text: this.$t('adminSidebar.users.text'),
          icon: 'far fa-user',
          subMenu: [
            { url: '/users', text: this.$t('adminSidebar.users.allUsers') },
            { url: '/users/add', text: this.$t('adminSidebar.users.addUser') },
            { url: '/users?role=admin', text: 'Admins' },
            { url: '/users?role=manager', text: 'Listing Managers' },
            { url: '/users?role=owner', text: 'Listing Owners' },
            { url: '/users?role=searcher', text: 'Searchers' }
          ]
        },
        {
          accessableFor: ['admin'],
          text: this.$t('adminSidebar.siteSettings.text'),
          icon: 'fas fa-cog',
          subMenu: [
            { url: '/settings/', text: this.$t('adminSidebar.siteSettings.text') }
          ]
        },
        {
          accessableFor: ['owner', 'manager', 'admin'],
          text: 'User Listings',
          icon: 'far fa-map',
          subMenu: [
            { url: `/listings/user-listing/${this.$auth.loggedIn ? this.$auth.user._id : ''}`, text: 'My places' },
            { url: '/listings/add', text: this.$t('adminSidebar.listing.addNewListing') }
          ]
        }
      ]
    }
  },
  computed: {
    ...mapGetters({
      renderKey: 'renderKey'
    })
  },
  mounted () {
    this.$emit('initAppPlease')
  },
  updated () {
    this.$emit('initAppPlease')
  }
}
</script>

<style scoped>
.submenu li.active > a:not(.nuxt-link-active) {
  color: #8699ad !important;
}

a.nuxt-link-active {
  color: white !important
}
</style>
