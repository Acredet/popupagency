<template>
  <!-- ========== Left Sidebar Start ========== -->
  <div class="left side-menu">
    <div id="remove-scroll" class="slimscroll-menu">
      <!--- Sidemenu -->
      <div id="sidebar-menu">
        <!-- Left Menu Start -->
        <ul id="side-menu" class="metismenu">
          <li class="menu-title">
            Main
          </li>

          <li>
            <a href="javascript:void(0);" class="waves-effect"><i class="far fa-map" />
              <span> Listing <span class="float-right menu-arrow"><i class="mdi mdi-chevron-right" /></span> </span>
            </a>
            <ul class="submenu">
              <li v-for="link in links" :key="link.url">
                <nuxt-link exact :to="`/admin/listings/${link.url}`">
                  {{ link.text }}
                </nuxt-link>
              </li>
            </ul>
          </li>

          <li>
            <a href="javascript:void(0);" class="waves-effect"><i class="far fa-user" />
              <span> User <span class="float-right menu-arrow"><i class="mdi mdi-chevron-right" /></span> </span>
            </a>
            <ul class="submenu">
              <li>
                <nuxt-link exact to="/admin/users/">
                  All Users
                </nuxt-link>
              </li>
              <li>
                <nuxt-link exact to="/admin/users/add">
                  Add User
                </nuxt-link>
              </li>
            </ul>
          </li>

          <li>
            <nuxt-link exact class="waves-effect" to="/admin/settings">
              <i class="fas fa-cog" />
              <span> site settings </span>
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
          text: 'Add new listing',
          url: 'add'
        },
        {
          text: 'All listings',
          url: ''
        },
        {
          text: 'Region',
          url: 'region'
        },
        {
          text: 'Tags',
          url: 'tags'
        },
        {
          text: 'Categories',
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
