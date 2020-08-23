<template>
  <!-- ========== Left Sidebar Start ========== -->
  <div class="left side-menu">
    <div id="remove-scroll" class="slimscroll-menu">
      <!--- Sidemenu -->
      <div id="sidebar-menu">
        <!-- Left Menu Start -->
        <ul id="side-menu" class="metismenu">
          <li class="menu-title" v-text="$t('adminSidebar.main')" />

          <li>
            <a href="javascript:void(0);" class="waves-effect"><i class="far fa-map" />
              <span> {{ $t('adminSidebar.listing.text') }} <span class="float-right menu-arrow"><i class="mdi mdi-chevron-right" /></span> </span>
            </a>
            <ul class="submenu">
              <li v-for="link in links" :key="link.url">
                <nuxt-link exact :to="`${$t('link')}admin/listings/${link.url}`">
                  {{ link.text }}
                </nuxt-link>
              </li>
            </ul>
          </li>

          <li>
            <a href="javascript:void(0);" class="waves-effect"><i class="far fa-user" />
              <span> {{ this.$t('adminSidebar.users.text') }} <span class="float-right menu-arrow"><i class="mdi mdi-chevron-right" /></span> </span>
            </a>
            <ul class="submenu">
              <li>
                <nuxt-link exact :to="`${$t('link')}admin/users/`" v-text="$t('adminSidebar.users.allUsers')" />
              </li>
              <li>
                <nuxt-link exact :to="`${$t('link')}admin/users/add`" v-text="$t('adminSidebar.users.addUser')" />
              </li>
            </ul>
          </li>

          <li>
            <nuxt-link exact class="waves-effect" :to="`${$t('link')}admin/settings`">
              <i class="fas fa-cog" />
              <span> {{ $t('adminSidebar.siteSettings.text') }} </span>
            </nuxt-link>
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
export default {
  data () {
    return {
      links: [
        {
          text: this.$t('adminSidebar.listing.addNewListing'),
          url: 'add'
        },
        {
          text: this.$t('adminSidebar.listing.allListings'),
          url: ''
        },
        {
          text: this.$t('adminSidebar.listing.region'),
          url: 'region'
        },
        {
          text: this.$t('adminSidebar.listing.tags'),
          url: 'tags'
        },
        {
          text: this.$t('adminSidebar.listing.categories'),
          url: 'categories'
        }
      ]
    }
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
