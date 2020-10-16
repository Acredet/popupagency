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
  computed: {
    realLinks () {
      return [
        {
          accessableFor: ['manager', 'admin'],
          text: this.$t('adminSidebar.listing.text'),
          icon: 'far fa-home',
          subMenu: [
            { url: this.$t('link') + 'admin', text: 'Admin home' }
          ]
        },
        {
          accessableFor: ['admin'],
          text: 'Home',
          icon: 'far fa-map',
          subMenu: [
            { url: this.$t('link') + 'listings/add', text: this.$t('adminSidebar.listing.addNewListing') },
            { url: this.$t('link') + 'listings/', text: this.$t('adminSidebar.listing.allListings') },
            { url: this.$t('link') + 'listings/region', text: this.$t('adminSidebar.listing.region') },
            { url: this.$t('link') + 'listings/tags', text: this.$t('adminSidebar.listing.tags') },
            { url: this.$t('link') + 'listings/categories', text: this.$t('adminSidebar.listing.categories') }
          ]
        },
        {
          accessableFor: ['manager', 'admin'],
          text: 'Centrums',
          icon: 'far fa-map',
          subMenu: [
            { url: this.$t('link') + 'centrum/add', text: this.$t('adminSidebar.center.add') },
            { url: this.$t('link') + 'centrum/', text: this.$t('adminSidebar.center.all') }
          ]
        },
        {
          accessableFor: ['admin'],
          text: this.$t('adminSidebar.users.text'),
          icon: 'far fa-user',
          subMenu: [
            { url: this.$t('link') + 'users', text: this.$t('adminSidebar.users.allUsers') },
            { url: this.$t('link') + 'users/add', text: this.$t('adminSidebar.users.addUser') },
            { url: this.$t('link') + 'users?role=admin', text: this.$t('adminSidebar.users.role.admins') },
            { url: this.$t('link') + 'users?role=manager', text: this.$t('adminSidebar.users.role.manger') },
            { url: this.$t('link') + 'users?role=listingOwner', text: this.$t('adminSidebar.users.role.owener') },
            { url: this.$t('link') + 'users?role=spaceOwner', text: this.$t('adminSidebar.users.role.space') },
            { url: this.$t('link') + 'users?role=searcher', text: this.$t('adminSidebar.users.role.searcher') }
          ]
        },
        {
          accessableFor: ['admin'],
          text: this.$t('adminSidebar.siteSettings.text'),
          icon: 'fas fa-cog',
          subMenu: [
            { url: this.$t('link') + 'settings/', text: this.$t('adminSidebar.siteSettings.text') }
          ]
        },
        {
          accessableFor: ['listingOwner', 'spaceOwner', 'manager', 'admin'],
          text: 'User Listings',
          icon: 'far fa-map',
          subMenu: [
            { url: `/listings/user-listing/${this.$auth.loggedIn ? this.$auth.user._id : ''}`, text: this.$t('adminSidebar.siteSettings.myPlaces') },
            { url: '/listings/add', text: this.$t('adminSidebar.listing.addNewListing') }
          ]
        }
      ]
    },
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
